/* THESE SCRIPTS NEED REFACTORING  */
// function consolelog(sReturn) {   setTimeout (console.log.bind(console, sReturn)); }
// function dumpCSSText(element){ var s = ''; var o = getComputedStyle(element); for(var i = 0; i < o.length; i++){ s+=o[i] + ':' + o.getPropertyValue(o[i])+';'; } return s; }

/* prototype altering functions */
//Array.prototype.toDelimited ="";
JSONObjectify = function(sString) {
  // JSONObjectify("branch:main,folder:datascripts");
  // JSONObjectify('{"branch":"main","folder":'datascripts"}';
  try {
    return JSON.parse(sString);
  } catch(e) {
    aReturn = sString.trim().replace(/\n/g, ",").split(",").map(function(oEl) {
      return oEl;
    })
    return aReturn.reduce(function(oAg, oEl) {
      sKey = oEl.split(":")[0].trim();
      sValue = oEl.split(":")[1].trim();
      oAg[sKey] = sValue;
      return oAg;
    }, {})
  }
}
String.prototype.count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
//Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
// count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
// Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
unique = function(aArray) { var a = []; for (var i=0, l=aArray.length; i<l; i++) if (a.indexOf(aArray[i]) === -1) a.push(aArray[i]); return a; };
//Object.prototype.toArray = function () { var _this = this; var array = []; Object.keys(this).map(function (key) { array.push(_this[key]); }); return array; };

function convertTabDelimitedToRecordsOriented(sText) {
    return sText.split("\n").map(function(oElement) { return oElement.split("\t"); });
}

