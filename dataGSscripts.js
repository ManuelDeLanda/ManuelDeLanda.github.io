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