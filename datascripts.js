/* dataBASICscripts => isomorphic, vanilla-ish ES5-safe functions inspired from Python Pandas, uses lodash lightly  */

/* prototype altering functions */
//Array.prototype.toDelimited ="";

/* BEGIN no brainers / polyfills for es5 */
function padArray(array, length, fill) { return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array; }
padArray.sample=function(e){return "padArray([1,2,3]), 5, 'end');";}

// String.prototype.count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
count=function(s, c) { var result = 0, i = 0; for(i;i<s.length;i++)if(s[i]==c)result++; return result; };
//Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
// count=function(c) { var result = 0, i = 0; for(i;i<this.length;i++)if(this[i]==c)result++; return result; };
// Array.prototype.unique = function() { var a = []; for (var i=0, l=this.length; i<l; i++) if (a.indexOf(this[i]) === -1) a.push(this[i]); return a; };
unique = function(aArray) { var a = []; for (var i=0, l=aArray.length; i<l; i++) if (a.indexOf(aArray[i]) === -1) a.push(aArray[i]); return a; };
// Object.prototype.toArray = function () { var _this = this; var array = []; Object.keys(this).map(function (key) { array.push(_this[key]); }); return array; };                                                                 
/* END no brainer / polyfilles for es5 */

parseInt0 = function(sNum, iDefault) { if (sNum) {} else {sNum = 0;} var iNum; if (iDefault) {} else {iDefault = 0;} if (!isNaN(sNum)) { iNum = parseInt(sNum); } else { iNum = parseInt(iDefault); } return iNum; }

/* BEGIN values oriented / records oriented / tab delimited converter functions */
// toValuesOriented = function(aInputArray) { var aArrayOfAllPossibleColumnTitles = aInputArray.reduce(function(agg123, oElement123) { Object.keys(oElement123).forEach(function(oElement751) { if (!agg123.includes(oElement751)) { agg123.push(oElement751); } else {} }); return agg123; }, Object.keys(aInputArray[0])); var aValuesOrientation = aInputArray.map(function(oElement123, iIndex123) { return aArrayOfAllPossibleColumnTitles.reduce(function(agg751, oElement751) { if (oElement123[oElement751] == undefined) { agg751.push(); } else { agg751.push(oElement123[oElement751]); } return agg751; }, []) }); aValuesOrientation.unshift(aArrayOfAllPossibleColumnTitles); return aValuesOrientation; }
// findKey = function(aData,sKey,sVal) { return aData[_.findKey(aData, o=>o[sKey]==sVal)] }
// findKeys = function(aData,sKey,sVal) { return aData.filter(function(e){return e[sKey]==sVal}) }
findKeys = function(aRO,sKey,sVal) {
    // consider refactoring this to make it more concise, eg 
    // interesting notes: my intuition says sKey can be string, regex or array, whereas sVal should be string or regex (and never array?)
    
    // obligatory convert aVO to aRO
    if (isVO(aRO)) { aRO = toRO(aRO); }

    // normalize in order to get first row and all its keys / columns that way
    aRO = normalizeRecordsOriented(JSONPS(aRO));
    
    if (sKey instanceof RegExp) { // regex
        sKey = Object.keys(aRO[0]).filter(function(k) { return k.match(sKey); }); // to array;
        // return findKeys(aRO, aKeys, sVal);
    }

    if (Array.isArray(sKey)) { // array
        if (sVal instanceof RegExp) {
            return aRO.filter(function(e){
                return sKey.reduce(function(a1, e1, i1) {
                    a1 = a1 || e[e1].match(sVal); 
                    return a1;
                }, false) 
            })
        } else { // sVal is exact match
            return aRO.filter(function(e){
                return sKey.reduce(function(a1, e1, i1) {
                    a1 = a1 || e[e1]==sVal; 
                    return a1;
                }, false) 
            })        }
    } else { // string
        if (sVal instanceof RegExp) {
            return aRO.filter(function(e){return e[sKey].match(sVal) });
        } else { // sVal is exact match
            return aRO.filter(function(e){return e[sKey]==sVal});
        }
    }
}
findKey = function(aData,sKey,sVal) { return findKeys(aData,sKey,sVal)[0]; }
findKeysIndex = function(aData,sKey,sVal) { return findKeyIndexes(aData,sKey,sVal)[0]; }
findKeyIndexes = function(aData,sKey,sVal) { return JSONPS(aData).map(function(e, i) { e.index = i; return e; }).filter(function(e) { return e[sKey] == sVal; }).map(function(e) { return e.index }) }
ObjectKeysRegex = function(oObject, rRegexKey) {
    return Object.keys(oObject).filter(function(oEl) {
        return oEl.match(rRegexKey);
    })
}
function ObjectKeyRegex(oObject,rRegexKey) { return ObjectKeysRegex(oObject,rRegexKey)[0]; }

ObjectValuesRegex = function(oObject, rRegexKey) {
    return Object.keys(oObject).filter(function(oEl) {
        return oEl.match(rRegexKey);
    }).map(function(oEl) {
        return oObject[oEl];
    })
}
function ObjectValueRegex(oObject,rRegexKey) { return ObjectValuesRegex(oObject,rRegexKey)[0]; }
Arrayify = function(aArray) { if (Array.isArray(aArray)) {} else { aArray = [aArray]; } }

toVO = function(aInputArray, aColumns) {
    if (isOBJ(aInputArray)) { // checks for objects.  note how toVO([{"one": "two", "three": "four"}] = [["one","three"],["two","four"]] and toVO({"one": "two", "three": "four"}) = [["one","two"],["three","four"]]
        aInputArray = Object.keys(aInputArray).reduce(function(a,e,i,o) { a.push([e,aInputArray[e]]); return a; }, [] )
    }
    if (typeof(aInputArray)=="string") { return [[aInputArray]]; };
    if (isVO(aInputArray)) { return aInputArray; };
    // REFACTOR: replace aArrayOfAllPossibleColumnTitles now that there's a normalizeRecordsOriented function?
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
}; toValuesOriented = function(aInputArray, aColumns) { return toVO(aInputArray, aColumns); }
toRO = function(aInputArray) {
    if (!isVO(aInputArray)) { return aInputArray; }
    var aValuesOrientation = normalizeValuesOriented(sanitizeValuesOrientedData(JSONPS(aInputArray)));
    aValuesOrientation[0] = aValuesOrientation[0].slice().reverse().map(function(oElement, iIndex, aArray) {
        if (aValuesOrientation[0].indexOf(oElement) == aValuesOrientation[0].length - aArray.indexOf(oElement) - 1) {
            return oElement.toString().trim();
        } else {
            return oElement.toString().trim() + "_" + (aValuesOrientation[0].length - iIndex)
        }
    }).reverse();
    return aValuesOrientation.reduce(function(agg, oElement, iIndex, aArray) {
        return (iIndex != 0) ? agg.concat(aArray[0].reduce(function(oagg0, oElement0, iIndex0) {
            oagg0[oElement0] = oElement[iIndex0];
            return oagg0
        }, {})) : []
    }, [])
}; toRecordsOriented = function(aInputArray) { return toRO(aInputArray); }

