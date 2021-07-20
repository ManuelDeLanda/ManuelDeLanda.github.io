try { // domscripts.serverUNsafe and ES5_UNsafe
  /* BEGIN - THESE FUNCTIONS SHOULD NEVER BE ADDED TO datascripts.js? */
  // REFACTORING NOTES:
  // cellToColumn("C10") vs columnToLetter(convertCellToArray("C10")[0])?

  var $$$ = document.querySelectorAll.bind(document);
  HTMLElement.prototype.$$$ = function (element) { return this.querySelectorAll(element); }; 
  // SubmitSuperNinjaForm,fetch_XMLHttpRequest,oGetAllParameters_CLIENT()
  fetch_XMLHttpRequest=function(e){superencode=function(e){return encodeURIComponent(e).replace(/'/g,"%27")};var t="",n=new XMLHttpRequest;return new Promise(function(o,r){var a;n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){t=this.responseText;(new DOMParser).parseFromString(t,"text/html");o(t)}},n.open(e.type,e.url,!0),null!=e.payload&&(a=Object.keys(e.payload).map(function(t){return superencode(t)+"="+superencode(e.payload[t])}).join("&")),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.send(a)})},SubmitSuperNinjaForm=function(e,t){if(superencode=function(e){return encodeURIComponent(e).replace(/'/g,"%27")},null==e||null==e||""==e){(e={type:"POST",payload:{script:84,deploy:1,context:"llave",payload:"just testing"}}).url="https://acct138579.app.netsuite.com/app/site/hosting/scriptlet.nl?script=84&deploy=1&context=llave"}var n=document.createElement("form");n.setAttribute("target",t),n.name="superninjaform",n.id="superninjaform",n.method=e.type,n.action=null!=e.url?e.url:window.location.href.split("?")[0],document.body.appendChild(n),n.innerHTML=Object.keys(e.payload).reduce(function(t,n){return t+='<input type="hidden" name="'+n+'" id="'+n+'" value="'+superencode(e.payload[n])+'" />'+String.fromCharCode(10)+String.fromCharCode(13)},""),n.submit()},SubmitSuperNinjaForm.sample=function(){console.log('\n              var oTypeURLPayload = { type:"POST", url: "https://collegediscgolf.com/wp-json/api/v1/author/2", payload: {filter: "2asdf"}};\n              \n              SubmitSuperNinjaForm(oTypeURLPayload);\n  fetch_XMLHttpRequest(oTypeURLPayload).then(function(sResponse) { console.log(sResponse.trim()); });\n  sResponse = await fetch_XMLHttpRequest(oTypeURLPayload);\n  ')},fetch_XMLHttpRequest.sample=SubmitSuperNinjaForm.sample,oGetAllParameters_CLIENT=function(){return location.search.substring(1)?JSON.parse('{"'+location.search.substring(1).split("&").map(function(e){return-1==e.indexOf("=")?e+"=":e}).join("&").replace(/&/g,'","').replace(/=/g,'":"')+'"}',function(e,t){return""===e?t:decodeURIComponent(t)}):{}};  

