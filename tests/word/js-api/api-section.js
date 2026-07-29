/*
 * (c) Copyright Ascensio System SIA 2010-2025
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

$(function () {
	QUnit.module('Test the ApiSection methods');
	
	QUnit.test('GetColumnsCount, GetColumnsSpaces, GetColumnsWidths', function(assert)
	{
		let document = AscTest.JsApi.GetDocument();
		
		section = document.GetFinalSection();

		let widths = [1440, 2880, 4320];
		let spaces = [720, 480];

		section.SetNotEqualColumns(widths, spaces);

		let checkWidths = section.GetColumnsWidths();
		let checkSpaces = section.GetColumnsSpaces();

		assert.strictEqual(section.GetColumnsCount(), 3, 'Columns count should be 3');
		
		widths.forEach((width, idx) => {
			assert.strictEqual(width, checkWidths[idx], `The set width with idx = ${idx} differs from the received one`);
		});

		spaces.forEach((space, idx) => {
			assert.strictEqual(space, checkSpaces[idx], `The set space with idx = ${idx} differs from the received one`);
		});
	});

	QUnit.test('Document grid model, history and public section properties', function(assert)
	{
		let document = AscTest.JsApi.GetDocument().Document;
		let section = document.GetFinalSectPr();
		AscCommon.History.Clear();

		document.StartAction(AscDFH.historydescription_Document_SetSectionProps);
		section.SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.LinesAndChars, -128, 360));
		document.FinalizeAction();

		let grid = section.GetDocGrid();
		assert.deepEqual(
			[grid.Type, grid.CharSpace, grid.LinePitch],
			[Asc.c_oAscDocGridType.LinesAndChars, -128, 360],
			'Document grid preserves raw OOXML values, including signed charSpace'
		);

		document.Document_Undo();
		assert.strictEqual(section.GetDocGrid(), undefined, 'Undo restores an absent document grid');
		document.Document_Redo();
		assert.ok(section.GetDocGrid().IsEqual(grid), 'Redo restores all document-grid fields');

		let ChangeClass = AscDFH.changesFactory[AscDFH.historyitem_Section_DocGrid];
		let writer = AscTest.GetBinaryWriter();
		new ChangeClass(section, undefined, grid).WriteToBinary(writer);
		let loadedChange = new ChangeClass(section);
		loadedChange.ReadFromBinary(AscTest.GetBinaryReader(writer));
		loadedChange.Load();
		assert.ok(section.GetDocGrid().IsEqual(grid), 'Collaborative change preserves document-grid fields');

		let editorBinWriter = AscTest.GetBinaryWriter();
		new Binary_pPrWriter(editorBinWriter, null, null, null).WriteSectPr(section, document);
		let reopenedSection = new AscWord.SectPr(document);
		let sectionReader = new Binary_pPrReader(
			document,
			new DocReadResult(document),
			AscTest.GetBinaryReader(editorBinWriter)
		);
		sectionReader.bcr.Read1(editorBinWriter.GetCurPosition(), function(type, length)
		{
			return sectionReader.Read_SecPr(type, length, reopenedSection, {});
		});
		assert.ok(reopenedSection.GetDocGrid().IsEqual(grid), 'Editor.bin preserves all document-grid fields');

		let props = new Asc.CDocumentSectionProps(section, document);
		assert.deepEqual(
			[props.get_DocGridType(), props.get_DocGridCharSpace(), props.get_DocGridLinePitch()],
			[Asc.c_oAscDocGridType.LinesAndChars, -128, 360],
			'Public section properties expose the current document grid'
		);
		assert.ok(props.get_DocGridDefaultFontSize() > 0, 'Public section properties expose a usable default font size');

		props.put_DocGridLinesPerPage(40);
		props.put_DocGridCharsPerLine(45);
		assert.strictEqual(props.get_DocGridLinesPerPage(), 40, 'Lines-per-page API converts to and from line pitch');
		assert.strictEqual(props.get_DocGridCharsPerLine(), 45, 'Characters-per-line API converts to and from signed charSpace');
		assert.strictEqual(props.get_DocGridType(), Asc.c_oAscDocGridType.LinesAndChars, 'Count APIs select the combined document-grid type');

		let firstParagraph = document.GetElement(0);
		let firstSection = new AscWord.SectPr(document);
		firstParagraph.SetSectionPr(firstSection);
		document.PushToContent(AscTest.CreateParagraph());

		let allSectionsProps = new Asc.CDocumentSectionProps();
		allSectionsProps.put_DocGridType(Asc.c_oAscDocGridType.Lines);
		allSectionsProps.put_DocGridLinePitch(420);
		allSectionsProps.put_DocGridApplyType(Asc.c_oAscSectionApplyType.All);
		document.Set_SectionProps(allSectionsProps);

		let allSections = document.GetSectionsByApplyType(Asc.c_oAscSectionApplyType.All);
		assert.strictEqual(allSections.length, 2, 'Apply-to-all preserves the section break and targets every section');
		assert.ok(firstParagraph.Get_SectionPr() === firstSection, 'Applying the grid does not replace the existing section break');
		assert.deepEqual(
			allSections.map(function(sectionPr)
			{
				let sectionGrid = sectionPr.GetDocGrid();
				return [sectionGrid.Type, sectionGrid.LinePitch];
			}),
			[
				[Asc.c_oAscDocGridType.Lines, 420],
				[Asc.c_oAscDocGridType.Lines, 420]
			],
			'Apply-to-all updates each section with identical grid settings'
		);
	});

	QUnit.test('Document-grid table compatibility settings survive Editor.bin', function(assert)
	{
		let document = AscTest.JsApi.GetDocument().Document;
		let settings = document.GetDocumentSettings();
		let oldAdjustLineHeight = settings.AdjustLineHeightInTable;
		let oldDoNotSnap = settings.DoNotSnapToGridInCell;
		settings.AdjustLineHeightInTable = true;
		settings.DoNotSnapToGridInCell = true;

		let writer = AscTest.GetBinaryWriter();
		new BinarySettingsTableWriter(writer, document, {isCompatible: true}).WriteCompat();
		settings.AdjustLineHeightInTable = oldAdjustLineHeight;
		settings.DoNotSnapToGridInCell = oldDoNotSnap;

		let reopenedSettings = new AscWord.DocumentSettings(document);
		let reader = new Binary_SettingsTableReader(document, new DocReadResult(document), AscTest.GetBinaryReader(writer));
		reader.bcr.Read1(writer.GetCurPosition(), function(type, length)
		{
			return reader.ReadCompat(type, length, reopenedSettings);
		});

		assert.strictEqual(reopenedSettings.isAdjustLineHeightInTable(), true, 'adjustLineHeightInTable survives Editor.bin');
		assert.strictEqual(reopenedSettings.isDoNotSnapToGridInCell(), true, 'doNotSnapToGridInCell survives Editor.bin');
	});
});
