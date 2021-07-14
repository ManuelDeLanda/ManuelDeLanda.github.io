var $$$ = document.querySelectorAll.bind(document); 
/* ADD THESE FUNCTIONS TO datascripts.js? */
getRange3 = function(n,r){for(var e=[],t=n;t<=r;t++)e.push(t);return e}
// getRange3(0, 4);
combineArrays = function(r){function n(r,n){return r.reduce(function(r,e,t){return""+r+n[t][e]},"")}function e(r,n){for(let e=r.length-1;e>=0;e--){let t=n[e].length-1;if(r[e]+1<=t)return r[e]++,!0;if(e-1<0)return!1;r[e]=0}}if(!r)return[];if(!Array.isArray(r))return[];if(0==r.length)return[];for(let n=0;n<r.length;n++)if(!Array.isArray(r[n])||0==r[n].length)return[];let t=new Array(r.length);t.fill(0);let u=[],f=n(t,r);for(u.push(f);e(t,r);)f=n(t,r),u.push(f);return u}
// combineArrays([ ["A","B","C"], ["+", "-", "*", "/"], ["1","2"] ] )
combineArraysRecursivelyCartesian = function(array_of_arrays){if(!array_of_arrays){return[]}
if(!Array.isArray(array_of_arrays)){return[]}
if(array_of_arrays.length==0){return[]}
for(var i=0;i<array_of_arrays.length;i++){if(!Array.isArray(array_of_arrays[i])||array_of_arrays[i].length==0){return[]}}
var outputs=[];function permute(arrayOfArrays){var whichArray=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var output=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";arrayOfArrays[whichArray].forEach(function(array_element){if(whichArray==array_of_arrays.length-1){outputs.push([output.toString(),array_element.toString()])}else{permute(arrayOfArrays,whichArray+1,output+array_element)}})}
permute(array_of_arrays);return outputs}
function letterToColumn(t){for(var o=0,r=t.length,e=0;e<r;e++)o+=(t.charCodeAt(e)-64)*Math.pow(26,r-e-1);return o}
function columnToLetter(r){for(var o,n="";r>0;)o=(r-1)%26,n=String.fromCharCode(o+65)+n,r=(r-o-1)/26;return n}
function convertArrayToCell(aArray) { return columnToLetter(aArray[0]) + aArray[1]; }
function convertCellToArray(sCell) { return [letterToColumn(sCell.replace(/[0-9]*$/g, "")), parseInt(sCell.replace(/^[A-Z]*/g, ""))]; }
/* END - ADD THESE FUNCTIONS TO datascripts.js? */

/* BEGIN - THESE FUNCTIONS SHOULD NEVER BE ADDED TO datascripts.js? */
// random vanilla DOM manipulation scripts
// // replace body tag's innerHTML with div
// document.getElementsByTagName('body')[0].innerHTML = "<div id='my'>blahHTML<div>"

function dom_lookupvalueHTMLTable(sTable, sRowValue, iColumn) {
    // sTable = "cualquierPotencialidad"; sRowValue = "pdf dump"; iColumn = 1;
    // dom_lookupvalueHTMLTable("cualquierPotencialidad", "pdf dump", 1);
    return Array.from( $("#" + sTable)[0].children[0].children ).reduce(function(agg, oElement) {
        if (oElement.children[0].innerText == sRowValue) {
            return agg + oElement.children[iColumn].innerText;
        } else {
            return agg;
        }
        console.log()
        return agg + oElement;
    }, "")
}

function filterHTMLTable(sTable, iColumn, aAcceptableValues) {
    // aAcceptableValues = ["aOrderItemsALL", "POST daterange", "buttons"]; filterHTMLTable("cualquierPotencialidad", 0, aAcceptableValues);
    iColumn = 0; //first column
    //Array.from($("#cualquierPotencialidad")[0].children[iColumn].children).forEach(function(oElement) {
    Array.from($("#" + sTable + "")[0].children[iColumn].children).forEach(function(oElement) {
        //gObject = oElement;
        var bDecision = aAcceptableValues.reduce(function(agg098, oElement098) { return agg098 && (oElement.children[0].innerText != oElement098);}, true);

        if (bDecision) {
            oElement.style.display = "none";
        }
        //console.log(Array.from(oElement.children))
    })
}


// remove first column, consider refractoring to something cooler
function removeHTMLTableColumn(sTable, iColumn) {
    // removeHTMLTableColumn('cualquierPotencialidad', 0);
    Array.from($("#" + sTable + "")[0].children[0].children).forEach(function(oElement) {
        oElement.children[iColumn].style.display = "none"
    })
}


// Excel-like dom manipulation functions on html tables
domTableToEXCELRANGE = function(domTable, sRange) { // domTableToEXCELRANGE("table.gsws", "C2:G4").row("3");
    // domTableToEXCELRANGE("A1:B2,C4:D7")
    function oEXCELRANGE() {};
    if (domTable == undefined) { domTable = document.querySelectorAll("table.gsws")[0]; sRange="A1:Z26" }
    if (sRange == undefined) { sRange = domTable; domTable = document.querySelectorAll("table.gsws")[0]; }
    // eg domTableToEXCELRANGE("table.gsws", "A1:D2,G4")
    oReturn = {};
    sRange.split(",").forEach(function(oElement362) {
        oReturn = getGoogleSheetRange(oElement362).reduce(function(oAgg, oElement) {
            oAgg[oElement] = domTableToEXCELObject(domTable)[oElement];
            return oAgg;
        }, oReturn)
    })
    oReturn.column = function(sColumn) {
        if (!isNaN(parseInt(sColumn))) { sColumn = columnToLetter(sColumn); }
        return Object.keys(oReturn).filter(function(oElement) {
            sColumn = sColumn.toString();
            rMatch = sColumn + "[0-9]+";
            // console.log(oElement + ".matching with " + sColumn);
            return oElement.match(rMatch)
        }).map(function(oElement) { return oReturn[oElement]; })
    }
    oReturn.columns = oReturn.column;
    oReturn.row = function(sRow) { return Object.keys(oReturn).filter(function(oElement) {
        sRow = sRow.toString(); rMatch = "[A-Z]+" + sRow;
        return oElement.match(rMatch)
    }).map(function(oElement) { return oReturn[oElement]; }) }
    oReturn.rows = oReturn.row;
    oReturn.valuesOriented = function() {
        return getGoogleSheetRangeValuesOriented(sRange)
        .map(function(oElement008) {
            return oElement008.map(function(oElement007) { return oReturn[oElement007]; })
        });
    }
    oReturn.values = function() {
        return getGoogleSheetRange(sRange).reduce(function(oAgg, oElement) {
            try {
                sValue = domTableToEXCELObject(domTable)[oElement].querySelectorAll("input, textarea, select")[0].value
            } catch(e) {
                // console.log(domTableToEXCELObject(domTable))
                // console.log(oElement);
                sValue = domTableToEXCELObject(domTable)[oElement].innerText;
            }
            oAgg.push(sValue);
            return oAgg;
        }, [])
    }
    oReturn.valuesValuesOriented = function() {
        return oReturn.valuesOriented().map(function(oElement087) {
            return oElement087.map(function(oElement088) {
                try {
                    return oElement088.querySelectorAll("input, textarea, select")[0].value;
                } catch(e) {
                    return oElement088.innerText;
                }
            })
        })
    }
    return oReturn;
}


// domTableToEXCELFULLRANGE = function(domTable) { return domTableToEXCELObject(domTable); }
domTableToEXCELObject = function(domTable) { // domTableToEXCELObject("table")
    oReturn = domTableToValuesOrientedDomTDs(domTable).reduce(function(oAgg122, oElement122, iIndex122) {
        oElement122.forEach(function(oElement123, iIndex123) {
            oAgg122[columnToLetter(iIndex123 + 1) + (iIndex122+1)] = oElement123;
            oElement123
        })
        return oAgg122;
    }, {})

    return oReturn;
    
}

domTableToValuesOrientedDomTDs = function(domTable) { // domTableToValuesOrientedDomTDs("table.gsws")
    if (typeof(domTable) == "string") { // eg "table.gsws"
        domTable = document.querySelectorAll(domTable)[0]
    }
    if (domTable == undefined) { domTable = document.querySelectorAll("table")[0]; }
    if (domTable != undefined) {
        return Array.prototype.slice.call((domTable).querySelectorAll("tr")).map(function(oElement) {
            return Array.prototype.slice.call(oElement.querySelectorAll("td"));
        })
    } else {

    }
}



function toHTMLSelect(aArray, sClassList) { // refractor this to accept array of values vs array of objects (select id?)
    // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
    if (sClassList == undefined) { sClassList = "aArraySelect"; }
    return "<select class='" + sClassList + "'><option></option>" + aArray.map(function(oElement) { return "<option>" + oElement + "</option>"; }).join("");
}

function strip_tags(str) {
    // sample usage:
    // strip_tags("<table><tr><td>blah</td></tr><tr><td>blah2</td></tr></table");
    str = str.toString();
    return str.replace(/<\/?[^>]+>/gi, '');
}

convertHTMLTableToValuesOriented = function(sHTMLTable) {
    // convertHTMLTableToValuesOriented(".convertValuesOrientedToHTMLTable");
    // sHTMLTable = ".convertValuesOrientedToHTMLTable";
    return Array.prototype.slice.call($(sHTMLTable)[0].querySelectorAll("tr")).map(function(oElement) {
        return Array.prototype.slice.call(oElement.querySelectorAll("td")).map(function(oElement0) {
            if (oElement0.querySelectorAll("select")[0]) {
                return oElement0.querySelectorAll("select")[0].value; //[0].value;
            } else {
                return oElement0.innerText; // | oElement0.value;
            }
        });
    })
}


HTMLElement.prototype.prependHtml = function (element) {
    const div = document.createElement('div');
    div.innerHTML = element;
    this.insertBefore(div, this.firstChild);
}; HTMLElement.prototype.prependHTML = HTMLElement.prototype.prependHtml;

HTMLElement.prototype.appendHtml = function (element) {
    const div = document.createElement('div');
    div.innerHTML = element;
    while (div.children.length > 0) {
        this.appendChild(div.children[0]);
    }
}; HTMLElement.prototype.appendHTML = HTMLElement.prototype.appendHtml;

function theadify(sTable) {
    // sTable = "table.RecordsOrientedArrayToHTML";
    // theadify(table.RecordsOrientedArrayToHTML);
    theadify = $(sTable)[0].querySelectorAll("tr th, tr td")[0].parentNode;
    $(sTable)[0].createTHead();
    theadify.remove()
    $(sTable)[0].querySelectorAll("thead")[0].appendChild(theadify)
}


/* BEGIN getElementsByInnerText vs contains */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

HTMLElement.prototype.getElementsByInnerText = function (text, escape) {
    var nodes  = this.querySelectorAll("*");
    var matches = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText == text) {
            matches.push(nodes[i]);
        }
    }
    if (escape) {
        return matches;
    }
    var result = [];
    for (var i = 0; i < matches.length; i++) {
        var filter = matches[i].getElementsByInnerText(text, true);
        if (filter.length == 0) {
            result.push(matches[i]);
        }
    }
    return result;
};
document.getElementsByInnerText = HTMLElement.prototype.getElementsByInnerText;