// toValuesOriented = function(aInputArray) { var aArrayOfAllPossibleColumnTitles = aInputArray.reduce(function(agg123, oElement123) { Object.keys(oElement123).forEach(function(oElement751) { if (!agg123.includes(oElement751)) { agg123.push(oElement751); } else {} }); return agg123; }, Object.keys(aInputArray[0])); var aValuesOrientation = aInputArray.map(function(oElement123, iIndex123) { return aArrayOfAllPossibleColumnTitles.reduce(function(agg751, oElement751) { if (oElement123[oElement751] == undefined) { agg751.push(); } else { agg751.push(oElement123[oElement751]); } return agg751; }, []) }); aValuesOrientation.unshift(aArrayOfAllPossibleColumnTitles); return aValuesOrientation; }
cartesian = function(args) { // args = aArrayOfArarys
          // permutations / combinations?
    // aArrays = [[0,1], [0,1,2,3], [0,1,2]]; cartesian(aArrays);
    // aArrays = [["a","b","c"], ["d","e"], ["f", "g", "h"], ["i"] ]; cartesian(aArrays);
    var r = [], max = args.length-1;
    function helper(arr, i) {
        for (var j=0, l=args[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

toValuesOriented = function(aInputArray, aColumns) {
    var aArrayOfAllPossibleColumnTitles = aInputArray.reduce(function(agg123, oElement123) {
        Object.keys(oElement123).forEach(function(oElement751) {
            if (agg123.indexOf(oElement751) == -1) {
            // if (!agg123.includes(oElement751)) { // not es5-friendly
                agg123.push(oElement751);
            } else {}
        });
        return agg123;
    }, Object.keys(aInputArray[0]));
    if (aColumns == undefined) { aColumns = aArrayOfAllPossibleColumnTitles; }
    var aValuesOrientation = aInputArray.map(function(oElement123, iIndex123) {
        return aColumns.reduce(function(agg751, oElement751) {
            if (oElement123[oElement751] == undefined) {
                agg751.push("");
            } else {
                agg751.push(oElement123[oElement751]);
            }
            return agg751;
        }, [])
    });
    aValuesOrientation.unshift(aColumns);
    return aValuesOrientation;
}
sanitizeValuesOrientedData = function(aValuesOriented) { return aValuesOriented.map(function(oElement) { return oElement.map(function(oElement0) { if (oElement0 == null || oElement == undefined || oElement == NaN ) { return ""; } else { return oElement0; } }) }) }

toRecordsOriented = function(aInputArray) { var aValuesOrientation = JSON.parse(JSON.stringify(aInputArray)); aValuesOrientation[0] = aValuesOrientation[0].slice().reverse().map(function(oElement, iIndex, aArray) { if ( aValuesOrientation[0].indexOf(oElement) == aValuesOrientation[0].length - aArray.indexOf(oElement) - 1 ) { return oElement.toString().trim(); } else { return oElement.toString().trim() + "_" + (aValuesOrientation[0].length - iIndex) } }).reverse(); return aValuesOrientation.reduce(function(agg, oElement, iIndex, aArray) { return (iIndex != 0) ? agg.concat(aArray[0].reduce(function(oagg0, oElement0, iIndex0) { oagg0[oElement0] = oElement[iIndex0]; return oagg0 }, {})) : [] }, []) }

toXXXOrientated = function (aInputArray, sXXX) { var aRecordsOrientation = JSON.parse(JSON.stringify(aInputArray)); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

toXXXOrientatedDEDUPED = function(aInputArray, sXXX)  { var aRecordsOrientation = JSON.parse(JSON.stringify(aInputArray)); var o_XXX_Orientation = aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); return Object.keys(o_XXX_Orientation).reduce(function(agg777, oElement777) { if (Array.isArray(o_XXX_Orientation[oElement777])) { agg777[oElement777] = o_XXX_Orientation[oElement777].reduce(function(agg778, oElement778) { return Object.keys(oElement778).reduce(function(agg779, oElement779) { if (agg778[oElement779] == undefined) { agg778[oElement779] = oElement778[oElement779]; } else { agg778[oElement779] = agg778[oElement779] + ";" + oElement778[oElement779]; } return agg778; }, "") }, {}) } else { agg777[oElement777] = o_XXX_Orientation[oElement777]; } return agg777; }, {}) }

toTabDelimited = function (aInputArray, sDelimiter, sQualifier) {
  // get rid of stray tabs in array so it doesn't create duplciate tabs in tab delimited data
  Object.keys(normalizeRecordsOriented(aInputArray)[0]).forEach(function(oElement) {
      aInputArray.forEach(function(oElement0) {
          if (typeof(oElement0[oElement]) == "string") {
              oElement0[oElement] = oElement0[oElement].replace(/\t/g, "");
          }
      })
  })
  if (Object.prototype.toString.call(aInputArray[0]) == '[object Array]') { // hack for aValuesOriented
      return toDelimited(aInputArray, "\t", "").split("\n").splice(1,aInputArray.length+1).join("\n");
  } else { // else return aRecordsOriented
      return toDelimited(aInputArray, "\t", "");
  }
}
toDelimited = function(aInputArray, sDelimiter, sQualifier) { function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) } var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray); return aInputArray.reduce(function(agg, oElement) { return agg + "\n" + aColumns.filter(function(oElement777) { return oElement777.trim() != "" }).reduce(function(agg001, oElement001, iIndex001) { return agg001 + ((iIndex001 == 0) ? "" : sDelimiter) + sQualifier + ((oElement[oElement001] == undefined ? "" : oElement[oElement001])).toString().replace(/\r\n/g, "<br>").replace(/\n/g, "<br>") + sQualifier; }, "") }, aColumns.map(function(oElement002) { return sQualifier + oElement002 + sQualifier; }).join(sDelimiter)) }
convertTabDelimitedToRecordsOriented = function(sText) { return sText.split("\n").map(function(oElement) { return oElement.split("\t"); }); }


function normalizeRecordsOriented(aRecordsOriented) { // AOT toRecordsOriented(toValuesOriented(aRecordsOrientation));
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
         var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    aRecordsOriented.forEach(function(oElement3245) {
        aColumns.forEach(function(oElement8726) {
            if (oElement3245[oElement8726] == undefined || oElement3245[oElement8726] == null || oElement3245[oElement8726] == NaN) {
                oElement3245[oElement8726] = "";
            }
        })
    })
    return aRecordsOriented;
}
function padArray(array, length, fill) { return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array; }

normalizeValuesOriented = function (aValuesOriented) {
    // normalizeValuesOriented([["a", "b", "c"], ["e", "f"], ["t", "h", {"blah": "hello" } ]])
    iMaxLength = aValuesOriented.reduce(function(oAg, oEl, iIn) {
        if (oEl.length > oAg) { oAg = oEl.length; }
        return oAg;
    }, 1);
    return aValuesOriented.map(function(oEl) {
        if (!Array.isArray(oEl)) { oEl = [oEl]; }
        return padArray(oEl, iMaxLength, "");
        return oEl;
    })
}
// lolololol
replaceColumnNameInRecordsOrientedArray = function(aRecordsOriented, sMatchingString, sReplacementString) {
// vs function renameColumnNameInRecordsOrientedArray(aRecordsOriented, sMatchingString, sReplacementString) {
    // SAMPLE CALL:
    // aRecordsOriented = replaceColumnNameInRecordsOrientedArray(aRecordsOriented, "Rack # / Location", sBinColumnName);
    var aValuesOriented = toValuesOriented(aRecordsOriented);

    // sMatchingString = "Rack # / Location";
    // sReplacementString = "Bin Location";

    aValuesOriented[0] = aValuesOriented[0].map(function(oElement) {
        console.log(oElement == sMatchingString)
        if (oElement == sMatchingString) { oElement = sReplacementString; }
        return oElement;
    })
    return toRecordsOriented(aValuesOriented);
}

function convertIntToDate(sDate, sWhatDo) {
    // SAMPLE: convertIntToDate(new Date(), "YYYYMMDDHHMMSS")
    // SAMPLE: convertIntToDate(1593442444000, "mm/dd/yyyy")
    // SAMPLE: convertIntToDate(1593442444000)
    var dDate = new Date(sDate);
    switch(sWhatDo) {
        case "Netsuite":
                return format.format({ value: new Date(sDate), type:format.Type.DATETIME, timezone:format.Timezone.AMERICA_NEWYORK })
            break;
        case "mm/dd/yyyy":
            return (dDate.getMonth() + 1).toString().padStart(2, "0") + "/" + dDate.getDate().toString().padStart(2, "0") + "/" + dDate.getFullYear();
            break;
        case "m/d/yyyy":
            return dDate.getMonth() + 1 + "/" + dDate.getDate() + "/" + dDate.getFullYear();
            break;
        case "YYYYMMDDHHMMSS":
            return getYYYYMMDDHHMMSS(sDate);
            break;
        default:
            return new Date(sDate).toString().split(" ").filter(function(oElement, iIndex) { return iIndex == 1 || iIndex == 2 || iIndex == 3; }).join(" ");
            break;
    }
}

getYYYYMMDDHHMMSS = function(sDate) {
    if (sDate) { var date = new Date(sDate); } else { var date = new Date(); }    
    return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() + 1 ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2)
}

