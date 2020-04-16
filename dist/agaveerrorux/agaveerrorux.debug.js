/* Agave error ux page javascript */

/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/


/*
    Your use of this file is governed by the Microsoft Services Agreement http://go.microsoft.com/fwlink/?LinkId=266419.

    This file also contains the following Promise implementation (with a few small modifications):
        * @overview es6-promise - a tiny implementation of Promises/A+.
        * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
        * @license   Licensed under MIT license
        *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
        * @version   2.3.0
*/
var InfoType;
(function (InfoType) {
    InfoType[InfoType["Error"] = 0] = "Error";
    InfoType[InfoType["Warning"] = 1] = "Warning";
    InfoType[InfoType["Information"] = 2] = "Information";
    InfoType[InfoType["SecurityInfo"] = 3] = "SecurityInfo";
})(InfoType || (InfoType = {}));
;
var SupportedLocales = {
    "ar-sa": true,
    "bg-bg": true,
    "bn-in": true,
    "ca-es": true,
    "cs-cz": true,
    "da-dk": true,
    "de-de": true,
    "el-gr": true,
    "en-us": true,
    "es-es": true,
    "et-ee": true,
    "eu-es": true,
    "fa-ir": true,
    "fi-fi": true,
    "fr-fr": true,
    "gl-es": true,
    "he-il": true,
    "hi-in": true,
    "hr-hr": true,
    "hu-hu": true,
    "id-id": true,
    "it-it": true,
    "ja-jp": true,
    "kk-kz": true,
    "ko-kr": true,
    "lo-la": true,
    "lt-lt": true,
    "lv-lv": true,
    "ms-my": true,
    "nb-no": true,
    "nl-nl": true,
    "nn-no": true,
    "pl-pl": true,
    "pt-br": true,
    "pt-pt": true,
    "ro-ro": true,
    "ru-ru": true,
    "sk-sk": true,
    "sl-si": true,
    "sr-cyrl-cs": true,
    "sr-cyrl-rs": true,
    "sr-latn-cs": true,
    "sr-latn-rs": true,
    "sv-se": true,
    "th-th": true,
    "tr-tr": true,
    "uk-ua": true,
    "ur-pk": true,
    "vi-vn": true,
    "zh-cn": true,
    "zh-tw": true
};
var SupportedError = {
    "APICallFailed": true,
    "NotTrustedWAC": true
};
function _loadJs(url, callback) {
    var scriptElement = document.createElement("script");
    scriptElement.src = url;
    scriptElement.type = "text/javascript";
    scriptElement.addEventListener("load", callback);
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
}
var PathToStringFile = "/lib/1.1/hosted/{locale}/office_strings.js";
var Strings = {};
function _getUrlParams() {
    var url = window.location.href;
    var paramsString = url.split('?')[1];
    var params = {};
    try {
        paramsString.split('&').forEach(function (param) {
            var a = param.split('=');
            params[a[0]] = a[1];
        });
    }
    catch (e) { }
    return params;
}
function _showInfoBar(errorMessage, errorTitle) {
    var tooltipString = errorMessage;
    if (errorMessage.length > 255) {
        errorMessage = errorMessage.substring(0, 254);
    }
    var infoBarDiv = document.createElement('div');
    infoBarDiv.setAttribute("class", "moe-infobar-body");
    var tooltipDiv = document.createElement("div");
    tooltipDiv.innerHTML = tooltipString;
    infoBarDiv.setAttribute("title", tooltipDiv.textContent);
    var infoTable = document.createElement('table');
    infoTable.setAttribute("class", "moe-infobar-infotable");
    infoTable.setAttribute("role", "presentation");
    var row, i;
    for (i = 0; i < 3; i++) {
        row = infoTable.insertRow(i);
        row.setAttribute("role", "presentation");
    }
    var infoTableRows = infoTable.rows;
    infoTableRows[0].insertCell(0);
    infoTableRows[0].insertCell(1);
    infoTableRows[0].cells[1].setAttribute("rowSpan", "2");
    infoTableRows[1].insertCell(0);
    infoTableRows[1].insertCell(1);
    infoTableRows[2].insertCell(0);
    infoTableRows[2].insertCell(1);
    infoTableRows[0].cells[0].setAttribute("class", "moe-infobar-top-left-cell");
    infoTableRows[0].cells[1].setAttribute("class", "moe-infobar-message-cell");
    infoTableRows[2].cells[1].setAttribute("class", "moe-infobar-button-cell");
    var moeCommonImg = document.createElement("img");
    moeCommonImg.src = "images/moe_status_icons.png";
    var className;
    var errorType = InfoType.Error;
    if (errorType === InfoType.Error) {
        className = "moe-infobar-error";
    }
    else if (errorType === InfoType.Warning) {
        className = "moe-infobar-warning";
    }
    else if (errorType === InfoType.Information) {
        className = "moe-infobar-info";
    }
    else {
        className = "moe-infobar-secinfo";
    }
    moeCommonImg.setAttribute("class", className);
    moeCommonImg.setAttribute("alt", tooltipString);
    infoTableRows[0].cells[0].appendChild(moeCommonImg);
    var msgDiv = document.createElement("a");
    msgDiv.setAttribute("class", "moe-infobar-message-div");
    msgDiv.setAttribute("tabindex", "1");
    if (errorTitle) {
        var titleSpan = document.createElement("span");
        titleSpan.setAttribute("class", "moe-infobar-title");
        titleSpan.innerHTML = errorTitle;
        msgDiv.appendChild(titleSpan);
    }
    var descSpan = document.createElement("span");
    descSpan.setAttribute("class", "moe-infobar-message");
    descSpan.innerHTML = errorMessage;
    msgDiv.appendChild(descSpan);
    infoTableRows[0].cells[1].appendChild(msgDiv);
    infoBarDiv.appendChild(infoTable);
    var backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute("class", "moe-background");
    backgroundDiv.style.backgroundImage = "url(images/agavedefaulticon96x96.png)";
    backgroundDiv.style.backgroundColor = 'white';
    backgroundDiv.style.opacity = '1';
    backgroundDiv.style.filter = 'alpha(opacity=100)';
    backgroundDiv.style.backgroundRepeat = "no-repeat";
    backgroundDiv.style.backgroundPosition = "center";
    var infoBarOutDiv = document.createElement("div");
    infoBarOutDiv.setAttribute("class", "moe-infobar-out");
    infoBarOutDiv.appendChild(infoBarDiv);
    backgroundDiv.appendChild(infoBarOutDiv);
    var containerDiv = document.getElementById("container");
    if (containerDiv) {
        containerDiv.appendChild(backgroundDiv);
    }
}
;
try {
    var urlParams = _getUrlParams();
    if (urlParams.locale && SupportedLocales[urlParams.locale] && urlParams.error && SupportedError[urlParams.error]) {
        var url = PathToStringFile.replace("{locale}", urlParams.locale);
        _loadJs(url, function () {
            _showInfoBar(Strings.OfficeOM["L_" + urlParams.error]);
        });
    }
}
catch (err) {
}
