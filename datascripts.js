/* datascripts => isomorphic, vanilla-ish ES5-safe functions inspired from Python Pandas, uses lodash lightly  */

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
// sCF = String.fromCharCode(13); sLF = String.fromCharCode(10); sTB = String.fromCharCode(9);
// sCarriageReturn = sCF; sLineFeed = sLF; sTab = sTB;                                                                       
/* END no brainer / polyfilles for es5 */

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
    aRO = normalizeRecordsOriented(JSON.parse(JSON.stringify(aRO)));
    
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
findKeyIndexes = function(aData,sKey,sVal) { return JSON.parse(JSON.stringify(aData)).map(function(e, i) { e.index = i; return e; }).filter(function(e) { return e[sKey] == sVal; }).map(function(e) { return e.index }) }
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

toVO = function(aInputArray, aColumns) {
    if (isVO(aInputArray)) { return aInputArray; }
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
    var aValuesOrientation = normalizeValuesOriented(sanitizeValuesOrientedData(JSON.parse(JSON.stringify(aInputArray))));
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
toXXXOriented = function (aInputArray, sXXX) { var aRecordsOrientation = JSON.parse(JSON.stringify(aInputArray)); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }
toXXXOrientedDEDUPED = function(aInputArray, sXXX)  { var aRecordsOrientation = JSON.parse(JSON.stringify(aInputArray)); var o_XXX_Orientation = aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); return Object.keys(o_XXX_Orientation).reduce(function(agg777, oElement777) { if (Array.isArray(o_XXX_Orientation[oElement777])) { agg777[oElement777] = o_XXX_Orientation[oElement777].reduce(function(agg778, oElement778) { return Object.keys(oElement778).reduce(function(agg779, oElement779) { if (agg778[oElement779] == undefined) { agg778[oElement779] = oElement778[oElement779]; } else { agg778[oElement779] = agg778[oElement779] + ";" + oElement778[oElement779]; } return agg778; }, "") }, {}) } else { agg777[oElement777] = o_XXX_Orientation[oElement777]; } return agg777; }, {}) }
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
}
toDelimited = function(aInputArray, sDelimiter, sQualifier) { function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) } var aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray); return aInputArray.reduce(function(agg, oElement) { return agg + "\n" + aColumns.filter(function(oElement777) { return oElement777.trim() != "" }).reduce(function(agg001, oElement001, iIndex001) { return agg001 + ((iIndex001 == 0) ? "" : sDelimiter) + sQualifier + ((oElement[oElement001] == undefined ? "" : oElement[oElement001])).toString().replace(/\r\n/g, "<br>").replace(/\n/g, "<br>") + sQualifier; }, "") }, aColumns.map(function(oElement002) { return sQualifier + oElement002 + sQualifier; }).join(sDelimiter)) }
convertTabDelimitedToValuesOriented = function(sText) { return sText.split(String.fromCharCode(10)).map(function(oElement) { return oElement.split(String.fromCharCode(9)); }); }
convertTabDelimitedToRecordsOriented = function(sText) { return toRO(convertTabDelimitedToValuesOriented(sText)); };toXXXOrientatedDEDUPED=toXXXOrientedDEDUPED;

