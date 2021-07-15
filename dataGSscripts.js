function convertCellToArray(sCell) { return [letterToColumn(sCell.replace(/[0-9]*$/g, "")), parseInt(sCell.replace(/^[A-Z]*/g, ""))]; }
function convertArrayToCell(aArray) { return columnToLetter(aArray[0]) + aArray[1]; }
sortAlphaNum = function (a, b) { // converts ["A10", "A1", "A20"] to ["A1", "A10", "A20"]
  return a.localeCompare(b, 'en', { numeric: true });
};
function columnToLetter(column) {
  // columnToLetter(12)
  var temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function letterToColumn(letter) {
  var column = 0, length = letter.length;
  for (var i = 0; i < length; i++) {
    column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return column;
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