getRanges2 = function(aArray) {
  // eg getRanges2([0,2.1,1,"blah",100,101,2,3,56]) returns ["0-3", "56", "100-101"]
  // converts an array of ints to a list of ranges they are represented by
  uniqueArray=function(arrArg){return arrArg.filter(function(elem,pos,arr){return arr.indexOf(elem)==pos})}
  aArray = aArray.filter(function(oElement) { return !isNaN(parseInt(oElement)); }).map(function(oElement) { return parseInt(oElement) }).sort(function (a, b) {  return a - b;  });
  aArray = uniqueArray(aArray);
  var ranges = [], rstart, rend;
  for (var i = 0; i < aArray.length; i++) {
    rstart = aArray[i];
    rend = rstart;
    while (aArray[i + 1] - aArray[i] == 1) {
      rend = aArray[i + 1]; // increment the index if the numbers sequential
      i++;
    }
    ranges.push(rstart == rend ? rstart+'' : rstart + '-' + rend);
  }
  return ranges;
}

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


superhtmlEntities = function(str) {
  // superhtmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/,"&#96;")};
  
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#96;').replace(/?/g, '&#xB4;');

}

/*
htmlEntities = function(str) {
  // BE CAREFUL WITH htmlEntities!  Seems to conflict with Netsuite's BFO Freemarker N/module render or somethng.
  //htmlEntities vs encodeURIComponent: htmlEntities("blah&blah")="blah&amp;blah" ;;; encodeURIComponent("blah&blah")="blah%26blah"
  // ALWAYS REMEMBER TO ESCAPE SINGLE QUOTES - encodeURIComponent("what").split("$clientfunctions")[0]).replace(/[!'()*]/g, escape)
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
*/