HTMLElement.prototype.getElementByInnerText = function (text) {
    var result = this.getElementsByInnerText(text);
    if (result.length == 0) return null;
    return result[0];
}
document.getElementByInnerText = HTMLElement.prototype.getElementByInnerText;

/* END getElementsByInnerText vs contains */




// GoogleSheets / HTML scripts - in order of flexibility 02/06 MASTER COPY
GSTDINSERT = function(sTable, sColumnOrRow, aValues) {
    //console.log(isNaN(parseInt(sColumnOrRow)));
    if (!isNaN(parseInt(sColumnOrRow))) {
        // console.log(2)
        row = $(sTable)[0].insertRow(sColumnOrRow);
        aValues.forEach(function(oElement, iIndex) {
            cell = row.insertCell(iIndex);
            cell.innerHTML = oElement.toString();
        })
    } else { // .insertColumn() logic, unfortunate that dom nor jQuery does an insertColumn

    }
}

GSTDRANGE = function(sRange) {
    // GSTDRANGE("table.gsws:nth-child(2)!A1:*"); // VERY POWERFUL - GETS THE SECOND INSTANCE OF table.gsws!
    sRange = sRange.replace(/\!/g, "."); // WorksheetName!A1 vs tableid.A1
    var aCellTokens = sRange.split(".");
    if (aCellTokens.length > 1) {
        sRange = aCellTokens[aCellTokens.length-1];

        if (aCellTokens.length==2) {
            var sTableSelector = "" + aCellTokens[0];
        } else {
            aCellTokens.pop();
            var sTableSelector = aCellTokens.join(".");            
        }
    } else {
        var sTableSelector = "table.gsws"; // just pick the first gsws in the document as default
    }
    if (sRange == undefined) { sRange = "A1"; }
    sWorksheetName = "table.gsws";
    if (sRange.indexOf(":") == -1) { sRange = sRange + ":" + sRange }


    if (sRange.indexOf("*") > -1) {
        try {
            var aTDs = domTableToValuesOrientedDomTDs("#" + sTableSelector);
            if (document.querySelectorAll("#" + sTableSelector)[0] == undefined) { var aTDs = domTableToValuesOrientedDomTDs(sTableSelector); }
            // console.log(aTDs);
            var aLastRowTDs = aTDs[aTDs.length-1];
            var sLastCell = aLastRowTDs[aLastRowTDs.length-1].classList.value.match(/[A-Z]+[0-9]+/g)[0]
            var sLastColumn = sLastCell.match(/[A-Z]+/g)[0];
            var sLastRow = sLastCell.match(/[0-9]+/g)[0];
            // sRange = "A1:*1";
            // sRange = "A1:*";
            // sRange = "A1:D*";

            if (sRange.match(/:\*$/g)) {
                sRange = sRange.replace(/:\*$/g, ":" + sLastCell)
            }

            if (sRange.match(/:\*/g)) {
                sRange = sRange.replace(/:\*/g, ":" + sLastColumn)
            }

            if (sRange.match(/\*$/g)) {
                sRange = sRange.replace(/\*/g, sLastRow)
            }
        } catch(e) {
            // console.log(e);
            sRange = sRange.replace(/:\*$/g, ":Z26")
        }
    }

    return getGoogleSheetRange(sRange).map(function(oElement) { return GSTDCELL(sTableSelector + "!" + oElement); }).filter(function(oElement) { return oElement != undefined; })
}
GSTDSUM = function(sCells) { // GSTDSUM("C3:H7") GSTDRANGE("G1:H2") // GSTDSUM("MylesStampingQCellComment!B2:*2")
    // return getGoogleSheetRange(sCells).reduce(function(oAgg, oElement) {
    return GSTDRANGE(sCells).reduce(function(oAgg, oElement) {
        if (oElement == undefined || oElement == null || oElement == "") { return oAgg + 0; } else {
            // iValue = $("#gscell_" + oElement + " >textarea")[0].value
            // console.log()
            iValue = oElement.innerText || oElement.value;
            if (isNaN(parseInt(iValue))) { iValue = 0; } else { iValue = parseInt(iValue); }
            oAgg += iValue;
            return oAgg;
        }
    }, 0);
}
GSTDCELL_ENTERIFY = function() {
    $(".gsws input, .gsws textarea, .gsws select").on('keypress', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            sCurrentColumn = this.parentNode.classList.value.match(/column[A-Z]+/g)[0]
            sNextColumn = "column" + columnToLetter(letterToColumn(sCurrentColumn.replace(/column/g, "")) + 1)
            aArrayOfTDs = Array.prototype.slice.call(document.querySelectorAll(".gsws td." + sCurrentColumn)).concat( Array.prototype.slice.call( document.querySelectorAll(".gsws td." + sNextColumn) ) );
            iIndex = Array.prototype.indexOf.call(aArrayOfTDs, this.parentNode);
            aArrayOfTDs[iIndex+1].querySelectorAll("input, select, textarea")[0].focus();
        }
    });
}
GSTDRANGEINPUTIFY = function (sRange) {
    // GSTDRANGEINPUTIFY("valuesOriented!A2:*");
    //oElement = GSTDRANGE("valuesOriented!A2:*")[0];
    GSTDRANGE(sRange).forEach(function(oElement) {
        oElement.style = "padding: 0 0 0 0 !important";
        // oElement.innerHTML = "<input style='width:100%; height:100%; padding: 0 0 0 0 !important; margin: 0 0 0 0 !important;' value='" + superhtmlEntities(oElement.innerHTML) + "'></input>";
        oElement.innerHTML = "<input style='padding: 0 0 0 0 !important; margin: 0 0 0 0 !important;' value='" + superhtmlEntities(oElement.innerHTML) + "'></input>";
    })
}