// random vanilla DOM manipulation scripts
// // replace body tag's innerHTML with div
// document.getElementsByTagName('body')[0].innerHTML = "<div id='my'>blahHTML<div>"

    // UNORGANIZED HTML TABLE LOOKUPS/FILTERS/MANIPULATIONS
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
    // END UNORGANIZED HTML FILTERS/LOOKUPS/MANIPULATIONS
  
    domTableToValuesOrientedDomTDs = function(domTable) { // domTableToValuesOrientedDomTDs("table.gsws")
        if (typeof(domTable) == "string") { // eg "table.gsws"
            domTable = $$$(domTable)[0]
        }
        if (domTable == undefined) { domTable = $$$("table")[0]; }
        if (domTable != undefined) {
            return Array.prototype.slice.call((domTable).$$$("tr")).map(function(oElement) {
                return Array.prototype.slice.call(oElement.$$$("th,td"));
            })
        } else {

        }
    }
    convertHTMLTableToValuesOriented = function(domTable) { return domTableToValuesOrientedDomTDs(domTable).map(function(oEl) { return oEl.map(function(oEl2) { return domGetTDTextOrValue(oEl2); }) }) }
    domTableToValuesOriented = convertHTMLTableToValuesOriented;

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

    // BEGIN animate.css scripts
    function addAnimateCSSToHover(sSelector, sClass) {  // jQuery-dependent
       sClass = 'animated animate__animated animate__' + sClass; 
       $(sSelector).hover(function(){
           $(this).addClass(sClass);
       });
       $(sSelector).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
          $(this).removeClass(sClass);
       });
    }
    // END animate.css scripts

    // BEGIN EXTREMELY USEFUL vanilla dom scripts
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
    HTMLElement.prototype.getElementsByInnerText = function (text, escape) {
        var nodes  = this.querySelectorAll("*"); //  this.$$$("*"); doesn't work
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
    // END EXTREMELY USEFUL vanilla dom scripts

// NEW googlesheets scripts
// domscriptsSTEROIDS.js
GSDS_CELL = function(domTable, sA1Notation) { return GSDS_RANGE1D(domTable, sA1Notation)[0]; }
GSDS_RANGE1D = function(domTable, sA1Notation) { return GSDS_disjointedRangeToAVOdomTDs(domTable, sA1Notation).flat().filter(function(oEl) { return oEl }); }
GSDS_RANGE2D = function(domTable, sA1Notation) { return GSDS_disjointedRangeToAVOdomTDs(domTable, sA1Notation); }

GSDS_CELL_value = function (domTable, sA1Notation) { return domGetTDTextOrValue(GSDS_CELL(domTable, sA1Notation)); }
GSDS_CELL_valueParseInt = function (domTable, sA1Notation) { return domGetTDTextOrValueParseInt(GSDS_CELL(domTable, sA1Notation)); }

GSDS_RANGE1D_values = function (domTable, sA1Notation) { return GSDS_RANGE1D(domTable, sA1Notation).map(function(oEl) { return domGetTDTextOrValue(oEl) }); }
GSDS_RANGE2D_values = function (domTable, sA1Notation) { return GSDS_RANGE2D(domTable, sA1Notation).map(function(oEl) { return oEl.map(function(oEl2) { return domGetTDTextOrValue(oEl2) }) }) }

GSDS_GSDSifyTDRANGE = function(domTable, sA1Notation, sElementType, sAttributes, fOptionsFunction) {
    GSDS_inputifyTDRANGE(domTable, sA1Notation, sElementType, sAttributes, fOptionsFunction);
    GSDS_evalifyTDRANGE(domTable, sA1Notation);
}
GSDS_disjointedRangeToAVOdomTDs = function(domTable, sA1Notation) { // this function IS FOR DOM-ONLY.
  var oDomTableAndA1Notation=distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];
  // console.log(sA1Notation);
  if (domTable.oSmartRange == undefined) {
    GSDS_setOSR(domTable);
  }
  // sA1Notation = domReplaceAsterisksInA1Notation(domTable, sA1Notation);
  var aCellsFromRange = GSDS_disjointedRangeToAVO(sA1Notation).flat();
  // console.log(sA1Notation);
  return domTable.oSmartRange.allcells_valuesoriented.map(function(oEl) {
    return oEl.map(function(oEl2) {
      return ((aCellsFromRange.indexOf(oEl2) > -1) ? domTable.oSmartRange[oEl2].tdcell : null );
    })
  })
}
      