// encode encodes apostrophes too!
superencode = function (str){ // superencode("~!.*()-_") is the same, consider refractoring?
  // superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
  // return w.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
  return encodeURIComponent(str).replace(/'/g, "%27");
}

melt = function (aInputArray, aColumns) {
    // aColumns = ["COUNT(*)", "matrix_child", "matrix_child_2"];
    // aColumns = [0,1,2];
    aRecordsOrientedArray = JSON.parse(JSON.stringify(aInputArray));
    if (typeof(aColumns[0])=="number") {
        aColumns = aColumns.map(function(oElement) { return Object.keys(aRecordsOrientedArray[0])[oElement] })
    } else {}

    return aRecordsOrientedArray.map(function(oElement) {

        oElement = JSON.parse(JSON.stringify(oElement));
        return aColumns.map(function(oElement000) {
            //console.log(oElement000)
            oElement.variable = oElement000;
            oElement.value = oElement[oElement000];
            oElement = JSON.parse(JSON.stringify(oElement));
            //delete oElement[oElement000];
            return JSON.parse(JSON.stringify(oElement));
        })

    }).flat().map(function(oElement) {
        oElement = JSON.parse(JSON.stringify(oElement));
        aColumns.forEach(function(oElement000) {
            delete oElement[oElement000];
        })

        return oElement; 
    }) 
}

flatten = function(aArray) {
    // this = aArray;
    // Array.prototype.flatten = Array.prototype.flatten || function() {
    // consider refractoring this prototype function or nah?
    var flattened = [];
    for (var i = 0; i < aArray.length; ++i) {
        if (Array.isArray(aArray[i])) {
            flattened = flattened.concat(aArray[i].flatten());
        } else {
            flattened.push(aArray[i]);
        }
    }
    return flattened;
};

explode = function (aInputArray, aColumns, sDelimiter) {
    // console.log(Object.keys(this[0])[sColumn]);
    // console.log(Object.keys(this[0])[3]);
    //console.log(Object.keys(this[0])[aColumns[0]])
    function flatten(a) {
      return Array.isArray(a) ? [].concat.apply([], a.map(flatten)) : a;
    }
     // "Directed by";
    if (typeof(aColumns[0]) == "number") {
        var sColumn = Object.keys(aInputArray[0])[aColumns[0]]
    } else { var sColumn = aColumns[0]; }
    return flatten(aInputArray.map(function(oElement999) {
        if (oElement999[sColumn].split(sDelimiter).length > 1) { 
            return oElement999[sColumn].split(sDelimiter).map(function(oElement) {
                return Object.keys(oElement999).reduce(function(oAgg000, oElemment000) {
                    if (oElemment000 == sColumn) {
                        oAgg000[oElemment000] = oElement.trim(); // oElement.toString().trim();
                    } else {
                        oAgg000[oElemment000] = oElement999[oElemment000];
                    }
                    return oAgg000;
                }, {})
                //console.log(aResults[0][oElement]);
                //console.log(Object.keys(aResults[0]).indexOf("Directed by"))

            }) 
        } else { return oElement999 }
    })); // .flat()
}






pivottable = function (aInputArray, aPivotInstructions) {
    function parseFloatForSUM(sString) {
        if (isNaN(sString) || sString == "" || sString == undefined || sString == null || sString == NaN) { sString = 0 }
        return parseFloat(sString);
    }
    
    function pivot_table(aRecordsOrientation, aPivotInstructions) {
       // replace columns starting with an int with "num_" to temporarily fix bug
       aRecordsOrientation = toRecordsOriented(toValuesOriented(aRecordsOrientation));
       var aValuesaOriented = toValuesOriented(aRecordsOrientation);
       aValuesaOriented[0] = aValuesaOriented[0].map(function(oElement) { if (oElement.match(/^[0-9]/g)) { oElement = "num_" + oElement } return oElement; })
       aRecordsOrientation = toRecordsOriented(aValuesaOriented);
      
       if (typeof(aPivotInstructions[0][0]) == "number") {
        // convert strs to int columns
        // aPivotInstructions2 = aPivotInstructions.map(function(oElement0, iIndex0) { return ((iIndex0 != 3 ) ? oElement0.map(function(oElement) { return Object.keys(aRecordsOrientation[0]).indexOf(oElement) }) : oElement0); })
        // convert int to str columns
            aPivotInstructions = aPivotInstructions.map(function(oElement0, iIndex0) { return ((iIndex0 != 3 ) ? oElement0.map(function(oElement) { return Object.keys(aRecordsOrientation[0])[oElement.toString()] }) : oElement0); })
        }
        // .replace(/[^A-Za-z_]+/g,"_")
        // REPLACE aRecordsOrientation with underscored keys and toString()'d values'
        var sToEval = "";
        try {
            aRecordsOrientation = aRecordsOrientation.map(function(oElement001) {
                return Object.keys(oElement001).reduce(function(agg000, oElement000) {
                    // is this null to blank string necessary?  consider removing...
                    oElement000 = ((oElement000 == null) ? "" : oElement000)
                    var sNewKey = oElement000.replace(/[^A-Za-z_0-9]+/g,"_");
                    agg000[sNewKey] = ((oElement001[oElement000] == null) ? "" : oElement001[oElement000].toString());
                    return agg000;
                }, {})
            });
            // REPLACE aPivotInstructions
            aPivotInstructions[0] = aPivotInstructions[0].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });
            aPivotInstructions[1] = aPivotInstructions[1].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });
            aPivotInstructions[2] = aPivotInstructions[2].map(function(oElement000) {
                return oElement000.toString().replace(/[^A-Za-z_0-9]+/g,"_")
            });

            var oRecordsOrientationGroup = _.groupBy(aRecordsOrientation, function(value){
                    return aPivotInstructions[0].map(function(oElement) { return value[oElement] }).join("#");
                });

            var aColumnsIndex = [["_"]]; var aColumnsIndexAllCombinations = [["_"]];

            if (aPivotInstructions[1].length > 0) {
                aColumnsIndex = aPivotInstructions[1].map(function(oElement0){ return _.uniqBy(aRecordsOrientation, oElement0).map(function(oElement1) { return oElement1[oElement0]; }); });

                aColumnsIndexAllCombinations = aColumnsIndex.reduce(function (a, b) {
                  return a.reduce(function (r, v) {
                    return r.concat(b.map(function (w) {
                      return [].concat(v, w);
                    }));
                  }, []);
                });

                // do this iff the len of aPivotInstructions[2] is only 1 (aka only one columns index)
                if (typeof(aColumnsIndexAllCombinations[0]) == "string") { aColumnsIndexAllCombinations = aColumnsIndexAllCombinations.map(function(oElement0) { return [oElement0] }) }
            }
            sFirstPartOfReturn = aPivotInstructions[0].reduce(function(agg, oElement) { return agg + "'" + oElement + "': group[0]['" + oElement + "'],\n"}, "");
            sSecondPartOfReturn = ""

            aPivotInstructions[2].forEach(function(sValueTitle, iIndex0) {
                var sFunctionInstructions = aPivotInstructions[3][iIndex0];
                if (!sFunctionInstructions) { sFunctionInstructions = aPivotInstructions[3][0]; } // allows me to shorthand a single function to all data
                sFunctionInstructions.split("-").forEach(function(sAggInstruction, iIndex000) {
                    sAggInstruction = sAggInstruction.toLowerCase(); sAggInstruction = sAggInstruction.replace(/np\./g, "").replace(/ns\_concat/g, "listagg");
                    if (JSON.stringify(aColumnsIndexAllCombinations) != '[["_"]]') { // if there exists columns as defined in aColumnsIndex
                        aColumnsIndexAllCombinations.forEach(function(aColumnsTitle) {
                            // .replace(/[\W_]+/g,"") - replace all non-alphanumeric characters with blank
                            sTitle = "'" + sValueTitle.replace(/[\W_]+/g,"") + "_" + sAggInstruction + "_" + aColumnsTitle.join('_').replace(/[\W_]+/g,"") + "'"; // console.log(sTitle);
                            sObject = aColumnsTitle.reduce(function(agg, oElement1, iIndex1){ return agg + "'" + aPivotInstructions[1][iIndex1] + "': '" + oElement1 + "',"} , "")
                            if (sAggInstruction == "listagg") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";
                            } else if (sAggInstruction == "listaggu") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.uniq(_.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";
                            } else if (sAggInstruction == "sum") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";
                            } else if (sAggInstruction == "len") {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: _.filter(group, {<%= sObject %>}).length,";
                            } else {
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify(group),"; // 'Sorry, this is not a valid agg instruction!'";
                                var sObjectToBuildOutTemplate = "<%= sTitle %>: {sTitle: <%= sTitle %>, sObject: <%= sObject %>, sValueTitle: <%= sValueTitle %>, group: JSON.stringify(group)},"; // 'Sorry, this is not a valid agg instruction!'";
                                // var sObjectToBuildOutTemplate = "<%= sTitle %>: 'Sorry, this is not a valid agg instruction!'"
                            } 
                            var templateFn = _.template(sObjectToBuildOutTemplate);
                            sSecondPartOfReturn += templateFn({sTitle: sTitle, sObject: sObject, sValueTitle: sValueTitle}) + "\n";

                        })
                    } else {  // elseif there exists NO columns (aColumnsIndex is blank)
                        sTitle = "'" + sValueTitle.replace(/[\W_]+/g,"") + "_" + sAggInstruction + "'";
                        //  sObject = aColumnsTitle.reduce(function(agg, oElement1, iIndex1){ return agg + "'" + aPivotInstructions[1][iIndex1] + "': '" + oElement1+ "',"} , "")
                        if (sAggInstruction == "listagg") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";
                        } else if (sAggInstruction == "listaggu") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: _.uniq(group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";
                        } else if (sAggInstruction == "sum") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";
                        } else if (sAggInstruction == "len") {
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: group.length,";
                        } else {
                            // var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify(group),"; // 'Sorry, this is not a valid agg instruction!'";
                            var sObjectToBuildOutTemplate = "<%= sTitle %>: JSON.stringify({<%= sTitle %>: JSON.stringify(group)}),"; // 'Sorry, this is not a valid agg instruction!'";
                            // var sObjectToBuildOutTemplate = "<%= sTitle %>: {sTitle: <%= sTitle %>, sObject: 'sObject', sValueTitle: <%= sValueTitle %>, group: JSON.stringify(group)},"; // 'Sorry, this is not a valid agg instruction!'";
                        } 
                        var templateFn = _.template(sObjectToBuildOutTemplate);
                        sSecondPartOfReturn += templateFn({sTitle: sTitle, sValueTitle: sValueTitle}) + "\n";
                    }
                })
            })

            sToEval = "var aPivotedData = _.map(oRecordsOrientationGroup, function(group){ return {\n" + sFirstPartOfReturn + sSecondPartOfReturn + "\n}; });"
            // console.log(sToEval); // eval(sToEval)
            eval(sToEval)
            // copy(JSON.stringify(aPivotedData))
            //console.log("oRecordsOrientationGroup = " + JSON.stringify(oRecordsOrientationGroup));
            //console.log("aColumnsIndexAllCombinations" + JSON.stringify(aColumnsIndexAllCombinations));
            //console.log(sToEval)
            return aPivotedData;
        } catch(eError) {
            return [eError, sToEval];
        }
    }

    return pivot_table(aInputArray, aPivotInstructions);
}