function subtractCells(sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
= sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
= sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement - parseInt(aCell2[iIndex]) }) }
// subtractCells("B1", "A1")
function addCells(sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
= sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
= sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement + parseInt(aCell2[iIndex]) }) }
getGoogleSheetRange = function (sCells) {
    // getGoogleSheetRange("C3:E6")
    // getGoogleSheetRange("C3:D3")
    // getGoogleSheetRange("A3:G3,H5,H7")
    aReturn = []
    sCells.replace(/;/, ",").split(",").forEach(function(oElement343) {
        if (oElement343.indexOf(":") > -1) {
            var aCell1Array = convertCellToArray(oElement343.toString().split(":")[0]);
            var aCell2Array = convertCellToArray(oElement343.toString().split(":")[1]);

            aReturn = aReturn.concat(combineArraysRecursivelyCartesian([getRange3(aCell1Array[0],aCell2Array[0]), getRange3(aCell1Array[1],aCell2Array[1])]).map(function(oElement) {
                return convertArrayToCell(oElement);
            }))
        } else {
            aReturn.push(oElement343);
        }
    })
    return aReturn;
}
getGoogleSheetRangeValuesOriented = function(sCells) {
    // getGoogleSheetRangeValuesOriented("C4:G5");
    aArray = getGoogleSheetRange(sCells).filter(function(oElement) {
        return oElement.match(/[A-Z]+[0-9]+/);
    }).reduce(function(oAgg, oElement, iIndex) {
        // if (oElement.match(/[A-Z]+/)[0] != oAgg[iIndex].match(/[A-Z]+/)[0])
        if (iIndex == 0) {
            oAgg[0].push(oElement);
            return oAgg;
        } else {
            //console.log("iIndex =" + iIndex);
            //console.log("oAgg = " + JSON.stringify(oAgg));
            //console.log("oElement = " + oElement);
            // console.log("---");
            bCompletedMatrixingTask = false;
            //if (oAgg[oAgg.length-1][0].match(/[0-9]+/)[0] == oElement.match(/[0-9]+/)[0]) {
            // if (oAgg[oAgg.length-1][0].match(/[A-Z]+/)[0] == oElement.match(/[A-Z]+/)[0]) {
            oAgg.forEach(function(oElement345, iIndex) {
                if(oElement345[0].match(/[0-9]+/)[0] == oElement.match(/[0-9]+/)[0]) {
                    // oAgg[oAgg.length-1].push(oElement);
                    // oAgg[oAgg.length-iIndex].push(oElement);
                    oAgg[iIndex].push(oElement);
                    bCompletedMatrixingTask = true;
                }
            })
                // return oAgg;
            //} else {
            if (!bCompletedMatrixingTask) {
                oAgg.push([oElement]);
            } 
            return oAgg;
            //oAgg[0].push([oElement]);
            //return oAgg;

        }
    }, [[]])
    return aArray; // don't need lodash anymore now that i've done the bCompletedMatrixingTask method
    // return _.zip.apply(_, aArray); // transposes data
}


