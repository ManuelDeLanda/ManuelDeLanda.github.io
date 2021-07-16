try { // domscripts.serverUNsafe and ES5_UNsafe
    var $$$ = document.querySelectorAll.bind(document); 
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
    convertHTMLTableToValuesOriented = function(domTable) { return domTableToValuesOrientedDomTDs(domTable).map(function(oEl) { return oEl.map(function(oEl2) { return oEl2.innerText; }) }) }
    domTableToValuesOriented = convertHTMLTableToValuesOriented;

    function toHTMLSelect(aArray, sClassList) { // refractor this to accept array of values vs array of objects (select id?)
        // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
        if (sClassList == undefined) { sClassList = "aArraySelect"; }
        return "<select class='" + sClassList + "'><option></option>" + aArray.map(function(oElement) { return "<option>" + oElement + "</option>"; }).join("");
    }
  
    /* refactored this on 7/16/2021 in favor of
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
    } */

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

fetch_XMLHttpRequest=function(oTypeURLPayload) {
    // var oTypeURLPayload = { type:"POST", url: "https://collegediscgolf.com/wp-json/api/v1/author/2", payload: {filter: "2asdf"}};
    superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }

    var sXMLHttpRequestResponseText = "";
    var xmlhttp = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            sXMLHttpRequestResponseText = this.responseText;
            // console.log(sXMLHttpRequestResponseText);
            /* my solution currently responds with html, so I need to parse out the body's innerText */
            var parser = new DOMParser();
            var domXMLHttpRequestResponseText = parser.parseFromString(sXMLHttpRequestResponseText, "text/html");
            //sXMLHttpRequestResponseText = domXMLHttpRequestResponseText.getElementsByTagName('body')[0].innerText;

            resolve(sXMLHttpRequestResponseText);
          } else {}
        };
        xmlhttp.open(oTypeURLPayload.type, oTypeURLPayload.url, true);
        var sParams;
        if (oTypeURLPayload.payload != undefined) {
            sParams = Object.keys(oTypeURLPayload.payload).map(function(oElement) {
                return superencode(oElement) + "=" + superencode(oTypeURLPayload.payload[oElement]);
            }).join("&");
        }

        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // JSON SENDING DOESN'T WORK!  HELP!
        //xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");

        xmlhttp.send(sParams);
    })
// }.then(function(sResponse) {  console.log(sResponse.trim());  })
} 

