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

"use strict";

(function(window, undefined)
{
    /**
     * Base class.
     * @global
     * @class
     * @name this
     */

    /**
     * @typedef {Object} ContentControl
	 * Content control object.
     * @property {string} Tag - A tag assigned to the content control. The same tag can be assigned to several content controls so that it is possible to make reference to them in your code.
     * @property {string} Id - A unique identifier of the content control. It can be used to search for a certain content control and make reference to it in the code.
     * @property {ContentControlLock} Lock - A value that defines if it is possible to delete and/or edit the content control or not: 0 - only deleting, 1 - no deleting or editing, 2 - only editing, 3 - full access.
     * @property {string} InternalId - A unique internal identifier of the content control. It is used for all operations with content controls.
     * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControl.js
	 */

    /**
     * @typedef {(0 | 1 | 2 | 3)} ContentControlLock
     * A value that defines if it is possible to delete and/or edit the content control or not:
	 * <b>0</b> - only deleting
	 * <b>1</b> - disable deleting or editing
	 * <b>2</b> - only editing
	 * <b>3</b> - full access
     * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlLock.js
	 */

    /**
     * @typedef {(1 | 2 | 3 | 4)} ContentControlType
     * A numeric value that specifies the content control type:
	 * <b>1</b> - block content control
	 * <b>2</b> - inline content control
	 * <b>3</b> - row content control
	 * <b>4</b> - cell content control
     * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlType.js
	 */

    /**
     * @typedef {Object} ContentControlPropertiesAndContent
     * The content control properties and contents.
     * @property  {ContentControlProperties} [ContentControlProperties = {}] - The content control properties.
     * @property  {string} Script - A script that will be executed to generate the data within the content control (can be replaced with the *Url* parameter).
     * @property  {string} Url - A link to the shared file (can be replaced with the *Script* parameter).
     * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlPropertiesAndContent.js
	 */
	
	/**
	 * @typedef {Object} Color
	 * @property {number} Color.R - Red color component value.
	 * @property {number} Color.G - Green color component value.
	 * @property {number} Color.B - Blue color component value.
	 * @property {number} Color.A - Alpha color component value.
	 */
	
	/**
	 * @typedef {Object} ContentControlProperties
	 * The content control properties.
	 * @property {string} Id - A unique identifier of the content control. It can be used to search for a certain content control and make reference to it in the code.
	 * @property {string} Tag - A tag assigned to the content control. The same tag can be assigned to several content controls so that it is possible to make reference to them in the code.
	 * @property {ContentControlLock} Lock - A value that defines if it is possible to delete and/or edit the content control or not.
	 * @property {string} InternalId - A unique internal identifier of the content control.
	 * @property {string} Alias - The alias attribute.
	 * @property {string} PlaceHolderText - The content control placeholder text.
	 * @property {number} Appearance - Defines if the content control is shown as the bounding box (**1**) or not (**2**).
	 * @property {Color} Color - The color for the current content control in RGBA format.
	 * @property {Object} Shd - The background shading properties.
	 * @property {Color} Shd.Color - The shading color in RGBA format.
	 * @property {Object} Border - The border properties.
	 * @property {Color} Border.Color - The border color in RGBA format.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlProperties.js
	 */

	/**
	 * @typedef {('none' | 'comments' | 'forms' | 'readOnly')} DocumentEditingRestrictions
	 * The document editing restrictions:
	 * <b>none</b> - no editing restrictions,
	 * <b>comments</b> - allows editing comments,
	 * <b>forms</b> - allows editing form fields,
	 * <b>readOnly</b> - does not allow editing.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/DocumentEditingRestrictions.js
	 */
	
	/**
	 * @typedef {("entirely" | "beforeCursor" | "afterCursor")} TextPartType
	 * Specifies if the whole text or only its part will be returned or replaced:
	 * <b>entirely</b> - replaces/returns the whole text,
	 * <b>beforeCursor</b> - replaces/returns only the part of the text before the cursor,
	 * <b>afterCursor</b> - replaces/returns only the part of the text after the cursor.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/TextPartType.js
	 */

	/**
	 * The content control list element.
	 * @typedef {Object} ContentControlListElement
	 * @property {string} Display - The element display text.
	 * @property {string} Value - The element value.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlListElement.js
	 */
	
	/**
	 * @typedef {Object} TextAnnotation
	 * @property  {string} paragraphId  - ID of the paragraph containing the annotation.
	 * @property  {string} rangeId - ID of the annotation range.
	 * @property  {string} [name] -  Annotation type (e.g., `"grammar"`).
	 */
	
	/**
	 * @typedef {Object} TextAnnotationRange
	 * @property  {string} id  - Unique identifier for the range.
	 * @property  {number} start - Starting index of the text range.
	 * @property  {number} length - Length of the text range.
	 * @property  {string} [name] -  Annotation type (e.g., `"grammar"`).
	 */

    var Api = window["asc_docs_api"];

    /**
     * Opens a file with fields.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias OpenFile
     * @param {Uint8Array} binaryFile - A file in the format of the 8-bit unsigned integer array.
     * @param {string[]} fields - A list of field values.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/OpenFile.js
	 */
    Api.prototype["pluginMethod_OpenFile"] = function(binaryFile, fields)
    {
        this.asc_CloseFile();

        this.FontLoader.IsLoadDocumentFonts2 = true;
        this.OpenDocumentFromBin(this.DocumentUrl, binaryFile);

        if (fields)
            this.asc_SetBlockChainData(fields);

        this.restrictions = Asc.c_oAscRestrictionType.OnlyForms;
    };
    /**
     * Returns all fields as a text.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias GetFields
     * @returns {string[]} - A list of field values.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetFields.js
	 */
    Api.prototype["pluginMethod_GetFields"] = function()
    {
        return this.asc_GetBlockChainData();
    };
    /**
     * Inserts the content control containing data. The data is specified by the JS code for {@link /docbuilder/basic Document Builder}, or by a link to the shared document.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias InsertAndReplaceContentControls
     * @param {ContentControlPropertiesAndContent[]} arrDocuments - An array of properties and contents of the content control.
     * @return {ContentControlProperties[]} - An array of created content control properties.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/InsertAndReplaceContentControls.js
	 */
    Api.prototype["pluginMethod_InsertAndReplaceContentControls"] = function(arrDocuments)
    {
        var _worker = new AscCommon.CContentControlPluginWorker(this, arrDocuments);
        return _worker.start();
    };
    /**
     * Removes several content controls.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias RemoveContentControls
     * @param {ContentControl[]} arrDocuments - An array of content control internal IDs. Example: [{"InternalId": "5_556"}].
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveContentControls.js
	 */
    Api.prototype["pluginMethod_RemoveContentControls"] = function(arrDocuments)
    {
        var _worker = new AscCommon.CContentControlPluginWorker(this, arrDocuments);
        return _worker.delete();
    };
    /**
     * Returns information about all the content controls that have been added to the page.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias GetAllContentControls
     * @returns {ContentControl[]} - An array of content control objects.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetAllContentControls.js
	 */
    Api.prototype["pluginMethod_GetAllContentControls"] = function()
    {
        var _blocks = this.WordControl.m_oLogicDocument.GetAllContentControls();
        var _ret = [];
        var _obj = null;
        for (var i = 0; i < _blocks.length; i++)
        {
            _obj = _blocks[i].GetContentControlPr();
            _ret.push(_obj.GetEventObject());
        }
        return _ret;
    };

	/**
     * @typedef {Object} ContentControlParentPr
     * The content control parent properties.
     * @property  {object} Parent - The content control parent. For example, oParagraph.
     * @property  {number} Pos - The content control position within the parent object.
     * @property  {number} Count - A number of elements in the parent object.
     * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlParentPr.js
	 */

    /**
     * Removes the currently selected content control retaining all its contents. The content control where the mouse cursor is currently positioned will be removed.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias RemoveContentControl
     * @param {string} InternalId - A unique internal identifier of the content control.
     * @returns {ContentControlParentPr} - An object which contains the following values: Parent - content control parent, Pos - content control position within the parent object, Count - a number of elements in the parent object.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveContentControl.js
	 */
    Api.prototype["pluginMethod_RemoveContentControl"] = function(InternalId)
    {
        return this.asc_RemoveContentControlWrapper(InternalId);
    };
    /**
     * Returns an identifier of the selected content control (i.e. the content control where the mouse cursor is currently positioned).
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias GetCurrentContentControl
     * @returns {string} - The content control internal ID.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentContentControl.js
	 */
    Api.prototype["pluginMethod_GetCurrentContentControl"] = function()
    {
        return this.asc_GetCurrentContentControl();
    };
    /**
     * Returns the current content control properties.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias GetCurrentContentControlPr
	 * @param {string} contentFormat - The content format ("none", "text", "html", "ole" or "desktop").
     * @returns {ContentControlProperties} - The content control properties.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentContentControlPr.js
	 */
	Api.prototype["pluginMethod_GetCurrentContentControlPr"] = function(contentFormat)
	{
		var oLogicDocument = this.private_GetLogicDocument();

		var oState;
		var prop = this.asc_GetContentControlProperties();
		if (!prop)
			return null;

		if (oLogicDocument && prop.CC && contentFormat)
		{
			oState = oLogicDocument.SaveDocumentState();
			prop.CC.SelectContentControl();
		}

		var result = prop.GetEventObject();
		if (contentFormat)
		{
			var copy_data = {
				data     : "",
				pushData : function(format, value)
				{
					this.data = value;
				}
			};
			var copy_format = 1;
			if (contentFormat == Asc.EPluginDataType.html)
				copy_format = 2;
			this.asc_CheckCopy(copy_data, copy_format);
			result["content"] = copy_data.data;
		}

		if (oState && contentFormat)
		{
			oLogicDocument.LoadDocumentState(oState);
			oLogicDocument.UpdateSelection();
		}

		return result;
	};
    /**
     * Selects the specified content control.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias SelectContentControl
     * @param {string} id - A unique internal identifier of the content control.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SelectContentControl.js
	 */
    Api.prototype["pluginMethod_SelectContentControl"] = function(id)
    {
        var oLogicDocument = this.private_GetLogicDocument();
        if (!oLogicDocument)
            return;

        oLogicDocument.SelectContentControl(id);
    };
    /**
     * Moves a cursor to the specified content control.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias MoveCursorToContentControl
     * @param {string} id - A unique internal identifier of the content control.
     * @param {boolean} [isBegin = false] - Defines if the cursor position changes in the content control. By default, a cursor will be placed to the content control begin (**false**).
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/MoveCursorToContentControl.js
	 */
    Api.prototype["pluginMethod_MoveCursorToContentControl"] = function(id, isBegin)
    {
        var oLogicDocument = this.private_GetLogicDocument();
        if (!oLogicDocument)
            return;

        oLogicDocument.MoveCursorToContentControl(id, isBegin);
    };
    /**
     * Removes the selected content from the document.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias RemoveSelectedContent
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveSelectedContent.js
	 */
    Api.prototype["pluginMethod_RemoveSelectedContent"] = function()
    {
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument || !logicDocument.IsSelectionUse())
			return;
		
		this.executeGroupActions(function()
		{
			if (!logicDocument.IsSelectionLocked(AscCommon.changestype_Remove, null, true, logicDocument.IsFormFieldEditing()))
			{
				logicDocument.StartAction(AscDFH.historydescription_Document_BackSpaceButton);
				logicDocument.Remove(-1, true);
				logicDocument.FinalizeAction();
			}
		});
    };

	/**
	 * @typedef {Object} comment
	 * Comment object.
	 * @property {string} Id - The comment ID.
	 * @property {CommentData} Data - An object which contains the comment data.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/comment.js
	 */

	/**
	 * @typedef {Object} CommentData
	 * The comment data.
	 * @property {string} UserName - The comment author.
	 * @property {string} QuoteText - The quote comment text.
	 * @property {string} Text - The comment text.
	 * @property {string} Time - The time when the comment was posted (in milliseconds).
	 * @property {string} UserId - The user ID of the comment author.
	 * @property {boolean} Solved - Specifies if the comment is resolved (**true**) or not (**false**).
	 * @property {CommentData[]} Replies - An array containing the comment replies represented as the *CommentData* object.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/CommentData.js
	 */

	/**
	 * Adds a comment to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddComment
	 * @param {CommentData}  oCommentData - An object which contains the comment data.
	 * @return {string | null} - The comment ID in the string format or null if the comment cannot be added.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddComment.js
	 */
	Api.prototype["pluginMethod_AddComment"] = function(oCommentData)
	{
		var oCD = undefined;
		if (oCommentData)
		{
			oCD = new AscCommon.CCommentData();
			oCD.ReadFromSimpleObject(oCommentData);
		}

		return this.asc_addComment(new window['Asc'].asc_CCommentDataWord(oCD));
	};
    /**
     * Moves a cursor to the beginning of the current editing area (document body, footer/header, footnote, or autoshape).
	 * This method is similar to pressing the <b>Ctrl + Home</b> keyboard shortcut.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias MoveCursorToStart
     * @param {boolean} isMoveToMainContent - This flag ignores the current position and always moves a cursor to the beginning of the document body.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/MoveCursorToStart.js
	 */
    Api.prototype["pluginMethod_MoveCursorToStart"] = function(isMoveToMainContent)
    {
        var oLogicDocument = this.private_GetLogicDocument();
        if (oLogicDocument)
        {
            if (isMoveToMainContent)
                oLogicDocument.MoveCursorToStartOfDocument();
            else
                oLogicDocument.MoveCursorToStartPos(false);
        }
    };
    /**
     * Moves a cursor to the end of the current editing area (document body, footer/header, footnote, or autoshape).
	 * This method is similar to pressing the <b>Ctrl + End</b> keyboard shortcut.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias MoveCursorToEnd
     * @param {boolean} isMoveToMainContent - This flag ignores the current position and always moves a cursor to the end of the document body.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/MoveCursorToEnd.js
	 */
    Api.prototype["pluginMethod_MoveCursorToEnd"] = function(isMoveToMainContent)
    {
        var oLogicDocument = this.private_GetLogicDocument();
        if (oLogicDocument)
        {
            if (isMoveToMainContent)
                oLogicDocument.MoveCursorToStartOfDocument();

            oLogicDocument.MoveCursorToEndPos(false);
        }
    };
    /**
     * Finds and replaces the text.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias SearchAndReplace
     * @param {Object} oProperties - An object which contains the search and replacement strings.
     * @param {string} oProperties.searchString - The search string.
     * @param {string} oProperties.replaceString - The replacement string.
     * @param {boolean} [oProperties.matchCase=true] - Case sensitive or not.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SearchAndReplace.js
	 */
    Api.prototype["pluginMethod_SearchAndReplace"] = function(oProperties)
    {
        var sReplace    = oProperties["replaceString"];

        let oProps = new AscCommon.CSearchSettings();
        oProps.SetText(oProperties["searchString"]);
        oProps.SetMatchCase(undefined !== oProperties["matchCase"] ? oProperties.matchCase : true);

        var oSearchEngine = this.WordControl.m_oLogicDocument.Search(oProps);
        if (!oSearchEngine)
            return;

        this.WordControl.m_oLogicDocument.ReplaceSearchElement(sReplace, true, null, false);
    };
	/**
	 * Finds and selects the next occurrence of the text starting at the current position.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SearchNext
	 * @param {Object} oProperties - An object which contains the search string.
	 * @param {string} oProperties.searchString - The search string.
	 * @param {boolean} [oProperties.matchCase=true] - Case sensitive or not.
	 * @param {boolean} [isForward=true] - Search direction.
	 * @returns {boolean} returns false if text was not found
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SearchNext.js
	 */
	Api.prototype["pluginMethod_SearchNext"] = function(oProperties, isForward)
	{
		let logicDocument = this.WordControl.m_oLogicDocument;
		if (!logicDocument)
			return false;
		
		let searchProps = new AscCommon.CSearchSettings();
		searchProps.SetText(oProperties["searchString"]);
		searchProps.SetMatchCase(undefined !== oProperties["matchCase"] ? oProperties["matchCase"] : true);
		
		logicDocument.Search(searchProps);
		let elementId = logicDocument.GetSearchElementId(!(false === isForward || 0 === isForward));
		if (null === elementId)
			return false;
		
		logicDocument.SelectSearchElement(elementId);
		return true;
	};
    /**
     * Returns file content in the HTML format.
     * @memberof Api
     * @typeofeditors ["CDE"]
     * @alias GetFileHTML
     * @return {string} - The HTML file content in the string format.
     * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetFileHTML.js
	 */
    Api.prototype["pluginMethod_GetFileHTML"] = function()
    {
        return this.ContentToHTML(true);
    };
	/**
	 * Returns all the comments from the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetAllComments
	 * @returns {comment[]} - An array of comment objects containing the comment data.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetAllComments.js
	 */
	Api.prototype["pluginMethod_GetAllComments"] = function()
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		var arrResult = [];

		var oComments = oLogicDocument.Comments.GetAllComments();
		for (var sId in oComments)
		{
			var oComment = oComments[sId];
			arrResult.push({"Id" : oComment.GetId(), "Data" : oComment.GetData().ConvertToSimpleObject()});
		}

		return arrResult;
	};
	/**
	 * Removes the specified comments.
	 * @param {string[]} arrIds - An array which contains the IDs of the specified comments.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveComments
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveComments.js
	 */
	Api.prototype["pluginMethod_RemoveComments"] = function(arrIds)
	{
		this.asc_RemoveAllComments(false, false, arrIds);
	};
	/**
	 * Changes the specified comment.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias ChangeComment
	 * @param {string} sId - The comment ID.
	 * @param {CommentData} oCommentData - An object which contains the new comment data.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/ChangeComment.js
	 */
	Api.prototype["pluginMethod_ChangeComment"] = function(sId, oCommentData)
	{
		var oCD = undefined;
		if (oCommentData)
		{
			oCD = new AscCommon.CCommentData();
			oCD.ReadFromSimpleObject(oCommentData);

			var oLogicDocument = this.private_GetLogicDocument();
			if (oLogicDocument && AscCommonWord && AscCommonWord.CDocument && oLogicDocument instanceof AscCommonWord.CDocument)
			{
				var oComment = oLogicDocument.Comments.Get_ById(sId);
				if (oComment)
				{
					var sQuotedText = oComment.GetData().GetQuoteText();
					if (sQuotedText)
						oCD.SetQuoteText(sQuotedText);
				}
			}
		}

		this.asc_changeComment(sId, new window['Asc'].asc_CCommentDataWord(oCD));
	};
	/**
	 * Moves a cursor to the specified comment.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias MoveToComment
	 * @param {string} sId - The comment ID.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/MoveToComment.js
	 */
	Api.prototype["pluginMethod_MoveToComment"] = function(sId)
	{
		this.asc_selectComment(sId);
		this.asc_showComment(sId);
	};
	/**
	 * Sets the display mode for track changes.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SetDisplayModeInReview
	 * @param {string} [sMode="edit"] - The display mode:
	 * <b>edit</b> - all changes are displayed,
	 * <b>simple</b> - all changes are displayed but the balloons are turned off,
	 * <b>final</b> - all accepted changes are displayed,
	 * <b>original</b> - all rejected changes are displayed.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SetDisplayModeInReview.js
	 */
	Api.prototype["pluginMethod_SetDisplayModeInReview"] = function(sMode)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		if ("final" === sMode)
			oLogicDocument.SetDisplayModeInReview(Asc.c_oAscDisplayModeInReview.Final, true);
		else if ("original" === sMode)
			oLogicDocument.SetDisplayModeInReview(Asc.c_oAscDisplayModeInReview.Original, true);
		else if ("simple" === sMode)
			oLogicDocument.SetDisplayModeInReview(Asc.c_oAscDisplayModeInReview.Simple, true);
		else
			oLogicDocument.SetDisplayModeInReview(Asc.c_oAscDisplayModeInReview.Edit, true);
	};
	/**
	 * Adds an empty content control to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControl
	 * @param {ContentControlType} type - A numeric value that specifies the content control type. It can have one of the following values: <b>1</b> (block), <b>2</b> (inline), <b>3</b> (row), or <b>4</b> (cell).
	 * @param {ContentControlProperties}  [commonPr = {}] - The common content control properties.
	 * @returns {ContentControl} - A JSON object containing the data about the created content control.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddContentControl.js
	 */
	Api.prototype["pluginMethod_AddContentControl"] = function(type, commonPr)
	{
		var _content_control_pr = readContentControlCommonPr(new AscCommon.CContentControlPr(), commonPr);

		var _obj = this.asc_AddContentControl(type, _content_control_pr);
		if (!_obj)
			return undefined;
		return {"Tag" : _obj.Tag, "Id" : _obj.Id, "Lock" : _obj.Lock, "InternalId" : _obj.InternalId};
	};

	/**
	 * @typedef {Object} ContentControlCheckBoxProperties
	 * The content control checkbox properties.
	 * @property {boolean} Checked - Defines if the content control checkbox is checked or not.
	 * @property {number} CheckedSymbol - A symbol in the HTML code format that is used when the checkbox is checked.
	 * @property {number} UncheckedSymbol - A symbol in the HTML code format that is used when the checkbox is not checked.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlCheckBoxProperties.js
	 */

	/**
	 * Adds an empty content control checkbox to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlCheckBox
	 * @param {ContentControlCheckBoxProperties}  [checkBoxPr = {}] - The content control checkbox properties.
	 * @param {ContentControlProperties}  [commonPr = {}] - The common content control properties.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddContentControlCheckBox.js
	 */
	Api.prototype["pluginMethod_AddContentControlCheckBox"] = function(checkBoxPr, commonPr)
	{
		var oPr;
		if (checkBoxPr)
		{
			oPr = new AscWord.CSdtCheckBoxPr()
			if (checkBoxPr["Checked"])
				oPr.SetChecked(checkBoxPr["Checked"]);
			if (checkBoxPr["CheckedSymbol"])
				oPr.SetCheckedSymbol(checkBoxPr["CheckedSymbol"]);
			if (checkBoxPr["UncheckedSymbol"])
				oPr.SetUncheckedSymbol(checkBoxPr["UncheckedSymbol"]);
		}

		var _content_control_pr = private_ReadContentControlCommonPr(commonPr);

		this.asc_AddContentControlCheckBox(oPr, null, _content_control_pr);
	};

	/**
	 * Adds an empty content control picture to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlPicture
	 * @param {ContentControlProperties}  [commonPr = {}] - The common content control properties.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddContentControlPicture.js
	 */
	Api.prototype["pluginMethod_AddContentControlPicture"] = function(commonPr)
	{
		var _content_control_pr = private_ReadContentControlCommonPr(commonPr);

		this.asc_AddContentControlPicture(null, _content_control_pr);
	};
	/**
	 * Adds an empty content control list to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlList
	 * @param {ContentControlType} type - A numeric value that specifies the content control type. It can have one of the following values: <b>1</b> (combo box), <b>0</b> (dropdown list).
	 * @param {ContentControlListElement[]}  [List] - A list of the content control elements that consists of two items: <b>Display</b> - an item that will be displayed to the user in the content control list, <b>Value</b> - a value of each item from the content control list.
	 * @param {ContentControlProperties}  [commonPr = {}] - The common content control properties.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddContentControlList.js
	 */
	Api.prototype["pluginMethod_AddContentControlList"] = function(type, List, commonPr)
	{
		var oPr;
		if (List)
		{
			oPr = new AscWord.CSdtComboBoxPr();
			List.forEach(function(el) {
				oPr.AddItem(el["Display"], el["Value"]);
			});
		}

		var _content_control_pr = private_ReadContentControlCommonPr(commonPr);

		this.asc_AddContentControlList(type, oPr, null, _content_control_pr);
	};

	/**
	 * @typedef {Object} ContentControlDatePickerProperties
	 * The content control datepicker properties.
	 * @property {string} DateFormat - A format in which the date will be displayed.
	 * For example: *"MM/DD/YYYY", "dddd\,\ mmmm\ dd\,\ yyyy", "DD\ MMMM\ YYYY", "MMMM\ DD\,\ YYYY", "DD-MMM-YY", "MMMM\ YY", "MMM-YY", "MM/DD/YYYY\ hh:mm\ AM/PM", "MM/DD/YYYY\ hh:mm:ss\ AM/PM", "hh:mm", "hh:mm:ss", "hh:mm\ AM/PM", "hh:mm:ss:\ AM/PM"*.
	 * @property {object} Date - The current date and time.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/ContentControlDatePickerProperties.js
	 */

	/**
	 * Adds an empty content control datepicker to the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddContentControlDatePicker
	 * @param {ContentControlDatePickerProperties}  [datePickerPr = {}] - The content control datepicker properties.
	 * @param {ContentControlProperties}  [commonPr = {}] - The common content control properties.
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddContentControlDatePicker.js
	 */
	Api.prototype["pluginMethod_AddContentControlDatePicker"] = function(datePickerPr, commonPr)
	{
		var oPr;
		if (datePickerPr)
		{
			oPr = new AscWord.CSdtDatePickerPr();
			if (datePickerPr["Date"])
				oPr.SetFullDate(datePickerPr["Date"]);
			if (datePickerPr["DateFormat"])
				oPr.SetDateFormat(datePickerPr["DateFormat"]);
		}

		var _content_control_pr = private_ReadContentControlCommonPr(commonPr);

		this.asc_AddContentControlDatePicker(oPr, _content_control_pr);
	};


	/**
	 * @typedef {Object} OLEObjectData
	 * The OLE object data.
	 * @property {string} Data - OLE object data (internal format).
	 * @property {string} ImageData - An image in the base64 format stored in the OLE object and used by the plugin.
	 * @property {string} ApplicationId - An identifier of the plugin which can edit the current OLE object and must be of the *asc.{UUID}* type.
	 * @property {string} InternalId - The OLE object identifier which is used to work with OLE object added to the document.
	 * @property {string} ParaDrawingId - An identifier of the drawing object containing the current OLE object.
	 * @property {number} Width - The OLE object width measured in millimeters.
	 * @property {number} Height - The OLE object height measured in millimeters.
	 * @property {?number} WidthPix - The OLE object image width in pixels.
	 * @property {?number} HeightPix - The OLE object image height in pixels.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/OLEObjectData.js
	 */
	
	/**
	 * @typedef {Object} AddinFieldData
	 * The addin field data.
	 * @property {string} FieldId - Field identifier.
	 * @property {string} Value - Field value.
	 * @property {string} Content - Field text content.
	 * @see office-js-api/Examples/Plugins/{Editor}/Enumeration/AddinFieldData.js
	 */

	/**
	 * Returns all OLE object data for objects which can be opened by the specified plugin.
	 * If *sPluginId* is not defined, this method returns all OLE objects contained in the currrent document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetAllOleObjects
	 * @param {?string} sPluginId - Plugin identifier. It must be of the *asc.{UUID}* type.
	 * @returns {OLEObjectData[]} - An array of the OLEObjectData objects containing the data about the OLE object parameters.
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetAllOleObjects.js
	 */
	Api.prototype["pluginMethod_GetAllOleObjects"] = function (sPluginId)
	{
		let aDataObjects = [];
		let oLogicDocument = this.private_GetLogicDocument();
		if(!oLogicDocument)
			return aDataObjects;
		let aOleObjects = oLogicDocument.GetAllOleObjects(sPluginId, []);
		for(let nObj = 0; nObj < aOleObjects.length; ++nObj)
		{
			aDataObjects.push(aOleObjects[nObj].getDataObject());
		}
		return aDataObjects;
	};

	/**
	 * Removes the OLE object from the document by its internal ID.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveOleObject
	 * @param {string} sInternalId - The OLE object identifier which is used to work with OLE object added to the document.
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveOleObject.js
	 */
	Api.prototype["pluginMethod_RemoveOleObject"] = function (sInternalId)
	{
		let oLogicDocument = this.private_GetLogicDocument();
		if(!oLogicDocument)
		{
			return;
		}
		oLogicDocument.RemoveDrawingObjectById(sInternalId);
	};

	/**
	 * Removes several OLE objects from the document by their internal IDs.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveOleObjects
	 * @param {OLEObjectData[]} arrObjects An array of the identifiers which are used to work with OLE objects added to the document. Example: [{"InternalId": "5_556"}].
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveOleObjects.js
	 */
	Api.prototype["pluginMethod_RemoveOleObjects"] = function (arrObjects)
	{
		let oLogicDocument = this.private_GetLogicDocument();
		if(!oLogicDocument)
		{
			return;
		}
		var arrIds = [];
		for(var nIdx = 0; nIdx < arrObjects.length; ++nIdx)
		{
			let oOleObject = arrObjects[nIdx];
			arrIds.push(oOleObject["InternalId"]);
		}
		oLogicDocument.RemoveDrawingObjects(arrIds);
	};

	/**
	 * Selects the specified OLE object.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SelectOleObject
	 * @param {string} id - The OLE object identifier which is used to work with OLE object added to the document.
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SelectOleObject.js
	 */
	Api.prototype["pluginMethod_SelectOleObject"] = function(id)
	{
		var oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;

		var oDrawing = AscCommon.g_oTableId.Get_ById(id);
		if(!oDrawing)
		{
			return;
		}
		oDrawing.Set_CurrentElement(true, null);
	};

	/**
	 * Inserts the OLE object at the current document position.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias InsertOleObject
	 * @param {OLEObjectData} NewObject - The OLEObjectData object.
	 * @param {?boolean} bSelect - Defines if the OLE object will be selected after inserting into the document (**true**) or not (**false**).
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/InsertOleObject.js
	 */
	Api.prototype["pluginMethod_InsertOleObject"] = function(NewObject, bSelect)
	{
		var oPluginData = {};
		oPluginData["imgSrc"] = NewObject["ImageData"];
		oPluginData["widthPix"] = NewObject["WidthPix"];
		oPluginData["heightPix"] = NewObject["HeightPix"];
		oPluginData["width"] = NewObject["Width"];
		oPluginData["height"] = NewObject["Height"];
		oPluginData["data"] = NewObject["Data"];
		oPluginData["guid"] = NewObject["ApplicationId"];
		oPluginData["select"] = bSelect;
		this.asc_addOleObject(oPluginData, true);
	};


	/**
	 * Changes the OLE object with the *InternalId* specified in OLE object data.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias ChangeOleObject
	 * @param {OLEObjectData} ObjectData - The OLEObjectData object.
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/ChangeOleObject.js
	 */
	Api.prototype["pluginMethod_ChangeOleObject"] = function(ObjectData)
	{
		this["pluginMethod_ChangeOleObjects"]([ObjectData]);
	};
	/**
	 * Changes multiple OLE objects with the *InternalIds* specified in OLE object data.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias ChangeOleObjects
	 * @param {OLEObjectData[]} arrObjectData - An array of OLE object data.
	 * @since 7.1.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/ChangeOleObjects.js
	 */
	Api.prototype["pluginMethod_ChangeOleObjects"] = function(arrObjectData)
	{
		let oLogicDocument = this.private_GetLogicDocument();
		if (!oLogicDocument)
			return;
		let oParaDrawing;
		let oParaDrawingsMap = {};
		let nDrawing;
		let oDrawing;
		let oMainGroup;
		let aDrawings = [];
		let aParaDrawings = [];
		let oDataMap = {};
		let oData;
		for (nDrawing = 0; nDrawing < arrObjectData.length; ++nDrawing)
		{
			oData = arrObjectData[nDrawing];
			oDrawing = AscCommon.g_oTableId.Get_ById(oData["InternalId"]);
			oDataMap[oData["InternalId"]] = oData;
			if (oDrawing
				&& oDrawing.getObjectType
				&& oDrawing.getObjectType() === AscDFH.historyitem_type_OleObject
				&& oDrawing.IsUseInDocument())
			{
				aDrawings.push(oDrawing);
			}
		}
		for (nDrawing = 0; nDrawing < aDrawings.length; ++nDrawing)
		{
			oDrawing = aDrawings[nDrawing];
			if (oDrawing.group)
			{
				oMainGroup = oDrawing.getMainGroup();
				if (oMainGroup && oMainGroup.parent)
					oParaDrawingsMap[oMainGroup.parent.Id] = oMainGroup.parent;
			}
			else if (oDrawing.parent)
			{
				oParaDrawingsMap[oDrawing.parent.Id] = oDrawing.parent;
			}
		}
		for(let sId in oParaDrawingsMap)
		{
			if(oParaDrawingsMap.hasOwnProperty(sId))
			{
				oParaDrawing = oParaDrawingsMap[sId];
				aParaDrawings.push(oParaDrawing);
			}
		}
		if(aParaDrawings.length > 0)
		{
			let oStartState = oLogicDocument.SaveDocumentState();
			oLogicDocument.Start_SilentMode();
			oLogicDocument.SelectDrawings(aParaDrawings, oLogicDocument);
			if (!oLogicDocument.IsSelectionLocked(AscCommon.changestype_Drawing_Props))
			{
				oLogicDocument.StartAction()
				let oImagesMap = {};
				for(nDrawing = 0; nDrawing < aDrawings.length; ++nDrawing)
				{
					oDrawing = aDrawings[nDrawing];
					oData = oDataMap[oDrawing.Id];
					oDrawing.editExternal(oData["Data"], oData["ImageData"], oData["Width"], oData["Height"], oData["WidthPix"], oData["HeightPix"]);
					oImagesMap[oData["ImageData"]] = oData["ImageData"];
				}

				window.g_asc_plugins && window.g_asc_plugins.setPluginMethodReturnAsync();
				AscCommon.Check_LoadingDataBeforePrepaste(this, {}, oImagesMap, function() {
					oLogicDocument.Reassign_ImageUrls(oImagesMap);
					oLogicDocument.Recalculate();
					oLogicDocument.End_SilentMode();
					oLogicDocument.LoadDocumentState(oStartState);
					oLogicDocument.UpdateSelection();
					oLogicDocument.FinalizeAction();

					window.g_asc_plugins && window.g_asc_plugins.onPluginMethodReturn();
				});
			}
			else
			{
				oLogicDocument.End_SilentMode();
				oLogicDocument.LoadDocumentState(oStartState);
				oLogicDocument.UpdateSelection();
			}

		}
	};
	/**
	 * Accepts review changes.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AcceptReviewChanges
	 * @param {boolean} [isAll=false] Specifies if all changes will be accepted (**true**) or only changes from the current selection (**false**).
	 * @since 7.2.1
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AcceptReviewChanges.js
	 */
	Api.prototype["pluginMethod_AcceptReviewChanges"] = function(isAll)
	{
		if (isAll)
			this.asc_AcceptAllChanges();
		else
			this.asc_AcceptChangesBySelection(false);
	};
	/**
	 * Rejects review changes.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RejectReviewChanges
	 * @param {boolean} [isAll=false] Specifies if all changes will be rejected (**true**) or only changes from the current selection (**false**).
	 * @since 7.2.1
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RejectReviewChanges.js
	 */
	Api.prototype["pluginMethod_RejectReviewChanges"] = function(isAll)
	{
		if (isAll)
			this.asc_RejectAllChanges();
		else
			this.asc_RejectChangesBySelection(false);
	};
	/**
	 * Navigates through the review changes.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias MoveToNextReviewChange
	 * @param {boolean} [isForward=true] Specifies whether to navigate to the next (**true**) or previous (**false**) review change.
	 * @since 7.2.1
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/MoveToNextReviewChange.js
	 */
	Api.prototype["pluginMethod_MoveToNextReviewChange"] = function(isForward)
	{
		if (undefined !== isForward && !isForward)
			this.asc_GetPrevRevisionsChange();
		else
			this.asc_GetNextRevisionsChange();
	};
	/**
	 * Returns all addin fields from the current document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetAllAddinFields
	 * @returns {AddinFieldData[]} - An array of the AddinFieldData objects containing the data about the addin fields.
	 * @since 7.3.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetAllAddinFields.js
	 */
	Api.prototype["pluginMethod_GetAllAddinFields"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return [];
		
		let result = [];
		let fields = logicDocument.GetAllAddinFields();
		fields.forEach(function(field)
		{
			let fieldData = AscWord.CAddinFieldData.FromField(field);
			if (fieldData)
				result.push(fieldData.ToJson());
		});
		
		return result;
	};
	/**
	 * Returns the current addin field from the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetCurrentAddinField
	 * @returns {?AddinFieldData} - An AddinFieldData object containing the data about the current addin field, or null if no addin field is found.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentAddinField.js
	 */
	Api.prototype["pluginMethod_GetCurrentAddinField"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;
		
		let fields = logicDocument.GetCurrentComplexFields();
		let data = null;
		for (let i = 0; i < fields.length; ++i)
		{
			let field = fields[i];
			if ((field instanceof AscWord.CComplexField) && field.IsAddin())
			{
				data = AscWord.CAddinFieldData.FromField(field).ToJson();
				break;
			}
		}
		
		return data;
	};
	/**
	 * Updates the addin fields with the specified data.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias UpdateAddinFields
	 * @param {AddinFieldData[]} arrData - An array of addin field data.
	 * @since 7.3.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/UpdateAddinFields.js
	 */
	Api.prototype["pluginMethod_UpdateAddinFields"] = function(arrData)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument || !Array.isArray(arrData))
			return;
		
		let arrAddinData = [];
		arrData.forEach(function(data)
		{
			arrAddinData.push(AscWord.CAddinFieldData.FromJson(data));
		})
		
		logicDocument.UpdateAddinFieldsByData(arrAddinData);
	};
	/**
	 * Creates a new addin field with the data specified in the request.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AddAddinField
	 * @param {AddinFieldData} data - Addin field data.
	 * @since 7.3.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AddAddinField.js
	 */
	Api.prototype["pluginMethod_AddAddinField"] = function(data)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return;
		
		logicDocument.AddAddinField(AscWord.CAddinFieldData.FromJson(data));
	};
	/**
	 * Selects the specified add-in field.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SelectAddinField
	 * @param {string} fieldId - Field identifier.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SelectAddinField.js
	 */
	Api.prototype["pluginMethod_SelectAddinField"] = function(fieldId)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;
		
		return logicDocument.SelectAddinField(fieldId);
	};
	/**
	 * Removes the specified add-in field.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveAddinField
	 * @param {string} fieldId - Field identifier.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/pluginMethod_RemoveAddinField.js
	 */
	Api.prototype["pluginMethod_RemoveAddinField"] = function(fieldId)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;
		
		if (!logicDocument.SelectAddinField(fieldId))
			return false;
		
		logicDocument.RemoveBeforePaste();
		return true;
	};
	/**
	 * Removes a field wrapper, leaving only the field content.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveFieldWrapper
	 * @param {string} [fieldId=undefined] - Field ID. If it is not specified, then the wrapper of the current field is removed.
	 * @since 7.3.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveFieldWrapper.js
	 */
	Api.prototype["pluginMethod_RemoveFieldWrapper"] = function(fieldId)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return;
		
		logicDocument.RemoveComplexFieldWrapper(fieldId);
	};
	/**
	 * Sets the document editing restrictions.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SetEditingRestrictions
	 * @param {DocumentEditingRestrictions} restrictions - The document editing restrictions.
	 * @since 7.3.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SetEditingRestrictions.js
	 */
	Api.prototype["pluginMethod_SetEditingRestrictions"] = function(restrictions)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return;
		
		let _restrictions = null;
		switch (restrictions)
		{
			case "comments": _restrictions = Asc.c_oAscRestrictionType.OnlyComments; break;
			case "forms": _restrictions = Asc.c_oAscRestrictionType.OnlyForms; break;
			case "readOnly": _restrictions = Asc.c_oAscRestrictionType.View; break;
			case "none": _restrictions = Asc.c_oAscRestrictionType.None; break;
		}
		
		if (null === _restrictions)
			return;
		
		this.asc_setRestriction(_restrictions);
	};
	/**
	 * Returns the current word.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetCurrentWord
	 * @param {TextPartType} [type="entirely"] - Specifies if the whole word or only its part will be returned.
	 * @returns {string} - A word or its part.
	 * @since 7.4.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentWord.js
	 */
	Api.prototype["pluginMethod_GetCurrentWord"] = function(type)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return "";
		
		return logicDocument.GetCurrentWord(private_GetTextDirection(type));
	};
	/**
	 * Replaces the current word with the specified string.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias ReplaceCurrentWord
	 * @param {string} replaceString - Replacement string.
	 * @param {TextPartType} [type="entirely"] - Specifies if the whole word or only its part will be replaced.
	 * @since 7.4.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/ReplaceCurrentWord.js
	 */
	Api.prototype["pluginMethod_ReplaceCurrentWord"] = function(replaceString, type)
	{
		let _replaceString = "" === replaceString ? "" : AscBuilder.GetStringParameter(replaceString, null);

		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument || null === _replaceString)
			return;
		
		logicDocument.ReplaceCurrentWord(private_GetTextDirection(type), _replaceString);
	};
	/**
	 * Returns the current sentence.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetCurrentSentence
	 * @param {TextPartType} [type="entirely"] - Specifies if the whole sentence or only its part will be returned.
	 * @returns {string} - A sentence or its part.
	 * @since 7.4.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentSentence.js
	 */
	Api.prototype["pluginMethod_GetCurrentSentence"] = function(type)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return "";
		
		return logicDocument.GetCurrentSentence(private_GetTextDirection(type));
	};
	/**
	 * Replaces the current sentence with the specified string.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias ReplaceCurrentSentence
	 * @param {string} replaceString - Replacement string.
	 * @param {TextPartType} [type="entirely"] - Specifies if the whole sentence or only its part will be replaced.
	 * @since 7.4.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/ReplaceCurrentSentence.js
	 */
	Api.prototype["pluginMethod_ReplaceCurrentSentence"] = function(replaceString, type)
	{
		let _replaceString = "" === replaceString ? "" : AscBuilder.GetStringParameter(replaceString, null);
		
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument || null === _replaceString)
			return;

		
		return logicDocument.ReplaceCurrentSentence(private_GetTextDirection(type), _replaceString);
	};
	/**
	 * Undoes the user's last action.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias Undo
	 * @since 8.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/Undo.js
	 */
	Api.prototype["pluginMethod_Undo"] = function()
	{
		this.Undo();
	};
	/**
	 * Reverts the user's last undone action.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias Redo
	 * @since 8.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/Redo.js
	 */
	Api.prototype["pluginMethod_Redo"] = function()
	{
		this.Redo();
	};
	/**
	 * Checks if it is possible to undo the user's last action.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias CanUndo
	 * @returns {boolean}
	 * @since 8.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/CanUndo.js
	 */
	Api.prototype["pluginMethod_CanUndo"] = function()
	{
		return this.asc_getCanUndo();
	};
	/**
	 * Checks if it possible to revert the user's last undone action.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias CanRedo
	 * @returns {boolean}
	 * @since 8.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/CanRedo.js
	 */
	Api.prototype["pluginMethod_CanRedo"] = function()
	{
		return this.asc_getCanRedo();
	};
	/**
	 * Returns the current bookmark.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias GetCurrentBookmark
	 * @returns {string | null} - The current bookmarks name or null.
	 * @since 9.0.3
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/GetCurrentBookmark.js
	 */
	Api.prototype["pluginMethod_GetCurrentBookmark"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;
		
		let bookmarks = logicDocument.GetBookmarksManager();
		let para = logicDocument.GetCurrentParagraph();
		let topDocument = para ? para.GetTopDocumentContent() : null;
		let docPos = topDocument && topDocument.GetContentPosition ? topDocument.GetContentPosition(false) : null;
		return bookmarks.GetBookmarkByDocPos(docPos);
	};
	/**
	 * Adds annotations to the specified paragraph.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias AnnotateParagraph
	 * @param {Object} data - Annotation data specifying what to annotate.
	 * @param {string} data.type - The type of annotation operation (e.g., `"highlightText"`).
	 * @param {string} [data.name] - Optional name of the annotation.
	 * @param {string} data.paragraphId - ID of the paragraph being annotated.
	 * @param {string} data.recalcId - Paragraph recalculation ID.
	 * @param {Array<TextAnnotationRange>} [data.ranges] - Array of text ranges to highlight (for highlightText type)
	 * @since 9.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/AnnotateParagraph.js
	 */
	Api.prototype["pluginMethod_AnnotateParagraph"] = function(data)
	{
		if (!data)
			return;
		
		data["guid"] = window.g_asc_plugins.getCurrentPluginGuid();
		this.getTextAnnotatorEventManager().onResponse(data);
	};
	/**
	 * Selects text in a document using a given annotation.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias SelectAnnotationRange
	 * @param {TextAnnotation} annotation - The annotation selection object.
	 * @since 9.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/SelectAnnotationRange.js
	 */
	Api.prototype["pluginMethod_SelectAnnotationRange"] = function(annotation)
	{
		if (!annotation)
			return;
		
		annotation["guid"] = window.g_asc_plugins.getCurrentPluginGuid();
		this.getTextAnnotatorEventManager().selectRange(annotation);
	};
	/**
	 * Remove a specific annotation range from the document.
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias RemoveAnnotationRange
	 * @param {TextAnnotation} annotation - The annotation removing object.
	 * @param {boolean} [annotation.all=false] - Optional parameter, flag to remove all annotations for the current paragraph.
	 * @since 9.2.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/RemoveAnnotationRange.js
	 */
	Api.prototype["pluginMethod_RemoveAnnotationRange"] = function(annotation)
	{
		if (!annotation)
			return;
		
		annotation["guid"] = window.g_asc_plugins.getCurrentPluginGuid();
		this.getTextAnnotatorEventManager().removeRange(annotation);
	};

	//------------------------------------------------------------------------------------------------------------------
	// Custom methods used by @xyt/office-plugins.
	// Since 9.4 callCommand exposes the Builder API instead of asc_docs_api, legacy editor API calls must be routed
	// through executeMethod. Keep the legacy behavior here so the connector package does not lose functionality.
	//------------------------------------------------------------------------------------------------------------------
	Api.prototype["pluginMethod_XytSearch"] = function(params)
	{
		params = params || {};
		let searchVal = params["searchVal"];
		if (!searchVal)
			return -1;

		try
		{
			let searchSettings = new AscCommon.CSearchSettings();
			searchSettings.put_Text(searchVal);
			searchSettings.put_MatchCase(undefined === params["matchCase"] ? true : params["matchCase"]);
			searchSettings.put_WholeWords(undefined === params["wholeWords"] ? true : params["wholeWords"]);

			let isNext = undefined === params["isNext"] ? true : params["isNext"];
			let selectIndex = undefined === params["selectIndex"] ? 0 : params["selectIndex"];
			let length = this.asc_findText(searchSettings, isNext) || -1;
			if (length > 1)
				this.asc_FindRepeatText(selectIndex);

			return length;
		}
		catch (oError)
		{
			// executeMethod does not invoke the connector callback when a plugin
			// method throws. Always settle XytSearch so one failed lookup cannot leave
			// the office-plugin Promise pending and block every later search.
			console.error("XytSearch failed", oError);
			let oLogicDocument = this.private_GetLogicDocument();
			if (oLogicDocument && oLogicDocument.ClearSearch)
				oLogicDocument.ClearSearch();
			return -1;
		}
	};

	Api.prototype["pluginMethod_XytSearchAndReplace"] = function(params)
	{
		params = params || {};
		let searchVal = params["searchVal"];
		if (!searchVal)
		{
			console.warn("请传入 searchVal！");
			return;
		}

		let searchSettings = new AscCommon.CSearchSettings();
		searchSettings.put_Text(searchVal);
		searchSettings.put_MatchCase(undefined === params["matchCase"] ? true : params["matchCase"]);
		searchSettings.put_WholeWords(undefined === params["wholeWords"] ? true : params["wholeWords"]);

		let replaceVal = undefined === params["replaceVal"] ? "" : params["replaceVal"];
		let isReplaceAll = true === params["isReplaceAll"];
		if (isReplaceAll)
		{
			this.asc_replaceText(searchSettings, replaceVal, true);
			return;
		}

		let isNext = undefined === params["isNext"] ? false : params["isNext"];
		let selectIndex = undefined === params["selectIndex"] ? 0 : params["selectIndex"];
		let length = this.asc_findText(searchSettings, isNext) || -1;
		if (length)
			this.asc_FindRepeatText(selectIndex);
		this["Add_Text"](replaceVal);
	};

	Api.prototype["pluginMethod_XytInsertParagraph"] = function(params)
	{
		params = params || {};
		if (true === params["isLineFeed"])
			this["Add_NewParagraph"]();
		this["Add_Text"](undefined === params["text"] ? "" : params["text"]);
	};

	Api.prototype["pluginMethod_XytGetSelectedText"] = function()
	{
		return this.asc_GetSelectedText();
	};

	Api.prototype["pluginMethod_XytDealWithBookmark"] = function(params)
	{
		params = params || {};
		let manager = this.asc_GetBookmarksManager();
		if (!manager)
		{
			console.warn("书签初始化失败！");
			return null;
		}

		let name = params["name"];
		if (!name)
		{
			console.warn("请传入 name！");
			return null;
		}

		switch (params["actionType"])
		{
			case "have":
				return manager.asc_HaveBookmark(name);
			case "add":
				return manager.asc_AddBookmark(name);
			case "remove":
				return manager.asc_RemoveBookmark(name);
			case "select":
				return manager.asc_SelectBookmark(name);
		}

		return null;
	};

	/**
	 * Inserts a DOCX document at an existing bookmark using the native Word
	 * binary paste pipeline. Source section breaks and styles are preserved;
	 * the source final-section properties are merged into the target section,
	 * while the template keeps its first-page header and footer.
	 *
	 * @param {{url: string, bookmark: string, token?: string, sectionPolicy?: string, stylePolicy?: string}} params
	 * @returns {{success: boolean, bookmark: string, error: ?string, sectionPolicy: string, stylePolicy: string}|undefined}
	 */
	Api.prototype["pluginMethod_XytInsertDocumentAtBookmark"] = function(params)
	{
		params = params || {};
		let url = params["url"];
		let bookmark = params["bookmark"];
		let sectionPolicy = "keepDestination" === params["sectionPolicy"] ? "keepDestination" : "preserveSource";
		let stylePolicy = "useDestination" === params["stylePolicy"] ? "useDestination" : "keepSource";
		let response = function(success, error)
		{
			return {
				"success" : !!success,
				"bookmark" : bookmark || "",
				"error" : error || null,
				"sectionPolicy" : sectionPolicy,
				"stylePolicy" : stylePolicy
			};
		};
		let fail = function(error)
		{
			return response(false, error);
		};

		let logicDocument = null;
		let documentState = null;
		let pluginRuntime = null;
		let asyncReturnEnabled = false;
		try
		{
			if (!url || typeof(url) !== "string" || !bookmark || typeof(bookmark) !== "string")
				return fail("invalid-params");

			logicDocument = this.private_GetLogicDocument();
			if (!logicDocument)
				return fail("document-not-ready");
			if (!this.canEdit())
				return fail("document-not-editable");
			pluginRuntime = window.g_asc_plugins;
			if (!pluginRuntime)
				return fail("plugin-runtime-not-ready");

			let bookmarkManager = logicDocument.GetBookmarksManager();
			bookmarkManager.Update();
			let bookmarkMarks = bookmarkManager.GetBookmarkByName(bookmark);
			if (!bookmarkMarks)
				return fail("bookmark-not-found");
			if (AscCommon.CollaborativeEditing.Get_GlobalLock())
				return fail("editor-locked");

			documentState = logicDocument.SaveDocumentState();
			let restoreSelectionAndRespond = function(error)
			{
				logicDocument.LoadDocumentState(documentState);
				logicDocument.UpdateSelection();
				logicDocument.UpdateInterface();
				return fail(error);
			};
			if (!bookmarkManager.SelectBookmark(bookmark))
				return restoreSelectionAndRespond("bookmark-select-failed");
			// GetDocPosType describes the active editor controller, not the real
			// owner of the selected bookmark. It may remain in drawing/header mode
			// briefly even after SelectBookmark succeeds. Determine ownership from
			// the bookmark marks' paragraphs instead.
			let startParagraph = bookmarkMarks[0].GetParagraph();
			let endParagraph = bookmarkMarks[1].GetParagraph();
			let startTopDocument = startParagraph && startParagraph.Parent && startParagraph.Parent.GetTopDocumentContent
				? startParagraph.Parent.GetTopDocumentContent()
				: null;
			let endTopDocument = endParagraph && endParagraph.Parent && endParagraph.Parent.GetTopDocumentContent
				? endParagraph.Parent.GetTopDocumentContent()
				: null;
			let isMainDocumentBookmark = startTopDocument === logicDocument && endTopDocument === logicDocument;
			if (!isMainDocumentBookmark)
				return restoreSelectionAndRespond("bookmark-not-in-main-document");

			let selectedParagraphs = logicDocument.GetSelectedParagraphs() || [];
			if (!selectedParagraphs.length)
				selectedParagraphs = bookmarkManager.GetRelatedParagraphs(bookmark);
			for (let paragraphIndex = 0; paragraphIndex < selectedParagraphs.length; paragraphIndex++)
			{
				if (selectedParagraphs[paragraphIndex].Get_SectionPr())
					return restoreSelectionAndRespond("bookmark-contains-section-break");
			}
			if (logicDocument.IsSelectionLocked(
				AscCommon.changestype_Paragraph_Content,
				null,
				true,
				logicDocument.IsFormFieldEditing()
			))
				return restoreSelectionAndRespond("selection-locked");

			pluginRuntime.setPluginMethodReturnAsync();
			asyncReturnEnabled = true;
			try
			{
				this.asc_insertTextFromUrl(
					url,
					params["token"],
					{
						"sectionPolicy" : sectionPolicy,
						"stylePolicy" : stylePolicy
					},
					function(result)
					{
						let success = !!(result && result["success"]);
						let error = result && result["error"];
						if (!success)
						{
							logicDocument.LoadDocumentState(documentState);
							logicDocument.UpdateSelection();
							logicDocument.UpdateInterface();
						}
						pluginRuntime.onPluginMethodReturn(response(success, error));
					}
				);
			}
			catch (error)
			{
				logicDocument.LoadDocumentState(documentState);
				logicDocument.UpdateSelection();
				logicDocument.UpdateInterface();
				pluginRuntime.onPluginMethodReturn(response(false, "document-insert-failed"));
			}
		}
		catch (error)
		{
			if (logicDocument && documentState)
			{
				try
				{
					logicDocument.LoadDocumentState(documentState);
					logicDocument.UpdateSelection();
					logicDocument.UpdateInterface();
				}
				catch (restoreError)
				{
				}
			}
			let failureResponse = response(false, "bookmark-validation-failed");
			if (asyncReturnEnabled && pluginRuntime)
			{
				pluginRuntime.onPluginMethodReturn(failureResponse);
				return;
			}
			return failureResponse;
		}
	};

	/**
	 * Replaces bookmark contents with plain text and always keeps the bookmarks.
	 * Items are processed sequentially because text paste uses the shared selection.
	 * LF characters create paragraphs with formatting inherited from the bookmark.
	 *
	 * @param {{name: string, text: string}[]} items
	 * @returns {{success: boolean, total: number, succeeded: number, failed: number, results: object[]}|undefined}
	 */
	Api.prototype["pluginMethod_XytReplaceBookmarks"] = function(items)
	{
		if (!Array.isArray(items) || !items.length)
			return {"success" : false, "total" : 0, "succeeded" : 0, "failed" : 0, "results" : []};

		let api = this;
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
		{
			return {
				"success" : false,
				"total" : items.length,
				"succeeded" : 0,
				"failed" : items.length,
				"results" : items.map(function(item, index)
				{
					return {"index" : index, "name" : item && item["name"], "success" : false, "paragraphCount" : 0, "error" : "document-not-ready"};
				})
			};
		}

		let bookmarkManager = logicDocument.GetBookmarksManager();
		let documentState = logicDocument.SaveDocumentState();
		let results = [];
		let currentActionStarted = false;
		let isFinished = false;

		let finalizeCurrentAction = function()
		{
			if (currentActionStarted && logicDocument.IsActionStarted())
				logicDocument.FinalizeAction();
			currentActionStarted = false;
		};

		let appendResult = function(index, name, text, success, error)
		{
			results.push({
				"index" : index,
				"name" : name,
				"success" : success,
				"paragraphCount" : success && text.length ? text.split("\n").length : 0,
				"error" : error
			});
		};

		let addCollapsedBookmark = function(name)
		{
			bookmarkManager.Update();
			if (bookmarkManager.GetBookmarkByName(name))
				return true;

			let paragraph = logicDocument.GetCurrentParagraph(true);
			if (!paragraph)
				return false;

			let bookmarkId = bookmarkManager.GetNewBookmarkId();
			paragraph.AddBookmarkChar(new AscWord.CParagraphBookmark(false, bookmarkId, name), false);
			paragraph.AddBookmarkChar(new AscWord.CParagraphBookmark(true, bookmarkId, name), false);
			bookmarkManager.Update();
			return !!bookmarkManager.GetBookmarkByName(name);
		};

		// Paste completion can run inside pre_Paste/asyncImagesDocumentEndLoaded.
		// Continue on the next task so the SDK can clear the previous pasteCallback
		// before the next bookmark installs its own callback.
		let scheduleNextItem = function(index)
		{
			setTimeout(function()
			{
				processItem(index);
			}, 0);
		};

		let finish = function()
		{
			if (isFinished)
				return;
			isFinished = true;
			finalizeCurrentAction();
			logicDocument.LoadDocumentState(documentState);
			logicDocument.UpdateSelection();

			let succeeded = results.filter(function(result) { return result["success"]; }).length;
			let response = {
				"success" : succeeded === items.length,
				"total" : items.length,
				"succeeded" : succeeded,
				"failed" : items.length - succeeded,
				"results" : results
			};

			api.decrementCounterLongAction();
			window.g_asc_plugins.onPluginMethodReturn(response);
		};

		let processItem = function(index)
		{
			if (index >= items.length)
			{
				finish();
				return;
			}

			let item = items[index] || {};
			let name = item["name"];
			let text = item["text"];
			if (!name || typeof(text) !== "string")
			{
				appendResult(index, name, "", false, "invalid-params");
				processItem(index + 1);
				return;
			}

			text = text.replace(/\r\n?/g, "\n");
			bookmarkManager.Update();
			if (!bookmarkManager.GetBookmarkByName(name))
			{
				appendResult(index, name, text, false, "bookmark-not-found");
				processItem(index + 1);
				return;
			}
			if (AscCommon.CollaborativeEditing.Get_GlobalLock())
			{
				appendResult(index, name, text, false, "editor-locked");
				processItem(index + 1);
				return;
			}
			if (text.length && !AscCommon.g_clipboardBase)
			{
				appendResult(index, name, text, false, "clipboard-not-ready");
				processItem(index + 1);
				return;
			}
			if (!bookmarkManager.SelectBookmark(name))
			{
				appendResult(index, name, text, false, "bookmark-select-failed");
				processItem(index + 1);
				return;
			}
			if (logicDocument.IsSelectionLocked(
				AscCommon.changestype_Paragraph_Content,
				null,
				true,
				logicDocument.IsFormFieldEditing()
			))
			{
				appendResult(index, name, text, false, "selection-locked");
				processItem(index + 1);
				return;
			}

			// Preserve every selected paragraph independently. A later remap should
			// inherit the user's latest font/size and paragraph settings instead of
			// the paragraph-end formatting left by the first mapping.
			let selectedParagraphs = logicDocument.GetSelectedParagraphs();
			let pasteFormatting = selectedParagraphs.map(function(paragraph)
			{
				let textPr = paragraph.GetDirectTextPr();
				let paraPr = paragraph.GetDirectParaPr();
				return {
					"TextPr" : textPr && textPr.Copy ? textPr.Copy() : textPr,
					"ParaPr" : paraPr && paraPr.Copy ? paraPr.Copy() : paraPr
				};
			});

			try
			{
				logicDocument.StartAction(AscDFH.historydescription_BuilderScript);
				currentActionStarted = true;
				logicDocument.RemoveBeforePaste();
				logicDocument.private_RemoveBookmark(name);

				if (!text.length)
				{
					let success = addCollapsedBookmark(name);
					finalizeCurrentAction();
					appendResult(index, name, text, success, success ? undefined : "bookmark-recreate-failed");
					processItem(index + 1);
					return;
				}

				let bookmarkId = bookmarkManager.GetNewBookmarkId();
				let bookmarkStart = new AscWord.CParagraphBookmark(true, bookmarkId, name);
				let bookmarkEnd = new AscWord.CParagraphBookmark(false, bookmarkId, name);
				api.asc_PasteData(
					AscCommon.c_oAscClipboardDataFormat.Text,
					text,
					undefined,
					undefined,
					true,
					function(result)
					{
						try
						{
							bookmarkManager.Update();
							let success = false !== result && !!bookmarkManager.GetBookmarkByName(name);
							if (!bookmarkManager.GetBookmarkByName(name))
								addCollapsedBookmark(name);
							finalizeCurrentAction();
							appendResult(index, name, text, success, success ? undefined : "paste-or-bookmark-failed");
						}
						catch (error)
						{
							finalizeCurrentAction();
							appendResult(index, name, text, false, error && error.message ? error.message : "unexpected-error");
						}
						scheduleNextItem(index + 1);
					},
					false,
					function()
					{
						let bookmarkPreserved = addCollapsedBookmark(name);
						finalizeCurrentAction();
						appendResult(index, name, text, false, bookmarkPreserved ? "paste-rejected" : "paste-rejected-bookmark-lost");
						scheduleNextItem(index + 1);
					},
					bookmarkStart,
					bookmarkEnd,
					pasteFormatting
				);
			}
			catch (error)
			{
				let bookmarkPreserved = addCollapsedBookmark(name);
				finalizeCurrentAction();
				let errorMessage = error && error.message ? error.message : "unexpected-error";
				appendResult(index, name, text, false, bookmarkPreserved ? errorMessage : errorMessage + "-bookmark-lost");
				scheduleNextItem(index + 1);
			}
		};

		if (!window.g_asc_plugins)
			return {"success" : false, "total" : items.length, "succeeded" : 0, "failed" : items.length, "results" : []};

		window.g_asc_plugins.setPluginMethodReturnAsync();
		this.incrementCounterLongAction();
		processItem(0);
	};

	Api.prototype["pluginMethod_XytSetReviewChanges"] = function(params)
	{
		params = params || {};
		let isReviewOnly = true === params["isReviewOnly"];
		let canReview = undefined === params["canReview"] ? true : params["canReview"];
		if (isReviewOnly || !canReview)
		{
			this.asc_SetLocalTrackRevisions(true);
			return;
		}

		if (true === params["global"])
		{
			this.asc_SetLocalTrackRevisions(null);
			this.asc_SetGlobalTrackRevisions(!!params["state"]);
		}
		else
		{
			this.asc_SetLocalTrackRevisions(!!params["state"]);
		}
	};

	Api.prototype["pluginMethod_XytSetContentControlText"] = function(text, id)
	{
		if (!text || !id)
		{
			console.warn("请传入正确的参数！");
			return;
		}
		this.asc_SetContentControlText(text, id);
	};

	Api.prototype["pluginMethod_XytSetContentControlHighlight"] = function(isShow, r, g, b)
	{
		this.asc_SetGlobalContentControlShowHighlight(isShow, r, g, b);
	};

	Api.prototype["pluginMethod_XytMoveCursorToParagraph"] = function(direction)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		let paragraphs = logicDocument.GetSelectedParagraphs && logicDocument.GetSelectedParagraphs();
		let paragraph = paragraphs && paragraphs[0];
		if (!paragraph)
			return false;

		logicDocument.RemoveSelection();
		if ("start" === direction)
			paragraph.MoveCursorToStartPos(false);
		else
			paragraph.MoveCursorToEndPos(false);
		logicDocument.UpdateSelection();
		logicDocument.UpdateInterface();
		return true;
	};

	Api.prototype["pluginMethod_XytInsertPageInfo"] = function(text)
	{
		if (!text)
		{
			console.warn("text is required");
			return;
		}
		if (typeof text !== "string")
		{
			console.warn("text must be a string");
			return;
		}

		let api = this;
		text.split(/(\${[^}]+})/g).filter(Boolean).forEach(function(item)
		{
			if (item.includes("${pageNum}"))
				api.put_PageNum(-1);
			else if (item.includes("${pageCount}"))
				api.asc_AddPageCount();
			else
				api["Add_Text"](item);
		});
	};

	/**
	 * 批量映射表格数据
	 * @memberof Api
	 * @alias TableWithBookmarkHandler
	 * @since 7.5.1
	 * @example
	 * window.Asc.plugin.executeMethod("TableWithBookmarkHandler");
	 */
	Api.prototype["pluginMethod_TableWithBookmarkHandler"] = function(params)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument || !params?.length)
			return;

		const bookmarkManagement = this.asc_GetBookmarksManager();
		const bookmarks = bookmarkManagement?.Bookmarks || [];
		
		params.forEach(item => {
			let oTable = {};
			
			// 通过书签选中父级的 table 元素
			bookmarks.forEach((bookmark) => {
				const currentBookmark = bookmark?.[0];
				const name = currentBookmark?.BookmarkName;
				if (name === item['bookmark']) {
					oTable = currentBookmark?.Parent?.Parent?.Parent?.GetTable();
				}
			});
			
			if (oTable?.Get_RowsCount) {
				// 计算传入数据和表格行的差值，手动添加/删除行。
				const rowCount = oTable.Get_RowsCount() - 1;
				const rowCountDiff = item?.['tableProps']?.[0]?.['row'] - rowCount;
				if (rowCountDiff > 0) {
					// 因 AddTableRow 是在选中的行下方添加，所以需要手动选择最后一行
					oTable.SelectRows(rowCount, rowCount);
					oTable.AddTableRow(false, rowCountDiff);
				} else if (rowCountDiff < 0 ) {
					const list = new Array(Math.abs(rowCountDiff)).fill(false);
					list.forEach(() => {
						const length = oTable.Get_RowsCount();
						oTable.RemoveTableRow(length - 1);
					})
				}

				// 依次处理单元格的内容
				item?.['tableProps']?.forEach(tableData => {
					const currentRow = oTable.GetRow(tableData?.['row']);
					const element = currentRow.GetCell(tableData?.['col']).GetContent().GetElement(0);
					const paragraph = element.GetElement(0);
					paragraph.ClearContent();
					paragraph.AddText(tableData?.['content']);
				})
			} else {
				console.warn(`未找到书签所在的表格！`);
			}
			})

		logicDocument.Recalculate();
		logicDocument.UpdateInterface();
		logicDocument.UpdateSelection();
	};

	/**
	 * 获取所有书签列表
	 * @memberof Api
	 * @param {boolean} [needContent=true] - 是否需要获取书签内容
	 * @alias GetAllBookmarks
	 * @since 7.5.1
	 * @example
	 * window.Asc.plugin.executeMethod("GetAllBookmarks");
	 */
	Api.prototype["pluginMethod_GetAllBookmarks"] = function(needContent = true)
	{
		const manager = this.asc_GetBookmarksManager();
		if (!manager) {
			console.warn("书签初始化失败！");
			return;
		}

		const bookmarks = manager?.Bookmarks || [];
		let bookmarkList = [];
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument && needContent) {
			console.warn("逻辑文档初始化失败！");
			return [];
		}

		bookmarkList =  bookmarks?.map((item) => {
			const currentBookmark = item?.[0];
			const id = currentBookmark?.BookmarkId;
			const name = currentBookmark?.BookmarkName;
			let content = '';
			if(needContent) {
				manager.SelectBookmark(name);
				content = logicDocument.GetSelectedText();
			};

			return {
				'bookmarkId': id,
				'bookmarkName': name,
				'bookmarkContent': content
			};
		});

		if(needContent) {
			logicDocument.RemoveSelection()
		};

		return bookmarkList
	};

	/**
	 * 表格定位；支持定位行、列、单元格
	 * @memberof Api
	 * @alias SelectTable
	 * @since 8.2.0.147
	 * @example
	 * window.Asc.plugin.executeMethod("SelectTable");
	 */
	Api.prototype["pluginMethod_SelectTable"] = function(params)
	{
		try
		{
			if (!Array.isArray(params) || !Number.isInteger(params[0]) || params[0] < 0)
			{
				return {
					"code" : 400,
					"data" : false,
					"message" : "请传入正确的参数！"
				};
			}

			let tableIndex  = params[0];
			let rowIndex    = params[1];
			let columnIndex = params[2];
			let type = "table";

			if (tableIndex >= 0 && rowIndex >= 0 && columnIndex >= 0)
				type = "cell";
			else if (tableIndex >= 0 && rowIndex >= 0)
				type = "row";
			else if (tableIndex >= 0 && columnIndex >= 0)
				type = "column";

			let logicDocument = this.private_GetLogicDocument();
			if (!logicDocument)
			{
				return {
					"code" : 500,
					"data" : false,
					"message" : "逻辑文档初始化失败！"
				};
			}

			let tables = logicDocument.GetAllTables() || [];
			if (!tables.length)
			{
				return {
					"code" : 200,
					"data" : false,
					"message" : "当前文档无表格！"
				};
			}
			if (tableIndex >= tables.length)
			{
				return {
					"code" : 200,
					"data" : false,
					"message" : "所选表格不存在！"
				};
			}

			let table = tables[tableIndex];
			if ("table" === type)
			{
				logicDocument.RemoveSelection();
				table.SelectAll();
				table.Document_SetThisElementCurrent(false);
				logicDocument.UpdateSelection();
				logicDocument.UpdateInterface();
				return {
					"code" : 200,
					"data" : true
				};
			}

			let rowCount = table.GetRowsCount();
			let cell = null;
			let cells = [];

			switch (type)
			{
				case "row":
				{
					// 保持原接口约定：仅定位行时 rowIndex 从 1 开始。
					if (!Number.isInteger(rowIndex) || rowIndex < 1 || rowIndex > rowCount)
					{
						return {
							"code" : 200,
							"data" : false,
							"message" : "所选行不存在！"
						};
					}
					cells = table.GetRow(rowIndex - 1).Content;
					break;
				}
				case "column":
				{
					if (!Number.isInteger(columnIndex) || columnIndex < 0 || !rowCount)
					{
						return {
							"code" : 200,
							"data" : false,
							"message" : "所选列不存在！"
						};
					}

					let firstRow = table.GetRow(0);
					if (!firstRow || columnIndex >= firstRow.GetCellsCount())
					{
						return {
							"code" : 200,
							"data" : false,
							"message" : "所选列不存在！"
						};
					}

					for (let row = 0; row < rowCount; ++row)
					{
						let tableRow = table.GetRow(row);
						if (tableRow && columnIndex < tableRow.GetCellsCount())
							cells.push(tableRow.GetCell(columnIndex));
					}
					break;
				}
				case "cell":
				{
					// 保持原接口约定：定位单元格时行列索引均从 0 开始。
					if (!Number.isInteger(rowIndex) || rowIndex < 0 || rowIndex >= rowCount)
					{
						return {
							"code" : 200,
							"data" : false,
							"message" : "所选行不存在！"
						};
					}

					let tableRow = table.GetRow(rowIndex);
					if (!Number.isInteger(columnIndex) || columnIndex < 0 || columnIndex >= tableRow.GetCellsCount())
					{
						return {
							"code" : 200,
							"data" : false,
							"message" : "所选单元格不存在！"
						};
					}
					cell = tableRow.GetCell(columnIndex);
					break;
				}
			}

			let cellList = cells.length ? cells : (cell ? [cell] : []);
			if (!cellList.length)
			{
				return {
					"code" : 200,
					"data" : false,
					"message" : "无法定位表格区域！"
				};
			}

			let bestCell = null;
			let bestPos = null;
			let bestY = -Infinity;
			let currentPage = 0;

			for (let index = 0; index < cellList.length; ++index)
			{
				let currentCell = cellList[index];
				if (!currentCell || !currentCell.Content || typeof(currentCell.Content_GetCurPosXY) !== "function")
					continue;

				let position = currentCell.Content_GetCurPosXY();
				let y = position ? position.Y : undefined;
				if (typeof(y) !== "number")
					continue;

				let page = currentCell.Content.GetAbsolutePage();
				if (y > bestY || (y === bestY && page > currentPage))
				{
					bestY = y;
					bestCell = currentCell;
					bestPos = position;
					currentPage = page;
				}
			}

			if (!bestCell || !bestPos)
			{
				return {
					"code" : 200,
					"data" : false,
					"message" : "无法获取单元格坐标！"
				};
			}

			logicDocument.GoToPage(currentPage);
			logicDocument.MoveCursorToXY(bestPos.X, bestPos.Y + 1);
			switch (type)
			{
				case "row":
					this.selectRow();
					break;
				case "column":
					this.selectColumn();
					break;
				case "cell":
					this.selectCell();
					break;
			}

			return {
				"code" : 200,
				"data" : true
			};
		}
		catch (error)
		{
			console.warn(error);
			return {
				"code" : 500,
				"data" : false,
				"message" : error && error.message ? error.message : "未知错误"
			};
		}
	};
		/**
	 * 通过坐标高亮显示文本
	 * @memberof Api
	 * @alias SearchByPos
	 * @since 8.2.0.147
	 * @example
	 * window.Asc.plugin.executeMethod("SearchByPos");
	 */
	Api.prototype["pluginMethod_SearchByPos"] = function(params)
	{
		if (!params || !Array.isArray(params["box"]))
			return null;

		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;

		let page = Number(params["page"]);
		let targetY = Number(params["box"][1]);
		if (!Number.isFinite(page) || !Number.isFinite(targetY))
			return null;

		let paragraphs = (logicDocument.GetAllParagraphs() || []).filter(function(paragraph)
		{
			return paragraph.GetAbsolutePage() + 1 === page;
		});
		if (!paragraphs.length)
			return null;

		let toOfficeYpx = function(paragraph)
		{
			return paragraph.Y * (144 / 25.4);
		};
		let candidates = [];
		let pushCandidate = function(paragraph, referenceY)
		{
			candidates.push({
				"paragraph" : paragraph,
				"distance" : Math.abs(referenceY - targetY)
			});
		};

		for (let index = 0; index < paragraphs.length; ++index)
		{
			let paragraph = paragraphs[index];
			let nextParagraph = paragraphs[index + 1];
			let paragraphY = toOfficeYpx(paragraph);
			if (!nextParagraph)
			{
				let previousParagraph = paragraphs[index - 1];
				if (!previousParagraph)
				{
					pushCandidate(paragraph, paragraphY);
					continue;
				}

				let previousY = toOfficeYpx(previousParagraph);
				if ((previousY <= paragraphY && targetY >= paragraphY)
					|| (previousY > paragraphY && targetY <= paragraphY))
				{
					pushCandidate(paragraph, paragraphY);
				}
				break;
			}

			let nextY = toOfficeYpx(nextParagraph);
			if ((paragraphY <= nextY && targetY >= paragraphY && targetY < nextY)
				|| (paragraphY > nextY && targetY > nextY && targetY <= paragraphY))
			{
				pushCandidate(paragraph, paragraphY);
			}
		}

		if (!candidates.length)
			return null;

		candidates.sort(function(first, second)
		{
			return first["distance"] - second["distance"];
		});
		let bestParagraph = candidates[0]["paragraph"];

		// 与 ApiParagraph.Select 保持一致，支持表格、页眉页脚等嵌套段落。
		logicDocument.RemoveSelection();
		bestParagraph.SelectAll();
		bestParagraph.Document_SetThisElementCurrent(true);

		return {
			"paraId" : bestParagraph.GetParaId(),
			"page" : bestParagraph.GetAbsolutePage() + 1,
			"text" : bestParagraph.GetText()
		};
	};
	/**
	 * 处理中文和数字之间的间距
	 * @memberof Api
	 * @alias HandleChineseAndNumberSpacing
	 * @since 8.2.0
	 * @example
	 * window.Asc.plugin.executeMethod("HandleChineseAndNumberSpacing");
	 */
	Api.prototype["pluginMethod_HandleChineseAndNumberSpacing"] = function()
	{
		// 提取中文后面跟数字或数字后面跟中文的边界位置
		const extractChineseNumberBoundaries = (
			text
		) => {
			const result = [];

			for (let i = 0; i < text.length; i++) {
				const char = text[i];
				const nextChar = text[i + 1];

				// 情况1：中文字符（排除标点符号）后面是数字
				if (
					/[\u4e00-\u9fa5]/.test(char) &&
					!/[\u3000-\u303f\uff00-\uffef]/.test(char) && // 排除中文标点符号
					nextChar &&
					/\d/.test(nextChar)
				) {
					result.push({
						type: "chinese",
						position: i,
						char: char,
					});
				}

				// 情况2：数字后面是中文字符（排除标点符号）
				if (
					/\d/.test(char) &&
					nextChar &&
					/[\u4e00-\u9fa5]/.test(nextChar) &&
					!/[\u3000-\u303f\uff00-\uffef]/.test(nextChar) // 排除中文标点符号
				) {
					result.push({
						type: "number",
						position: i,
						char: char,
					});
				}
			}

			return result;
		};
		const logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		const allPara = logicDocument.GetAllParagraphs();

		if (allPara.length) {
			// 第一步：遍历所有段落，收集需要处理的文本和段落信息
			const allTexts = [];
			const targetTexts = [];

			allPara.forEach((item, index) => {
				const text = item.GetText().trim();

				// if (text) {
				allTexts.push(text);

				// 提取当前段落中需要处理的边界位置
				const boundaries = extractChineseNumberBoundaries(text);

				boundaries.forEach((boundary) => {
					// 计算当前字符在全文中的出现次数
					let occurrenceCount = 0;
					let foundCurrentBoundary = false;

					// 遍历所有段落，计算该字符的出现次数
					for (let i = 0; i < allTexts.length; i++) {
						const currentText = allTexts[i];
					
						const regex = new RegExp(
							boundary.char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
							"g"
						);
						let match;

						while ((match = regex.exec(currentText)) !== null) {
								// 忽略 — 1 — 这种格式
								if(!/^—\s+\d+\s+—$/.test(currentText)) {
									occurrenceCount++;
								}

							// 如果找到当前边界字符，立即停止计算
							// 需要精确匹配：段落索引、字符位置、字符内容都匹配
							if (
								i === index && // 确保在正确的段落中
								match[0] === boundary.char && // 确保字符内容匹配
								(match.index === boundary.position || // 如果位置匹配，直接找到
									// 或者如果当前段落中只有一个该字符，也认为找到
									currentText.match(
										new RegExp(
											boundary.char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
											"g"
										)
									)?.length === 1)
							) {
								foundCurrentBoundary = true;
								break;
							}
						}

						// 如果已经找到当前边界字符，停止遍历后续段落
						if (foundCurrentBoundary) {
							break;
						}
					}

					targetTexts.push({
						text: boundary.char, // 只存储单个字符
						paragraphIndex: index,
						textIndex: occurrenceCount, // 这是该字符在全文中的出现次数
						boundaryType: boundary.type, // 记录边界类型
						position: boundary.position, // 记录在段落中的位置
					});
				});
				// }
			});

			// 第三步：按顺序处理每个目标文本
			const processTargetTexts = (targetIndex) => {
				if (targetIndex >= targetTexts.length) {
					//@ts-ignore
					this.asc_RemoveSelection();
					return;
				}

				const target = targetTexts[targetIndex];
				// 根据边界类型处理不同的情况
				if (target.boundaryType === "chinese") {
					// 中文后面是数字：搜索中文字符并设置间距
					//@ts-ignore
					const searchSettings = new AscCommon.CSearchSettings();
					searchSettings.put_Text(target.text);
					searchSettings.put_MatchCase(false);
					searchSettings.put_WholeWords(false);

					// 先搜索到第一个匹配项
					//@ts-ignore
					const length = this.asc_findText(searchSettings, false);

					if (length > 0) {
						// 使用asc_FindRepeatText精确搜索到指定位置
						//@ts-ignore
						this.asc_FindRepeatText(target.textIndex - 1);

						new Promise((resolve) => setTimeout(resolve, 10))
							.then(() => {
								// 执行字符间距设置
								//@ts-ignore
								const selectedElements = this.getSelectedElements();

								if (selectedElements && selectedElements.length > 0) {
									selectedElements.forEach((item) => {
										const elType = item.asc_getObjectType();
										const elValue = item.asc_getObjectValue();
										//@ts-ignore
										if (Asc.c_oAscTypeSelectElement.Paragraph === elType) {
											elValue.asc_putTextSpacing(1);
											elValue.Shd = undefined;
											//@ts-ignore
											this.paraApply(elValue);
										}
									});
								}

								return new Promise((resolve) => setTimeout(resolve, 10));
							})
							.then(() => {
								processTargetTexts(targetIndex + 1);
							})
							.catch((error) => {
								console.error("处理出错:", error);
								setTimeout(() => {
									processTargetTexts(targetIndex + 1);
								}, 10);
							});
					} else {
						console.log("中文搜索失败，跳过当前目标");
						setTimeout(() => {
							processTargetTexts(targetIndex + 1);
						}, 10);
					}
				} else if (target.boundaryType === "number") {
					// 数字后面是中文：搜索数字字符并设置间距
					// console.log(
					//   `处理数字边界: "${target.text}" 在全文第${target.textIndex}次出现`
					// );

					//@ts-ignore
					const searchSettings = new AscCommon.CSearchSettings();
					searchSettings.put_Text(target.text);
					searchSettings.put_MatchCase(false);
					searchSettings.put_WholeWords(false);

					// 先搜索到第一个匹配项
					//@ts-ignore
					const length = this.asc_findText(searchSettings, false);

					if (length > 0) {
						// 使用asc_FindRepeatText精确搜索到指定位置
						//@ts-ignore
						this.asc_FindRepeatText(target.textIndex - 1);

						new Promise((resolve) => setTimeout(resolve, 10))
							.then(() => {
								// 执行字符间距设置
								//@ts-ignore
								const selectedElements = this.getSelectedElements();

								if (selectedElements && selectedElements.length > 0) {
									selectedElements.forEach((item) => {
										const elType = item.asc_getObjectType();
										const elValue = item.asc_getObjectValue();
										//@ts-ignore
										if (Asc.c_oAscTypeSelectElement.Paragraph === elType) {
											elValue.asc_putTextSpacing(1);
											elValue.Shd = undefined;
											//@ts-ignore
											this.paraApply(elValue);
										}
									});
								}

								return new Promise((resolve) => setTimeout(resolve, 10));
							})
							.then(() => {
								processTargetTexts(targetIndex + 1);
							})
							.catch((error) => {
								console.error("处理出错:", error);
								setTimeout(() => {
									processTargetTexts(targetIndex + 1);
								}, 10);
							});
					} else {
						console.log("数字搜索失败，跳过当前目标");
						setTimeout(() => {
							processTargetTexts(targetIndex + 1);
						}, 10);
					}
				} else {
					console.log("未知边界类型，跳过当前目标");
					setTimeout(() => {
						processTargetTexts(targetIndex + 1);
					}, 10);
				}
			};

			// 开始处理第一个目标文本
			processTargetTexts(0);
		}
	}
	/**
	 * 获取选择的所有段落的 paraId
	 * @memberof Api
	 * @alias getSelectParaIds
	 * @since 9.4.0
	 * @example
	 * window.Asc.plugin.executeMethod("getSelectParaIds");
	 */
	Api.prototype["pluginMethod_GetSelectParaIds"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		const paras = logicDocument.GetSelectedParagraphs();
		const paraIds = [];
		paras.forEach((para) => {
			const id = para.GetParaId();
			paraIds.push(id);
		});
		return paraIds;
	}

	function private_ReadContentControlCommonPr(commonPr)
	{
		if (!commonPr)
			return undefined;
		return readContentControlCommonPr(new AscCommon.CContentControlPr(), commonPr);
	}
	function readContentControlCommonPr(ccPr, commonPr)
	{
		if (!ccPr || !commonPr)
			return ccPr;

		ccPr.Id    = commonPr["Id"];
		ccPr.Tag   = commonPr["Tag"];
		ccPr.Lock  = commonPr["Lock"];
		ccPr.Alias = commonPr["Alias"];
		
		if (undefined !== commonPr["Appearance"])
			ccPr.Appearance = commonPr["Appearance"];
		
		if (undefined !== commonPr["Color"])
			ccPr.Color = new Asc.asc_CColor(commonPr["Color"]["R"], commonPr["Color"]["G"], commonPr["Color"]["B"]);
		
		if (undefined !== commonPr["PlaceHolderText"])
			ccPr.SetPlaceholderText(commonPr["PlaceHolderText"]);
		
		let shd = commonPr["Shd"];
		if (shd)
		{
			if (undefined !== shd["Color"])
				ccPr.ShdColor = new Asc.asc_CColor(shd["Color"]["R"], shd["Color"]["G"], shd["Color"]["B"], shd["Color"]["A"]);
		}
		
		let border = commonPr["Border"];
		if (border)
		{
			if (undefined !== border["Color"])
				ccPr.BorderColor = new Asc.asc_CColor(border["Color"]["R"], border["Color"]["G"], border["Color"]["B"], border["Color"]["A"]);
		}

		return ccPr;
	}
	function private_GetTextDirection(type)
	{
		let direction = 0;
		switch (AscBuilder.GetStringParameter(type, "entirely"))
		{
			case "beforeCursor":
				direction = -1;
				break;
			case "afterCursor":
				direction = 1;
				break;
			case "entirely":
			default:
				direction = 0;
				break;
		}
		return direction;
	}

	/**
	 * Insert streamed content.
	 * @undocumented
	 * @memberof Api
	 * @typeofeditors ["CDE"]
	 * @alias InsertStreamedContent
	 * @returns {undefined}
	 * @since 9.2.0
	 */
	Api.prototype["pluginMethod_InsertStreamedContent"] = function(streamObj)
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return null;

		if (streamObj["word"] && streamObj["word"]["removeSelection"])
			logicDocument.RemoveSelection();

		if (streamObj["undo"])
			this["pluginMethod_EndAction"]("GroupActions", "", "cancel");
		
		let _t = this;
		function startSilentMode()
		{
			window.g_asc_plugins && window.g_asc_plugins.setPluginMethodReturnAsync();
			
			logicDocument.TurnOff_Recalculate();
			logicDocument.TurnOff_InterfaceEvents();
		}
		
		function endSilentMode()
		{
			logicDocument.TurnOn_Recalculate();
			logicDocument.TurnOn_InterfaceEvents();
			
			logicDocument.Recalculate();
			window.g_asc_plugins && window.g_asc_plugins.onPluginMethodReturn(true);
		}
		
		function pasteTail()
		{
			if (streamObj["tail"] !== "")
			{
				_t["pluginMethod_StartAction"]("GroupActions");
				_t._pluginMethod_PasteHtml(streamObj["tail"], endSilentMode);
			}
			else
			{
				endSilentMode();
			}
		}
		
		startSilentMode();
		
		if (streamObj["stable"] !== "")
			this._pluginMethod_PasteHtml(streamObj["stable"], pasteTail);
		else
			pasteTail();
	};

	/**
	 * Checks if the document is in the filling form mode.
	 * @memberof Api
	 * @typeofeditors ["CDE", "CFE"]
	 * @alias IsFillingFormMode
	 * @returns {boolean} - Returns **true** if the document is in the filling form mode.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/IsFillingFormMode.js
	 */
	Api.prototype["pluginMethod_IsFillingFormMode"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		return logicDocument.IsFillingFormMode();
	};
	/**
	 * Checks if the document is in the filling OForm mode.
	 * @memberof Api
	 * @typeofeditors ["CDE", "CFE"]
	 * @alias IsFillingOFormMode
	 * @returns {boolean} - Returns **true** if the document is in the filling OForm mode.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/IsFillingOFormMode.js
	 */
	Api.prototype["pluginMethod_IsFillingOFormMode"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		return logicDocument.IsFillingOFormMode();
	};

	/**
	 * Checks if the document is in the editing OForm mode.
	 * @memberof Api
	 * @typeofeditors ["CDE", "CFE"]
	 * @alias IsEditingOFormMode
	 * @returns {boolean} - Returns **true** if the document is in the editing OForm mode.
	 * @since 9.3.0
	 * @see office-js-api/Examples/Plugins/{Editor}/Api/Methods/IsEditingOFormMode.js
	 */
	Api.prototype["pluginMethod_IsEditingOFormMode"] = function()
	{
		let logicDocument = this.private_GetLogicDocument();
		if (!logicDocument)
			return false;

		return logicDocument.IsEditingOFormMode();
	};

	window["AscCommon"] = window["AscCommon"] || {};
	window["AscCommon"].readContentControlCommonPr = readContentControlCommonPr;
	
})(window);