GSSUM = function(sCells) { // GSSUM("C3:H7") GSRANGE("G1:H2")
    // return getGoogleSheetRange(sCells).reduce(function(oAgg, oElement) {
    return GSRANGE(sCells).reduce(function(oAgg, oElement) {
        if (oElement == undefined || oElement == null || oElement == "") { return oAgg + 0; } else {
            // iValue = $("#gscell_" + oElement + " >textarea")[0].value
            iValue = oElement.value
            if (isNaN(parseInt(iValue))) { iValue = 0; } else { iValue = parseInt(iValue); }

            return oAgg += iValue;
        }
    }, 0);
}

GSCELL = function(sCell) {
    // return $("textarea." + sCell);
    sCell = sCell.replace(/\!/g, "."); // WorksheetName!A1 vs tableid.A1
    if (sCell.indexOf(".") > -1) {
        sTableSelector = "#" + sCell.split(".")[0];
        sCell = sCell.split(".")[1];
    } else {
        sTableSelector = "table.gsws"; // just pick the first gsws in the document as default
    }
    return document.querySelectorAll(sTableSelector)[0].querySelectorAll("td." + sCell + " textarea, td." + sCell + " input, td." +  sCell + " select");
}

GSTDCELL = function(sCell) {
    // return $("td." + sCell)[0]; 
    // sCell = "table.gsws.A1"
    sCell = sCell.replace(/\!/g, "."); // WorksheetName!A1 vs tableid.A1
    aCellTokens = sCell.split(".");
    if (aCellTokens.length > 1) {
        sCell = aCellTokens[aCellTokens.length-1];

        if (aCellTokens.length==2) {
            sTableSelector = "#" + aCellTokens[0];
        } else {
            aCellTokens.pop();
            sTableSelector = aCellTokens.join(".");
            
        }
    } else {
        sTableSelector = "table.gsws"; // just pick the first gsws in the document as default
    }
    return document.querySelectorAll(sTableSelector)[0].querySelectorAll("td." + sCell + ", th." + sCell)[0];
}

