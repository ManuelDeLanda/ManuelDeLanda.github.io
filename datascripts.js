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
toXXXOrientedDEDUPED = function(aInputArray, sXXX)  { var aRecordsOrientation = JSONPS(aInputArray); var o_XXX_Orientation = aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); return Object.keys(o_XXX_Orientation).reduce(function(agg777, oElement777) { if (Array.isArray(o_XXX_Orientation[oElement777])) { agg777[oElement777] = o_XXX_Orientation[oElement777].reduce(function(agg778, oElement778) { return Object.keys(oElement778).reduce(function(agg779, oElement779) { if (agg778[oElement779] == undefined) { agg778[oElement779] = oElement778[oElement779]; } else { agg778[oElement779] = agg778[oElement779] + ";" + oElement778[oElement779]; } return agg778; }, "") }, {}) } else { agg777[oElement777] = o_XXX_Orientation[oElement777]; } return agg777; }, {}) }
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

toXXXOrientated = function (aInputArray, sXXX) { var aRecordsOrientation = JSONPS(aInputArray); return aRecordsOrientation.reduce(function (agg, oElement) { if (agg[oElement[sXXX]]==undefined) { agg[oElement[sXXX]] = oElement; } else { if (!Array.isArray(agg[oElement[sXXX]])) { agg[oElement[sXXX]] = [agg[oElement[sXXX]]].concat(oElement) } else { agg[oElement[sXXX]] = agg[oElement[sXXX]].concat(oElement) } } return agg; }, {}); }

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