distinguishDomTableAndA1Notation = function(domTable, sA1Notation) {
    // distinguishDomTableAndA1Notation($$$('table'), "A1:*") vs distinguishDomTableAndA1Notation("table!A1:A*")
    if (sA1Notation == undefined) { // && typeof(domTable) != "object") {
        sA1Notation = domTable;
        domTable = undefined;
    } else {
        if (typeof(domTable) == "object") {
            if (domTable[0]!=undefined) { domTable = domTable[0]; } // just in case I didn't [0] already
        } else {
            domTable = $$$(domTable)[0];
        }
    }
    // console.log(sA1Notation);
    aA1Notation = sA1Notation.split("!");
    if (aA1Notation.length == 1) {
        if (domTable == undefined) {
            sSelector = "table"; // christ, just grab first table
            domTable = $$$(sSelector)[0]
        }
        sRange = aA1Notation[0];
    } else { // .length == 2 I hope?
        sSelector = aA1Notation[0];
        sRange = aA1Notation[1];
        domTable = $$$(sSelector)[0];
    }
    sA1Notation = domReplaceAsterisksInA1Notation(domTable, sRange);
    // domTable.oSmartRange.sA1Notation should be used to replace asterisks
    return { "domTable": domTable, "sA1Notation": sA1Notation }
}
domReplaceAsterisksInA1Notation = function(domTable, sA1Notation) {
    var domTableAVO = Array.from(domTable.$$$("tr")).map(oEl => Array.from(oEl.$$$("th,td")) );
    var sLastRow = domTableAVO.length; // do domTable.oSmartRange.width/height instead? of this?
    var sLastColumn = columnToLetter(domTableAVO[0].length);
    sA1Notation = sA1Notation.replace(/\-/g, ":").replace(/,/g, ";"); // sanitize
    sA1Notation = sA1Notation.split(";").map(function(oEl0) {
        oEl0=oEl0.trim();
        if (oEl0.match("^:")) { oEl0 = "A1" + oEl0;  }
        if (oEl0.match(":$")) { oEl0 = oEl0 + "*";  }
        return oEl0.split(":").map(function(oEl) {
          oEl=oEl.trim();
          if (oEl=="*") { oEl = sLastColumn+sLastRow.toString(); }
          oEl = oEl.replace(/^\*/, sLastColumn).replace(/\*$/, sLastRow);
          return oEl;
    }).join(":") }).join(";");
    return sA1Notation;
} 
GSDS_getOSR = function(domTable, sA1Notation) {
    var oDomTableAndA1Notation=distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];  
    var domTableAVO = Array.from(domTable.$$$("tr")).map(oEl => Array.from(oEl.$$$("th,td")) );
    // sA1Notation = domReplaceAsterisksInA1Notation(domTable, sA1Notation);
    // aVirtualRange = getGoogleSheetRangeValuesOriented(sRange);
    // aVirtualRange = GSDS_disjointedRangeToAVO(sA1Notation);

    oSmartRange = {};
    oSmartRange.range = sA1Notation;
    oSmartRange.allcells_valuesoriented = GSDS_disjointedRangeToAVO(sA1Notation); // getGoogleSheetRangeValuesOriented(oSmartRange.range);
    oSmartRange.height = oSmartRange.allcells_valuesoriented.length;
    oSmartRange.width = oSmartRange.allcells_valuesoriented[0].length;
    oSmartRange.allcells_valuesoriented.flat().filter(function(oEl) { return oEl; }).forEach(function(oEl) {
    // getGoogleSheetRange(oSmartRange.range).forEach(function(oEl) {
        iCurrentColumn = letterToColumn(oEl.match(/[A-Z]+/g)[0]);
        iCurrentRow = parseInt(oEl.match(/[0-9]+/g)[0]);
        // console.log(iCurrentColumn)
        oSmartRange[oEl] = {"tdcell": domTableAVO[iCurrentRow-1][iCurrentColumn-1] };
    })
    return oSmartRange;
}
GSDS_setOSR = function(domTable) { // accept domTable only?  never selector strings?
    domTable.oSmartRange = GSDS_getOSR(domTable, "A1:*"); // ALWAYS set a <table>'s OSR to ENTIRE table ("A1:*").
    return domTable.oSmartRange;
}
GSDS_getTDRANGE = function(domTable, sA1Notation) {
    var oDomTableAndA1Notation=distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];
    // sA1Notation = "table!*1:*";
    // sA1Notation = "table!A*:*";
    // sA1Notation = "table!B5";
    // sA1Notation = "table!*1";
    // sA1Notation = "table!*";
    // sA1Notation = "table!D*";
    // sA1Notation = "table!A*:*5";
    // sA1Notation = "table!*2:*7";
    oSmartRange = GSDS_getOSR(domTable, sA1Notation);
    return oSmartRange.allcells_valuesoriented.map(function(oEl) { return oEl.map(function(oEl1) { return oSmartRange[oEl1]["tdcell"] }) })
}