GSRANGE = function(sRange) { // GS is textareas and GSTD are tds
    if (sRange == undefined) { sRange = "A1"; }
    if (sRange.indexOf(":") == -1) { sRange = sRange + ":" + sRange }
    return getGoogleSheetRange(sRange).map(function(oElement) { return GSCELL(oElement)[0] })
}



GSCELLVALUE = function(sCell) {
    // return $("textarea." + sCell);
    // GSTDCELL("valuesOriented!A1").innerText || GSTDCELL("valuesOriented!A2").querySelectorAll("input, select, textarea")[0].value
    /*
    try {
        return document.querySelectorAll("table.gsws")[0].querySelectorAll("td." + sCell + " textarea, td." + sCell + " input, td." +  sCell + " select")[0].value;
    } catch(e) {
        return document.querySelectorAll("table.gsws")[0].querySelectorAll("td." + sCell).innerText;
    } */

    return GSTDCELL(sCell).innerText || GSTDCELL(sCell).querySelectorAll("input, select, textarea")[0].value
}
GSCELLVALUES = function(sRange) { // domTableToEXCELRANGE vs GSCELLVALUES
    return GSTDRANGE(sRange).map(function(oElement) { return GSCELLVALUE(oElement.title); })
    // remember domTableToEXCELRANGE as another version of GSTDRANGE to help me remember to refractor both to make this whole GS/HTML/JS solution robust
    // sample ALTERNATIVE CALL: return domTableToEXCELRANGE("#valuesOriented", "A1:B2").values()
}