toXXXOrientated = function (aInputArray, sXXX) { var aRecordsOrientation = JSON.parse(JSON.stringify(aInputArray)); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

isVO = function(a) { return Array.isArray(a[0]); }; isValuesOriented = function(a) { return isVO(a); }
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

// unique2D vs uniqueLodash
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

/* BEGIN PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */
_removeemptyrows=function(t){try{return t.filter(function(t){return""!=t.join("")})}catch(e){return t}},_join=function(a,b,match,type,merger){if(a=isVO(a)?toRO(_removeemptyrows(a)):toRO(_removeemptyrows(toVO(a))),b=isVO(b)?toRO(_removeemptyrows(b)):toRO(_removeemptyrows(toVO(b))),match||(match=toVO(a)[0][0].toString()+";"+toVO(b)[0][0].toString()),match.match(/\;/g))var match_a=match.split(";")[0],match_b=match.split(";")[1];else var match_a=match,match_b=match;aLodashJoinsFormulas=toRO([["type","lodashJoins_formula"],["outer","FullOuterJoin"],["inner","InnerJoin"],["left","LeftOuterJoin"],["leftsemi","LeftSemiJoin"],["leftanti","LeftAntiJoin"],["right","RightOuterJoin"],["rightsemi","RightSemiJoin"],["rightanti","RightAntiJoin"]]),type=type.toLowerCase(),type=type.replace(/semiright/,"rightsemi").replace(/semileft/,"leftsemi").replace(/antiright/,"rightanti").replace(/antileft/,"leftanti").replace(/outerright/,"right").replace(/rightouter/,"right").replace(/outerleft/,"left").replace(/leftouter/,"left").replace(/fullouter/,"outer"),type.match(/^h\_/)?(type=type.replace(/^h\_/,""),sImplementationAndType="hash"):type.match(/^nl\_/)?(type=type.replace(/^nl\_/,""),sImplementationAndType="nestedLoop"):type.match(/^sm\_/)?(type=type.replace(/^sm\_/,""),sImplementationAndType="sortedMerge"):(type=type.replace(/^h\_/,""),sImplementationAndType="hash"),sType=findKey(aLodashJoinsFormulas,"type",type)?findKey(aLodashJoinsFormulas,"type",type).lodashJoins_formula:"FullOuterJoin",sImplementationAndType+=sType,accessor_a=function(t){return match_a.split(",").map(function(e){return t[e]}).join("")},accessor_b=function(t){return match_b.split(",").map(function(e){return t[e]}).join("")},sEv="(_."+sImplementationAndType+"(a, accessor_a, b, accessor_b) )",sEvDebugging=JSON.stringify(sEv);try{return sEvd=eval(sEv),sEvd.length>0?toVO(sEvd):[["no results"]]}catch(t){return[[t+sEvDebugging]]}},_unique=function(t,e){var n=!0;isVO(t)&&(t=toRO(t),n=!1),null==e&&(e=Object.keys(t[0]));var r=_.uniqWith(t,function(t,n){e.reduce(function(e,r,a){return e=e&&t[r]==n[r]},!0)});return n?r:toVO(r)},lodashunique=function(t,e){return _unique(t,e)},_merge=function(t,e,n,r){return r||(r=n),_.values(_.merge(_.keyBy(t,n),_.keyBy(e,r)))},lodashmerge=function(t,e,n,r){return _merge(t,e,n,r)},_transpose=function(t){return isVO(t)?aReturn=_.zip.apply(_,t):aReturn=toRO(_.zip.apply(_,toVO(t))),aReturn},transpose=function(t){return _transpose(t)},melt=function(t,e){var n=!0;isVO(t)&&(t=toRO(t),n=!1),t=normalizeRecordsOriented(t),aRecordsOrientedArray=JSON.parse(JSON.stringify(t));var r=Object.keys(aRecordsOrientedArray[0]).map(function(t,e){return e.toString()});e||(e="-0"),"*"==e&&(e=r.join(","));var a=e;"-"==a[0]?(a=a.slice(1,a.length),e=r,a.split(",").forEach(function(t){e.splice(e.indexOf(t),1)})):Array.isArray(e)||(e=a.split(",")),sColumns=e.join(","),NaN!=parseInt(e[0])&&(e=e.map(function(t){return Object.keys(aRecordsOrientedArray[0])[parseInt(t)]}));var i=aRecordsOrientedArray.map(function(t){return t=JSON.parse(JSON.stringify(t)),e.map(function(e){return t.variable=e,t.value=t[e],t=JSON.parse(JSON.stringify(t)),JSON.parse(JSON.stringify(t))})}).flat().map(function(t){return t=JSON.parse(JSON.stringify(t)),e.forEach(function(e){delete t[e]}),t});return n||(i=toVO(i)),i},flatten=function(t){for(var e=[],n=0;n<t.length;++n)Array.isArray(t[n])?e=e.concat(t[n]):e.push(t[n]);return e},explode=function(t,e,n){var r=!0;if(isVO(t)&&(t=toRO(t),r=!1),t=normalizeRecordsOriented(t),"string"==typeof e&&e.match(/^[0-9]*/)&&(e=(e=e.replace(/ /g,",")).split(",").map(function(t){return parseInt(t)})),Array.isArray(e)||(e=[e]),"number"==typeof e[0])var a=Object.keys(t[0])[e[0]];else a=e[0];return aReturn=function t(e){return Array.isArray(e)?[].concat.apply([],e.map(t)):e}(t.map(function(t){return t[a].toString().split(n).length>1?t[a].toString().split(n).map(function(e){return Object.keys(t).reduce(function(n,r){return n[r]=r==a?e.trim():t[r],n},{})}):t})),r||(aReturn=toVO(aReturn)),aReturn},leftantiArray=function(t,e){return t.filter(function(t){return-1===e.indexOf(t)})},pivottable=function(aInputArray,aPivotInstructions,bReplaceColumnNames){var bIsRO=!0;function parseFloatForSUM(t){return(isNaN(t)||""==t||null==t||null==t||NaN==t)&&(t=0),parseFloat(t)}function pivot_table(aRecordsOrientation,aPivotInstructions,bReplaceColumnNames){aRecordsOrientation=toRO(toVO(aRecordsOrientation)),aRecordsOrientationCOPY=toRO(toVO(aRecordsOrientation));var aValuesaOriented=toVO(aRecordsOrientation);aValuesaOriented[0]=aValuesaOriented[0].map(function(t){return t.match(/^[0-9]/g)&&(t="num_"+t),t}),aRecordsOrientation=toRO(aValuesaOriented),"string"==typeof aPivotInstructions&&(aPivotInstructions=aPivotInstructions.split(" ").map(function(t,e){return 3==e?t.split(","):t.split(",").map(function(t){return""==t?"":"*"==t?t:parseInt(t)})})),"number"==typeof aPivotInstructions[0][0]&&(aUsedColumns=[],aPivotInstructions=aPivotInstructions.map(function(t,e){return 3!=e?(aAA=flatten(t.map(function(t){return sColumnNameFromInteger=Object.keys(aRecordsOrientation[0])[t.toString()],t&&aUsedColumns.push(t.toString()),null!=sColumnNameFromInteger?sColumnNameFromInteger:"*"==t?(aAllColsInts=range(0,Object.keys(aRecordsOrientation[0]).length-1).map(function(t){return t.toString()}),aAsteriskColumns=leftantiArray(aAllColsInts,aUsedColumns).map(function(t){return Object.keys(aRecordsOrientation[0])[t]}),aAsteriskColumns):[]})),aAA):t}),""==aPivotInstructions[1][0]&&(aPivotInstructions[1]=[]));var sToEval="";try{aRecordsOrientation=aRecordsOrientation.map(function(t){return Object.keys(t).reduce(function(e,n){return e[(n=null==n?"":n).replace(/[^A-Za-z_0-9]+/g,"_")]=null==t[n]?"":t[n].toString(),e},{})}),aPivotInstructions[0]=aPivotInstructions[0].map(function(t){return t.toString().replace(/[^A-Za-z_0-9]+/g,"_")}),aPivotInstructions[1]=aPivotInstructions[1].map(function(t){return t.toString().replace(/[^A-Za-z_0-9]+/g,"_")}),aPivotInstructions[2]=aPivotInstructions[2].map(function(t){return t.toString().replace(/[^A-Za-z_0-9]+/g,"_")});var oRecordsOrientationGroup=_.groupBy(aRecordsOrientation,function(t){return aPivotInstructions[0].map(function(e){return t[e]}).join("#")}),aColumnsIndex=[["_"]],aColumnsIndexAllCombinations=[["_"]];return aPivotInstructions[1].length>0&&(aColumnsIndex=aPivotInstructions[1].map(function(t){return _.uniqBy(aRecordsOrientation,t).map(function(e){return e[t]})}),aColumnsIndexAllCombinations=aColumnsIndex.reduce(function(t,e){return t.reduce(function(t,n){return t.concat(e.map(function(t){return[].concat(n,t)}))},[])}),"string"==typeof aColumnsIndexAllCombinations[0]&&(aColumnsIndexAllCombinations=aColumnsIndexAllCombinations.map(function(t){return[t]}))),sFirstPartOfReturn=aPivotInstructions[0].reduce(function(t,e){return t+"'"+e+"': group[0]['"+e+"'],\n"},""),sSecondPartOfReturn="",aPivotInstructions[2].forEach(function(t,e){var n=aPivotInstructions[3][e];n||(n=aPivotInstructions[3][0]),n.split("-").forEach(function(e,n){if(e=(e=e.toLowerCase()).replace(/np\./g,"").replace(/ns\_concat/g,"listagg"),'[["_"]]'!=JSON.stringify(aColumnsIndexAllCombinations))aColumnsIndexAllCombinations.forEach(function(n){if(sTitle="'"+t.replace(/[\W_]+/g,"")+"_"+e+"_"+n.join("_").replace(/[\W_]+/g,"")+"'",sObject=n.reduce(function(t,e,n){return t+"'"+aPivotInstructions[1][n]+"': '"+e+"',"},""),"listagg"==e)var r="<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";else if("listaggu"==e)r="<%= sTitle %>: _.uniq(_.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";else if("sum"==e)r="<%= sTitle %>: _.filter(group, {<%= sObject %>}).reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";else if("len"==e)r="<%= sTitle %>: _.filter(group, {<%= sObject %>}).length,";else r="<%= sTitle %>: JSON.stringify(group),",r="<%= sTitle %>: {sTitle: <%= sTitle %>, sObject: <%= sObject %>, sValueTitle: <%= sValueTitle %>, group: JSON.stringify(group)},";var a=_.template(r);sSecondPartOfReturn+=a({sTitle:sTitle,sObject:sObject,sValueTitle:t})+String.fromCharCode(10)});else{if(sTitle="'"+t.replace(/[\W_]+/g,"")+"_"+e+"'","listagg"==e)var r="<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>,";else if("listaggu"==e)r="<%= sTitle %>: _.uniq(group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: [agg.<%= sValueTitle %>, oElement.<%= sValueTitle %>].filter(function (sElement) { return sElement != ''; }).join(';')}}, {<%= sValueTitle %>: ''}).<%= sValueTitle %>.split(';')).join(';'),";else if("sum"==e)r="<%= sTitle %>: group.reduce(function(agg, oElement) { return {<%= sValueTitle %>: agg.<%= sValueTitle %> + parseFloatForSUM(oElement.<%= sValueTitle %>) }}, {<%= sValueTitle %>: 0}).<%= sValueTitle %>,";else if("len"==e)r="<%= sTitle %>: group.length,";else r="<%= sTitle %>: JSON.stringify({<%= sTitle %>: JSON.stringify(group)}),";var a=_.template(r);sSecondPartOfReturn+=a({sTitle:sTitle,sValueTitle:t})+String.fromCharCode(10)}})}),sToEval="var aPivotedData = _.map(oRecordsOrientationGroup, function(group){ return {\n"+sFirstPartOfReturn+sSecondPartOfReturn+"\n}; });",eval(sToEval),bReplaceColumnNames&&(aRenamedColumns=aPivotInstructions[0].concat(aPivotInstructions[2]),aPivotedData.forEach(function(t){Object.keys(t).forEach(function(e,n){n>0&&(t[aRenamedColumns[n]]=t[e],delete t[e])})})),aPivotedData}catch(t){return[t,sToEval]}}isVO(aInputArray)&&(aInputArray=toRO(aInputArray),bIsRO=!1),aInputArray=normalizeRecordsOriented(aInputArray);var aReturn=pivot_table(aInputArray,aPivotInstructions,bReplaceColumnNames);return bIsRO||(aReturn=toVO(aReturn)),aReturn};
/* END PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */

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


/* string cleanup functions */
function strip_tags(str) {
    str = str.toString();
    return str.replace(/<\/?[^>]+>/gi, '');
}
strip_tags.sample=function() { return '"<table><tr><td>blah</td></tr><tr><td>blah2</td></tr></table"'; }
/* END string cleanup functions */

// superhtmlEntities/superencode/superHtmlDecode.minified.js
superhtmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/g,"&#96;")},superencode=function(e){return encodeURIComponent(e).replace(/'/g,"%27")},superHtmlDecode=function(e){var r={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&#96;":"`"};for(var t in r)r.hasOwnProperty(t)&&(e=e.replace(new RegExp(t,"g"),r[t]));return e};

// domscripts.serversafe.minified.js
convertRecordsOrientedArrayToHTMLTable=function(e,t,n){return null==n&&(n=""),null==t&&(t=function(e){return e.reduce(function(e,t){return e=e.concat(Object.keys(t)),e=unique(e)},[])}(e)),sHTMLTable="<table id='"+n+"' class='RecordsOrientedArrayToHTML gsws gsws_"+n+"' style='margin: 0 auto; text-align: center;'>"+e.reduce(function(e,o,r){return e=e+"<tr>"+t.reduce(function(e,t,l){var s=columnToLetter(l+1)+(r+2);return e=e+"<td title='"+s+"' class='"+("gsws gscell gsws_"+n+" "+s+" row"+(r+2)+" column"+columnToLetter(l+1)+" cellcolumn"+l)+"'>"+o[t]+"</td>"},"")+"</tr>"},"<tr>"+t.reduce(function(e,t,o){var r=columnToLetter(o+1)+"1";return e+"<th title='"+r+"' class='"+("gsws gscell gsws_"+n+" "+r+" row1 column"+columnToLetter(o+1)+" cellcolumn"+o)+"'>"+t+"</th>"},"")+"</tr>")+"</table>",sHTMLTable},convertValuesOrientedToHTMLTable=function(e,t,n){return null==n&&(n=""),sHTMLTable="<table id='"+n+"' class='convertValuesOrientedToHTMLTable gsws gsws_"+n+"' style='margin: 0 auto; text-align: center;'>"+e.reduce(function(e,t,o){return e=e+"<tr>"+t.reduce(function(e,t,r){var l=columnToLetter(r+1)+(o+1);return e=e+"<td title='"+l+"' class='"+("gsws gscell gsws_"+n+" "+l+" row"+(o+1)+" column"+columnToLetter(r+1)+" cellcolumn"+r)+"'>"+t+"</td>"},"")+"</tr>"},"")+"</table>",sHTMLTable.replace(/ id=''/g,"")},convertRecordsOrientedArrayToExcelXML=function(e,t){toRO(toVO(e));if(null==(t=t||void 0))t=Object.keys(e[0]);function n(e){return"<Row>"+e.reduce(function(e,t,n){return Array.isArray(t)&&(t=JSON.stringify(t)),e=e+'<Cell><Data ss:Type="String">'+(t=t.toString()).replace(/</g,"").replace(/>/g,"").replace(/\"/g,"").replace(/\n/g," ")+"</Data></Cell>"},"")+"</Row>"}return'<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"><Worksheet ss:Name="Sheet1"><Table>'+e.reduce(function(e,o,r){return e+n(t.map(function(e){return o[e]}))},n(t))+"</Table></Worksheet></Workbook>"},convertaRecordsOrientedToInputBoxesForm=function(e,t){return null==t&&(t=Object.keys(e)),t.reduce(function(t,n,o){return null==e[n]&&(e[n]=""),sValue=e[n],"string"!=typeof sValue&&(sValue=JSON.stringify(sValue)),t=e[n].toString().indexOf("\n")>-1?t+"<tr><td><b>"+n+": </b></td><td><textarea rows='10' cols='30' class='inputtedObject' id='label_"+n+"' name='label_"+n+"' />"+superhtmlEntities(sValue)+"</textarea></td>":t+"<tr><td><b>"+n+": </b></td><td><input style='width:100%' class='inputtedObject' type='text' id='label_"+n+"' name='label_"+n+"' value='"+superhtmlEntities(sValue)+"' /><td>"},"<table>")+"</table>"},GSDS_disjointedRangeToAVO=function(e){return e.match(/\*/g)?"ERROR - ASTERISK functions are for domTable ONLY!":(e=e.replace(/\-/g,":").replace(/,/g,";"),a1DCells=unique(e.split(";").map(function(e){return(e=e.trim()).match("^:")&&(e="A1"+e),e.match(":$")?"ERROR - ASTERISK IS ASSUMED HERE.":e.indexOf(":")>-1?getGoogleSheetRange(e):e}).flat().sort(sortAlphaNum)),iHighestColumn=a1DCells.reduce(function(e,t){return e<letterToColumn(cellToColumn(t))?letterToColumn(cellToColumn(t)):e},0),iLowestColumn=a1DCells.reduce(function(e,t){return e>letterToColumn(cellToColumn(t))?letterToColumn(cellToColumn(t)):e},iHighestColumn),iHighestRow=a1DCells.reduce(function(e,t){return e<parseInt(cellToRow(t))?parseInt(cellToRow(t)):e},0),iLowestRow=a1DCells.reduce(function(e,t){return e>parseInt(cellToRow(t))?parseInt(cellToRow(t)):e},iHighestRow),sExpansiverRange=columnToLetter(iLowestColumn)+iLowestRow+":"+columnToLetter(iHighestColumn)+iHighestRow,getGoogleSheetRangeValuesOriented(sExpansiverRange).map(function(e){return e.map(function(e){if(a1DCells.indexOf(e)>-1)return e})}))},GSDS_disjointedRangeToAVO.sample=function(){return'GSDS_disjointedRangeToAVO("-A2;A2:B4; D4,E5:F5;G1:H2,H1-H9,L8,:B2, G8")'},GSDS_disjointedRangeToArray=function(e){return GSDS_disjointedRangeToAVO(e).flat().filter(function(e){return e})},toHTMLSelect=function(e,t){return null==t&&(t="aArraySelect"),"<select class='"+t+"'><option></option>"+e.map(function(e){return"<option>"+e+"</option>"}).join("")+"</select>"};

// datagsscripts.minified.js
function convertCellToArray(r){return[letterToColumn(r.replace(/[0-9]*$/g,"")),parseInt(r.replace(/^[A-Z]*/g,""))]}function convertArrayToCell(r){return columnToLetter(r[0])+r[1]}sortAlphaNum=function(r,e){return r.localeCompare(e,"en",{numeric:!0})},cellToColumn=function(r){return r.toUpperCase().match(/^[A-Z]+/g)[0]},cellToRow=function(r){return r.toUpperCase().match(/[0-9]+$/g)[0]},columnToLetter=function(r){for(var e,t="";r>0;)e=(r-1)%26,t=String.fromCharCode(e+65)+t,r=(r-e-1)/26;return t},letterToColumn=function(r){for(var e=0,t=r.length,n=0;n<t;n++)e+=(r.charCodeAt(n)-64)*Math.pow(26,t-n-1);return parseInt(e)},subtractCells=function(r,e){if("string"==typeof r)var t=convertCellToArray(r);else t=r;if("string"==typeof e)var n=convertCellToArray(e);else n=e;return t.map(function(r,e){return r-parseInt(n[e])})},addCells=function(r,e){if("string"==typeof r)var t=convertCellToArray(r);else t=r;if("string"==typeof e)var n=convertCellToArray(e);else n=e;return t.map(function(r,e){return r+parseInt(n[e])})},addA1Notation=function(r,e){if(Array.isArray(r)&&(r=convertArrayToCell(r)),Array.isArray(e)&&(e=convertArrayToCell(e)),r.match(/!/g)){var t=r.split("!")[0]+"!";r=r.split("!")[1]}else t="";return sA1NotationOffset=convertArrayToCell(addCells(r,e)),t+sA1NotationOffset},subtractA1Notation=function(r,e){if(Array.isArray(r)&&(r=convertArrayToCell(r)),Array.isArray(e)&&(e=convertArrayToCell(e)),r.match(/!/g)){var t=r.split("!")[0]+"!";r=r.split("!")[1]}else t="";return sA1NotationOffset=convertArrayToCell(subtractCells(r,e)),t+sA1NotationOffset},getGoogleSheetRange=function(r){return aReturn=[],r.replace(/;/,",").split(",").forEach(function(r){if(r.indexOf(":")>-1){var e=convertCellToArray(r.toString().split(":")[0]),t=convertCellToArray(r.toString().split(":")[1]);aReturn=aReturn.concat(combineArraysRecursivelyCartesian([getRange3(e[0],t[0]),getRange3(e[1],t[1])]).map(function(r){return convertArrayToCell(r)}))}else aReturn.push(r)}),aReturn},getGoogleSheetRangeValuesOriented=function(r){return aArray=getGoogleSheetRange(r).filter(function(r){return r.match(/[A-Z]+[0-9]+/)}).reduce(function(r,e,t){return 0==t?(r[0].push(e),r):(bCompletedMatrixingTask=!1,r.forEach(function(t,n){t[0].match(/[0-9]+/)[0]==e.match(/[0-9]+/)[0]&&(r[n].push(e),bCompletedMatrixingTask=!0)}),bCompletedMatrixingTask||r.push([e]),r)},[[]]),aArray};

// ?datahtmlscripts.minified.js?
// aun no