pivottable.generateRandomPivotInstructions = function(aThis) {
    var aPivotFunctions = ['sum', 'listagg', 'listaggU', 'listagg-len', 'listagg-sum', 'intersection'];
    var iRandomIndex;
    var aRandomPivotInstructions = Object.keys(aThis[0]).reduce(function(agg, oElement, iIndex) {
      var iTotalKeys = Object.keys(aThis[0]).length;
      iRandomIndex = Math.floor((Math.random() * 2) + 0);
      if (iIndex == 0) { 
        iRandomIndex = 0;
      } else if (iIndex == iTotalKeys - 1) {
        iRandomIndex = 2;
      }
      if (agg[iRandomIndex] == undefined) {
          agg[iRandomIndex] = [oElement];

      } else {
          agg[iRandomIndex].push(oElement);
      }
      return agg;
    }, []);

    aRandomPivotInstructions[3] = [];

    for(i=0; i<aRandomPivotInstructions[2].length; i++) {
     iRandomIndex = Math.floor((Math.random() * aPivotFunctions.length) + 0);
     aRandomPivotInstructions[3][i] = aPivotFunctions[iRandomIndex]
    }
    // return aRandomPivotInstructions;
    return "var aPivotInstructions = " + JSON.stringify(aRandomPivotInstructions);

}