GSCELLFORMULA = function(sCell) { return GSCELL(sCell)[0].dataset.gsvalue; }
VLOOKUP = function(sValue, sRange, sColumn) {
    // VLOOKUP("b", "D3:E5", "2")
    aValues = domTableToEXCELRANGE(sRange).valuesValuesOriented();
    return VorHLOOKUP(sValue, aValues, sColumn);
}

HLOOKUP = function(sValue, sRange, sRow) {
    // HLOOKUP("b", "D3:E5", "2")
    aValues = domTableToEXCELRANGE(sRange).valuesValuesOriented();
    aValues = _.zip.apply(_, aValues); // transposed
    return VorHLOOKUP(sValue, aValues, sRow);
}

VorHLOOKUP = function(sValue, aValues, sColumnOrRow) {
    aValues.unshift( aValues[0].map(function(oElement, iIndex) { return (iIndex+1).toString() }) )
    aValuesOneOriented = toXXXOrientated(toRecordsOriented(aValues), "1");
    if (typeof(sValue) == "string") {
        if (aValuesOneOriented[sValue] != undefined) {
            if (Array.isArray(aValuesOneOriented[sValue])) {
                console.log(Object.keys(toXXXOrientated(aValuesOneOriented[sValue], sColumnOrRow)))
                return Object.keys(toXXXOrientated(aValuesOneOriented[sValue], sColumnOrRow)).join(";")
            } else {
                if (sColumnOrRow != undefined) {
                    return aValuesOneOriented[sValue][sColumnOrRow]
                } else {
                    return Object.keys(aValuesOneOriented[sValue]).map(function(oElement333) { return aValuesOneOriented[sValue][oElement333] }).join(";");
                    // return aValuesOneOriented[sValue].join(";");
                }
            }
        } else { return undefined; }
    } else { // else a regex was passed..go to town!
        // console.log("aValuesOneOriented = " + JSON.stringify(aValuesOneOriented));
        aMatches = Object.keys(aValuesOneOriented).filter(function(oElement234) { return oElement234.match(sValue); })
        // console.log("aMatches = " + JSON.stringify(aMatches))
        // console.log(aMatches)
        return aMatches.map(function(oElement23) {
            if (sColumnOrRow != undefined) {
                return aValuesOneOriented[oElement23][sColumnOrRow]
            } else {
                return Object.keys(aValuesOneOriented[oElement23]).map(function(oElement333) { return aValuesOneOriented[oElement23][oElement333] }).join(";");
            }
        }).join(";");
    }
}


