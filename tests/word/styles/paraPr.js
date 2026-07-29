/*
 * (c) Copyright Ascensio System SIA 2010-2024
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

	let logicDocument = AscTest.CreateLogicDocument();
	let stylesManager = logicDocument.GetStyles();

	QUnit.module("Paragraph style (ParaPr)");


	QUnit.test("Indents", function (assert)
	{
		AscTest.ClearDocument();

		let style = new AscWord.CStyle();
		stylesManager.Add(style);

		style.SetParaPr({
			Ind : {Left : 10, Right : 10, FirstLine : 20}
		});
		p = new AscWord.Paragraph();
		logicDocument.AddToContent(0, p);
		p.SetParagraphStyleById(style.GetId());

		let compiledPr = p.GetCompiledParaPr();

		assert.ok(true, "Create simple style and set it to paragraph");

		assert.strictEqual(compiledPr.Ind.Left, 10, "Check Left indent");
		assert.strictEqual(compiledPr.Ind.Right, 10, "Check Right indent");
		assert.strictEqual(compiledPr.Ind.FirstLine, 20, "Check FirstLine");


		assert.ok(true, "Set direct NumPr with numId='0'");
		p.SetNumPr(0, 0);
		compiledPr = p.GetCompiledParaPr();

		assert.strictEqual(compiledPr.Ind.Left, 0, "Check Left indent");
		assert.strictEqual(compiledPr.Ind.Right, 10, "Check Right indent");
		assert.strictEqual(compiledPr.Ind.FirstLine, 0, "Check FirstLine");

		assert.ok(true, "Set direct NumPr with numId='\"0\"'");
		p.SetNumPr("0", 0);
		compiledPr = p.GetCompiledParaPr();

		assert.strictEqual(compiledPr.Ind.Left, 0, "Check Left indent");
		assert.strictEqual(compiledPr.Ind.Right, 10, "Check Right indent");
		assert.strictEqual(compiledPr.Ind.FirstLine, 0, "Check FirstLine");

	});

	QUnit.test("East Asian typography defaults and property model", function(assert)
	{
		let defaults = new AscWord.CParaPr();
		defaults.InitDefault();

		assert.strictEqual(defaults.Kinsoku, true, "Kinsoku defaults to true");
		assert.strictEqual(defaults.OverflowPunct, true, "OverflowPunct defaults to true");
		assert.strictEqual(defaults.AutoSpaceDE, true, "AutoSpaceDE defaults to true");
		assert.strictEqual(defaults.AutoSpaceDN, true, "AutoSpaceDN defaults to true");

		let paraPr = AscWord.CParaPr.fromObject({
			Kinsoku      : false,
			OverflowPunct: true,
			AutoSpaceDE  : false,
			AutoSpaceDN  : true
		});
		let copy = paraPr.Copy();

		assert.ok(paraPr.IsEqual(copy), "Copy preserves all East Asian properties");
		assert.deepEqual(
			[copy.Kinsoku, copy.OverflowPunct, copy.AutoSpaceDE, copy.AutoSpaceDN],
			[false, true, false, true],
			"Copied values are unchanged"
		);

		let overlay = AscWord.CParaPr.fromObject({AutoSpaceDE: true, AutoSpaceDN: false});
		copy.Merge(overlay);
		assert.deepEqual(
			[copy.Kinsoku, copy.OverflowPunct, copy.AutoSpaceDE, copy.AutoSpaceDN],
			[false, true, true, false],
			"Merge changes only explicitly declared values"
		);

		let compared = paraPr.Compare(paraPr.Copy());
		assert.deepEqual(
			[compared.Kinsoku, compared.OverflowPunct, compared.AutoSpaceDE, compared.AutoSpaceDN],
			[false, true, false, true],
			"Compare retains common values"
		);
	});

	QUnit.test("East Asian typography style inheritance and direct formatting", function(assert)
	{
		AscTest.ClearDocument();

		let baseStyle = new AscWord.CStyle();
		stylesManager.Add(baseStyle);
		baseStyle.SetParaPr({
			Kinsoku      : false,
			OverflowPunct: false,
			AutoSpaceDE  : false,
			AutoSpaceDN  : false
		});

		let derivedStyle = new AscWord.CStyle();
		stylesManager.Add(derivedStyle);
		derivedStyle.SetBasedOn(baseStyle.GetId());
		derivedStyle.SetParaPr({OverflowPunct: true, AutoSpaceDN: true});

		let paragraph = new AscWord.Paragraph();
		logicDocument.AddToContent(0, paragraph);
		paragraph.SetParagraphStyleById(derivedStyle.GetId());

		let compiledPr = paragraph.GetCompiledParaPr();
		assert.deepEqual(
			[compiledPr.Kinsoku, compiledPr.OverflowPunct, compiledPr.AutoSpaceDE, compiledPr.AutoSpaceDN],
			[false, true, false, true],
			"Derived style overrides only declared values and inherits the rest"
		);

		paragraph.SetKinsoku(true);
		paragraph.SetAutoSpaceDE(true);
		compiledPr = paragraph.GetCompiledParaPr();
		assert.deepEqual(
			[compiledPr.Kinsoku, compiledPr.OverflowPunct, compiledPr.AutoSpaceDE, compiledPr.AutoSpaceDN],
			[true, true, true, true],
			"Direct formatting overrides inherited values"
		);

		paragraph.Clear_Formatting();
		compiledPr = paragraph.GetCompiledParaPr();
		assert.deepEqual(
			[compiledPr.Kinsoku, compiledPr.OverflowPunct, compiledPr.AutoSpaceDE, compiledPr.AutoSpaceDN],
			[true, true, true, true],
			"Clearing paragraph formatting removes direct values and restores defaults"
		);
	});

	QUnit.test("East Asian typography undo and redo", function(assert)
	{
		AscTest.ClearDocument();
		let paragraph = new AscWord.Paragraph();
		logicDocument.AddToContent(0, paragraph);
		AscCommon.History.Clear();

		logicDocument.StartAction(AscDFH.historydescription_Document_SetParagraphPr);
		paragraph.SetKinsoku(false);
		paragraph.SetOverflowPunct(false);
		paragraph.SetAutoSpaceDE(false);
		paragraph.SetAutoSpaceDN(false);
		logicDocument.FinalizeAction();

		assert.deepEqual(
			[paragraph.Pr.Kinsoku, paragraph.Pr.OverflowPunct, paragraph.Pr.AutoSpaceDE, paragraph.Pr.AutoSpaceDN],
			[false, false, false, false],
			"Direct properties are applied"
		);

		logicDocument.Document_Undo();
		assert.deepEqual(
			[paragraph.Pr.Kinsoku, paragraph.Pr.OverflowPunct, paragraph.Pr.AutoSpaceDE, paragraph.Pr.AutoSpaceDN],
			[undefined, undefined, undefined, undefined],
			"Undo restores inherited state"
		);

		logicDocument.Document_Redo();
		assert.deepEqual(
			[paragraph.Pr.Kinsoku, paragraph.Pr.OverflowPunct, paragraph.Pr.AutoSpaceDE, paragraph.Pr.AutoSpaceDN],
			[false, false, false, false],
			"Redo restores direct values"
		);
	});

	QUnit.test("East Asian typography collaborative changes", function(assert)
	{
		let paragraph = new AscWord.Paragraph();
		let properties = [
			[AscDFH.historyitem_Paragraph_Kinsoku, "Kinsoku"],
			[AscDFH.historyitem_Paragraph_OverflowPunct, "OverflowPunct"],
			[AscDFH.historyitem_Paragraph_AutoSpaceDE, "AutoSpaceDE"],
			[AscDFH.historyitem_Paragraph_AutoSpaceDN, "AutoSpaceDN"]
		];

		for (let i = 0; i < properties.length; ++i)
		{
			let type = properties[i][0];
			let property = properties[i][1];
			let ChangeClass = AscDFH.changesFactory[type];
			let writer = AscTest.GetBinaryWriter();
			let sourceChange = new ChangeClass(paragraph, undefined, false);
			sourceChange.WriteToBinary(writer);

			let loadedChange = new ChangeClass(paragraph);
			loadedChange.ReadFromBinary(AscTest.GetBinaryReader(writer));
			loadedChange.Load();

			assert.strictEqual(loadedChange.Old, undefined, property + " collaborative change preserves inherited old value");
			assert.strictEqual(loadedChange.New, false, property + " collaborative change preserves explicit false");
			assert.strictEqual(paragraph.Pr[property], false, property + " collaborative load applies the value");
		}
	});

	QUnit.test("East Asian typography JSON and binary round trips", function(assert)
	{
		let source = AscWord.CParaPr.fromObject({
			Kinsoku      : false,
			OverflowPunct: true,
			AutoSpaceDE  : false,
			AutoSpaceDN  : true
		});

		let json = source.ToJson(true);
		let fromJson = AscWord.CParaPr.FromJson(json, true);
		assert.deepEqual(
			[fromJson.Kinsoku, fromJson.OverflowPunct, fromJson.AutoSpaceDE, fromJson.AutoSpaceDN],
			[false, true, false, true],
			"JSON preserves explicit true and false values"
		);

		let modelWriter = AscTest.GetBinaryWriter();
		source.WriteToBinary(modelWriter);
		let fromModelBinary = new AscWord.CParaPr();
		fromModelBinary.ReadFromBinary(AscTest.GetBinaryReader(modelWriter));
		assert.deepEqual(
			[fromModelBinary.Kinsoku, fromModelBinary.OverflowPunct, fromModelBinary.AutoSpaceDE, fromModelBinary.AutoSpaceDN],
			[false, true, false, true],
			"CParaPr binary serialization preserves all values"
		);

		let editorBinWriter = AscTest.GetBinaryWriter();
		new Binary_pPrWriter(editorBinWriter, null, null, null).Write_pPr(source);
		let fromEditorBin = new AscWord.CParaPr();
		let readResult = new DocReadResult(logicDocument);
		new Binary_pPrReader(
			logicDocument,
			readResult,
			AscTest.GetBinaryReader(editorBinWriter)
		).Read(editorBinWriter.GetCurPosition(), fromEditorBin);
		assert.deepEqual(
			[fromEditorBin.Kinsoku, fromEditorBin.OverflowPunct, fromEditorBin.AutoSpaceDE, fromEditorBin.AutoSpaceDN],
			[false, true, false, true],
			"Editor.bin preserves all values"
		);
	});

	QUnit.test("East Asian typography public paragraph properties", function(assert)
	{
		let properties = new Asc.asc_CParagraphProperty();
		properties.put_Kinsoku(false);
		properties.put_OverflowPunct(true);
		properties.put_AutoSpaceDE(false);
		properties.put_AutoSpaceDN(true);

		assert.deepEqual(
			[
				properties.get_Kinsoku(),
				properties.get_OverflowPunct(),
				properties.get_AutoSpaceDE(),
				properties.get_AutoSpaceDN()
			],
			[false, true, false, true],
			"Public getters and setters preserve independent values"
		);
	});
});