// IGNORE - domscripts.serversafe.minified.js is now a permanent part of datahtmlscripts.js, sike datahtmlscripts.js is now a part of domscripts.2.serversafe
// function HTMLLibrarify(e){return Array.isArray(e)&&(e=e.join("\n")),(e=e.replace(/\;/g,"\n")).split("\n").filter(e=>e.trim().match(/\.js$||\.css$/)).filter(e=>!e.trim().match(/^\/\//)).filter(e=>e.trim().length>0).map(e=>e.match(/\.js$/)?`<script src="${e}"><\/script>`:`<link rel="stylesheet" href="${e}" type="text/css" />`).join("\n")}function HTMLInjecify(e){return Array.isArray(e)&&(e=e.join("\n")),'domLoadStyles_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("link");r.setAttribute("rel","stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",t),e.appendChild(r)})},domLoadScripts_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("script");r.setAttribute("src",t.trim()),e.appendChild(r)})};\n\n'+(e=e.replace(/\;/g,"\n")).split("\n").filter(e=>e.trim().match(/\.js$||\.css$/)).filter(e=>!e.trim().match(/^\/\//)).filter(e=>e.trim().length>0).map(e=>e.match(/\.js$/)?`domLoadScripts_Link("${e}")`:`domLoadStyles_Link("${e}")`).join("\n")}function HTMLDOMContentLoadedLibrarify(e){e=e.replace(/\;/g,"\n");var t=JSON.stringify(e.split("\n"));return sCode=`\n  var aLoadScripts=${t};\n  \n  function domLoadScripts(e,n){!function t(){var a,o,c;0!=e.length?(a=e.shift(),o=t,(c=document.createElement("script")).src=a,c.onload=c.onreadystatechange=function(){c.onreadystatechange=c.onload=null,o()},(document.getElementsByTagName("head")[0]||document.body).appendChild(c)):n&&n()}()}\n  \n  domLoadScripts(aLoadScripts,function(){\n    alert('loaded cdn scripts');\n  });\n`,sCode.trim()}function HTMLDOMContentLoadedLibrarifySample(){return'HTMLDOMContentLoadedLibrarify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js")'}function HTMLDOMContentLoadedify(e){return`\n\nwindow.addEventListener('DOMContentLoaded', (event) => { \n\ntry {\n\n ${e} \n\n}\ncatch(e) { console.log(e); }\n})\n`}function getHelpfulDOMScripts(){return decodeURIComponent("%0A%3Cscript%3E%0A%20%20%20%20var%20%24%24%24%24%24%20%3D%20document.querySelectorAll.bind(document)%3B%0A%20%20%20%20HTMLElement.prototype.%24%24%24%24%24%20%3D%20function%20(element)%20%7B%20return%20this.querySelectorAll(element)%3B%20%7D%3B%0A%20%20%20%20domAppendStyle%20%3D%20function(e)%7Bconst%20t%3Ddocument.createElement(%22style%22)%3Bt.textContent%3De%2Cdocument.head.append(t)%7D%3B%20addStyle%20%3D%20domAppendStyle%3B%0A%20%20%20%20domAppendToHead%20%3D%20function(s)%7B%20%24%24%24%24%24(%27head%27)%5B0%5D.append(s)%3B%20%7D%0A%20%20%20%20domLoadScripts%20%3D%20function(e%2Cn)%7B!function%20t()%7Bvar%20a%2Co%2Cc%3B0!%3De.length%3F(a%3De.shift()%2Co%3Dt%2C(c%3Ddocument.createElement(%22script%22)).src%3Da%2Cc.onload%3Dc.onreadystatechange%3Dfunction()%7Bc.onreadystatechange%3Dc.onload%3Dnull%2Co()%7D%2C(document.getElementsByTagName(%22head%22)%5B0%5D%7C%7Cdocument.body).appendChild(c))%3An%26%26n()%7D()%7D%0A%3C%2Fscript%3E")}function aGet2DIslands(e){function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||r(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw o}}return a}}(e,t)||r(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var a=function(e,t){var r={};return function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];var a=function(e){var t=n(e,2),r=t[0],o=t[1];return"".concat(r,"_").concat(o)}(t);return r[a]||(r[a]=function(e,t){return{r:e,c:t}}.apply(void 0,t)),r[a]}}();a.neighbors=function(e){var t=e.r,n=e.c;return[a(t,n+1),a(t+1,n),a(t,n-1),a(t-1,n)]};var i=function(e){return{minR:e.r,maxR:e.r+1,minC:e.c,maxC:e.c+1,cells:new Set([e])}};i.merge=function(e,n){return{minR:Math.min(e.minR,n.minR),maxR:Math.max(e.maxR,n.maxR),minC:Math.min(e.minC,n.minC),maxC:Math.max(e.maxC,n.maxC),cells:new Set([].concat(t(e.cells),t(n.cells)))}},i.extractFromGrid=function(e){return function(t){var n=t.minR,r=t.maxR,o=t.minC,a=t.maxC;return e.slice(n,r).map(function(e){return e.slice(o,a)})}};var l=e,c=l.flatMap(function(e,t){return e.map(function(e,n){return a(t,n)})}),s=new Map;return c.forEach(function(e){if(""!==l[e.r][e.c]){var t=a.neighbors(e).filter(function(e){return s.has(e)}).map(function(e){return s.get(e)}).reduce(i.merge,i(e));t.cells.forEach(function(e){s.set(e,t)})}}),t(new Set(s.values())).map(i.extractFromGrid(l))}function HTMLify(e,t){var n=void 0,r="",o="",a="",i="",l="";return e.forEach(function(e){var t=superencode(e.label);e.html&&(n=e.html),e.head&&(r+="\n"+e.head+"\n"),e.headlist&&(e.headlist=HTMLLibrarify(e.headlist),a+="\n"+e.headlist+"\n"),e.library&&(e.library=HTMLLibrarify(e.library),a+="\n"+e.library+"\n"),e["head-script"]&&(a+="<script>\n//"+t+":",a+="\n"+e["head-script"]+"\n<\/script>\n"),e.script&&(a+="<script>\n//"+t+":",a+="\n"+e.script+"\n<\/script>\n"),e.js&&(a+="<script>\n//"+t+":",a+="\n"+e.js+"\n<\/script>\n",i+=HTMLDOMContentLoadedify(e.js)),e.style&&(o+="<style>\n"+e.style+"\n</style>\n"),e.css&&(o+="<style>\n"+e.css+"\n</style>\n"),e["head-script-document.addEventListener-DOMContentLoaded"]&&(i+=HTMLDOMContentLoadedify(e["head-script-document.addEventListener-DOMContentLoaded"])),e.DOMContentLoaded&&(i+=HTMLDOMContentLoadedify(e.DOMContentLoaded)),e.onload&&(i+=HTMLDOMContentLoadedify(e.onload)),e.bodytable&&(t&&(l+="\n\x3c!-- "+t+"--\x3e\n"),l+=e.bodytable+"\n<br />\n"),e.body&&(t&&(l+="\n\x3c!-- "+t+"--\x3e\n"),l+=e.body+"\n<br />\n"),e.textarea&&(t&&(l+="\n\x3c!-- "+t+"--\x3e\n"),l+="<textarea rows='10' style='width:100%;'>"+e.textarea+"</textarea>\n<br />\n")}),r=r+o+a+(i?"<script>\n\n"+i+"\n\n<\/script>":""),n?(sHelpfulDOMScripts=getHelpfulDOMScripts(),r=sHelpfulDOMScripts+r,n=n.replace(/\<head\>/,`<head>\n${r}`),l&&(n=n.replace(/\<body\>/,`<body>\n${l}`))):n=t?"<head>"+r+"</head>\n<body>"+l+"</body>":"<html><head>"+r+"</head>\n<body>"+l+"</body></html>",n}aGet2DIslands.sample=function(){return decodeURIComponent("%0A%0Avar%20aVO%20%3D%20%5B%0A%20%20%5B%22col1%22%2C%20%22col2%22%2C%20%22col3%22%2C%20%22col4%22%2C%20%22col5%22%2C%20%22col6%22%2C%20%22col7%22%2C%20%22col8%22%2C%20%22col9%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B1%2C%202%2C%203%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B4%2C%205%2C%206%2C%20%22%22%2C%20%22%22%2C%20%22a%22%2C%20%22b%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B7%2C%208%2C%209%2C%20%22%22%2C%20%22%22%2C%20%22c%22%2C%20%22d%22%2C%20%22%22%2C%201%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%202%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22z%22%2C%20%22y%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%203%5D%2C%0A%20%20%5B%22%22%2C%20%22x%22%2C%20%22w%22%2C%20%22v%22%2C%20%22%22%2C%207%2C%207%2C%207%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22A1%22%2C%20%22B1%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22A2%22%2C%20%22B2%22%2C%20%22C2%22%2C%20%22%22%2C%20%22%22%2C%20%22HELLO%22%2C%20%22%22%2C%20%22%22%5D%0A%5D%3B%0AaGet2DIslands(aVO)%3B%0A%0A")},toHTMLTable=function(e,t,n){return isRO=function(e){return Array.isArray(e)&&!Array.isArray(e[0])},isRecordsOriented=function(e){return isRO(e)},isOSR=function(e){return!Array.isArray(e)&&null!=e.allcells},isVO(e)?convertValuesOrientedToHTMLTable(e,t,n):isOSR(e)?convertOSRToHTMLTable(e,t,n):isRO(e)?convertRecordsOrientedArrayToHTMLTable(e,t,n):void 0},convertRecordsOrientedArrayToHTMLTable=function(e,t,n){return null==n&&(n=""),null==t&&(t=function(e){return e.reduce(function(e,t){return e=e.concat(Object.keys(t)),e=unique(e)},[])}(e)),sHTMLTable="<table id='"+n+"' class='RecordsOrientedArrayToHTML gsws gsws_"+n+"' style='margin: 0 auto; text-align: center;'>"+e.reduce(function(e,r,o){return e=e+"<tr>"+t.reduce(function(e,t,a){var i=columnToLetter(a+1)+(o+2);return e=e+"<td title='"+i+"' class='"+("gsws gscell gsws_"+n+" "+i+" row"+(o+2)+" column"+columnToLetter(a+1)+" cellcolumn"+a)+"'>"+r[t]+"</td>"},"")+"</tr>"},"<tr>"+t.reduce(function(e,t,r){var o=columnToLetter(r+1)+"1";return e+"<th title='"+o+"' class='"+("gsws gscell gsws_"+n+" "+o+" row1 column"+columnToLetter(r+1)+" cellcolumn"+r)+"'>"+t+"</th>"},"")+"</tr>")+"</table>",sHTMLTable},convertValuesOrientedToHTMLTable=function(e,t,n){return null==n&&(n=""),sHTMLTable="<table id='"+n+"' class='convertValuesOrientedToHTMLTable gsws gsws_"+n+"' style='margin: 0 auto; text-align: center;'>"+e.reduce(function(e,t,r){return e=e+"<tr>"+t.reduce(function(e,t,o){var a=columnToLetter(o+1)+(r+1);return e=e+"<td title='"+a+"' class='"+("gsws gscell gsws_"+n+" "+a+" row"+(r+1)+" column"+columnToLetter(o+1)+" cellcolumn"+o)+"'>"+t+"</td>"},"")+"</tr>"},"")+"</table>",sHTMLTable.replace(/ id=''/g,"")},convertRecordsOrientedArrayToExcelXML=function(e,t){normalizeRecordsOriented(toValuesOriented(e));if(null==(t=t||void 0))t=Object.keys(e[0]);function n(e){return"<Row>"+e.reduce(function(e,t,n){return Array.isArray(t)&&(t=JSON.stringify(t)),e=e+'<Cell><Data ss:Type="String">'+(t=t.toString()).replace(/</g,"").replace(/>/g,"").replace(/\"/g,"").replace(/\n/g," ")+"</Data></Cell>"},"")+"</Row>"}return'<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40"><Worksheet ss:Name="Sheet1"><Table>'+e.reduce(function(e,r,o){return e+n(t.map(function(e){return r[e]}))},n(t))+"</Table></Worksheet></Workbook>"},convertaRecordsOrientedToInputBoxesForm=function(e,t){return null==t&&(t=Object.keys(e)),t.reduce(function(t,n,r){return null==e[n]&&(e[n]=""),sValue=e[n],"string"!=typeof sValue&&(sValue=JSON.stringify(sValue)),t=e[n].toString().indexOf("\n")>-1?t+"<tr><td><b>"+n+": </b></td><td><textarea rows='10' cols='30' class='inputtedObject' id='label_"+n+"' name='label_"+n+"' />"+superhtmlEntities(sValue)+"</textarea></td>":t+"<tr><td><b>"+n+": </b></td><td><input style='width:100%' class='inputtedObject' type='text' id='label_"+n+"' name='label_"+n+"' value='"+superhtmlEntities(sValue)+"' /><td>"},"<table>")+"</table>"},GSDS_disjointedRangeToAVO=function(e){return e.match(/\*/g)?"ERROR - ASTERISK functions are for domTable ONLY!":(e=e.replace(/\-/g,":").replace(/,/g,";"),a1DCells=unique(e.split(";").map(function(e){return(e=e.trim()).match("^:")&&(e="A1"+e),e.match(":$")?"ERROR - ASTERISK IS ASSUMED HERE.":e.indexOf(":")>-1?getGoogleSheetRange(e):e}).flat().sort(sortAlphaNum)),iHighestColumn=a1DCells.reduce(function(e,t){return e<letterToColumn(cellToColumn(t))?letterToColumn(cellToColumn(t)):e},0),iLowestColumn=a1DCells.reduce(function(e,t){return e>letterToColumn(cellToColumn(t))?letterToColumn(cellToColumn(t)):e},iHighestColumn),iHighestRow=a1DCells.reduce(function(e,t){return e<parseInt(cellToRow(t))?parseInt(cellToRow(t)):e},0),iLowestRow=a1DCells.reduce(function(e,t){return e>parseInt(cellToRow(t))?parseInt(cellToRow(t)):e},iHighestRow),sExpansiverRange=columnToLetter(iLowestColumn)+iLowestRow+":"+columnToLetter(iHighestColumn)+iHighestRow,getGoogleSheetRangeValuesOriented(sExpansiverRange).map(function(e){return e.map(function(e){if(a1DCells.indexOf(e)>-1)return e})}))},GSDS_disjointedRangeToAVO.sample=function(){return'GSDS_disjointedRangeToAVO("-A2;A2:B4; D4,E5:F5;G1:H2,H1-H9,L8,:B2, G8")'},GSDS_disjointedRangeToArray=function(e){return GSDS_disjointedRangeToAVO(e).flat().filter(function(e){return e})},toHTMLSelect=function(e,t){return null==t&&(t="aArraySelect"),"<select class='"+t+"'><option></option>"+e.map(function(e){return"<option>"+e+"</option>"}).join("")+"</select>"};