// random vanilla DOM manipulation scripts
// // replace body tag's innerHTML with div
// document.getElementsByTagName('body')[0].innerHTML = "<div id='my'>blahHTML<div>"

function dom_lookupvalueHTMLTable(sTable, sRowValue, iColumn) {
    // sTable = "cualquierPotencialidad"; sRowValue = "pdf dump"; iColumn = 1;
    // dom_lookupvalueHTMLTable("cualquierPotencialidad", "pdf dump", 1);
    return Array.from( $("#" + sTable)[0].children[0].children ).reduce(function(agg, oElement) {
        if (oElement.children[0].innerText == sRowValue) {
            return agg + oElement.children[iColumn].innerText;
        } else {
            return agg;
        }
        console.log()
        return agg + oElement;
    }, "")
}

function filterHTMLTable(sTable, iColumn, aAcceptableValues) {
    // aAcceptableValues = ["aOrderItemsALL", "POST daterange", "buttons"]; filterHTMLTable("cualquierPotencialidad", 0, aAcceptableValues);
    iColumn = 0; //first column
    //Array.from($("#cualquierPotencialidad")[0].children[iColumn].children).forEach(function(oElement) {
    Array.from($("#" + sTable + "")[0].children[iColumn].children).forEach(function(oElement) {
        //gObject = oElement;
        var bDecision = aAcceptableValues.reduce(function(agg098, oElement098) { return agg098 && (oElement.children[0].innerText != oElement098);}, true);

        if (bDecision) {
            oElement.style.display = "none";
        }
        //console.log(Array.from(oElement.children))
    })
}


// remove first column, consider refractoring to something cooler
function removeHTMLTableColumn(sTable, iColumn) {
    // removeHTMLTableColumn('cualquierPotencialidad', 0);
    Array.from($("#" + sTable + "")[0].children[0].children).forEach(function(oElement) {
        oElement.children[iColumn].style.display = "none"
    })
}

