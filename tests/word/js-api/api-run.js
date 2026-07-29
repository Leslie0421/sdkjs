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

$(function ()
{
	QUnit.module("ApiRun");

	function createApiRun()
	{
		return AscTest.JsApi.CreateRun();
	}
	
	QUnit.test('GetText/AddText', function (assert)
	{
		let run = createApiRun();
		
		assert.strictEqual(run.GetText(), "", "Check text for an empty run");
		run.AddText("1");
		run.AddTabStop();
		run.AddText("2");
		run.AddLineBreak();
		run.AddText("3");
		assert.strictEqual(run.GetText(), "1\t2\r3", "Check text");
		assert.strictEqual(run.GetText({
			"TabSymbol" : "_t_",
			"NewLineSeparator" : "_nl_",
		}), "1_t_2_nl_3", "Check text");
	});

	QUnit.test('SetColor, GetColor', function (assert) {
		const apiRun = createApiRun();

		const hexColor = AscTest.JsApi.HexColor('#bada55');
		const themeColor = AscTest.JsApi.ThemeColor('accent2');
		const autoColor = AscTest.JsApi.AutoColor();

		assert.strictEqual(apiRun.GetColor(), null, 'Color check for a newly created run');

		apiRun.SetColor(255, 127, 0);
		assert.equalRgb(apiRun.GetColor(), { r: 255, g: 127, b: 0 }, 'Color check after setting color with RGB components');

		apiRun.SetColor(hexColor);
		assert.equalRgba(apiRun.GetColor(), { r: 186, g: 218, b: 85, a: 255 }, 'Color check after setting color with ApiColor (hex)');

		apiRun.SetColor(themeColor);
		assert.strictEqual(apiRun.GetColor().IsThemeColor(), true, 'Color check after setting color with ApiColor (theme)');

		apiRun.SetColor(autoColor);
		assert.strictEqual(apiRun.GetColor().IsAutoColor(), true, 'Color check after setting color with ApiColor (auto)');
	});

	QUnit.test('SetShd, GetShd', function (assert) {
		const apiRun = createApiRun();

		const hexColor = AscTest.JsApi.HexColor('#bada55');
		const themeColor = AscTest.JsApi.ThemeColor('accent2');
		const autoColor = AscTest.JsApi.AutoColor();

		assert.strictEqual(apiRun.GetShd(), null, 'Shading (Shd) check for a newly created run');

		apiRun.SetShd('clear', 255, 127, 0);
		assert.equalRgb(apiRun.GetShd(), { r: 255, g: 127, b: 0 }, 'Shading check after setting shading with RGB components');

		apiRun.SetShd('clear', hexColor);
		assert.equalRgba(apiRun.GetShd(), { r: 186, g: 218, b: 85, a: 255 }, 'Shading check after setting shading with ApiColor (hex)');

		apiRun.SetShd('clear', themeColor);
		assert.strictEqual(apiRun.GetShd().IsThemeColor(), true, 'Shading check after setting shading with ApiColor (theme)');

		apiRun.SetShd('clear', autoColor);
		assert.strictEqual(apiRun.GetShd().IsAutoColor(), true, 'Shading check after setting shading with ApiColor (auto)');
	});

	QUnit.test('SetFontFamilies preserves unrelated OOXML font slots', function (assert) {
		const apiRun = createApiRun();
		const textPr = apiRun.GetTextPr();

		textPr.SetFontFamily('Arial');
		textPr.TextPr.RFonts.EastAsiaTheme = 'majorEastAsia';
		textPr.SetFontFamilies({ eastAsia: 'Times New Roman' });

		assert.strictEqual(textPr.GetFontFamily('ascii'), 'Arial', 'East Asian font does not replace ASCII font');
		assert.strictEqual(textPr.GetFontFamily('hAnsi'), 'Arial', 'East Asian font does not replace HAnsi font');
		assert.strictEqual(textPr.GetFontFamily('eastAsia'), 'Times New Roman', 'East Asian slot is updated');
		assert.strictEqual(textPr.GetFontFamily('cs'), 'Arial', 'East Asian font does not replace complex-script font');
		assert.strictEqual(textPr.TextPr.RFonts.EastAsiaTheme, undefined, 'Updating East Asian font clears its theme slot');

		textPr.TextPr.RFonts.Hint = 2;
		textPr.TextPr.RFonts.AsciiTheme = 'majorAscii';
		textPr.SetFontFamilies({ eastAsia: 'Times New Roman' });
		assert.strictEqual(textPr.TextPr.RFonts.AsciiTheme, 'majorAscii', 'Updating East Asian font preserves the ASCII theme slot');
		assert.strictEqual(textPr.TextPr.RFonts.Hint, 2, 'Updating a font slot preserves the font hint');

		textPr.SetFontFamilies({ ascii: 'Courier New', hAnsi: 'Courier New' });
		assert.strictEqual(textPr.GetFontFamily('ascii'), 'Courier New', 'ASCII slot is updated');
		assert.strictEqual(textPr.GetFontFamily('hAnsi'), 'Courier New', 'HAnsi slot is updated');
		assert.strictEqual(textPr.GetFontFamily('eastAsia'), 'Times New Roman', 'Western font does not replace East Asian font');
		assert.strictEqual(textPr.GetFontFamily('cs'), 'Arial', 'Western font does not replace complex-script font');
	});
});