toXXXOriented = function (aInputArray, sXXX) { var aRecordsOrientation = JSONPS(aInputArray); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

toXXXOrientated = function (aInputArray, sXXX) { var aRecordsOrientation = JSONPS(aInputArray); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

toXXXOrientedDEDUPED = function(aInputArray, sXXX)  { var aRecordsOrientation = JSONPS(aInputArray); var o_XXX_Orientation = aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); return Object.keys(o_XXX_Orientation).reduce(function(agg777, oElement777) { if (Array.isArray(o_XXX_Orientation[oElement777])) { agg777[oElement777] = o_XXX_Orientation[oElement777].reduce(function(agg778, oElement778) { return Object.keys(oElement778).reduce(function(agg779, oElement779) { if (agg778[oElement779] == undefined) { agg778[oElement779] = oElement778[oElement779]; } else { agg778[oElement779] = agg778[oElement779] + ";" + oElement778[oElement779]; } return agg778; }, "") }, {}) } else { agg777[oElement777] = o_XXX_Orientation[oElement777]; } return agg777; }, {}) }; toXXXOrientatedDEDUPED=toXXXOrientedDEDUPED;


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
      return toDelimited(aInputArray, String.fromCharCode(9), "").split(String.fromCharCode(10)).splice(1,aInputArray.length+1).join(String.fromCharCode(10));
  } else { // else return aRecordsOriented
      return toDelimited(aInputArray, String.fromCharCode(9), "");
  }
}; toTab = function(a,b,c) { return toTabDelimited(a,b,c); }; toTAB = function(a,b,c) { return toTabDelimited(a,b,c); }

toCSVDelimited = function (a) {
  // toCSVDelimited([["Country","Value"],["United States","12394"],["Russia","6148"],["Germany (FRG)","1653"],["France","2162"],["United Kingdom","1214"],["China","1131"],["Spain","814"],["Netherlands","1167"],["Italy","660"],["Israel","1263"]])
  a = toRO(a);
  // get rid of stray tabs in array so it doesn't create duplciate tabs in tab delimited data
  Object.keys(normalizeRecordsOriented(a)[0]).forEach(function(oElement) {
      a.forEach(function(oElement0) {
          if (typeof(oElement0[oElement]) == "string") {
              oElement0[oElement] = oElement0[oElement].replace(/,/g, "<comma>");
          }
      })
  })
  if (Object.prototype.toString.call(a[0]) == '[object Array]') { // hack for aValuesOriented
      return toDelimited(a, ",", "").split(String.fromCharCode(10)).splice(1,a.length+1).join(String.fromCharCode(10));
  } else { // else return aRecordsOriented
      return toDelimited(a, ",", "");
  }
}; toCSV = function(s) { return toCSVDelimited(s); }

// begin csv/tabs functions
toDelimited = function(aInputArray, sDelimiter, sQualifier) { function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) } var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray); return aInputArray.reduce(function(agg, oElement) { return agg + "\n" + aColumns.filter(function(oElement777) { return oElement777.trim() != "" }).reduce(function(agg001, oElement001, iIndex001) { return agg001 + ((iIndex001 == 0) ? "" : sDelimiter) + sQualifier + ((oElement[oElement001] == undefined ? "" : oElement[oElement001])).toString().replace(/\r\n/g, "<br>").replace(/\n/g, "<br>") + sQualifier; }, "") }, aColumns.map(function(oElement002) { return sQualifier + oElement002 + sQualifier; }).join(sDelimiter)) }

// 01/09/2022 - place beside datascripts.convertTabDelimitedToValuesOriented
function fromCSVToVO(sCSV) { return sCSV.split(String.fromCharCode(10)).map(o=>o.split(",")); }; convertCSVToValuesOriented = function(s) { return fromCSVToVO(s); }
function fromCSVToRO(sCSV) { return toRO(fromCSVToVO(sCSV)); }; convertCSVToRecordsOriented = function(s) { return fromCSVToRO(s); }

fromTABToVO = function(sText) { return sText.split(String.fromCharCode(10)).map(function(oElement) { return oElement.split(String.fromCharCode(9)); }); }; convertTabDelimitedToValuesOriented = function(s) { return fromTABToVO(s); }
fromTABToRO = function(sText) { return toRO(fromTABToVO(sText)); }; convertTabDelimitedToRecordsOriented = function(s) { return fromTABToRO(s); }
fTABToVO=fromTABToVO;fTABToRO=fromTABToRO;fCSVToVO=fromCSVToVO;fCSVToRO=fromCSVToRO;
f8SpaceToVO = function(s) { return fTABToVO(s.replace(/        /g, String.fromCharCode(9) )); }
// end csv/tabs functions

isVO = function(a) { return Array.isArray(a[0]); }; isValuesOriented = function(a) { return isVO(a); }
isRO = function(a) { return (Array.isArray(a) && !Array.isArray(a[0]) && typeof(a[0]) == "object"); }; isRecordsOriented = function(a) { return isRO(a); }
isTAB = function(s) { return (typeof(s) == "string" && s.indexOf(String.fromCharCode(9)) > -1) }; isTabDelimited = function(a) { return isTAB(a); }
isCSV = function(s) { return (typeof(s) == "string" && s.indexOf(",") > -1) }; isCSVDelimited = function(a) { return isTAB(a); }
isOBJ = function(a) { return (typeof a=="object" && !Array.isArray(a)); }; isObj = function(a) { return isOBJ(a); }

typeofdata = function (s) {
    // typeofData([{"to": "wat"}])
    // typeofData({"to": "wat"})
    if (Array.isArray(s) && !Array.isArray(s[0]) && typeof(s[0]) == "object") {
        return "isRO";
    } else if (Array.isArray(s[0])) {
        return "isVO";
    } else if ((typeof(s) == "string" && s.indexOf(String.fromCharCode(9)) > -1)) {
        return "isTAB";
    } else if ((typeof(s) == "string" && s.indexOf(",") > -1)) {
        return "isCSV";
    } else if (Array.isArray(s) == "isArray") {
    } else if (typeof(s) == "string") {
        return "string";
    // } else if (typeof(s) == "string") {
    //    return "object";
    } else {
        return "idk"; // return undefined
    }
}
/* END values oriented / records oriented / tab delimited converter functions */

/* BEGIN CLEANER/NORMALIZER/SANITIZER FUNCTIONS */
// sanitizeValues I think puts an empty string in cells that are ambiguous, sanitizeRecords just gets rid of line breaks in keys
sanitizeValuesOrientedData = function(aValuesOriented) { return aValuesOriented.map(function(oElement) { return oElement.map(function(oElement0) { if (oElement0 == null || oElement == undefined || oElement == NaN ) { return ""; } else { return oElement0; } }) }) }
sanitizeRecordsOrientedData = function(aRecordsOriented) { var aValuesOriented = toVO(aRecordsOriented); aValuesOriented[0] = aValuesOriented[0].map(function(oEl) { return oEl.replace(/\n/g, "") }); return toRO(aValuesOriented); }
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

