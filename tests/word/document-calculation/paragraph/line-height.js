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

"use strict";

$(function () {
	
	const charWidth = AscTest.CharWidth * AscTest.FontSize;
	
	const L_FIELD = 20 * charWidth;
	const R_FIELD = 30 * charWidth;
	const PAGE_W  = 80 * charWidth;
	
	let logicDocument = AscTest.CreateLogicDocument();
	function initDocument()
	{
		AscTest.ClearDocument();
		logicDocument.AddToContent(0, AscTest.CreateParagraph());
		let settings = logicDocument.GetDocumentSettings();
		settings.AdjustLineHeightInTable = false;
		settings.DoNotSnapToGridInCell = false;
		settings.DoNotWrapTextWithPunct = false;
		settings.DoNotUseEastAsianBreakRules = false;
		
		let sectPr = AscTest.GetFinalSection();
		sectPr.SetPageSize(PAGE_W, 1000);
		sectPr.SetPageMargins(L_FIELD, 50, R_FIELD, 50);
		sectPr.SetDocGrid(undefined);
	}
	
	function checkLineHeight(assert, para, lines)
	{
		for (let i = 0, lineCount = Math.min(lines.length, para.GetLinesCount()); i < lineCount; ++i)
		{
			let _line = para.getLine(i);
			assert.close(_line.Bottom - _line.Top, lines[i], 0.001, "Check height for " + i + " line");
		}
	}
	
	QUnit.module("Test paragraph line height", {
		beforeEach : function()
		{
			initDocument();
			AscTest.SetCompatibilityMode(AscCommon.document_compatibility_mode_Current);
		}
	});
	
	// bug #74622
	QUnit.test("Test non-zero Y positioning for the whole line of text", function(assert)
	{
		let p1 = logicDocument.GetElement(0);
		
		p1.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Auto, Line : 1});
		p1.SetParagraphIndent({FirstLine : 0, Left : 0, Right : 0});
		
		AscTest.AddTextToParagraph(p1, "First line ________________ ");
		let run = AscTest.AddTextToParagraph(p1, "Second line");
		AscTest.Recalculate();
		
		assert.strictEqual(p1.getTextInLineRange(0, 0), "First line ________________ ", "Check the text in the first line");
		assert.strictEqual(p1.getTextInLineRange(1, 0), "Second line\r\n", "Check the text in the second line");
		
		checkLineHeight(assert, p1, [20, 20]);
		
		run.Set_Position(3);
		AscTest.Recalculate();
		checkLineHeight(assert, p1, [20, 20]);
		
		run.Set_Position(10);
		AscTest.Recalculate();
		checkLineHeight(assert, p1, [20, 25]);
		
		run.Set_Position(-10);
		AscTest.Recalculate();
		checkLineHeight(assert, p1, [20, 20]);
		
		run.Set_Position(-20);
		AscTest.Recalculate();
		checkLineHeight(assert, p1, [20, 25]);
	});

	QUnit.test("Exact line spacing overrides the document line grid", function(assert)
	{
		let paragraph = logicDocument.GetElement(0);
		paragraph.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Exact, Line : 20});
		let run = AscTest.AddTextToParagraph(paragraph, "甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸");
		let pitchTwips = 1440;
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));

		paragraph.SetSnapToGrid(true);
		run.SetSnapToGrid(true);
		AscTest.Recalculate();
		assert.ok(paragraph.GetLinesCount() > 1, "Test content wraps to multiple lines");
		assert.close(paragraph.getLine(1).Y - paragraph.getLine(0).Y, 20, 0.02, "Exact line spacing is not rounded to the document grid");
	});

	QUnit.test("Automatic line spacing uses the document line-grid pitch", function(assert)
	{
		let paragraph = logicDocument.GetElement(0);
		let run = AscTest.AddTextToParagraph(paragraph, "甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸");
		let pitchTwips = 1440;
		let pitch = AscCommon.TwipsToMM(pitchTwips);
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));
		paragraph.SetSnapToGrid(true);
		run.SetSnapToGrid(true);

		[1, 1.5, 2].forEach(function(multiplier)
		{
			paragraph.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Auto, Line : multiplier});
			AscTest.Recalculate();
			assert.ok(paragraph.GetLinesCount() > 1, "Test content wraps for " + multiplier + "x line spacing");
			assert.close(paragraph.getLine(1).Y - paragraph.getLine(0).Y, pitch, 0.001,
				multiplier + "x automatic spacing is ignored while the paragraph snaps to the document grid");
		});

		paragraph.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Auto, Line : 2});
		paragraph.SetSnapToGrid(false);
		AscTest.Recalculate();
		let paragraphOverrideDistance = paragraph.getLine(1).Y - paragraph.getLine(0).Y;
		assert.close(paragraphOverrideDistance, 40, 0.001, "Paragraph SnapToGrid=false restores multiple line spacing");

		paragraph.SetSnapToGrid(true);
		run.SetSnapToGrid(false);
		AscTest.Recalculate();
		let runOverrideDistance = paragraph.getLine(1).Y - paragraph.getLine(0).Y;
		assert.close(runOverrideDistance, 40, 0.001, "Run SnapToGrid=false disables grid snapping for affected lines");
	});

	QUnit.test("Grid-aligned lines preserve trailing grid leading", function(assert)
	{
		let heading = logicDocument.GetElement(0);
		let body = AscTest.CreateParagraph();
		logicDocument.AddToContent(1, body);

		let headingRun = AscTest.AddTextToParagraph(heading, "条款标题");
		let bodyRun = AscTest.AddTextToParagraph(body, "正文");
		let pitchTwips = 1440;
		let pitch = AscCommon.TwipsToMM(pitchTwips);
		let halfLineSpacing = pitch * 50 / 100;
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));

		heading.SetParagraphSpacing({After : 0, AfterLines : 50, Before : 0, LineRule : linerule_Auto, Line : 1.5});
		heading.SetSnapToGrid(true);
		headingRun.SetSnapToGrid(true);
		body.SetParagraphSpacing({After : 0, Before : 0, BeforeLines : 50, LineRule : linerule_Auto, Line : 1.5});
		body.SetSnapToGrid(false);
		bodyRun.SetSnapToGrid(false);
		AscTest.Recalculate();

		assert.strictEqual(heading.GetLinesCount(), 1, "Grid-aligned heading occupies one visual line");
		assert.strictEqual(body.GetLinesCount(), 1, "Following non-grid paragraph occupies one visual line");
		assert.ok(heading.getLine(0).Metrics.LineGap > 0.001, "A short grid-aligned line keeps the unused part of its grid pitch after the baseline");
		let bodyBaseline = body.GetPageBounds(0).Top + body.getLine(0).Y;
		let headingBaseline = heading.GetPageBounds(0).Top + heading.getLine(0).Y;
		assert.close(bodyBaseline - headingBaseline, pitch + halfLineSpacing, 0.001,
			"The following paragraph starts after one grid pitch and the half-line paragraph spacing");

		heading.SetParagraphSpacing({After : 0, AfterLines : 50, Before : 0, LineRule : linerule_AtLeast, Line : 22});
		AscTest.Recalculate();
		assert.ok(heading.getLine(0).Metrics.LineGap > 0.001, "At-least spacing also keeps the unused part of its grid pitch");
	});

	QUnit.test("Automatic grid spacing remains continuous across paragraph boundaries", function(assert)
	{
		let first = logicDocument.GetElement(0);
		let second = AscTest.CreateParagraph();
		logicDocument.AddToContent(1, second);

		let firstRun = AscTest.AddTextToParagraph(first, "第一段");
		let secondRun = AscTest.AddTextToParagraph(second, "第二段");
		let pitchTwips = 1440;
		let pitch = AscCommon.TwipsToMM(pitchTwips);
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));

		[first, second].forEach(function(paragraph)
		{
			paragraph.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Auto, Line : 1.5});
			paragraph.SetSnapToGrid(true);
		});
		firstRun.SetSnapToGrid(true);
		secondRun.SetSnapToGrid(true);
		AscTest.Recalculate();

		let secondBaseline = second.GetPageBounds(0).Top + second.getLine(0).Y;
		let firstBaseline = first.GetPageBounds(0).Top + first.getLine(0).Y;
		assert.close(secondBaseline - firstBaseline, pitch, 0.001,
			"Adjacent grid-aligned paragraphs ignore the automatic line-spacing multiplier");
	});

	QUnit.test("Point paragraph spacing does not move a baseline off the document grid", function(assert)
	{
		let first = logicDocument.GetElement(0);
		let second = AscTest.CreateParagraph();
		logicDocument.AddToContent(1, second);

		let firstRun = AscTest.AddTextToParagraph(first, "第一段");
		let secondRun = AscTest.AddTextToParagraph(second, "第二段");
		let pitchTwips = 1440;
		let pitch = AscCommon.TwipsToMM(pitchTwips);
		let paragraphSpacing = pitch / 4;
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));

		[first, second].forEach(function(paragraph)
		{
			paragraph.SetParagraphSpacing({After : paragraphSpacing, Before : paragraphSpacing, LineRule : linerule_Auto, Line : 1.5});
			paragraph.SetSnapToGrid(true);
		});
		firstRun.SetSnapToGrid(true);
		secondRun.SetSnapToGrid(true);
		AscTest.Recalculate();

		let firstBaseline = first.GetPageBounds(0).Top + first.getLine(0).Y;
		let secondBaseline = second.GetPageBounds(0).Top + second.getLine(0).Y;
		let contentTop = AscTest.GetFinalSection().GetContentFrame(0).Top;
		let secondGridOffset = (secondBaseline - contentTop) / pitch;
		assert.close(secondGridOffset, Math.round(secondGridOffset), 0.001,
			"Point paragraph spacing keeps the following baseline on the document grid");
		assert.close(secondBaseline - firstBaseline, pitch * 2, 0.001,
			"Positive point spacing advances to the next complete grid line instead of creating an off-grid baseline");
		assert.close(second.Get_CompiledPr().ParaPr.Spacing.Before, 0, 0.001,
			"The current paragraph does not retain duplicate Before spacing after compilation");

		first.SetParagraphSpacing({After : paragraphSpacing, Before : paragraphSpacing, LineRule : linerule_Auto, Line : 1.5});
		second.SetParagraphSpacing({After : paragraphSpacing, Before : paragraphSpacing, LineRule : linerule_Auto, Line : 1.5});
		first.SetSnapToGrid(false);
		second.SetSnapToGrid(false);
		firstRun.SetSnapToGrid(false);
		secondRun.SetSnapToGrid(false);
		AscTest.Recalculate();

		firstBaseline = first.GetPageBounds(0).Top + first.getLine(0).Y;
		secondBaseline = second.GetPageBounds(0).Top + second.getLine(0).Y;
		assert.notOk(Math.abs((secondBaseline - contentTop) / pitch - Math.round((secondBaseline - contentTop) / pitch)) < 0.001,
			"Disabling grid alignment restores continuous point paragraph spacing");
	});

	QUnit.test("Table line-grid compatibility settings control snapping", function(assert)
	{
		AscTest.ClearDocument();
		let table = AscTest.CreateTable(1, 1, [40]);
		logicDocument.AddToContent(0, table);
		let paragraph = table.GetRow(0).GetCell(0).GetContent().GetElement(0);
		paragraph.SetParagraphSpacing({After : 0, Before : 0, LineRule : linerule_Auto, Line : 2});
		paragraph.SetSnapToGrid(true);
		let run = AscTest.AddTextToParagraph(paragraph, "甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸");
		run.SetSnapToGrid(true);
		let pitchTwips = 1440;
		let pitch = AscCommon.TwipsToMM(pitchTwips);
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.Lines, 0, pitchTwips));
		let settings = logicDocument.GetDocumentSettings();

		settings.AdjustLineHeightInTable = false;
		settings.DoNotSnapToGridInCell = false;
		AscTest.Recalculate();
		assert.ok(paragraph.GetLinesCount() > 1, "Table text wraps to multiple lines");
		assert.close(paragraph.getLine(1).Y - paragraph.getLine(0).Y, 40, 0.001, "Grid line pitch is ignored in table cells by default");

		settings.AdjustLineHeightInTable = true;
		AscTest.Recalculate();
		assert.close(paragraph.getLine(1).Y - paragraph.getLine(0).Y, pitch, 0.001, "adjustLineHeightInTable lets the document grid override automatic line spacing");

		settings.DoNotSnapToGridInCell = true;
		AscTest.Recalculate();
		assert.close(paragraph.getLine(1).Y - paragraph.getLine(0).Y, 40, 0.001, "doNotSnapToGridInCell overrides adjustLineHeightInTable");
	});

	QUnit.test("Document character grid uses virtual spacing and respects SnapToGrid", function(assert)
	{
		let paragraph = logicDocument.GetElement(0);
		let run = AscTest.AddTextToParagraph(paragraph, "甲，１A丙");
		AscTest.GetFinalSection().SetDocGrid(new AscWord.SectionDocGrid(
			Asc.c_oAscDocGridType.SnapToChars,
			5 * 4096,
			undefined
		));

		paragraph.SetSnapToGrid(true);
		paragraph.SetAutoSpaceDE(false);
		paragraph.SetAutoSpaceDN(false);
		run.SetSnapToGrid(true);
		AscTest.Recalculate();
		assert.ok(run.GetElement(1).GetAutoSpaceBefore() > 0, "East Asian punctuation is aligned to the next character-grid position");
		assert.ok(run.GetElement(2).GetAutoSpaceBefore() > 0, "A full-width digit participates in the character grid");
		assert.ok(run.GetElement(4).GetAutoSpaceBefore() > 0, "Latin text spans its natural width before the next full-width character is aligned");

		paragraph.SetSnapToGrid(false);
		AscTest.Recalculate();
		assert.strictEqual(run.GetElement(1).GetAutoSpaceBefore(), 0, "Paragraph SnapToGrid=false clears character-grid spacing");
		assert.strictEqual(run.GetElement(2).GetAutoSpaceBefore(), 0, "Full-width digit spacing is cleared on recalculation");
		assert.strictEqual(run.GetElement(4).GetAutoSpaceBefore(), 0, "All character-grid spacing is cleared on recalculation");
	});

	QUnit.test("Character-grid compatibility can disable hanging punctuation", function(assert)
	{
		let paragraph = logicDocument.GetElement(0);
		let run = AscTest.AddTextToParagraph(paragraph, "甲乙，丙");
		run.Set_Lang_EastAsia(lcid_zhCN);
		run.SetSnapToGrid(true);
		paragraph.SetKinsoku(true);
		paragraph.SetOverflowPunct(true);
		paragraph.SetSnapToGrid(true);
		let charSpace = Math.round((charWidth / g_dKoef_pt_to_mm - AscTest.FontSize) * 4096);
		let section = AscTest.GetFinalSection();
		section.SetPageSize(L_FIELD + R_FIELD + 2 * charWidth, 1000);
		section.SetDocGrid(new AscWord.SectionDocGrid(Asc.c_oAscDocGridType.LinesAndChars, charSpace, 1440));
		let settings = logicDocument.GetDocumentSettings();

		settings.DoNotWrapTextWithPunct = false;
		AscTest.Recalculate();
		assert.ok(/，$/.test(paragraph.GetTextOnLine(0)), "OverflowPunct allows closing punctuation to hang with a character grid");

		settings.DoNotWrapTextWithPunct = true;
		AscTest.Recalculate();
		assert.notOk(/，$/.test(paragraph.GetTextOnLine(0)), "doNotWrapTextWithPunct disables hanging punctuation with a character grid");
		assert.strictEqual(paragraph.GetTextOnLine(0).indexOf("，"), -1, "Closing punctuation moves to the next line");
	});
});