// aun no

/* dataLODASHscripts => BEGIN PANDAS-INSPIRED, LODASH-DEPENDENT FUNCTIONS */


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


/* dataENCODEscripts => superhtmlEntities/superencode/superHtmlDecode.minified.js */
superhtmlEntities = function(str) {
  // superhtmlEntities=function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/`/,"&#96;")};
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&#96;'); //.replace(/?/g, '&#xB4;');
}

// encode encodes apostrophes too!
superencode = function (str){ // superencode("~!.*()-_") is the same, consider refractoring?
  // superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
  // return w.replace(/[^]/g,function(w){return '%'+w.charCodeAt(0).toString(16)})
  return encodeURIComponent(str).replace(/'/g, "%27");
}

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

/* dataSHEETSscripts.js => isomorphic, maybe es5 idk, maybe vanilla idk functions that are inspired by and complement googlesheets functions */
// REMOVE dataGSscripts.js from github in favor of datagsscripts.js (make sure I dont do a "Border Gateway Protocol fiasco" like Facebook did)
// 12/15/21 - REMOVE datagsscripts.js entirely from existence and refactor it into permanent part of datascripts.js

function convertCellToArray(sCell) { return [letterToColumn(sCell.replace(/[0-9]*$/g, "")), parseInt(sCell.replace(/^[A-Z]*/g, ""))]; }
function convertArrayToCell(aArray) { return columnToLetter(aArray[0]) + aArray[1]; }
sortAlphaNum = function (a, b) { // converts ["A10", "A1", "A20"] to ["A1", "A10", "A20"]
  return a.localeCompare(b, 'en', { numeric: true });
};
cellToColumn = function(sCell) { return sCell.toUpperCase().match(/^[A-Z]+/g)[0] }
cellToRow = function(sCell) { return sCell.toUpperCase().match(/[0-9]+$/g)[0] }
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