normalizeRecordsOriented = function(aRecordsOriented) { // AOT toRecordsOriented(toValuesOriented(aRecordsOrientation));
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
// overkill?
replaceColumnNameInRecordsOrientedArray = function(aRecordsOriented, sMatchingString, sReplacementString) {
// vs function renameColumnNameInRecordsOrientedArray(aRecordsOriented, sMatchingString, sReplacementString) {
    // SAMPLE CALL:
    // aRecordsOriented = replaceColumnNameInRecordsOrientedArray(aRecordsOriented, "Rack # / Location", "Bin");
    var aValuesOriented = toVO(aRecordsOriented);
    aValuesOriented[0] = aValuesOriented[0].map(function(oElement) {
        // console.log(oElement == sMatchingString)
        if (oElement == sMatchingString) { oElement = sReplacementString; }
        return oElement;
    })
    return toRO(aValuesOriented);
}
/* END CLEANER/NORMALIZER/SANITIZER FUNCTIONS */

/* BEGIN DATE-RELATED FUNCTIONS */
// MUCH REFACTORING AND CLEANING REQUIRED
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
/* END SOME DATE-RELATED FUNCTIONS */


/* BEGIN JSON.whatever scripts */
// consider refactoring JSONObjectify try/catch errors and keep trying to make assumptions about the data passed into it.  assumptions aren't good but this function is experimental anyways so it'd be cool if I can figure out whether the sSeparator is , vs ; so come up with some sDelimiter (' / ") vs sSeparator ("," / ";") vs sTerminator ("/n")
// note2: sDelimiter should not be considered at all for JSONObjectify, only sSeparator and sTerminator.
JSONObjectify = function(sString, sDelimiter, sColon) {
  if (!sDelimiter) { sDelimiter = ","; } // for now, assume , or \n as delimiters
  if (!sColon) { sColon = ":";} // for now, assume : or = as colons
  // JSONObjectify("branch:main,folder:datascripts");
  // JSONObjectify('{"branch":"main","folder":"datascripts"}');
  try {
    return JSON.parse(sString);
  } catch(e) {
    aReturn = sString.trim().replace(/\,/g, String.fromCharCode(10)).split(String.fromCharCode(10)).map(function(oEl) {
      return oEl;
    })
    return aReturn.reduce(function(oAg, oEl) {
      oEl = oEl.replace(/\=/g, ":");
      sKey = oEl.split(sColon)[0].trim();
      sValue = oEl.split(sColon)[1].trim();
      oAg[sKey] = sValue;
      return oAg;
    }, {})
  }
}
JSONObjectify.sample=function() { return 'JSONObjectify("branch:main,folder:datascripts");'; }
JSONPS = function(o) { return JSON.parse(JSON.stringify(o)); }
/* END JSON.whatever scripts */

// unique2D vs uniqueLodash vs unique vs unique_getdupes/unique2D_getdupes
function unique2D(aArray) { return unique(aArray.map(function(o){ return JSON.stringify(o); })).map(function(o) { return JSON.parse(o); }) }
function unique2D_getdupes(aArray) {
    var bIsRO = true; if (isVO(aArray)) { aArray = toRO(aArray); bIsRO = false; }; //   if (!bIsRO) { aReturn = toValuesOriented(aReturn); }
    var oReturn = {}
    aArray.forEach(function(oEl) {
      sEl = JSON.stringify(oEl);
      if (oReturn[sEl]) {
        oReturn[sEl] += 1;
      } else {
        oReturn[sEl] = 1;
      }
    })
    
    aReturn = Object.keys(oReturn).map(function(oEl) {
      i = oReturn[oEl];
      oObject = JSON.parse(oEl);
      oObject.dupes = i;
      return oObject;
    })
    if (bIsRO) { return aReturn; } else { return toVO(aReturn); }
}
function unique2D_getdupesOverOne(aArray) {
  var aArrayWDupes = unique2D_getdupes(aArray)
  var bIsRO = true; if (isVO(aArrayWDupes)) { aArrayWDupes = toRO(aArrayWDupes); bIsRO = false; }
  var aArrayWDupesOverOne = aArrayWDupes.filter(function(oEl) { return oEl.dupes > 1; })
  if (aArrayWDupesOverOne.length == 0) { aArrayWDupesOverOne = [{"dupes": "0"}]; }
  if (!bIsRO) { aArrayWDupesOverOne = toVO(aArrayWDupesOverOne); }
  return aArrayWDupesOverOne;
}
// 1D de-duplicating functions...note how 1D getdupes() is derivative of 2D by converting 1D array to a simple 2D array via the new f1Dto2D function
f1Dto2D = function(a) { return a.map(function(oo) { return [oo]; }); }
unique_getdupes = function(a) { return unique2D_getdupes(f1Dto2D(["col"].concat(a)) ); }; unique1D_getdupes = function(a) { return unique_getdupes(a) } 
unique_getdupesOverOne = function(a) { return unique2D_getdupesOverOne(f1Dto2D(["col"].concat(a)) ); }; unique1D_getdupesOverOne = function(a) { return unique_getdupesOverOne(a) } 
// var aArray = 


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
cartesian.sample=function() { return 'aArrays = [["a","b","c"], ["d","e"], ["f", "g", "h"], ["i"] ]; cartesian(aArrays);'; }

combineArraysRecursivelyCartesian=function(array_of_arrays){if(!array_of_arrays){return[]} // refactor this with cartesian()?  same thing?
if(!Array.isArray(array_of_arrays)){return[]}
if(array_of_arrays.length==0){return[]}
for(var i=0;i<array_of_arrays.length;i++){if(!Array.isArray(array_of_arrays[i])||array_of_arrays[i].length==0){return[]}}
var outputs=[];function permute(arrayOfArrays){var whichArray=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var output=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"";arrayOfArrays[whichArray].forEach(function(array_element){if(whichArray==array_of_arrays.length-1){outputs.push([output.toString(),array_element.toString()])}else{permute(arrayOfArrays,whichArray+1,output+array_element)}})}
permute(array_of_arrays);return outputs}

chunkize = function(aArray, iChunkSize) {
    var i,j 
    var aChunkedArray = [];
    for (i=0,j=aArray.length; i<j; i+=iChunkSize) {
        aChunkedArray.push(aArray.slice(i,i+iChunkSize));
    }
    return aChunkedArray;
}
chunkize.sample=function() { return "chunkize([1,2,3,4,5,6,7,8,9,0,'A','B','C'], 3)"; }

intersectionString = function(sS1, sS2) { return (sS2.match(new RegExp('[' + sS1 + ']', 'g')) || []).join(''); }
intersectionArray = function(aAr1, aAr2) { return aAr1.filter(function(n) { return aAr2.indexOf(n) !== -1; }); }
intersection = function(aTwoArrays) { // consider refactoring this into datascripts.js
  var s = new Set(aTwoArrays[1]);
  return aTwoArrays[0].filter(function(item)  { s.has(item) } );
};
intersectionMultipleWords = function(sWords) { // this function assumes the sWords are delimited by semicolon.  consider refactoring?
  return intersection(sWords.split(";").map(function(oEl) { return oEl.split(" "); }));
}
// intersectionMultipleWords("TFR Halo Star Valkyrie;Halo Star Valkyrie").join(" ");

intersperse = function(arr, el) {
    var res = [], i=0;
    if (i < arr.length)
        res.push(arr[i++]);
    while (i < arr.length)
        res.push(el, arr[i++]);
    return res;
}
intersperse.sample=function() { return 'intersperse(["a", "b", "c", "d"], "0");'; }

getRanges = function(aArray) {
  // eg getRanges([0,2.1,1,"blah",100,101,2,3,56]) returns ["0-3", "56", "100-101"]
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
getRange = function(n,r){for(var e=[],t=n;t<=r;t++)e.push(t);return e}
range = function(n,r){for(var e=[],t=n;t<=r;t+=1)e.push(t);return e};
getRange3 = getRange; getRanges2 = getRanges;
getRanges.sample=function() { return 'getRanges([0,2.1,1,"blah",100,101,2,3,56])'; }
getRange.sample=function() { return "getRange(1,5)"; }

getRandomInt = function (min, max) {
  if (!min) { min = 1;}; if (!max) { max = 10;};
  min = min-1; max=max+1; min = Math.ceil(min); max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
getRandomInt.sample=function(){return "_.countBy( getRange(0,1000).map(function(oEl) { return getRandomInt(0,1) }) )";}
getRandomArbitrary=getRandomInt;
/* // getRandomArrayToken is currently in domscripts but needs to be es5ified into datascripts.js
getRandomArrayToken = function(a,i) { // consider refactoring this into datascripts.js?  make es5-friendly
    if (i) {} else (i = 1);
    if (i==1) {
        return a[getRandomInt(0,a.length-1)];
    } else {
        return getRange(0, i-1).map(o=>{ return a[getRandomInt(0,a.length-1)]; });
    }
}
*/

/* string cleanup functions */
function strip_tags(str) {
    str = str.toString();
    return str.replace(/<\/?[^>]+>/gi, '');
}
strip_tags.sample=function() { return '"<table><tr><td>blah</td></tr><tr><td>blah2</td></tr></table"'; }
/* END string cleanup functions */

/* dataREGEXscripts */

function regexCurlyBracesExtract(s) { // via forcewake's gist
    var found = [],          // an array to collect the strings that are found
    rCurlyBraces = /{([^}]+)}/g,
    // str = "a {string} with {curly} braces",
    curMatch;
    
    while( curMatch = rCurlyBraces.exec( s ) ) {
        found.push( curMatch[1] );
    }
    return found;
    // console.log( found );    // ["string", "curly"]
}

/* dataGSDSscripts.js => isomorphic, maybe es5 idk, maybe vanilla idk functions that are inspired by and complement googlesheets functions */
// REMOVE dataGSscripts.js from github in favor of datagsscripts.js (make sure I dont do a "Border Gateway Protocol fiasco" like Facebook did)
// 12/15/21 - REMOVE datagsscripts.js entirely from existence and refactor it into permanent part of datascripts.js
try { // remove try/catch when es5ified 100%
    function convertCellToArray(sCell) { return [letterToColumn(sCell.replace(/[0-9]*$/g, "")), parseInt(sCell.replace(/^[A-Z]*/g, ""))]; }
    function convertArrayToCell(aArray) { return columnToLetter(aArray[0]) + aArray[1]; }
    sortAlphaNum = function (a, b) { // converts ["A10", "A1", "A20"] to ["A1", "A10", "A20"]
      return a.localeCompare(b, 'en', { numeric: true });
    };
    cellToColumn = function(sCell) { try { return sCell.toUpperCase().match(/^[A-Z]+/g)[0]; } catch(e) { return undefined; } }
    cellToRow = function(sCell) { try { return sCell.toUpperCase().match(/[0-9]+$/g)[0]; } catch(e) { return undefined; }  }
    // cellToRow("AH378"); cellToColumn("AH378")
    columnToLetter = function(column) {
      // column = column.toUpperCase().match(/[A-Z]+/)[0];
      // columnToLetter(12)
      var temp, letter = '';
      while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
      }
      return letter;
    }
    letterToColumn = function(letter) {
      // letter = letter.toString().toUpperCase().match(/[0-9]+/)[0];;
      var column = 0, length = letter.length;
      for (var i = 0; i < length; i++) {
        column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
      }
      return parseInt(column);
    }

    subtractCells = function (sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
    = sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
    = sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement - parseInt(aCell2[iIndex]) }) }
    // subtractCells("B1", "A1")
    addCells = function (sCell1, sCell2) { if (typeof(sCell1) == "string") { var aCell1 = convertCellToArray(sCell1) } else { aCell1
    = sCell1; }  if (typeof(sCell2) == "string") { var aCell2 = convertCellToArray(sCell2) } else { aCell2
    = sCell2; }  return aCell1.map(function(oElement, iIndex) { return oElement + parseInt(aCell2[iIndex]) }) }
    // addCells("B1", "A1"); addCells("B1", [1,'1']); addCells("B1", [1,1])


    addA1Notation = function(sA1Notation, sOffset) {
      ((Array.isArray(sA1Notation) ) ? sA1Notation = convertArrayToCell(sA1Notation) : "" );
      ((Array.isArray(sOffset) ) ? sOffset = convertArrayToCell(sOffset) : "" );
      // addA1Notation("table!C2", "C2")
      // sColumn = sA1Notation.match(/([A-Z]*)([0-9]*$)/)[1]
      if (sA1Notation.match(/!/g)) {
        var sTable = sA1Notation.split("!")[0] + "!";
        sA1Notation = sA1Notation.split("!")[1];
      } else {
        var sTable = "";
      }
      // sColumnOffset = convertArrayToCell(addCells(sColumn, sOffset))
      sA1NotationOffset = convertArrayToCell(addCells(sA1Notation, sOffset))
      return sTable + sA1NotationOffset;
    }
    subtractA1Notation = function(sA1Notation, sOffset) {
      ((Array.isArray(sA1Notation) ) ? sA1Notation = convertArrayToCell(sA1Notation) : "" );
      ((Array.isArray(sOffset) ) ? sOffset = convertArrayToCell(sOffset) : "" );
      if (sA1Notation.match(/!/g)) {
        var sTable = sA1Notation.split("!")[0] + "!";
        sA1Notation = sA1Notation.split("!")[1];
      } else {
        var sTable = "";
      }
      sA1NotationOffset = convertArrayToCell(subtractCells(sA1Notation, sOffset))
      return sTable + sA1NotationOffset;
    }

    getGoogleSheetRange = function (sCells) {
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
    getGoogleSheetRangeValuesOriented = function(sCells) {  // good lord, can I just refactor getGoogleSheetRangeValuesOriented into rangeToValuesOrientedArray?
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
} catch(e) {}

/* dataLODASH?PANDASscripts => BEGIN PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */


// these lodash-related functions are minified into datascripts so I can keep datascripts under 50000 characters, also so I can focus on the "lodash"-ness of these data-related functions.
// note that note all of them are lodash-dependent but the ones that lodash-independent (list them out?) are deeply related to the ones that are lodash-dependent (list those out too?)

// these next two lines are a minified, de-ES6ified version from gs.  think about its repercussions before refactoring officially into datascripts.js
_removeemptyrows = function (e){try{return e.filter(function(e){return""!=e.join("").trim()})}catch(t){return e}}
_join = function(a, b, match, type, merger) {
  // _.assign({}, leftRow, rightRow);
  // merger = (a: Row, b: Row): Row => assign({}, a, b)
  // aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"],["h_outer","hashFullOuterJoin"],["h_inner","hashInnerJoin"],["h_leftouter","hashLeftOuterJoin"],["h_leftsemi","hashLeftSemiJoin"],["h_leftanti","hashLeftAntiJoin"],["h_rightouter","hashRightOuterJoin"],["h_rightsemi","hashRightSemiJoin"],["h_rightanti","hashRightAntiJoin"],["nl_outer","nestedLoopFullOuterJoin"],["nl_inner","nestedLoopInnerJoin"],["nl_leftouter","nestedLoopLeftOuterJoin"],["nl_leftsemi","nestedLoopLeftSemiJoin"],["nl_leftanti","nestedLoopLeftAntiJoin"],["nl_rightouter","nestedLoopRightOuterJoin"],["nl_rightsemi","nestedLoopRightSemiJoin"],["nl_rightanti","nestedLoopRightAntiJoin"],["sm_outer","sortedMergeFullOuterJoin"],["sm_inner","sortedMergeInnerJoin"],["sm_leftouter","sortedMergeLeftOuterJoin"],["sm_leftsemi","sortedMergeLeftSemiJoin"],["sm_leftanti","sortedMergeLeftAntiJoin"],["sm_rightouter","sortedMergeRightOuterJoin"],["sm_rightsemi","sortedMergeRightSemiJoin"],["sm_rightanti","sortedMergeRightAntiJoin"]]);
  // a = REMOVEEMPTYROWS(a); b = REMOVEEMPTYROWS(b);
  
  // CLEANSE TABLE A AND TABLE B
  if (isVO(a)) { a = toRO(_removeemptyrows(a)); } else { a = toRO(_removeemptyrows(toVO(a))); } // consider refactoring REMOVEEMPTYROWS to check for isVO?
  if (isVO(b)) { b = toRO(_removeemptyrows(b)); } else { b = toRO(_removeemptyrows(toVO(b))); }
  
  // DETERMINE MATCH
  if (match) {} else { match = toVO(a)[0][0].toString() + ";" + toVO(b)[0][0].toString(); }
  if (match.match(/\;/g)) { // ";" semicolon at the simplest level ("first;firstname") is a SINGLE column match where the column has different keys/columnnames between table A and table B 
    var match_a = match.split(";")[0];
    var match_b = match.split(";")[1];
  } else {
    var match_a = match;
    var match_b = match;
  }
  
  // DETERMINE TYPE
  // rule of thumb: when lodash join type is in doubt, "outer" it out.  
  aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["left","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["right","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  type = type.toLowerCase();
  type = type.replace(/semiright/, "rightsemi").replace(/semileft/, "leftsemi").replace(/antiright/, "rightanti").replace(/antileft/, "leftanti").replace(/outerright/, "right").replace(/rightouter/, "right").replace(/outerleft/, "left").replace(/leftouter/, "left").replace(/fullouter/, "outer");
  /* PIVOT LOGIC FOR COMBINING PIVOT AND JOIN
  aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["left","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["right","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  type = type.toLowerCase();
  if type.match(/pivot/g) {
    type = type.replace(/pivot/g, "");
    iIndexA = Object.keys(a[0]).reduce([match_a]
    a = pivottable(a, 
  } else { }
  */
  if (type.match(/^h\_/)) {
      type = type.replace(/^h\_/, "");
      sImplementationAndType = "hash"
  } else if (type.match(/^nl\_/)) {
      type = type.replace(/^nl\_/, "");
      sImplementationAndType = "nestedLoop"
  } else if (type.match(/^sm\_/)) {
      type = type.replace(/^sm\_/, "");
      sImplementationAndType = "sortedMerge"
  } else {
      type = type.replace(/^h\_/, "");
      sImplementationAndType = "hash"
  }
  // aLodashJoinsFormulas = toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["leftouter","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["rightouter","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]);
  sType = (findKey(aLodashJoinsFormulas, "type", type) ? findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula : "FullOuterJoin");
  sImplementationAndType = sImplementationAndType + sType
  // if (type) { type = type.toLowerCase(); } else { type = 'inner'; }; type = type.replace(/^\_\./, "").replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");
  // if (type) {} else { type = '_.hashInnerJoin'; }; type = type.replace(/^\_\./, "");
  // es5 incompatible sType = findKey(aLodashJoinsFormulas, "type", type)?.lodashJoins_formula;
  // refactor this type stuff here
  // sType = (findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula ? findKey(aLodashJoinsFormulas, "type", type).lodashJoins_formula : undefined);
  // if (sType) {} else { sType = '_.hashInnerJoin'; }; // sType = sType.replace(/^\_\./, "") // .replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");;
  // type = sType;
  
  // DETERMINE MERGER
  // if (merger) {} else { merger = function(obj, leftRow, rightRow) { _.assign({}, leftRow, rightRow); } }
  // _.assign({}, leftRow, rightRow


  //if (typeof(match) == 'string') { 
  accessor_a = function (o) { // "," comma at the simplest level ("firstname,lastname;fullname") is a MULTI column match where the columns are concatenated in order to perform the match with a column (or multi columns) between table A and table B
    // return o[match_a];
    // es5 incompatible return match_a.split(",").map(o2=>o[o2]).join("-");
    return match_a.split(",").map(function(o2) { return o[o2]; }).join("");
  } 
  accessor_b = function (o) {
    // return o[match_b];
    // es5 incompatible return match_b.split(",").map(o2=>o[o2]).join("-");
    return match_b.split(",").map(function(o2) { return o[o2]; }).join("");
  }  
  //}
  sEv = "(_." + sImplementationAndType + "(a, accessor_a, b, accessor_b) )";
  sEvDebugging = JSON.stringify(sEv);
  try {
    sEvd = eval(sEv);
    if (sEvd.length>0) {
      return toVO(sEvd);
    } else {
      return [["no results"]];
    }
  } catch(e) { return [[e+sEvDebugging]] }
  // return function () { try { return eval(sEv) } catch (e) { return [[e + sEv]]; } }();
  //return JSON.stringify(b);
  // return toVO(_.hashInnerJoin(a, accessor, b, accessor));
}

_unique = function(aArray, aColumns) {
    // eg uniqueLodash(aRO, ["Type", "Document Number", "Internal ID"])
    var bIsRO = true; if (isVO(aArray)) { aArray = toRO(aArray); bIsRO = false; }; 
    if (aColumns == undefined) {
      aColumns = Object.keys(aArray[0]);
    }
    var aArrayReturn = _.uniqWith(
      aArray,
      function (oA, oB) {
        // oA[aColumns[0]] === oB[aColumns[0]]
        aColumns.reduce( function (oAgg, oEl, iIn) {
            oAgg = oAgg && (oA[oEl] == oB[oEl]);
            return oAgg;
        }, true )
      });
    if (bIsRO) { return aArrayReturn; } else { return toVO(aArrayReturn); }
}; lodashunique = function(a,b) { return _unique(a,b); }

// _merge is basically replaced by _join / lodash-joins.js.  I don't think it's used anywhere?  Get rid?
_merge = function(a, b, sKey, sKey2) { if (sKey2) {} else {sKey2 = sKey}; return _.values(_.merge(_.keyBy(a, sKey), _.keyBy(b, sKey2))); }; lodashmerge = function(a,b,c,d) { return _merge(a,b,c,d); }

_transpose = function (a) {
  if (isVO(a)) {
    aReturn = a[0].map(function (_, colIndex) {
      return a.map(function (row) {
        return row[colIndex];
      });
    });
    // aReturn = _.zip.apply(_, a);
  } else {
    aReturn = toRO(toVO(a)[0].map(function (_, colIndex) {
      return toVO(a).map(function (row) {
        return row[colIndex];
      });
    }));
    // aReturn = toRO(_.zip.apply(_, toVO(a)));
  }
  return aReturn;
};transpose = function (a) {
  return _transpose(a);
};


melt = function (aInputArray, aColumns) {
  // if (isVO(aInputArray)) { aInputArray = toRecordsOriented(aInputArray); }
  var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; };

  aInputArray = normalizeRecordsOriented(aInputArray);
  // REFACTOR OUT .flat() in favor of flatten() to make this friendly with es5 servers?
  // aColumns = ["COUNT(*)", "matrix_child", "matrix_child_2"];
  // aColumns = [0,1,2];
  aRecordsOrientedArray = JSONPS(aInputArray);
  
  var aColumnsIntegers = Object.keys(aRecordsOrientedArray[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() });
  if (aColumns) {} else { aColumns = "-0"; } // "-0" is the default parameter expectation from UNPIVOT or MELT.
  if (aColumns == "*") { aColumns = aColumnsIntegers.join(","); } // melting all columns into just a variables and values columns is silly but it's good for demo purposes 
  var sColumnsChecker = aColumns;

  if (sColumnsChecker[0] == "-") { // then inverse list of columns
    sColumnsChecker = sColumnsChecker.slice(1, sColumnsChecker.length);
    aColumns = aColumnsIntegers; // Object.keys(aRecordsOrientedArray[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() })
    sColumnsChecker.split(",").forEach(function(oElement098) {
      aColumns.splice( aColumns.indexOf(oElement098), 1)
    })
  } else { if (!Array.isArray(aColumns)) { aColumns = sColumnsChecker.split(","); } }
  sColumns = aColumns.join(",")
  
  if (parseInt(aColumns[0]) != NaN) { // convert ints to columnnames - old: typeof(aColumns[0])=="number" || 
      aColumns = aColumns.map(function(oElement) { return Object.keys(aRecordsOrientedArray[0])[parseInt(oElement)] })
  } else {}
    // console.log(aColumns);

    var aReturn = aRecordsOrientedArray.map(function(oElement) {
    // return flatten(aRecordsOrientedArray.map(function(oElement) {
        oElement = JSONPS(oElement);
        return aColumns.map(function(oElement000) {
            //console.log(oElement000)
            oElement.variable = oElement000;
            oElement.value = oElement[oElement000];
            // console.log(oElement);
            oElement = JSONPS(oElement);
            //delete oElement[oElement000];
            return JSONPS(oElement);
        })
    }).flat().map(function(oElement) {
    // }) ).map(function(oElement) {
        oElement = JSONPS(oElement);
        aColumns.forEach(function(oElement000) {
            delete oElement[oElement000];
        })

        return oElement; 
    })
    
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;
}

flatten = function(aArray) {
    // if (!isVO(aArray)) { aArray = toVO(aArray)};
    // this = aArray;
    // Array.prototype.flatten = Array.prototype.flatten || function() {
    // consider refractoring this prototype function or nah?
    var flattened = [];
    for (var i = 0; i < aArray.length; ++i) {
        if (Array.isArray(aArray[i])) {
            flattened = flattened.concat(aArray[i]); // .flatten());
        } else {
            flattened.push(aArray[i]);
        }
    }
    return flattened;
};

explode = function (aInputArray, aColumns, sDelimiter) {
    var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; }; // if (!bIsRO) { aReturn = toVO(aReturn); };

    aInputArray = normalizeRecordsOriented(aInputArray);
    // explode is like excel's horizontal splitting/unnesting, but it unnests vertically
    if (typeof(aColumns) == "string" && aColumns.match(/^[0-9]*/)) {
        aColumns = aColumns.replace(/ /g, ","); aColumns = aColumns.split(",").map(function(o) { return parseInt(o); })
    }
    
    if (!Array.isArray(aColumns)) { aColumns=[aColumns]; }

    function flatten(a) {
      return Array.isArray(a) ? [].concat.apply([], a.map(flatten)) : a;
    }
     // "Directed by";
    if (typeof(aColumns[0]) == "number") {
        var sColumn = Object.keys(aInputArray[0])[aColumns[0]]
    } else { var sColumn = aColumns[0]; }
    aReturn = flatten(aInputArray.map(function(oElement999) {
        if (oElement999[sColumn].toString().split(sDelimiter).length > 1) { 
            return oElement999[sColumn].toString().split(sDelimiter).map(function(oElement) {
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
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;
}
// SAMPLE DATA FROM https://en.wikipedia.org/wiki/List_of_The_X-Files_episodes
// sanitizeRecordsOrientedData(toRecordsOriented(convertHTMLTableToValuesOriented("table.wikitable.plainrowheaders.wikiepisodetable")))

leftantiArray = function(a,b) { return a.filter(function(item) { return b.indexOf(item) === -1 }) };

pivottable=function(aInputArray, aPivotInstructions, bReplaceColumnNames) {
    var bIsRO = true; if (isVO(aInputArray)) { aInputArray = toRO(aInputArray); bIsRO = false; };
    aInputArray = normalizeRecordsOriented(aInputArray);
    
    function parseFloatForSUM(sString) {
        if (isNaN(sString) || sString == "" || sString == undefined || sString == null || sString == NaN) { sString = 0 }
        return parseFloat(sString);
    }
    
    function pivot_table(aRecordsOrientation, aPivotInstructions, bReplaceColumnNames) {
       // replace columns starting with an int with "num_" to temporarily fix bug
       aRecordsOrientation = toRO(toVO(aRecordsOrientation));
       aRecordsOrientationCOPY = toRO(toVO(aRecordsOrientation));
       var aValuesaOriented = toVO(aRecordsOrientation);
       aValuesaOriented[0] = aValuesaOriented[0].map(function(oElement) { if (oElement.match(/^[0-9]/g)) { oElement = "num_" + oElement } return oElement; })
       aRecordsOrientation = toRO(aValuesaOriented);

      if (aPivotInstructions) {} else { // if aPivotInstructions is null then do a random pivot
        aPivotInstructions = getRandomInt(0, Object.keys(aRecordsOrientation[0]).length-1) + "  * listaggU";
      }
      
      // aPivotInstructions = "2 4,5 7 listaggU";      
      if (typeof(aPivotInstructions) == "string") {
        
        aPivotInstructions = aPivotInstructions.split(" ").map(function(oEl, iIn) {
          if (iIn == 3) {
            return oEl.split(",")
          } else {
            return oEl.split(",").map(function(oEl0) {
                if (oEl0 == "") {
                    // return 0;
                    return "";
                } else {
                    if (oEl0 == "*") {
                        return oEl0;
                    } else { return parseInt(oEl0); }
                }
            })
          }
        })
        // console.log(aPivotInstructions);
      }
       // aPivotInstructions = [[2],[4,5],[7],[listaggU]]      
       if (typeof(aPivotInstructions[0][0]) == "number") {
        // convert strs to int columns
        // aPivotInstructions2 = aPivotInstructions.map(function(oElement0, iIndex0) { return ((iIndex0 != 3 ) ? oElement0.map(function(oElement) { return Object.keys(aRecordsOrientation[0]).indexOf(oElement) }) : oElement0); })
        // convert int to str columns
           // console.log(aPivotInstructions)
            aUsedColumns = []; // aPivotInstructions[2][0] == "*"
            aPivotInstructions = aPivotInstructions.map(function(oElement0, iIndex0) {
                return ((iIndex0 != 3 ) ? function() {aAA = flatten(oElement0.map(function(oElement) {
                sColumnNameFromInteger = Object.keys(aRecordsOrientation[0])[oElement.toString()];
                if(oElement) { aUsedColumns.push(oElement.toString()); }
                if (sColumnNameFromInteger != undefined) {
                    return sColumnNameFromInteger;
                } else {
                    if (oElement == "*") {
                        // aUsedColumns = ['0', '3']
                        // find where values in the left 1D array are NOT in the right 1D array
                        aAllColsInts = range(0,Object.keys(aRecordsOrientation[0]).length-1).map(function(o9) { return o9.toString(); });
                        aAsteriskColumns = leftantiArray(aAllColsInts, aUsedColumns).map(function(o231) { return Object.keys(aRecordsOrientation[0])[o231]; } );
                        return aAsteriskColumns;
                    } else {
                        return [];
                    }
                }
            })); return(aAA) }() : oElement0); })
            if (aPivotInstructions[1][0] == "") { aPivotInstructions[1] = []; }
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
                            sSecondPartOfReturn += templateFn({sTitle: sTitle, sObject: sObject, sValueTitle: sValueTitle}) + String.fromCharCode(10);

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
                        sSecondPartOfReturn += templateFn({sTitle: sTitle, sValueTitle: sValueTitle}) + String.fromCharCode(10);
                    }
                })
            })

            sToEval = "var aPivotedData = _.map(oRecordsOrientationGroup, function(group){ return {\n" + sFirstPartOfReturn + sSecondPartOfReturn + "\n}; });"
            // console.log(sToEval); // eval(sToEval)
            eval(sToEval);
            // copy(JSON.stringify(aPivotedData))
            //console.log("oRecordsOrientationGroup = " + JSON.stringify(oRecordsOrientationGroup));
            //console.log("aColumnsIndexAllCombinations" + JSON.stringify(aColumnsIndexAllCombinations));
            //console.log(sToEval)
            
            if (bReplaceColumnNames) {
                // this 3rd parameter (bReplaceColumnNames) only works when there's no more than 1 sAggInstruction AND when there's no columnColumns
                // console.log(aRenamedColumns);
                // aRenamedColumns = Object.keys(aRecordsOrientationCOPY[0]);
                // console.log(aPivotInstructions[0]);
                // console.log(aPivotInstructions[2]);
                aRenamedColumns = aPivotInstructions[0].concat(aPivotInstructions[2]);
                // console.log(aRenamedColumns);

                aPivotedData.forEach(function(oEl) {
                    Object.keys(oEl).forEach(function(oEl0, iIn0) {
                        if (iIn0 > 0) {
                            oEl[aRenamedColumns[iIn0]] = oEl[oEl0];
                            delete oEl[oEl0];
                        }
                    })
                })

            }
            return aPivotedData;
        } catch(eError) {
            return [eError, sToEval];
        }
    }
    var aReturn = pivot_table(aInputArray, aPivotInstructions, bReplaceColumnNames);
    if (!bIsRO) { aReturn = toVO(aReturn); };
    return aReturn;

}




/* END PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */


/* data JMP Tidy.js dplyr and the tidyverse in R */

/* dataENCODEscripts => superhtmlEntities/superencode/superHtmlDecode.minified.js */
// encode encodes apostrophes too!
superencode = function(s){ // superencode("~!.*()-_") is the same, consider refractoring? DONE -> refactored this into supersuperencode if needed.
  // superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
  // return w.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
  return encodeURIComponent(s).replace(/'/g, "%27");
}

supersuperencode = function(s) { // this is a more zealous version of superencode where it attempts to encodeURIComponent as much as possible (rather than just apostraphes)
  return superencode(s).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\`/g, "%60")
}

superhtmlEntities = function(s) {
  // superhtmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/,"&#96;")};
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#96;'); //.replace(/?/g, '&#xB4;');
}


superencodeS = function (s) { return superencode(s); }
supersuperencodeS = function (s) { return supersuperencode(s); }
superhtmlEntitiesS = function (s) { return superhtmlEntities(s); }


superHtmlDecode = function(sString) {
  // superHtmlDecode("blah blah blah &lt;whatever&gt;");
  // consider refactoring this in:
  // replace(/&lt/g, "&lt;").replace(/&gt/g, "glt;")
  // in order to include "blah blah $ltwhatever&gt".  why do some sources not include semicolon?
  var entities= {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",

    "&apos;": "'",
    "&#96;": "`",
  };

  for (var prop in entities) {
    if (entities.hasOwnProperty(prop)) {
      sString = sString.replace(new RegExp(prop, "g"), entities[prop]);
    }
  }
  return sString;
}

// need to "supervariablize()" the columns in _pivot()'s input aRO data because columns with symbols (such as <> or ampersand) in them I get a "Error Result was not automatically expanded, please insert more columns (4052)".  supervariableize() is just a wrapper around superencode() and probably needs have better replacement logic than "PERCENTANGESIGN", maybe btoa("PERCENTAGESIGN")?
supervariableize = function(s) {
  return supersuperencode(s).replace(/\~/g, "TILDESIGN").replace(/\./g, "PERIODSIGN").replace(/\%/g, "PERCENTANGESIGN").replace(/-/g, "DASHSIGN").replace(/\&/g, "AMPERSANDSIGN").replace(/\?/g, "QUESTIONSIGN");
}
superdevariableize = function(s) { return decodeURIComponent(s.replace(/TILDESIGN/g, "~").replace(/PERIODSIGN/g, ".").replace(/PERCENTANGESIGN/g, "%").replace(/DASHSIGN/g, "-").replace(/PERCENTANGESIGN/g, "%").replace(/AMPERSANDSIGN/g, "&").replace(/QUESTIONSIGN/g, "?")); }


// domDATAHTML.es5.scripts
// THE FOLLOWING CODE USED TO BE "domscripts.serversafe", but now its just part of domDATAHTML.es.js scripts
// pseudocode for new domscript function - refactor convertOSRToHTMLTable, convertRecordsOrientedArrayToHTMLTable, convertValuesOrientedToHTMLTable into one solution? 
toHTMLSelect=function(aArray, sSelectIDOrClasses, iSelected, bBlank) { // refractor this to accept array of values vs array of objects (select id?)
    var sSelectID = returnIDAndOrClasses(sSelectIDOrClasses).id;
    var sSelectClasses = (returnIDAndOrClasses(sSelectIDOrClasses).classes + " aArraySelect").trim();
    if (sSelectID) { sSelectID = " id='" + sSelectID + "'"; }        
    
    if (Array.isArray(aArray)) {} else { aArray = [aArray]; }
    if (bBlank) { bBlank = "" } else { bBlank = "<option></option>"; }
    // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
    return "<select " + sSelectID + " class='" + sSelectClasses + "'>" + bBlank + aArray.map(function(o,i) { return "<option value='" + superhtmlEntities(o) + "'" + ((iSelected==i) ? " selected": "")+ ">" + superhtmlEntities(o) + "</option>"; }).join("")+"</select>";
}
toHTMLTable = function(aArrayOrObject, aColumns, sTableID) {
  // refactor the two functions into datascripts
  isRO = function(a) { return (Array.isArray(a) && !Array.isArray(a[0]) ); }; isRecordsOriented = function(a) { return isRO(a); }
  isOSR = function(a) { return (!Array.isArray(a) && a.allcells != undefined); };

  if (isVO(aArrayOrObject)) {
    return convertValuesOrientedToHTMLTable(aArrayOrObject, aColumns, sTableID);
  } else if (isOSR(aArrayOrObject)) {
    return convertOSRToHTMLTable(aArrayOrObject, aColumns, sTableID);
  } else if (isRO(aArrayOrObject)) {
    return convertRecordsOrientedArrayToHTMLTable(aArrayOrObject, aColumns, sTableID);
  }
}
// refactoring opportunities for returnIDAndOrClasses, convertRecordsOrientedArrayToHTMLTable, and convertValuesOrientedToHTMLTable
// get rid of try/catches in favor of the es6-friendly versions (these are es5-friendly only for NS purposes), get rid of fFunction = function() format, use destructuring in convertRecordsOrientedArrayToHTMLTable and convertValuesOrientedToHTMLTable rather than calling returnIDAndOrClasses() twice, etc etc
returnIDAndOrClasses = function(sIDAndOrClasses) {
    try { sIDAndOrClasses = sIDAndOrClasses.replace(" ", "_"); } catch(e) {}
    var sID = ""; var sClasses = ""; var aMatches;
    try { aMatches = sIDAndOrClasses.match(/(\#|\.)(\w*)/g); } catch(e) {}
    if (aMatches) { // try to find an id and/or classes
        // console.log(aMatches);
        try { sID = sIDAndOrClasses.match(/(\#)(\w*)/)[2]; } catch(e) {} // just match the first (ie 2th) match - eg returnIDAndOrClasses(".blah#wat#what#whatever"); returns id=wat
        try { sClasses = sIDAndOrClasses.match(/(\.)(\w*)/g).map(function(ooo) { return ooo.replace(/\./g, "").replace(" ", "_") }).join(" "); } catch(e) {}
        // sTableID = "";
    } else { // if (sID) { // assume it's an id being passed through if no # and . indicators
        sID = (sIDAndOrClasses ? sIDAndOrClasses : "" );
        // sTableID = sTableID;
        // sClasses = "aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable _gsws gsws";
    }
    // if (sID == undefined || sID.length==0 ) { sID = ""; } else { sID = " id='" + sID + "'"; }
    return {id: sID, classes: sClasses};
}
// convertValuesOrientedToHTMLTable(toVO(toRO([["one","two","three"],[4,5,6],[7,8,9]])), undefined, "#wat")
// convertRecordsOrientedToHTMLTable((toRO([["one","two","three"],[4,5,6],[7,8,9]])), undefined, "#wat")
// returnIDAndOrClasses(".blah");
// returnIDAndOrClasses("#blah.wat#what.whatever.whateverblah");
// returnIDAndOrClasses("#blah.testing_12.hello.wat");
// returnIDAndOrClasses("blah");
// returnIDAndOrClasses(".blah# blah2");
convertRecordsOrientedArrayToHTMLTable = function(aRecordsOriented, aColumns, sTableIDOrClasses) {
    // sTableID = "#blah.testing_12.hello"; sTableID = "asdfasf";
    var sTableID = returnIDAndOrClasses(sTableIDOrClasses).id;
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable convertRecordsOrientedToHTMLTable RecordsOrientedArrayToHTML _gsws gsws").trim();
    var sRawTableID = ""; // consider refactoring this redundant variable out?
    if (sTableID) { sRawTableID = sTableID; sTableID = " id='" + sTableID + "'"; }
    
    console.log(sRawTableID);
    // convertRecordsOrientedArrayToHTMLTable(aRecordsOriented)
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
        aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }

    sHTMLTable = "<table " + sTableID + " class='" + sTableClasses + "' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement, iIndex) {
        agg = agg + "<tr>" + aColumns.reduce(function(agg000, oElement000, iIndex000) {
            var sCell = columnToLetter(iIndex000+1) + (iIndex+2);
            var sClasses = "gsws gscell gsws_" + sRawTableID + " " + sCell + " row" + (iIndex+2) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            console.log(sClasses);
            agg000 = agg000 + "<td title='" + sCell + "' class='" + sClasses + "'>" + oElement[oElement000] + "</td>"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>";
        return agg;
    }, 
        "<thead><tr>" + aColumns.reduce(function(agg001, oElement001, iIndex001) {
            var sCell = columnToLetter(iIndex001+1) + "1";
            var sClasses = "gsws gscell gsws_" + sRawTableID + " " + sCell + " row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            // var sClasses = "gsws row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
            return agg001 + "<th title='" + sCell + "' class='" + sClasses + "'>" + oElement001 + "</th>"; // style='border-right: 1px solid black; border-left: 1px solid black;'
        }, "") + "</tr></thead><tbody>"
    ) + "</tbody></table>";
        return sHTMLTable;
}; convertRecordsOrientedToHTMLTable = function(aRO, aColumns, sTableIDOrClasses) { return convertRecordsOrientedArrayToHTMLTable(aRO, aColumns, sTableIDOrClasses) }

convertValuesOrientedArrayToHTMLTable = function(aValuesOriented, aColumns, sTableIDOrClasses) {
    var sTableID = returnIDAndOrClasses(sTableIDOrClasses).id;
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aVO aValuesOriented convertValuesOrientedArrayToHTMLTable convertValuesOrientedToHTMLTable ValuesOrientedArrayToHTML _gsws gsws").trim();
    if (sTableID) { sTableID = " id='" + sTableID + "'"; }
    /// convertValuesOrientedToHTMLTable([[1,2,3,4],[0,0,0,0],[9,9,9,9]], undefined, "gswsvo")
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }

    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 // aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
    // gsws gsws_SDJOWholeForm A4 gscell columnA row4
    sHTMLTable = "<table " + sTableID + " class='" + sTableClasses + "'" + " style='margin: 0 auto; text-align: center;'>" + aValuesOriented.reduce(function(agg, oElement, iIndex) {
    // sHTMLTable = "<table id='" + sTableID + "' class='convertValuesOrientedToHTMLTable gsws gsws_" + sTableID + "' style='margin: 0 auto; text-align: center;'>" + aValuesOriented.reduce(function(agg, oElement, iIndex) {
                if (iIndex==0) {
          sTHEADBODYBEG = "<thead>";
          sTHEADBODYEND = "</thead>";
          sTDTH = "th";
        } else {
          sTHEADBODYBEG = "";
          sTHEADBODYEND = "";
          sTDTH = "td";
        }
              if (iIndex==1) {
          sTHEADBODYBEG = "<tbody>";
          if (aValuesOriented.length != 2) {
            sTHEADBODYEND = "";
          }
        }
              if (iIndex==aValuesOriented.length-1 && iIndex!=0) {
          if (aValuesOriented.length != 2) {
            sTHEADBODYBEG = "";
          }
          sTHEADBODYEND = "</tbody>";          
        }
              agg = agg + sTHEADBODYBEG + "<tr>" + oElement.reduce(function(agg000, oElement000, iIndex000) {
            //console.log(oElement);
            var sCell = columnToLetter(iIndex000+1) + (iIndex+1);
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row" + (iIndex+1) + " column" + columnToLetter(iIndex000+1) + " cellcolumn" + iIndex000;
            agg000 = agg000 + "<" + sTDTH + " title='" + sCell + "' class='" + sClasses + "'>" + oElement000 + "</" + sTDTH + ">"; // style='text-align:left'
            return agg000;
        }, "") + "</tr>" + sTHEADBODYEND;
        return agg;
    }, "") + "</table>";
    return sHTMLTable.replace(/ id=''/g, "");
}; convertValuesOrientedToHTMLTable = function(aVO, aColumns, sTableIDOrClasses) { return convertValuesOrientedArrayToHTMLTable(aVO, aColumns, sTableIDOrClasses) }

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
// REFACTOR - I don't think flat() is es5-friendly but let it through for now
// GSDS_disjointedRangeToArray = function(sA1Notation) { return GSDS_disjointedRangeToAVO(sA1Notation).flat().filter(function(oEl) { return oEl; }) }
GSDS_disjointedRangeToArray = function(sA1Notation) { return flatten(GSDS_disjointedRangeToAVO(sA1Notation)).filter(function(oEl) { return oEl; }) }

function hyperlink(sURL, sName, bNoTarget) {
   if (sName) {} else {sName = "link"}
   if (sName.match(/hyperlink/)) { // html ahref hyperlink
     return "=hyperlink(\"" + sURL + "\", \"" + sName + "\")";
   } else { // googlesheets hyperlink
     return "<a " + ((bNoTarget) ? "": "target='_blank' ") + "href='" + sURL + "'>link</a>";
   }
}