// Excel-like dom manipulation functions on html tables
domTableToEXCELRANGE = function(domTable, sRange) { // domTableToEXCELRANGE("table.gsws", "C2:G4").row("3");
    // domTableToEXCELRANGE("A1:B2,C4:D7")
    function oEXCELRANGE() {};
    if (domTable == undefined) { domTable = document.querySelectorAll("table.gsws")[0]; sRange="A1:*" }
    if (sRange == undefined) { sRange = domTable; domTable = document.querySelectorAll("table.gsws")[0]; }



    if (sRange.indexOf("*") > -1) {
            try {
                var aTDs = domTableToValuesOrientedDomTDs(domTable);
                if (document.querySelectorAll(domTable)[0] == undefined) { var aTDs = domTableToValuesOrientedDomTDs(domTable); }
                // console.log(aTDs);
                var aLastRowTDs = aTDs[aTDs.length-1];
                var sLastCell = aLastRowTDs[aLastRowTDs.length-1].classList.value.match(/[A-Z]+[0-9]+/g)[0]
                var sLastColumn = sLastCell.match(/[A-Z]+/g)[0];
                var sLastRow = sLastCell.match(/[0-9]+/g)[0];
                // sRange = "A1:*1";
                // sRange = "A1:*";
                // sRange = "A1:D*";

                if (sRange.match(/:\*$/g)) {
                    sRange = sRange.replace(/:\*$/g, ":" + sLastCell)
                }

                if (sRange.match(/:\*/g)) {
                    sRange = sRange.replace(/:\*/g, ":" + sLastColumn)
                }

                if (sRange.match(/\*$/g)) {
                    sRange = sRange.replace(/\*/g, sLastRow)
                }
            } catch(e) {
                // console.log(e);
                sRange = sRange.replace(/:\*$/g, ":Z26")
            }
    }



    // eg domTableToEXCELRANGE("table.gsws", "A1:D2,G4")
    oReturn = {};
    sRange.split(",").forEach(function(oElement362) {
        oReturn = getGoogleSheetRange(oElement362).reduce(function(oAgg, oElement) {
            oAgg[oElement] = domTableToEXCELObject(domTable)[oElement];
            return oAgg;
        }, oReturn)
    })
    oReturn.column = function(sColumn) {
        if (!isNaN(parseInt(sColumn))) { sColumn = columnToLetter(sColumn); }
        return Object.keys(oReturn).filter(function(oElement) {
            sColumn = sColumn.toString();
            rMatch = sColumn + "[0-9]+";
            // console.log(oElement + ".matching with " + sColumn);
            return oElement.match(rMatch)
        }).map(function(oElement) { return oReturn[oElement]; })
    }
    oReturn.columns = oReturn.column;
    oReturn.row = function(sRow) { return Object.keys(oReturn).filter(function(oElement) {
        sRow = sRow.toString(); rMatch = "[A-Z]+" + sRow;
        return oElement.match(rMatch)
    }).map(function(oElement) { return oReturn[oElement]; }) }
    oReturn.rows = oReturn.row;
    oReturn.valuesOriented = function() {
        return getGoogleSheetRangeValuesOriented(sRange)
        .map(function(oElement008) {
            return oElement008.map(function(oElement007) { return oReturn[oElement007]; })
        });
    }
    oReturn.values = function() {
        return getGoogleSheetRange(sRange).reduce(function(oAgg, oElement) {
            try {
                sValue = domTableToEXCELObject(domTable)[oElement].querySelectorAll("input, textarea, select")[0].value
            } catch(e) {
                // console.log(domTableToEXCELObject(domTable))
                // console.log(oElement);
                sValue = domTableToEXCELObject(domTable)[oElement].innerText;
            }
            oAgg.push(sValue);
            return oAgg;
        }, [])
    }
    oReturn.valuesValuesOriented = function() {
        return oReturn.valuesOriented().map(function(oElement087) {
            return oElement087.map(function(oElement088) {
                try {
                    return oElement088.querySelectorAll("input, textarea, select")[0].value;
                } catch(e) {
                    try {
                        return oElement088.innerText;
                    } catch(e) { return oElement088; }
                }
            })
        }).filter(function(oElement88) { return oElement88 != undefined })
    }
    oReturn.array = function() {
        return oReturn.valuesOriented().reduce(function(oAgg, oElement) {
            oElement.forEach(function(oElement000) {
                oAgg.push(oElement000);
            })
            // oAgg.push(oElement)
            return oAgg;
        }, [])
    }
    return oReturn;
}

// domTableToEXCELFULLRANGE = function(domTable) { return domTableToEXCELObject(domTable); }
domTableToEXCELObject = function(domTable) { // domTableToEXCELObject("table")
    oReturn = domTableToValuesOrientedDomTDs(domTable).reduce(function(oAgg122, oElement122, iIndex122) {
        oElement122.forEach(function(oElement123, iIndex123) {
            oAgg122[columnToLetter(iIndex123 + 1) + (iIndex122+1)] = oElement123;
            oElement123
        })
        return oAgg122;
    }, {})

    return oReturn;
    
}

domTableToValuesOrientedDomTDs = function(domTable) { // domTableToValuesOrientedDomTDs("table.gsws")
    if (typeof(domTable) == "string") { // eg "table.gsws"
        domTable = document.querySelectorAll(domTable)[0]
    }
    if (domTable == undefined) { domTable = document.querySelectorAll("table")[0]; }
    if (domTable != undefined) {
        return Array.prototype.slice.call((domTable).querySelectorAll("tr")).map(function(oElement) {
            return Array.prototype.slice.call(oElement.querySelectorAll("th, td"));
        })
    } else {

    }
}


function addAnimateCSSToHover(sSelector, sClass) {  // jQuery-dependent
   sClass = 'animated animate__animated animate__' + sClass; 
   $(sSelector).hover(function(){
       $(this).addClass(sClass);
   });
   $(sSelector).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
      $(this).removeClass(sClass);
   });
}

oGetAllParameters_CLIENT = function() {
    if (location.search.substring(1)) {
        return JSON.parse('{"' + location.search.substring(1).split("&").map(function(oEl) { return (oEl.indexOf("=")==-1 ? oEl + "=" : oEl) }).join("&").replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    } else { return {}; }
}