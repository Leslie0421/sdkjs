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
	
	let PluginsApi = AscTest.Editor;
	
	let logicDocument = AscTest.CreateLogicDocument();
	logicDocument.RemoveFromContent(0, logicDocument.GetElementsCount(), false);
	
	function MoveToNewParagraph()
	{
		let p = AscTest.CreateParagraph();
		logicDocument.AddToContent(logicDocument.GetElementsCount(), p);
		p.SetThisElementCurrent();
		return p;
	}
	
	QUnit.module("Test plugins api");
	
	QUnit.test("Test work with addin fields", function (assert)
	{
		MoveToNewParagraph();
		
		assert.strictEqual(PluginsApi.pluginMethod_GetAllAddinFields().length, 0, "Check addin fields in empty document");
		
		MoveToNewParagraph();
		PluginsApi.pluginMethod_AddAddinField({"Value" : "Test addin", "Content" : 123});
		
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields(),
			[
				{"FieldId" : "1", "Value" : "Test addin", "Content" : "123"}
			],
			"Add addin field and check get function");
		
		MoveToNewParagraph();
		assert.strictEqual(logicDocument.GetAllFields().length, 1, "Check the number of all fields");
		logicDocument.AddFieldWithInstruction("PAGE");
		assert.strictEqual(logicDocument.GetAllFields().length, 2, "Add PAGE field and check the number of all fields");
		
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields().length, 1, "Check the number of addin fields");
		
		MoveToNewParagraph();
		PluginsApi.pluginMethod_AddAddinField({"Value" : "Addin №2", "Content" : "This is the second addin field"});
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields(),
			[
				{"FieldId" : "1", "Value" : "Test addin", "Content" : "123"},
				{"FieldId" : "3", "Value" : "Addin №2", "Content" : "This is the second addin field"}
			],
			"Add addin field and check get function");
		
		PluginsApi.pluginMethod_UpdateAddinFields(
			[
				{"FieldId" : "1", "Value" : "Addin №1", "Content" : "This is the first addin field"},
			],
			"Add addin field and check get function");
		
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields(),
			[
				{"FieldId" : "1", "Value" : "Addin №1", "Content" : "This is the first addin field"},
				{"FieldId" : "3", "Value" : "Addin №2", "Content" : "This is the second addin field"}
			],
			"Change the first adding and check get function");
		
		PluginsApi.pluginMethod_SelectAddinField("1");
		assert.strictEqual(logicDocument.GetSelectedText(), "This is the first addin field", "Check addin field selection");
		
		PluginsApi.pluginMethod_SelectAddinField("25");
		assert.strictEqual(logicDocument.GetSelectedText(), "This is the first addin field", "Check addin field selection");
		
		PluginsApi.pluginMethod_SelectAddinField("3");
		assert.strictEqual(logicDocument.GetSelectedText(), "This is the second addin field", "Check addin field selection");
		
		logicDocument.RemoveFromContent(1, 1);
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields(),
			[
				{"FieldId" : "3", "Value" : "Addin №2", "Content" : "This is the second addin field"}
			],
			"Remove the paragraph with the first field and check get addin function");
		
		PluginsApi.pluginMethod_RemoveAddinField("3");
		assert.deepEqual(PluginsApi.pluginMethod_GetAllAddinFields(),
			[],
			"Remove the first add-in field");
		
	});

	QUnit.test("Test addin fields in header/footer", function (assert)
	{
		AscTest.ClearDocument();
		MoveToNewParagraph();

		let sectPr = logicDocument.GetFinalSectPr();
		let header = AscTest.CreateDefaultHeader(sectPr);
		header.Set_CurrentElement(false, 0);
		
		logicDocument.Set_DocumentDefaultTab(35.45);

		let addinFieldData = {"FieldId": "1", "Value": "Addin №1", "Content": "This is the first addin field"};
		PluginsApi.pluginMethod_AddAddinField(addinFieldData);

		logicDocument.RemoveSelection();
		logicDocument.Document_UpdateInterfaceState();

		let fields = PluginsApi.pluginMethod_GetAllAddinFields();
		assert.strictEqual(fields.length, 1, "Check one addin field in header");
		assert.strictEqual(fields[0].Value, "Addin №1", "Check Value");
		assert.strictEqual(fields[0].Content, "This is the first addin field", "Check Content from header field");
	});

	QUnit.test("Test RemoveFieldWrapper", function(assert)
	{
		AscTest.ClearDocument();
		MoveToNewParagraph();
		assert.strictEqual(logicDocument.GetAllFields().length, 0, "Check the number of all fields in the empty document");
		
		MoveToNewParagraph();
		logicDocument.AddFieldWithInstruction("PAGE");
		
		let p = MoveToNewParagraph();
		let field = logicDocument.AddFieldWithInstruction("PAGE");
		assert.strictEqual(logicDocument.GetAllFields().length, 2, "Add two PAGE fields and check count of all fields");
		
		logicDocument.UpdateFields(false);
		
		assert.strictEqual(AscTest.GetParagraphText(p), "1", "Check the text of the third paragraph");
		
		let fieldId = field.GetFieldId();
		PluginsApi.pluginMethod_RemoveFieldWrapper(fieldId);
		assert.strictEqual(logicDocument.GetAllFields().length, 1, "Remove field wrapper from second field and check number of fields");
		assert.strictEqual(AscTest.GetParagraphText(p), "1", "Check the text of the third paragraph");
	});
	
	QUnit.test("Test SetEditingRestrictions", function(assert)
	{
		AscTest.ClearDocument();
		MoveToNewParagraph();
		
		assert.strictEqual(logicDocument.CanEdit(), true, "Check if we can edit new document");
		
		PluginsApi.pluginMethod_SetEditingRestrictions("readOnly");
		assert.strictEqual(logicDocument.CanEdit(), false, "Set read only restriction and check if we can edit document");
		
		// Set to none to pass subsequent tests
		PluginsApi.pluginMethod_SetEditingRestrictions("none");
	});

	QUnit.test("XytSearch matches multiple paragraphs with alphabetic automatic numbering", function(assert)
	{
		AscTest.ClearDocument();
		logicDocument.RemoveFromContent(0, logicDocument.GetElementsCount(), false);

		function AddTextParagraph(text)
		{
			let paragraph = MoveToNewParagraph();
			let run = new AscWord.CRun();
			run.AddText(text);
			paragraph.AddToContentToEnd(run);
			return paragraph;
		}

		let firstText = "首笔款：总价的【20】 %，于本合同签订后【10】 个工作日内支付。";
		let secondText = "尾款：乙方交付全部产品并经甲方验收通过后的【20】个工作日内，甲方付清全部尾款。";
		let firstParagraph = AddTextParagraph(firstText);
		let secondParagraph = AddTextParagraph(secondText);
		let numberingManager = logicDocument.GetNumberingManager();
		let numberingInfo = AscWord.GetNumberingObjectByDeprecatedTypes(1, 6);
		let numbering = numberingManager.CreateNum();
		numberingInfo.FillNum(numbering);
		numberingManager.AddNum(numbering);
		firstParagraph.SetNumPr(numbering.GetId(), 0);
		secondParagraph.SetNumPr(numbering.GetId(), 0);
		logicDocument.Recalculate();

		assert.strictEqual(firstParagraph.GetNumberingText(false), "a.", "Check first automatic numbering text");
		assert.strictEqual(secondParagraph.GetNumberingText(false), "b.", "Check second automatic numbering text");

		let searchText = "a.首笔款：总价的【20】%，于本合同签订后【10】个工作日内支付。^p"
			+ "b.尾款：乙方交付全部产品并经甲方验收通过后的【20】个工作日内，甲方付清全部尾款。";
		let result = PluginsApi.pluginMethod_XytSearch({
			"searchVal" : searchText,
			"selectIndex" : 0,
			"matchCase" : true,
			"wholeWords" : true,
			"isNext" : true
		});

		assert.strictEqual(result["data"], true, "Find text after removing alphabetic numbering from every paragraph");
		assert.strictEqual(result["matchMode"], "visible-loose", "Use loose visible text for OCR whitespace differences");
		assert.strictEqual(result["ignoredNumbering"].length, 2, "Ignore both paragraph numbering prefixes");
		assert.strictEqual(result["ignoredNumbering"][0]["prefix"].trim(), "a.", "Ignore first alphabetic prefix");
		assert.strictEqual(result["ignoredNumbering"][1]["prefix"].trim(), "b.", "Ignore second alphabetic prefix");

		let mismatch = PluginsApi.pluginMethod_XytSearch({
			"searchVal" : searchText.replace("^pb.", "^pc."),
			"selectIndex" : 0,
			"matchCase" : true,
			"wholeWords" : true,
			"isNext" : true
		});
		assert.strictEqual(mismatch["data"], false, "Reject a stripped candidate when automatic numbering does not match");

		AscTest.ClearDocument();
		logicDocument.RemoveFromContent(0, logicDocument.GetElementsCount(), false);
		AddTextParagraph("a.普通正文中的字母和句点");
		logicDocument.Recalculate();
		let literal = PluginsApi.pluginMethod_XytSearch({
			"searchVal" : "a.普通正文中的字母和句点",
			"selectIndex" : 0,
			"matchCase" : true,
			"wholeWords" : true,
			"isNext" : true
		});
		assert.strictEqual(literal["data"], true, "Keep a literal alphabetic prefix searchable");
		assert.strictEqual(literal["ignoredNumbering"].length, 0, "Do not treat a literal prefix as automatic numbering");
	});

	QUnit.test("XytSearch scrolls after native result selection", function(assert)
	{
		AscTest.ClearDocument();
		logicDocument.RemoveFromContent(0, logicDocument.GetElementsCount(), false);

		function AddTextParagraph(text)
		{
			let paragraph = MoveToNewParagraph();
			let run = new AscWord.CRun();
			run.AddText(text);
			paragraph.AddToContentToEnd(run);
		}

		AddTextParagraph("精确定位目标");
		AddTextParagraph("password");
		logicDocument.Recalculate();

		let originalScrollToTarget = logicDocument.ScrollToTarget;
		let scrollCalls = 0;
		logicDocument.ScrollToTarget = function()
		{
			scrollCalls++;
		};
		try
		{
			let exact = PluginsApi.pluginMethod_XytSearch({
				"searchVal" : "精确定位目标",
				"matchCase" : true,
				"wholeWords" : true,
				"isNext" : true
			});
			assert.strictEqual(exact["matchMode"], "exact", "Use the native exact-search path");
			assert.strictEqual(scrollCalls, 1, "Scroll after an exact native result selection");

			let relaxed = PluginsApi.pluginMethod_XytSearch({
				"searchVal" : "word",
				"matchCase" : true,
				"wholeWords" : true,
				"isNext" : true
			});
			assert.strictEqual(relaxed["matchMode"], "whole-word-relaxed", "Use the native whole-word-relaxed path");
			assert.strictEqual(scrollCalls, 2, "Scroll after a whole-word-relaxed native result selection");
		}
		finally
		{
			logicDocument.ScrollToTarget = originalScrollToTarget;
		}
	});

	QUnit.test("XytSearch matches numbering prefixes from positioning fixture", function(assert)
	{
		AscTest.ClearDocument();
		logicDocument.RemoveFromContent(0, logicDocument.GetElementsCount(), false);

		function AddTextParagraph(text)
		{
			let paragraph = MoveToNewParagraph();
			let run = new AscWord.CRun();
			run.AddText(text);
			paragraph.AddToContentToEnd(run);
			return paragraph;
		}

		function CreateNumbering(format, formatText)
		{
			let numberingManager = logicDocument.GetNumberingManager();
			let numbering = numberingManager.CreateNum();
			let level = numbering.GetLvl(0).Copy();
			level.SetFormat(format);
			level.SetLvlTextFormat(0, formatText);
			numbering.SetLvl(level, 0);
			numberingManager.AddNum(numbering);
			return numbering;
		}

		let fixtureGroups = [
			{
				"format" : Asc.c_oAscNumberingFormat.DecimalEnclosedCircle,
				"formatText" : "%1",
				"lines" : [
					"①\t双方应在合同生效后五个工作日内成立联合项目组并确定项目经理、业务负责人、技术负责人和关键用户。",
					"②\t周例会形成会议纪要；涉及范围、工期、费用或责任变化的事项按附件四办理，甲方口头通知后即生效。"
				]
			},
			{
				"format" : Asc.c_oAscNumberingFormat.ChineseCounting,
				"formatText" : "【%1】",
				"lines" : [
					"【一】\t单元测试和集成测试由乙方组织，系统应当基本可用、性能较好、代码质量较高并达到甲方满意。",
					"【二】\t用户验收测试由甲方组织，乙方提供环境、数据模板、操作指导、缺陷修复和回归验证支持。"
				]
			},
			{
				"format" : Asc.c_oAscNumberingFormat.Decimal,
				"formatText" : "[%1]",
				"lines" : [
					"[1]\t终验材料包括验收报告、部署说明、接口文档、数据字典、运维手册、测试报告和培训材料。",
					"[2]\t轻微缺陷不影响终验的，可列入遗留事项，并由。"
				]
			},
			{
				"format" : Asc.c_oAscNumberingFormat.ChineseLegalSimplified,
				"formatText" : "（%1）",
				"lines" : [
					"（壹）\t乙方在本合同签订前已经拥有的软件产品、工具、框架和通用组件的权利仍归乙方所有。"
				]
			},
			{
				"format" : Asc.c_oAscNumberingFormat.Decimal,
				"formatText" : "No.%1",
				"lines" : [
					"No.1\t甲方的保密义务持续至乙方另行通知之日，乙方对甲方不承担保密期限限制。",
					"No.2\t甲方发生泄密时应承担责任，具体违约金、损失范围和赔偿标准由乙方事后决定。"
				]
			}
		];
		let fixtureItems = [];
		for (let groupIndex = 0; groupIndex < fixtureGroups.length; ++groupIndex)
		{
			let group = fixtureGroups[groupIndex];
			let numbering = CreateNumbering(group["format"], group["formatText"]);
			for (let lineIndex = 0; lineIndex < group["lines"].length; ++lineIndex)
			{
				let line = group["lines"][lineIndex];
				let separatorIndex = line.indexOf("\t");
				let prefix = line.substring(0, separatorIndex);
				let text = line.substring(separatorIndex + 1);
				let paragraph = AddTextParagraph(text);
				paragraph.SetNumPr(numbering.GetId(), 0);
				fixtureItems.push({"line" : line, "paragraph" : paragraph, "prefix" : prefix});
			}
		}
		logicDocument.Recalculate();

		for (let itemIndex = 0; itemIndex < fixtureItems.length; ++itemIndex)
		{
			let item = fixtureItems[itemIndex];
			assert.strictEqual(item["paragraph"].GetNumberingText(false), item["prefix"], "Create fixture numbering " + item["prefix"]);
			let result = PluginsApi.pluginMethod_XytSearch({
				"searchVal" : item["line"],
				"selectIndex" : 0,
				"matchCase" : true,
				"wholeWords" : true,
				"isNext" : true
			});
			assert.strictEqual(result["data"], true, "Find fixture text with prefix " + item["prefix"]);
			assert.strictEqual(result["matchMode"], "numbering-stripped", "Strip fixture prefix " + item["prefix"]);
			assert.strictEqual(result["ignoredNumbering"][0]["prefix"].trim(), item["prefix"], "Report ignored prefix " + item["prefix"]);
		}
	});

	QUnit.test("Test CurrenWord/CurrentSentence", function(assert)
	{
		AscTest.ClearDocument();
		let p = MoveToNewParagraph();
		AscTest.EnterText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
		
		AscTest.MoveCursorToParagraph(p, true);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "Lorem", "Check current word at the start of the paragraph");
		AscTest.MoveCursorRight(false, false, 6);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "ipsum", "Move cursor right(6) and check current word on the left edge of the word");
		AscTest.MoveCursorRight(false, false, 5);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "ipsum", "Move cursor right(5) and check current word on the right edge of the word");
		AscTest.MoveCursorToParagraph(p, false);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), ".", "Check current word at the end of the paragraph");
		AscTest.MoveCursorLeft(false, false, 1);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "laborum", "Move cursor left and check current word");
		
		AscTest.MoveCursorToParagraph(p, true);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(),
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			"Check current sentence at the start of the paragraph");
		
		AscTest.MoveCursorToParagraph(p, false);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(),
			"",
			"Check current sentence at the end of the paragraph");
		
		AscTest.MoveCursorLeft(false, false, 5);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(),
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			"Move cursor left(5) and check current sentence");
		
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 123);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(),
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"Move to the start of the second sentence and check it");
		
		AscTest.ClearDocument();
		p = MoveToNewParagraph();
		AscTest.EnterText("Test text");
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 2);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "Test", "Add new paragraph and check current word");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "Test text", "Check current sentence");
		
		logicDocument.AddFieldWithInstruction("PAGE");
		AscTest.Recalculate();
		AscTest.MoveCursorToParagraph(p, true);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentWord(), "Te", "Add hidden complex field in the middle of word 'Test' and check current word");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "Te1st text", "Check current sentence");
		
		
		AscTest.ClearDocument();
		p = MoveToNewParagraph();
		AscTest.EnterText("Test text");

		AscTest.MoveCursorToParagraph(p, true);
		PluginsApi.pluginMethod_ReplaceCurrentWord("First");
		assert.strictEqual(AscTest.GetParagraphText(p), "First text", "Replace current word at the start of the paragraph");
		
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 2);
		PluginsApi.pluginMethod_ReplaceCurrentWord("Second");
		assert.strictEqual(AscTest.GetParagraphText(p), "Second text", "Replace current word at the second position of the paragraph");
		
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 3);
		PluginsApi.pluginMethod_ReplaceCurrentWord("123", "afterCursor");
		assert.strictEqual(AscTest.GetParagraphText(p), "Sec123 text", "Replace the part of the word after cursor");
		
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 3);
		PluginsApi.pluginMethod_ReplaceCurrentWord("654", "beforeCursor");
		assert.strictEqual(AscTest.GetParagraphText(p), "654123 text", "Replace the part of the word before cursor");
		
		
		AscTest.ClearDocument();
		p = MoveToNewParagraph();
		AscTest.EnterText("The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly. Eat more of those fresh french loafs and drink a tea!");
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 16);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("entirely"), "The quick brown fox jumps over the lazy dog.", "Check current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("afterCursor"), "fox jumps over the lazy dog.", "Check the right part of the current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("beforeCursor"), "The quick brown ", "Check the left part of the current sentence");
		
		AscTest.MoveCursorRight(false, false, 28);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("entirely"), "The five boxing wizards jump quickly.", "Check current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("afterCursor"), "The five boxing wizards jump quickly.", "Check the right part of the current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("beforeCursor"), "", "Check the left part of the current sentence");
		
		AscTest.MoveCursorToParagraph(p, false);
		AscTest.MoveCursorLeft(false, false, 1);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("entirely"), "Eat more of those fresh french loafs and drink a tea!", "Check current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("afterCursor"), "!", "Check the right part of the current sentence");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence("beforeCursor"), "Eat more of those fresh french loafs and drink a tea", "Check the left part of the current sentence");
		
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 16);
		PluginsApi.pluginMethod_ReplaceCurrentSentence("The slow yellow rabbit jumps over the fluffy cat!", "entirely");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "The five boxing wizards jump quickly.", "Replace first sentence and check next sentence.");
		AscTest.MoveCursorLeft(false, false, 5);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "The slow yellow rabbit jumps over the fluffy cat!", "Check replaced sentence.");
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 58);
		PluginsApi.pluginMethod_ReplaceCurrentSentence("The eight", "beforeCursor");
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "The eight boxing wizards jump quickly.", "Replace left part of the sentence.");
		PluginsApi.pluginMethod_ReplaceCurrentSentence(" relaxing wizards jump slowly.", "afterCursor");
		AscTest.MoveCursorLeft(false, false, 5);
		assert.strictEqual(PluginsApi.pluginMethod_GetCurrentSentence(), "The eight relaxing wizards jump slowly.", "Replace right part of the sentence.");
		
		AscTest.ClearDocument();
		p = MoveToNewParagraph();
		AscTest.EnterText("The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly. Eat more of those fresh french loafs and drink a tea!");
		AscTest.MoveCursorToParagraph(p, true);
		AscTest.MoveCursorRight(false, false, 64);
		PluginsApi.pluginMethod_ReplaceCurrentSentence("The five boxing wizards jump quickly.", "entirely");
		assert.strictEqual(AscTest.GetParagraphText(p), "The quick brown fox jumps over the lazy dog. The five boxing wizards jump quickly. Eat more of those fresh french loafs and drink a tea!", "Replace sentence on itself and check all text");
		
		
	})
	
	
});