chunkize = function(aArray, iChunkSize) {
    // eg chunkize([1,2,3,4,5,6,7,8,9,0], 3)
    // iChunkSize = 15;
    var i,j 
    var aChunkedArray = [];
    for (i=0,j=aArray.length; i<j; i+=iChunkSize) {
        aChunkedArray.push(aArray.slice(i,i+iChunkSize));
    }
    return aChunkedArray;
}

intersperse = function(arr, el) {
    // SAMPLE: intersperse(["a", "b", "c", "d"], "0"); -> ["a", "0", "b", "0", "c", "0", "d"]
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el, arr[i++]);
    return res;
}

range = function(start, end) {
  // convert two values (eg 1,5) to an array of [1,2,3,4,5]
  var myArray = [];
  for (var i = start; i <= end; i += 1) {
    myArray.push(i);
  }
  return myArray;
};

getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
}

getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

    
// DOM manipulation or HTML-creation scripts (yes i'm break my first rule at the top but whatevs lol)
function convertaRecordsOrientedToInputBoxesForm(oICIResponse, aFields) {
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

getRange3 = function(n,r){for(var e=[],t=n;t<=r;t++)e.push(t);return e}
combineArraysRecursivelyCartesian=function(array_of_arrays){if(!array_of_arrays){return[]}
if(!Array.isArray(array_of_arrays)){return[]}
if(array_of_arrays.length==0){return[]}
for(var i=0;i<array_of_arrays.length;i++){if(!Array.isArray(array_of_arrays[i])||array_of_arrays[i].length==0){return[]}}
var outputs=[];function permute(arrayOfArrays){var whichArray=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var output=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";arrayOfArrays[whichArray].forEach(function(array_element){if(whichArray==array_of_arrays.length-1){outputs.push([output.toString(),array_element.toString()])}else{permute(arrayOfArrays,whichArray+1,output+array_element)}})}
permute(array_of_arrays);return outputs}

// dataGSscripts.minified.js
function convertCellToArray(e){return[letterToColumn(e.replace(/[0-9]*$/g,"")),parseInt(e.replace(/^[A-Z]*/g,""))]}function convertArrayToCell(e){return columnToLetter(e[0])+e[1]}function columnToLetter(e){for(var r,t="";e>0;)r=(e-1)%26,t=String.fromCharCode(r+65)+t,e=(e-r-1)/26;return t}function letterToColumn(e){for(var r=0,t=e.length,n=0;n<t;n++)r+=(e.charCodeAt(n)-64)*Math.pow(26,t-n-1);return r}sortAlphaNum=function(e,r){return e.localeCompare(r,"en",{numeric:!0})},getGoogleSheetRange=function(e){return aReturn=[],e.replace(/;/,",").split(",").forEach(function(e){if(e.indexOf(":")>-1){var r=convertCellToArray(e.toString().split(":")[0]),t=convertCellToArray(e.toString().split(":")[1]);aReturn=aReturn.concat(combineArraysRecursivelyCartesian([getRange3(r[0],t[0]),getRange3(r[1],t[1])]).map(function(e){return convertArrayToCell(e)}))}else aReturn.push(e)}),aReturn},getGoogleSheetRangeValuesOriented=function(e){return aArray=getGoogleSheetRange(e).filter(function(e){return e.match(/[A-Z]+[0-9]+/)}).reduce(function(e,r,t){return 0==t?(e[0].push(r),e):(bCompletedMatrixingTask=!1,e.forEach(function(t,n){t[0].match(/[0-9]+/)[0]==r.match(/[0-9]+/)[0]&&(e[n].push(r),bCompletedMatrixingTask=!0)}),bCompletedMatrixingTask||e.push([r]),e)},[[]]),aArray};