SubmitSuperNinjaForm=function (oTypeURLPayload, sTarget) {
  superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
  if ((oTypeURLPayload == null) || (oTypeURLPayload == undefined) || (oTypeURLPayload == "")) {
    var oTypeURLPayload = { type:"POST", payload: {script: 84, deploy: 1, context: "llave", payload: "just testing" } }; 
    var sURL = "https://acct138579.app.netsuite.com/app/site/hosting/scriptlet.nl?script=84&deploy=1&context=llave";
    oTypeURLPayload.url = sURL;
  } 
  var dom_form = document.createElement('form');
  dom_form.setAttribute("target",sTarget);
  dom_form.name = 'superninjaform';
  dom_form.id = 'superninjaform';
  dom_form.method = oTypeURLPayload.type;
  dom_form.action = ((oTypeURLPayload.url != undefined) ? oTypeURLPayload.url : window.location.href.split("?")[0] ); 
  document.body.appendChild(dom_form);
  dom_form.innerHTML = Object.keys(oTypeURLPayload.payload).reduce(function(agg, oElement) {
    agg += '<input type="hidden" name="' + oElement + '" id="' + oElement + '" value="' + superencode(oTypeURLPayload.payload[oElement]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
    return agg;
  }, "")
  dom_form.submit();
}
SubmitSuperNinjaForm.sample = function() { 
  console.log(`
              var oTypeURLPayload = { type:"POST", url: "https://collegediscgolf.com/wp-json/api/v1/author/2", payload: {filter: "2asdf"}};
              
              SubmitSuperNinjaForm(oTypeURLPayload);
  fetch_XMLHttpRequest(oTypeURLPayload).then(function(sResponse) { console.log(sResponse.trim()); });
  sResponse = await fetch_XMLHttpRequest(oTypeURLPayload);
  `)
}; fetch_XMLHttpRequest.sample = SubmitSuperNinjaForm.sample;
  
  
  oGetAllParameters_CLIENT = function() {
    if (location.search.substring(1)) {
      return JSON.parse('{"' + location.search.substring(1).split("&").map(function(oEl) { return (oEl.indexOf("=")==-1 ? oEl + "=" : oEl) }).join("&").replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    } else { return {}; }
  }


} catch(e) {}

// domscripts.serversafe
/* // refractored 12/16
convertRecordsOrientedArrayToHTMLTable = function (aRecordsOriented, aColumns) {
    // var aColumns = ["entityid ];
    //aColumns = aColumns || undefined;
    //if (aColumns == undefined) {
    //    var aColumns = Object.keys(aRecordsOriented[0]);
    //}
  
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
  
    sHTMLTable = "<table class='RecordsOrientedArrayToHTML' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement) {
        agg = agg + "<tr>" + aColumns.reduce(function(agg000, oElement000) {
            agg000 = agg000 + "<td style='text-align:left'>" + oElement[oElement000] + "</td>";
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, 
        "<tr>" + aColumns.reduce(function(agg001, oElement001) {
            return agg001 + "<th style='border-right: 1px solid black; border-left: 1px solid black;'>" + oElement001 + "</th>";
        }, "") + "</tr>"
    ) + "</table>";
        return sHTMLTable;
}
*/
convertRecordsOrientedArrayToHTMLTable = function (aRecordsOriented, aColumns, sTableID) {
    // convertRecordsOrientedArrayToHTMLTable(aRecordsOriented)
    function columnToLetter(r){for(var o,t="";r>0;)o=(r-1)%26,t=String.fromCharCode(o+65)+t,r=(r-o-1)/26;return t}function letterToColumn(r){for(var o=0,t=r.length,n=0;n<t;n++)o+=(r.charCodeAt(n)-64)*Math.pow(26,t-n-1);return o}
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (sTableID == undefined) { sTableID = ""; }

    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
    // gsws gsws_SDJOWholeForm A4 gscell columnA row4
    sHTMLTable = "<table id='" + sTableID + "' class='RecordsOrientedArrayToHTML gsws gsws_" + sTableID + "' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement, iIndex) {
        agg = agg + "<tr>" + aColumns.reduce(function(agg000, oElement000, iIndex000) {
            var sCell = columnToLetter(iIndex000+1) + (iIndex+2);
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row" + (iIndex+2) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            agg000 = agg000 + "<td title='" + sCell + "' class='" + sClasses + "'>" + oElement[oElement000] + "</td>"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, 
        "<tr>" + aColumns.reduce(function(agg001, oElement001, iIndex001) {
            var sCell = columnToLetter(iIndex001+1) + "1";
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            // var sClasses = "gsws row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            return agg001 + "<th title='" + sCell + "' class='" + sClasses + "'>" + oElement001 + "</th>"; // style='border-right: 1px solid black; border-left: 1px solid black;'
        }, "") + "</tr>"
    ) + "</table>";
        return sHTMLTable;
}
convertValuesOrientedToHTMLTable = function(aValuesOriented, aColumns, sTableID) {
    /// convertValuesOrientedToHTMLTable([[1,2,3,4],[0,0,0,0],[9,9,9,9]], undefined, "gswsvo")
    function columnToLetter(r){for(var o,t="";r>0;)o=(r-1)%26,t=String.fromCharCode(o+65)+t,r=(r-o-1)/26;return t}function letterToColumn(r){for(var o=0,t=r.length,n=0;n<t;n++)o+=(r.charCodeAt(n)-64)*Math.pow(26,t-n-1);return o}
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (sTableID == undefined) { sTableID = ""; }

    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 // aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
    // gsws gsws_SDJOWholeForm A4 gscell columnA row4
    sHTMLTable = "<table id='" + sTableID + "' class='convertValuesOrientedToHTMLTable gsws gsws_" + sTableID + "' style='margin: 0 auto; text-align: center;'>" + aValuesOriented.reduce(function(agg, oElement, iIndex) {
        agg = agg + "<tr>" + oElement.reduce(function(agg000, oElement000, iIndex000) {
            //console.log(oElement);
            var sCell = columnToLetter(iIndex000+1) + (iIndex+1);
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row" + (iIndex+1) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            agg000 = agg000 + "<td title='" + sCell + "' class='" + sClasses + "'>" + oElement000 + "</td>"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, "") + "</table>";
    return sHTMLTable.replace(/ id=''/g, "");
}
/* refractored with gsws on 1/18
convertRecordsOrientedArrayToHTMLTable = function (aRecordsOriented, aColumns) {
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
  
    sHTMLTable = "<table class='RecordsOrientedArrayToHTML' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement) {
        agg = agg + "<tr>" + aColumns.reduce(function(agg000, oElement000, iIndex000) {
            agg000 = agg000 + "<td class='cellcolumn" + iIndex000 + "'>" + oElement[oElement000] + "</td>"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, 
        "<tr>" + aColumns.reduce(function(agg001, oElement001, iIndex001) {
            return agg001 + "<th class='cellcolumn" + iIndex001 + "'>" + oElement001 + "</th>"; // style='border-right: 1px solid black; border-left: 1px solid black;'
        }, "") + "</tr>"
    ) + "</table>";
        return sHTMLTable;
}
*/

convertRecordsOrientedArrayToExcelXML = function(aArray, aColumns) {
  // convertRecordsOrientedArrayToExcelXML
  // normalize aRecordsOriented
  var aRecordsOriented = toRecordsOriented(toValuesOriented(aArray));
  aColumns = aColumns || undefined;
  if (aColumns == undefined) {
    var aColumns = Object.keys(aArray[0]);
  }
  function convertSingleArrayToExcelRow(aSingleArray) {
    return "<Row>" + aSingleArray.reduce(function(agg000, oElement000, iIndex000) {
      if (Array.isArray(oElement000)) { oElement000 = JSON.stringify(oElement000) }
      oElement000 = oElement000.toString();
      agg000 = agg000 + "<Cell><Data ss:Type=\"String\">" + oElement000.replace(/</g, "").replace(/>/g, "").replace(/\"/g, "").replace(/\n/g, " ") + "</Data></Cell>";
      return agg000;
    }, "") + "</Row>";
  }
  return '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"><Worksheet ss:Name="Sheet1"><Table>' + aArray.reduce(function(agg, oElement, iIndex) { // Object.keys(oElement).map vs aColumns.map
    return agg + convertSingleArrayToExcelRow(aColumns.map(function(oElement007){ return oElement[oElement007]}) );
  }, convertSingleArrayToExcelRow(aColumns) ) + "</Table></Worksheet></Workbook>";
}

convertaRecordsOrientedToInputBoxesForm = function(oICIResponse, aFields) {  
    if (aFields == undefined) { aFields = Object.keys(oICIResponse); }
    return aFields.reduce(function(agg009, oElement009, iIndex009) {
        if (oICIResponse[oElement009] == undefined) { oICIResponse[oElement009] = ""; }
        sValue = oICIResponse[oElement009];
        if (typeof(sValue) != "string") { sValue = JSON.stringify(sValue) }
        if (oICIResponse[oElement009].toString().indexOf("\n") > -1) {
            agg009 = agg009 + "<tr><td><b>" + oElement009 + ": </b></td><td><textarea rows='10' cols='30' class='inputtedObject' id='label_" + oElement009 + "' name='label_" + oElement009 + "' />" +  superhtmlEntities(sValue) + "</textarea></td>";
        } else {
            agg009 = agg009 + "<tr><td><b>" + oElement009 + ": </b></td><td><input style='width:100%' class='inputtedObject' type='text' id='label_" + oElement009 + "' name='label_" + oElement009 + "' value='" + superhtmlEntities(sValue) + "' /><td>";
        }
        return agg009;
    }, "<table>") + "</table>"
}