// domDebuggingElement = {};
// domDebuggingElement2 = {};
GSDS_inputifyTDRANGE = function(domTable, sA1Notation, sElementType, sAttributes, fOptionsFunction) { // REFACTOR THIS - change to removeChild and appendChildHTML instead of hardcoding the html strings!
  if ((sElementType == undefined) || ((sElementType != "textarea") && (sElementType != "select") && (sElementType != "button")) ) { sElementType="input"; }
  // console.log(sElementType);
  GSDS_getTDRANGE(domTable, sA1Notation).flat().forEach(function(domTD, iDomTD) {
        //if (domTD.querySelectorAll("input, select, textarea") == undefined) {
            if (iDomTD == 0) { domTD.closest("table").style.borderCollapse = "collapse"; domTD.closest("table").style.tableLayout = "fixed"; } // domTable isn't a real domTable sometimes it's a string.  gets rid of spaces between cells 
            domTD.style = "padding: 0 0 0 0 !important; !important; margin: 0 0 0 0 !important;";
            var sValue = superhtmlEntities(domGetTDTextOrValue(domTD))
            domTD.innerHTML = ""; // have to do this since removing all children nodes doesn't remove innerText!
            // oElement.innerHTML = "<input style='width:100%; height:100%; padding: 0 0 0 0 !important; margin: 0 0 0 0 !important;' value='" + superhtmlEntities(oElement.innerHTML) + "'></input>";
            if (sAttributes == undefined) { sAttributes = " "; }
            //sAttributes += " onClick=this.select();' style='padding: 0 0 0 0 !important; margin: 0 0 0 0 !important;' "
            var domElement = document.createElement(sElementType);
            Array.from(domTD.children).forEach(function(oEl) { domTD.removeChild(oEl) }); // remove ALL children from a node
            domTD.appendChild(domElement);
            // domTD.width = "50px !important"; domTD.height = "20px !important";
            domTD.style.width = "50px"; domTD.style.height = "20px";
            domElement.style.width = "50px"; domElement.style.height = "20px";
            domElement.style = "padding: 0 0 0 0 !important; !important; margin: 0 0 0 0 !important;";
            // domElement.width = "50px !important"; domElement.height = "20px !important";
            // domTD.innerHTML = "<" + sElementType + " " + sAttributes + " ></"+sElementType+">";
            domDebuggingElement = domTD; domDebuggingElement2 = domElement;
            if (domTD.$$$("input")[0]) {
              domElement.value = sValue;
              // domElement.onclick=function(this){this.select()}
              domElement.addEventListener("click", function(){this.select()}); // selects all contents inside cell
            } else if (domTD.$$$("textarea")[0]) {
              domElement.innerText = sValue;
              domElement.style.resize = "none";
              domElement.addEventListener("click", function(){this.select()}); // selects all contents inside cell
            } else if (domTD.$$$("select")[0]) {
              // domSelect = domDebuggingElement("select")[0];
              if (fOptionsFunction) { } else { fOptionsFunction = function() { return ["","1","2","3"]; } }
              domElement.innerHTML = fOptionsFunction().map(function(oEl) { return "<option>" + oEl + "</option>"; }).join();
            }

        //}
    })
}
// oGlobal = {};
// oDomTable = {};
GSDS_eval = function(oThis, sCellContents) {
    //console.log(sCellContents);
    sCellContents = sCellContents.replace(/^\=/g, "").trim();
    var domTable = oThis.closest("table");
    if (domTable.oSmartRange==undefined) {
        GSDS_setOSR(domTable);
    }
    if (sCellContents.match(/COLUMN/g)) {
        sA1Notation = GSDS_domTDToA1Notation(oThis);
        console.log(sA1Notation);
        sColumn = cellToColumn(sA1Notation);
        console.log(sColumn);
        sCellContents = sCellContents.replace(/COLUMN/g, sColumn)
    }
    if (sCellContents.match(/ROW/g)) {
        sA1Notation = GSDS_domTDToA1Notation(oThis);
        sRow = cellToRow(sA1Notation);
        sCellContents = sCellContents.replace(/ROW/g, sRow)
    }

    try {
        // sCellContents = sCellContents.replace(/([A-Z]+[0-9]+)/g, "GSDS_CELL_value('$1')");
        // sCellContents = "D1";
        if (sCellContents.match(/^[A-Z]+[0-9]+$/)) { // vanilla one cell
            domTD = domTable.oSmartRange[sCellContents].tdcell;
            return domGetTDTextOrValue(domTD);
        // } else if (sCellContents.match(/^[A-Z]+[0-9]+:[A-Z]+[0-9]+$/)) { // vanilla one A1Notation range
        } else if (sCellContents.match(/\:|\,|\;/g)) { // dirty A1Notation range
            aGSRange = GSDS_disjointedRangeToAVOdomTDs(domTable, sCellContents).flat().filter(function(oEl) { return oEl });

            /* this horrible section of code is like O(n*n), refactor it out! */
            // it's the only way I can convert a domTD to a a1Notation? Certainly a more clever and higher performance solution exists?
            aGSRange = aGSRange.map(function(oEl0) {    
                return domTable.oSmartRange.allcells_valuesoriented.flat().reduce(function(oAg, oEl) {
                    if (!oAg) { if (domTable.oSmartRange[oEl]?.tdcell == oEl0) { oAg = oEl; } }
                    // console.log(oSmartRange[oEl]?.tdcell);
                    return oAg;
                }, undefined)
            })
            /* end this horrible thing? */

            aActualRange = domTable.oSmartRange.allcells_valuesoriented.flat().filter(function(oEl) {
                return aGSRange.indexOf(oEl)>-1; // filters out range cells that are not in table;
            })
            // vs return GSDS_getTDRANGE(domTable, sCellContents);?  wouldn't this be less lines of code?  worse performance tho?
            return aActualRange.map(function(oEl) {
                return domGetTDTextOrValue(domTable.oSmartRange[oEl].tdcell);
            }).join(";");

            // console.log(sCellContents);
            // return JSON.stringify(GSDS_disjointedRangeToAVO(sCellContents))

        } else if (sCellContents.match(/([A-Z]+[0-9]+)/g)) { // "D1+20", "D1*+E1*12", "SUM(D1:D2)"
            sCellContents = sCellContents.replace(/([A-Z]+[0-9]+)/g, "GSDS_CELL_valueParseInt(domTable, '$1')")
            console.log("var sCellContents = " + sCellContents);
            return eval(sCellContents);
        } else if (false) {
        } else {
            return eval(sCellContents);
        }

    } catch(e) {
        // alert(e);
        return e;
    }
}
GSDS_domTDToA1Notation = function(domTD) {
    domTable = domTD.closest("table");
    if (!(domTable.oSmartRange)) {
        GSDS_setOSR(domTable);
    }
    return domTable.oSmartRange.allcells_valuesoriented.flat().reduce(function(oAg, oEl) {
        if (oAg == undefined) {
            // console.log(oEl);
            if (domTable.oSmartRange[oEl].tdcell == domTD) {
                oAg = oEl;
            }
        }
        return oAg;
    }, undefined)
}
GSDS_evalifyCell = function(sCellA1Notation, sFormula) {
    // GSDS_evalifyCell("table!E6", "=A1:B2") // refactor this to accept dom and sCellA1Notation?
    // sFormula = "=A1:A2";
    // sCellA1Notation = "table!D6";
    if (sFormula) { } else { sFormula = decodeURIComponent(domInput.dataset.gseval); }
    domTD = GSDS_getTDRANGE(sCellA1Notation)[0][0];
    domInput = domTD.$$$("input,select,textarea")[0];
    domInput.dataset.gseval = superencode(sFormula);
    GSDS_evalifyTDRANGE(sCellA1Notation);
}

