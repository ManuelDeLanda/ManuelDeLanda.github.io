/* dataHTMLscripts.js => (vs domDATAHTMLscripts.js - duplicated functions until I can figure out whether datascripts or domscripts are the true master?) */

toHTMLSelect=function(aArray, sSelectIDOrClasses) { // refractor this to accept array of values vs array of objects (select id?)
    var sSelectID = returnIDAndOrClasses(sSelectIDOrClasses).id;
    var sSelectClasses = (returnIDAndOrClasses(sSelectIDOrClasses).classes + " aArraySelect").trim();
    if (sSelectID) { sSelectID = " id='" + sSelectID + "'"; }        
    
    if (Array.isArray(aArray)) {} else { aArray = [aArray]; } 
    // aArray = JSON.parse(JSON.stringify(aArray)); aArray.unshift
    return "<select " + sSelectID + " class='" + sSelectClasses + "'><option></option>" + aArray.map(function(oElement) { return "<option>" + oElement + "</option>"; }).join("")+"</select>";
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
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable convertRecordsOrientedToHTMLTable _gsws gsws").trim();
    if (sTableID) { sTableID = " id='" + sTableID + "'"; }
    // convertRecordsOrientedArrayToHTMLTable(aRecordsOriented)
    function returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented) { return aRecordsOriented.reduce(function(agg, oElement313) { agg = agg.concat(Object.keys(oElement313)); agg = unique(agg); return agg; }, []) }
    if (aColumns == undefined) {
        // var aColumns = Object.keys(aRecordsOriented[0]);
                 aColumns = returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented);
    }
    sHTMLTable = "<table " + sTableID + " class='" + sTableClasses + "' style='margin: 0 auto; text-align: center;'>" + aRecordsOriented.reduce(function(agg, oElement, iIndex) {
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
}; convertRecordsOrientedToHTMLTable = function(aRO, aColumns, sTableIDOrClasses) { return convertRecordsOrientedArrayToHTMLTable(aRO, aColumns, sTableIDOrClasses) }

convertValuesOrientedArrayToHTMLTable = function(aValuesOriented, aColumns, sTableIDOrClasses) {
    var sTableID = returnIDAndOrClasses(sTableIDOrClasses).id;
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aVO aValuesOriented convertValuesOrientedArrayToHTMLTable convertValuesOrientedToHTMLTable _gsws gsws").trim();
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