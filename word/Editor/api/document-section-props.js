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

(function(window)
{
	/**
	 * @constructor
	 */
	function CDocumentSectionProps(oSectPr, oLogicDocument)
	{
		if (oSectPr && oLogicDocument)
		{
			this.W      = oSectPr.GetPageWidth();
			this.H      = oSectPr.GetPageHeight();
			this.Orient = oSectPr.GetOrientation();
			
			this.Left   = oSectPr.GetPageMarginLeft();
			this.Top    = oSectPr.GetPageMarginTop();
			this.Right  = oSectPr.GetPageMarginRight();
			this.Bottom = oSectPr.GetPageMarginBottom();
			
			this.Header = oSectPr.GetPageMarginHeader();
			this.Footer = oSectPr.GetPageMarginFooter();
			
			this.Gutter        = oSectPr.GetGutter();
			this.GutterRTL     = oSectPr.IsGutterRTL();
			this.GutterAtTop   = oLogicDocument.IsGutterAtTop();
			this.MirrorMargins = oLogicDocument.IsMirrorMargins();

			let docGrid       = oSectPr.GetDocGrid();
			this.DocGridType  = docGrid ? docGrid.Type : undefined;
			this.DocGridCharSpace = docGrid ? docGrid.CharSpace : undefined;
			this.DocGridLinePitch = docGrid ? docGrid.LinePitch : undefined;
			this.DocGridContentWidth = oSectPr.GetContentFrameWidth();
			this.DocGridContentHeight = oSectPr.GetContentFrameHeight();
			let defaultTextPr = oLogicDocument.GetStyles().Get_DefaultTextPr();
			this.DocGridDefaultFontSize = defaultTextPr && isFinite(defaultTextPr.FontSize) && defaultTextPr.FontSize > 0
				? defaultTextPr.FontSize
				: 11;
			this.DocGridApplyType = Asc.c_oAscDocGridApplyType.Current;
		}
		else
		{
			this.W      = undefined;
			this.H      = undefined;
			this.Orient = undefined;
			
			this.Left   = undefined;
			this.Top    = undefined;
			this.Right  = undefined;
			this.Bottom = undefined;
			
			this.Header = undefined;
			this.Footer = undefined;
			
			this.Gutter        = undefined;
			this.GutterRTL     = undefined;
			this.GutterAtTop   = undefined;
			this.MirrorMargins = undefined;
			this.DocGridType      = undefined;
			this.DocGridCharSpace = undefined;
			this.DocGridLinePitch = undefined;
			this.DocGridContentWidth = undefined;
			this.DocGridContentHeight = undefined;
			this.DocGridDefaultFontSize = 11;
			this.DocGridApplyType = undefined;
		}
	}
	CDocumentSectionProps.prototype.get_W = function()
	{
		return this.W;
	};
	CDocumentSectionProps.prototype.put_W = function(W)
	{
		this.W = W;
	};
	CDocumentSectionProps.prototype.get_H = function()
	{
		return this.H;
	};
	CDocumentSectionProps.prototype.put_H = function(H)
	{
		this.H = H;
	};
	CDocumentSectionProps.prototype.get_Orientation = function()
	{
		return this.Orient;
	};
	CDocumentSectionProps.prototype.put_Orientation = function(Orient)
	{
		this.Orient = Orient;
	};
	CDocumentSectionProps.prototype.get_LeftMargin = function()
	{
		return this.Left;
	};
	CDocumentSectionProps.prototype.put_LeftMargin = function(Left)
	{
		this.Left = Left;
	};
	CDocumentSectionProps.prototype.get_TopMargin = function()
	{
		return this.Top;
	};
	CDocumentSectionProps.prototype.put_TopMargin = function(Top)
	{
		this.Top = Top;
	};
	CDocumentSectionProps.prototype.get_RightMargin = function()
	{
		return this.Right;
	};
	CDocumentSectionProps.prototype.put_RightMargin = function(Right)
	{
		this.Right = Right;
	};
	CDocumentSectionProps.prototype.get_BottomMargin = function()
	{
		return this.Bottom;
	};
	CDocumentSectionProps.prototype.put_BottomMargin = function(Bottom)
	{
		this.Bottom = Bottom;
	};
	CDocumentSectionProps.prototype.get_HeaderDistance = function()
	{
		return this.Header;
	};
	CDocumentSectionProps.prototype.put_HeaderDistance = function(Header)
	{
		this.Header = Header;
	};
	CDocumentSectionProps.prototype.get_FooterDistance = function()
	{
		return this.Footer;
	};
	CDocumentSectionProps.prototype.put_FooterDistance = function(Footer)
	{
		this.Footer = Footer;
	};
	CDocumentSectionProps.prototype.get_Gutter = function()
	{
		return this.Gutter;
	};
	CDocumentSectionProps.prototype.put_Gutter = function(nGutter)
	{
		this.Gutter = nGutter;
	};
	CDocumentSectionProps.prototype.get_GutterRTL = function()
	{
		return this.GutterRTL;
	};
	CDocumentSectionProps.prototype.put_GutterRTL = function(isRTL)
	{
		this.GutterRTL = isRTL;
	};
	CDocumentSectionProps.prototype.get_GutterAtTop = function()
	{
		return this.GutterAtTop;
	};
	CDocumentSectionProps.prototype.put_GutterAtTop = function(isAtTop)
	{
		this.GutterAtTop = isAtTop;
	};
	CDocumentSectionProps.prototype.get_MirrorMargins = function()
	{
		return this.MirrorMargins;
	};
	CDocumentSectionProps.prototype.put_MirrorMargins = function(isMirrorMargins)
	{
		this.MirrorMargins = isMirrorMargins;
	};
	CDocumentSectionProps.prototype.get_DocGridType = function()
	{
		return this.DocGridType;
	};
	CDocumentSectionProps.prototype.put_DocGridType = function(type)
	{
		this.DocGridType = type;
	};
	CDocumentSectionProps.prototype.get_DocGridCharSpace = function()
	{
		return this.DocGridCharSpace;
	};
	CDocumentSectionProps.prototype.put_DocGridCharSpace = function(charSpace)
	{
		this.DocGridCharSpace = charSpace;
	};
	CDocumentSectionProps.prototype.get_DocGridLinePitch = function()
	{
		return this.DocGridLinePitch;
	};
	CDocumentSectionProps.prototype.put_DocGridLinePitch = function(linePitch)
	{
		this.DocGridLinePitch = linePitch;
	};
	CDocumentSectionProps.prototype.get_DocGridDefaultFontSize = function()
	{
		return this.DocGridDefaultFontSize;
	};
	CDocumentSectionProps.prototype.put_DocGridDefaultFontSize = function(fontSize)
	{
		if (undefined !== fontSize && null !== fontSize && isFinite(fontSize) && fontSize > 0)
			this.DocGridDefaultFontSize = fontSize;
	};
	CDocumentSectionProps.prototype.get_DocGridLinesPerPage = function()
	{
		let contentHeight = this.private_GetDocGridContentHeight();
		if (!this.DocGridLinePitch || !contentHeight)
			return undefined;

		return Math.max(1, Math.round(contentHeight / AscCommon.TwipsToMM(this.DocGridLinePitch)));
	};
	CDocumentSectionProps.prototype.put_DocGridLinesPerPage = function(count)
	{
		count = Math.round(count);
		if (!isFinite(count) || count < 1)
			return;

		let contentHeight = this.private_GetDocGridContentHeight();
		if (!contentHeight)
			return;

		this.DocGridLinePitch = Math.max(1, Math.round(AscCommon.MMToTwips(contentHeight / count)));
		if (Asc.c_oAscDocGridType.SnapToChars === this.DocGridType)
			this.DocGridType = Asc.c_oAscDocGridType.LinesAndChars;
		else if (Asc.c_oAscDocGridType.LinesAndChars !== this.DocGridType)
			this.DocGridType = Asc.c_oAscDocGridType.Lines;
	};
	CDocumentSectionProps.prototype.get_DocGridCharsPerLine = function()
	{
		let contentWidth = this.private_GetDocGridContentWidth();
		if (!contentWidth)
			return undefined;

		let pitchPt = this.DocGridDefaultFontSize + (this.DocGridCharSpace || 0) / 4096;
		if (pitchPt <= 0)
			return undefined;

		return Math.max(1, Math.round(contentWidth / (pitchPt * g_dKoef_pt_to_mm)));
	};
	CDocumentSectionProps.prototype.put_DocGridCharsPerLine = function(count)
	{
		count = Math.round(count);
		if (!isFinite(count) || count < 1)
			return;

		let contentWidth = this.private_GetDocGridContentWidth();
		if (!contentWidth)
			return;

		let pitchPt = contentWidth / count / g_dKoef_pt_to_mm;
		this.DocGridCharSpace = Math.round((pitchPt - this.DocGridDefaultFontSize) * 4096);
		if (Asc.c_oAscDocGridType.Lines === this.DocGridType)
			this.DocGridType = Asc.c_oAscDocGridType.LinesAndChars;
		else if (Asc.c_oAscDocGridType.LinesAndChars !== this.DocGridType)
			this.DocGridType = Asc.c_oAscDocGridType.SnapToChars;
	};
	CDocumentSectionProps.prototype.get_DocGridApplyType = function()
	{
		return this.DocGridApplyType;
	};
	CDocumentSectionProps.prototype.put_DocGridApplyType = function(type)
	{
		this.DocGridApplyType = type;
	};
	CDocumentSectionProps.prototype.private_GetDocGridContentWidth = function()
	{
		if (undefined === this.W || undefined === this.Left || undefined === this.Right)
			return this.DocGridContentWidth;

		let gutter = (!this.GutterAtTop && this.Gutter > 0 ? this.Gutter : 0);
		return Math.max(0, this.W - this.Left - this.Right - gutter);
	};
	CDocumentSectionProps.prototype.private_GetDocGridContentHeight = function()
	{
		if (undefined === this.H || undefined === this.Top || undefined === this.Bottom)
			return this.DocGridContentHeight;

		let gutter = (this.GutterAtTop && this.Gutter > 0 ? this.Gutter : 0);
		let top = this.Top < 0 ? -this.Top : this.Top;
		return Math.max(0, this.H - top - this.Bottom - gutter);
	};
	//--------------------------------------------------------export----------------------------------------------------
	window['Asc']['CDocumentSectionProps'] = window['Asc'].CDocumentSectionProps = CDocumentSectionProps;
	CDocumentSectionProps.prototype["get_W"]              = CDocumentSectionProps.prototype.get_W;
	CDocumentSectionProps.prototype["put_W"]              = CDocumentSectionProps.prototype.put_W;
	CDocumentSectionProps.prototype["get_H"]              = CDocumentSectionProps.prototype.get_H;
	CDocumentSectionProps.prototype["put_H"]              = CDocumentSectionProps.prototype.put_H;
	CDocumentSectionProps.prototype["get_Orientation"]    = CDocumentSectionProps.prototype.get_Orientation;
	CDocumentSectionProps.prototype["put_Orientation"]    = CDocumentSectionProps.prototype.put_Orientation;
	CDocumentSectionProps.prototype["get_LeftMargin"]     = CDocumentSectionProps.prototype.get_LeftMargin;
	CDocumentSectionProps.prototype["put_LeftMargin"]     = CDocumentSectionProps.prototype.put_LeftMargin;
	CDocumentSectionProps.prototype["get_TopMargin"]      = CDocumentSectionProps.prototype.get_TopMargin;
	CDocumentSectionProps.prototype["put_TopMargin"]      = CDocumentSectionProps.prototype.put_TopMargin;
	CDocumentSectionProps.prototype["get_RightMargin"]    = CDocumentSectionProps.prototype.get_RightMargin;
	CDocumentSectionProps.prototype["put_RightMargin"]    = CDocumentSectionProps.prototype.put_RightMargin;
	CDocumentSectionProps.prototype["get_BottomMargin"]   = CDocumentSectionProps.prototype.get_BottomMargin;
	CDocumentSectionProps.prototype["put_BottomMargin"]   = CDocumentSectionProps.prototype.put_BottomMargin;
	CDocumentSectionProps.prototype["get_HeaderDistance"] = CDocumentSectionProps.prototype.get_HeaderDistance;
	CDocumentSectionProps.prototype["put_HeaderDistance"] = CDocumentSectionProps.prototype.put_HeaderDistance;
	CDocumentSectionProps.prototype["get_FooterDistance"] = CDocumentSectionProps.prototype.get_FooterDistance;
	CDocumentSectionProps.prototype["put_FooterDistance"] = CDocumentSectionProps.prototype.put_FooterDistance;
	CDocumentSectionProps.prototype["get_Gutter"]         = CDocumentSectionProps.prototype.get_Gutter;
	CDocumentSectionProps.prototype["put_Gutter"]         = CDocumentSectionProps.prototype.put_Gutter;
	CDocumentSectionProps.prototype["get_GutterRTL"]      = CDocumentSectionProps.prototype.get_GutterRTL;
	CDocumentSectionProps.prototype["put_GutterRTL"]      = CDocumentSectionProps.prototype.put_GutterRTL;
	CDocumentSectionProps.prototype["get_GutterAtTop"]    = CDocumentSectionProps.prototype.get_GutterAtTop;
	CDocumentSectionProps.prototype["put_GutterAtTop"]    = CDocumentSectionProps.prototype.put_GutterAtTop;
	CDocumentSectionProps.prototype["get_MirrorMargins"]  = CDocumentSectionProps.prototype.get_MirrorMargins;
	CDocumentSectionProps.prototype["put_MirrorMargins"]  = CDocumentSectionProps.prototype.put_MirrorMargins;
	CDocumentSectionProps.prototype["get_DocGridType"]      = CDocumentSectionProps.prototype.get_DocGridType;
	CDocumentSectionProps.prototype["put_DocGridType"]      = CDocumentSectionProps.prototype.put_DocGridType;
	CDocumentSectionProps.prototype["get_DocGridCharSpace"] = CDocumentSectionProps.prototype.get_DocGridCharSpace;
	CDocumentSectionProps.prototype["put_DocGridCharSpace"] = CDocumentSectionProps.prototype.put_DocGridCharSpace;
	CDocumentSectionProps.prototype["get_DocGridLinePitch"] = CDocumentSectionProps.prototype.get_DocGridLinePitch;
	CDocumentSectionProps.prototype["put_DocGridLinePitch"] = CDocumentSectionProps.prototype.put_DocGridLinePitch;
	CDocumentSectionProps.prototype["get_DocGridDefaultFontSize"] = CDocumentSectionProps.prototype.get_DocGridDefaultFontSize;
	CDocumentSectionProps.prototype["put_DocGridDefaultFontSize"] = CDocumentSectionProps.prototype.put_DocGridDefaultFontSize;
	CDocumentSectionProps.prototype["get_DocGridLinesPerPage"] = CDocumentSectionProps.prototype.get_DocGridLinesPerPage;
	CDocumentSectionProps.prototype["put_DocGridLinesPerPage"] = CDocumentSectionProps.prototype.put_DocGridLinesPerPage;
	CDocumentSectionProps.prototype["get_DocGridCharsPerLine"] = CDocumentSectionProps.prototype.get_DocGridCharsPerLine;
	CDocumentSectionProps.prototype["put_DocGridCharsPerLine"] = CDocumentSectionProps.prototype.put_DocGridCharsPerLine;
	CDocumentSectionProps.prototype["get_DocGridApplyType"] = CDocumentSectionProps.prototype.get_DocGridApplyType;
	CDocumentSectionProps.prototype["put_DocGridApplyType"] = CDocumentSectionProps.prototype.put_DocGridApplyType;
	
	/**
	 * @constructor
	 */
	function SectionPageNumProps()
	{
		this.Start     = undefined;
		this.Format    = undefined;
		this.ChapStyle = undefined;
		this.ChapSep   = undefined;
	}
	SectionPageNumProps.prototype.get_Start = function()
	{
		return this.Start;
	};
	SectionPageNumProps.prototype.put_Start = function(v)
	{
		this.Start = v;
	};
	SectionPageNumProps.prototype.get_Format = function()
	{
		return this.Format;
	};
	SectionPageNumProps.prototype.put_Format = function(v)
	{
		this.Format = v;
	};
	SectionPageNumProps.prototype.get_ChapStyle = function()
	{
		return this.ChapStyle;
	};
	SectionPageNumProps.prototype.put_ChapStyle = function(v)
	{
		this.ChapStyle = v;
	};
	SectionPageNumProps.prototype.get_ChapSep = function()
	{
		return this.ChapSep;
	};
	SectionPageNumProps.prototype.put_ChapSep = function(v)
	{
		this.ChapSep = v;
	};
	//--------------------------------------------------------export----------------------------------------------------
	window['Asc']['SectionPageNumProps'] = window['Asc'].SectionPageNumProps = SectionPageNumProps;
	SectionPageNumProps.prototype["get_Start"]     = SectionPageNumProps.prototype.get_Start;
	SectionPageNumProps.prototype["put_Start"]     = SectionPageNumProps.prototype.put_Start;
	SectionPageNumProps.prototype["get_Format"]    = SectionPageNumProps.prototype.get_Format;
	SectionPageNumProps.prototype["put_Format"]    = SectionPageNumProps.prototype.put_Format;
	SectionPageNumProps.prototype["get_ChapStyle"] = SectionPageNumProps.prototype.get_ChapStyle;
	SectionPageNumProps.prototype["put_ChapStyle"] = SectionPageNumProps.prototype.put_ChapStyle;
	SectionPageNumProps.prototype["get_ChapSep"]   = SectionPageNumProps.prototype.get_ChapSep;
	SectionPageNumProps.prototype["put_ChapSep"]   = SectionPageNumProps.prototype.put_ChapSep;
})(window);