//var oThis;
//var domTD;
GSDS_evalifyTDRANGE = function(domTable, sA1Notation) {
    GSDS_getTDRANGE(domTable, sA1Notation).flat().forEach(function(domTD) {
        var domInput = domTD.$$$("input,select,textarea")[0];
        if (domInput) {
            if (domInput.dataset.gseval) {
               domInput.value = GSDS_eval(domInput, decodeURIComponent(domInput.dataset.gseval));
            }
            // var domInput = $$$(sSelector)[0];
            // Array.from($$$(sSelector)).forEach(function(domInput) {
            domInput.onblur = function(e) {
                oThis = e.target;
                                    
                if (oThis.value.match(/^\=/)) {
                    sGSEVAL = oThis.value;
                    oThis.closest("td").dataset.gseval = superencode(sGSEVAL);
                    oThis.dataset.gseval = superencode(sGSEVAL); // CONSIDER REMOVING INPUTS' dataset.gseval in favor of TD's  
                    oThis.value = GSDS_eval(oThis, oThis.value);
                    oThis.style.backgroundColor="lightblue";
                } else {
                    oThis.closest("td").dataset.gseval = "";
                    oThis.dataset.gseval = "";
                    oThis.style.backgroundColor="white";
                }
                // maybe get rid of this below? it re-evaluates whole table in order to achieve the ability for all cells to remain live evaluations.
                domTable = oThis.closest("table");
                GSDS_evalifyTDRANGE(domTable, "A1:*");
                // console.log(e.target)
            }
            domInput.onfocus = null;

            domInput.addEventListener('dblclick', function (e) {
                oThis = e.target;
                if (oThis.dataset.gseval) {
                   oThis.value = decodeURIComponent(oThis.dataset.gseval);
                }
                // console.log(e.target.dataset.gseval)
            })
        } else {
            // REFACTOR / ADD FUNCTIONALITY - IF NO domInput then just do something with domTD instead?????
        }
    });
}
// domGlobal;
domGetTDTextOrValue = function(domTD) {
    // domGlobal = domTD;
    if (domTD.$$$("input,textarea,select")[0]?.value) {
        return domTD.$$$("input,textarea,select")[0].value;
    } else if (domTD.$$$("input,textarea,select")[0]?.innerText) {
        return domTD.$$$("input,textarea,select")[0].innerText;
    } else if (domTD.$$$("data-value")[0]) { // also data-notes, data-notations, and data-text?
        return domTD.$$$("data-value")[0]; 
    } else if (domTD.innerText) { 
        return domTD.innerText;
    } else { return ""; }
}
domGetTDTextOrValueParseInt = function(domTD) {
    iReturn = parseInt(domGetTDTextOrValue(domTD));                              
    return ((isNaN(iReturn)) ? 0 : iReturn);
}
    // END NEW googlesheets.scripts.js

                                    
    // random vanilla DOM manipulation scripts
    // // replace body tag's innerHTML with div
    // document.getElementsByTagName('body')[0].innerHTML = "<div id='my'>blahHTML<div>"
    function theadify(sTable) { // USES JQUERY
        // sTable = "table.RecordsOrientedArrayToHTML";
        // theadify(table.RecordsOrientedArrayToHTML);
        theadify = $(sTable)[0].$$$("tr th, tr td")[0].parentNode;
        $(sTable)[0].createTHead();
        theadify.remove()
        $(sTable)[0].$$$("thead")[0].appendChild(theadify)
    }
    function dom_lookupvalueHTMLTable(sTable, sRowValue, iColumn) { // WARNING USES JQUERY
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

    function filterHTMLTable(sTable, iColumn, aAcceptableValues) { // WARNING USES JQUERY
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
    function removeHTMLTableColumn(sTable, iColumn) { // WARNING USES JQUERY
        // removeHTMLTableColumn('cualquierPotencialidad', 0);
        Array.from($("#" + sTable + "")[0].children[0].children).forEach(function(oElement) {
            oElement.children[iColumn].style.display = "none"
        })
    }
    domTableToValuesOrientedDomTDs = function(domTable) { // domTableToValuesOrientedDomTDs("table.gsws")
        if (typeof(domTable) == "string") { // eg "table.gsws"
            domTable = $$$(domTable)[0]
        }
        if (domTable == undefined) { domTable = $$$("table")[0]; }
        if (domTable != undefined) {
            return Array.prototype.slice.call((domTable).$$$("tr")).map(function(oElement) {
                return Array.prototype.slice.call(oElement.$$$("th, td"));
            })
        } else {

        }
    }

} catch(e) {}

// domscripts.serversafe
convertRecordsOrientedArrayToHTMLTable = function (aRecordsOriented, aColumns, sTableID) {
    // convertRecordsOrientedArrayToHTMLTable(aRecordsOriented)
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
convertRecordsOrientedArrayToExcelXML = function(aArray, aColumns) {
  // convertRecordsOrientedArrayToExcelXML
  // normalize aRecordsOriented
  var aRecordsOriented = normalizeRecordsOriented(toValuesOriented(aArray));
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
GSDS_disjointedRangeToAVO = function(sA1Notation) { // this function is NOT FOR DOM, just string/data-only
  if (sA1Notation.match(/\*/g)) { return "ERROR - ASTERISK functions are for domTable ONLY!" } else {
    // this function single-handledly dismantles getGoogleSheetRange and getGoogleSheetRangeValuesOriented
    sA1Notation = sA1Notation.replace(/\-/g, ":").replace(/,/g, ";"); // sanitize
    a1DCells = unique(sA1Notation.split(";").map(function(oEl) {
      oEl=oEl.trim();
      if (oEl.match("^:")) { oEl = "A1" + oEl; }
      if (oEl.match(":$")) { return "ERROR - ASTERISK IS ASSUMED HERE.";  }
      if (oEl.indexOf("\:") > -1) { return getGoogleSheetRange(oEl); } else { return oEl; }
    }).flat().sort(sortAlphaNum));
    // determine lowest cell and highest cell
    iHighestColumn = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg<letterToColumn(cellToColumn(oEl))) ? letterToColumn(cellToColumn(oEl)) : oAg) 
    }, 0)
    
    iLowestColumn = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg>letterToColumn(cellToColumn(oEl))) ? letterToColumn(cellToColumn(oEl)) : oAg) 
    }, iHighestColumn)
    
    iHighestRow = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg<parseInt(cellToRow(oEl))) ? parseInt(cellToRow(oEl)) : oAg) 
    }, 0);
    
    iLowestRow = a1DCells.reduce(function(oAg, oEl) {
      return ((oAg>parseInt(cellToRow(oEl))) ? parseInt(cellToRow(oEl)) : oAg) 
    }, iHighestRow);
    sExpansiverRange = columnToLetter(iLowestColumn) + iLowestRow + ":" + columnToLetter(iHighestColumn) + iHighestRow;
    //console.log("Expansive Range - " + sExpansiverRange);
    var a2DCells = getGoogleSheetRangeValuesOriented(sExpansiverRange);
    // var a2DCells = getGoogleSheetRangeValuesOriented(a1DCells[0] + ":" + a1DCells.slice(-1)[0]); NO FUNCIONA
    return a2DCells.map(function(oEl) { return oEl.map(function(oEl2) {
      if (a1DCells.indexOf(oEl2) > -1) { return oEl2; }
    }) }); 
  }
}
GSDS_disjointedRangeToAVO.sample = function() { return 'GSDS_disjointedRangeToAVO("-A2;A2:B4; D4,E5:F5;G1:H2,H1-H9,L8,:B2, G8")' }
GSDS_disjointedRangeToArray = function(sA1Notation) { return GSDS_disjointedRangeToAVO(sA1Notation).flat().filter(function(oEl) { return oEl; }) }

toHTMLSelect=function(aArray, sClassList) { // refractor this to accept array of values vs array of objects (select id?)
  // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
  if (sClassList == undefined) { sClassList = "aArraySelect"; }
  return "<select class='" + sClassList + "'><option></option>" + aArray.map(function(oElement) { return "<option>" + oElement + "</option>"; }).join("");
}

/* UNIT TESTS
oSmartRange = GSDS_getOSR("table!D1:*");
oSmartRange = GSDS_getOSR("table", "D1:*");
oSmartRange = GSDS_getOSR($$$("table")[1], "D1:*");
GSDS_getTDRANGE("table!D1:*")
GSDS_setOSR($$$("table")[0])
GSDS_inputifyTDRANGE("table!A1:*")
GSDS_evalifyTDRANGE("table!A1:*")
GSDS_disjointedRangeToAVO("table!D1:*,A3"); //
GSDS_disjointedRangeToAVOdomTDs("table!D1:*,A3"); // 
GSDS_disjointedRangeToAVOdomTDs("D1:*;A1"); // 
GSDS_disjointedRangeToAVOdomTDs("A1:A*"); // 
GSDS_disjointedRangeToAVOdomTDs("table!D1:*"); // 
GSDS_disjointedRangeToAVOdomTDs("A3:G10");
GSDS_disjointedRangeToAVO("A2:B4;D4,E5:F5;H1-H9");
GSDS_getTDRANGE("table!D6")[0][0].dataset.gseval = superencode("=A1:A2");
GSDS_evalifyTDRANGE("table!D6");
GSDS_eval(decodeURIComponent(sGSEVAL));
GSDS_disjointedRangeToAVO("A2;A2:B4;D4,E5:F5;G1:H2,H1-H9,L8,:B2, G8")
*/
// GSDS_inputifyTDRANGE("table!A1:*", undefined, "textarea")
//GSDS_inputifyTDRANGE("table!A1:*", undefined, "textarea");
//GSDS_evalifyTDRANGE("table!A1:*")
// GSDS_inputifyTDRANGE("table!A1:*", undefined, "button")
// GSDS_getTDRANGE("A1:B4");
// GSDS_inputifyTDRANGE("A1:B4");
// domGetTDTextOrValue(domDebuggingElement)
// domGetTDTextOrValue(GSDS_CELL("A1"))
// GSDS_inputifyTDRANGE("A1:B2", undefined, "input");
// GSDS_inputifyTDRANGE("A3:B3", undefined, "textarea");
