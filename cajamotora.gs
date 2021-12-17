/* gsRANDOgs.gs */
function askAQuestion() {
  var ss=SpreadsheetApp.getActive();
  var html='<select id="sel1" onchange="sendChoice()">'
  html+='<option value="no Choice">Make a Choice</option>';
  html+='<option value="Sheet1">Sheet1</option>';
  html+='<option value="Sheet2">Sheet2</option>';
  html+='<option value="Sheet3">Sheet3</option>';
  html+='</select>';
  html+='<script>var onSuccessLoad = function(name) { console.log("run onSuccessLoad"); }; function sendChoice() { var choice=document.getElementById(\'sel1\').value;google.script.run.withSuccessHandler(onSuccessLoad).displayChoice(choice);}console.log(\'My Code\');</script>';
  var userInterface=HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(userInterface, 'Make a Choice');
}

// google.script.host.close();
// google.script.run.withSuccessHandler
function displayChoice(choice) {
  SpreadsheetApp.getUi().alert(choice);
  return;
}

/* gsPOSTDATAgs */
/* BEGIN POST DATA FUNCTIONS */
function postDataViaButton(sURL, sType, oData, sTitle, sBody) { 
? if (sTitle == undefined) { sTitle = "function() {};"; }
? 
? if (sBody == undefined) { 
? ? sBody = sTitle;
? }

? var aPOSTVariables = sURL.split("&"); aPOSTVariables[0] = aPOSTVariables[0].split("?")[1];

? if (aPOSTVariables[0] != undefined) {
? ? // generate oPOSTVariables from URL parameters first
? ? var oPOSTVariables = aPOSTVariables.reduce(function(agg, oElement) { agg[oElement.split("=")[0]] = oElement.split("=")[1]; return agg; }, {} )
? ? // generate oPOSTVariables payload object keys second
? ? Object.keys(oData).forEach(function(oElement770) {
? ? ? oPOSTVariables[oElement770] = oData[oElement770]; // oData
? ? // oPOSTVariables.sPostDatax = sPostData;
? ? })
? } else {
? ? // var oPOSTVariables = JSON.parse(sPostData);
? ? var oPOSTVariables = oData;
? }
? 
? // var sSubmitSuperNinjaForm = decodeURIComponent("function%20SubmitSuperNinjaForm(oTypeURLPayload%2C%20sTarget)%20%7B%0A%20%20%20%20superencode%20%3D%20function%20(str)%7B%20%20return%20encodeURIComponent(str).replace(%2F%27%2Fg%2C%20%22%2527%22)%3B%20%7D%0A%20%20%20%20if%20((oTypeURLPayload%20%3D%3D%20null)%20%7C%7C%20(oTypeURLPayload%20%3D%3D%20undefined)%20%7C%7C%20(oTypeURLPayload%20%3D%3D%20%22%22))%20%7B%0A%20%20%20%20%20%20%20var%20oTypeURLPayload%20%3D%20%7B%20type%3A%22POST%22%2C%20payload%3A%20%7Bscript%3A%2084%2C%20deploy%3A%201%2C%20context%3A%20%22llave%22%2C%20payload%3A%20%22just%20testing%22%20%7D%20%7D%3B%20%0A%20%20%20%20%20%20%20var%20sURL%20%3D%20%22https%3A%2F%2Facct138579.app.netsuite.com%2Fapp%2Fsite%2Fhosting%2Fscriptlet.nl%3Fscript%3D84%26deploy%3D1%26context%3Dllave%22%3B%0A%20%20%20%20%20%20%20oTypeURLPayload.url%20%3D%20sURL%3B%0A%20%20%20%20%7D%0A%20%20%20%20%2F%2F%20var%20oTypeURLPayload%20%3D%20%7B%20type%3A%22POST%22%2C%20payload%3A%20%7Bscript%3A%2084%2C%20deploy%3A%201%2C%20payload%3A%20%24(%22%23textarea_cualquierPotencialidad%22)%5B0%5D.value%20%7D%20%7D%3B%0A%20%20%20%20%2F%2F%20var%20sURL%20%3D%20%22https%3A%2F%2Facct138579.app.netsuite.com%2Fapp%2Fsite%2Fhosting%2Fscriptlet.nl%3Fscript%3D84%26deploy%3D1%26context%3Dllave%22%3B%0A%20%20%20%20%2F%2F%20oTypeURLPayload.url%20%3D%20sURL%3B%0A%20%20%20%20%2F%2F%20var%20oTypeURLPayload%20%3D%20%7B%20type%3A%22POST%22%2C%20payload%3A%20%7Bscript%3A%2084%2C%20deploy%3A%201%2C%20context%3A%20%22llave%22%2C%20payload%3A%20%22just%20testing%22%20%7D%20%7D%3B%0A%20%20%20%20var%20dom_form%20%3D%20document.createElement(%27form%27)%3B%0A%20%20%20%20dom_form.setAttribute(%22target%22%2CsTarget)%3B%0A%20%20%20%20dom_form.name%20%3D%20%27superninjaform%27%3B%0A%20%20%20%20dom_form.id%20%3D%20%27superninjaform%27%3B%0A%20%20%20%20dom_form.method%20%3D%20oTypeURLPayload.type%3B%0A%20%20%20%20dom_form.action%20%3D%20((oTypeURLPayload.url%20!%3D%20undefined)%20%3F%20oTypeURLPayload.url%20%3A%20window.location.href.split(%22%3F%22)%5B0%5D%20)%3B%20%2F%2F%20window.location.href%3B%0A%20%20%20%20document.body.appendChild(dom_form)%3B%0A%20%20%20%20dom_form.innerHTML%20%3D%20Object.keys(oTypeURLPayload.payload).reduce(function(agg%2C%20oElement)%20%7B%0A%20%20%20%20%20%20%20%20agg%20%2B%3D%20%27%3Cinput%20type%3D%22hidden%22%20name%3D%22%27%20%2B%20oElement%20%2B%20%27%22%20id%3D%22%27%20%2B%20oElement%20%2B%20%27%22%20value%3D%22%27%20%2B%20superencode(oTypeURLPayload.payload%5BoElement%5D)%20%2B%20%27%22%20%2F%3E%27%20%2B%20String.fromCharCode(10)%20%2B%20String.fromCharCode(13)%3B%0A%20%20%20%20%20%20%20%20return%20agg%3B%0A%20%20%20%20%7D%2C%20%22%22)%0A%20%20%20%20dom_form.submit()%3B%0A%7D");
? var sSubmitSuperNinjaForm = "SubmitSuperNinjaForm="+SubmitSuperNinjaForm.toString();
? var sCode = "<script>" + sSubmitSuperNinjaForm + "</script>";
? // sCode += "<script>var sPostData = " + JSON.stringify(sPostData) + "</script>";
? sCode += "<script>var oPOSTVariables = " + JSON.stringify(oPOSTVariables) + "</script>";
? // sCode += '<script>var oTypeURLPayload = { type:"POST", payload: {script: 84, deploy: 1, context: "InternationalPaperwork", sPostData: sPostData, } }; var sURL = "' + sURL + '"; oTypeURLPayload.url = sURL;</script>';
? sCode += '<script>var oTypeURLPayload = { type:"' + sType + '", payload: oPOSTVariables }; var sURL = "' + sURL + '"; oTypeURLPayload.url = sURL;</script>';
? // ?SERVER SEES: JSON.stringify(Object.keys(oGetAllParameters)) 
? var html = '<html><head>' + sCode + '</head><body>' + sBody + '<input type="button" onclick="SubmitSuperNinjaForm(oTypeURLPayload, \'_blank\');" value="' + sTitle + '" /></body></html>';
? alertHTML(html);
? //var ui = HtmlService.createHtmlOutput(html);
? //SpreadsheetApp.getUi().showModelessDialog(ui, sTitle);
}

SubmitSuperNinjaForm=function (oTypeURLPayload, sTarget) { // copy this from domscripts.js
? ? superencode = function (str){ ?return encodeURIComponent(str).replace(/'/g, "%27"); }
? ? if ((oTypeURLPayload == null) || (oTypeURLPayload == undefined) || (oTypeURLPayload == "")) {
? ? ? ?var oTypeURLPayload = { type:"POST", payload: {script: 84, deploy: 1, context: "llave", payload: "just testing" } }; 
? ? ? ?var sURL = "https://acct138579.app.netsuite.com/app/site/hosting/scriptlet.nl?script=84&deploy=1&context=llave";
? ? ? ?oTypeURLPayload.url = sURL;
? ? } 
? ? var dom_form = document.createElement('form');
? ? dom_form.setAttribute("target",sTarget);
? ? dom_form.name = 'superninjaform';
? ? dom_form.id = 'superninjaform';
? ? dom_form.method = oTypeURLPayload.type;
? ? dom_form.action = ((oTypeURLPayload.url != undefined) ? oTypeURLPayload.url : window.location.href.split("?")[0] ); 
? ? document.body.appendChild(dom_form);
? ? dom_form.innerHTML = Object.keys(oTypeURLPayload.payload).reduce(function(agg, oElement) {
? ? ? ? agg += '<input type="hidden" name="' + oElement + '" id="' + oElement + '" value="' + superencode(oTypeURLPayload.payload[oElement]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
? ? ? ? return agg;
? ? }, "")
? ? dom_form.submit();
}


function postDataDirectly(sURL, sType, sPostData) {
? //postToCualquierPotencialidad_PHP2() { 
? var oSend = {instruction: sPostData};
? var context = {
? ? 'method' : sType,
? ? 'Content-Type': 'application/json',
? ? "Accept": "application/json",
? ? 'muteHttpExceptions': false,
? ? payload : { REST: JSON.stringify(oSend) },
? };
? var response = UrlFetchApp.fetch(sURL, context);
? SpreadsheetApp.getActiveSpreadsheet().toast(response, "done");
}
/* END POST DATA FUNCTIONS */

/* gsGSINTEGRATIONgs */
function getgs_gsintegration(sWorksheetName) {
  if (sWorksheetName) {} else { sWorksheetName = "webapp"; }
  // if (sWorksheetName) {} else { sWorksheetName = "cajamotora"; }
  // if GSDS_ENGINE no existe, then create samples!
  if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else {
    confirm("Launching/Deploying new cajamotora now...");
    updategs_createNewWorksheet(sWorksheetName);
    aVO = [["","","","","",""],["","label","server","notes","body",""],["","Welcome to cajamotora","alert(\"Welcome to cajamotora. This GSDS Solution Island was just created to demonstrate what a GSDS integration looks like.\")","","<b>Cool congratulations, this popup is generated from the first \"island\" of data in the \"cajamotora\" worksheet.  Click on that worksheet to visualize the \"islands\" of solutions (henceforth known as \"solution islands\").  cajamotora itself is a meta-solution that deconstructs solutions to a set of cells, inspired by CodePen.io's framework.</b>\n<br />\n<b></b>\n<br />\n<br />\n\nCurrently functioning/operating/working columns/features/keys:\n\n<pre>\n\nlabel - just the title of the solution\ncontext - need to think this out to make it compatible with NS and WP solutions\n\nhead - loads to &lt;head&gt; tag\nstyle/css - loads to &lt;style&gt; tag\nscript - loads to &lt;script&gt; tag\nonload - executes as part of DOMContentLoaded\njs - loads to &lt;script&gt; tag AND executes it as part of DOMContentLoaded\n\nheadlist/library - quickly add CDNs - consider refactoring to allow for nexus/mirrors/backup CDNs...\n\nnotes - just tracks random notes, not even CQPified().\nlabelx, notesx, server_old, bugs - just more notes / backups of other ideas to be implemented within current Solution Island\n\nserver - aVO_server, sA1Notation_server variables - need to add more to this?\n\nbody - working?\nhtml - needs to be fixed, kinda hacky\npug - needs to be implemented\n\n\n</pre>",""],["","","","","",""],["","","","","",""],["","","","","",""],["","label","","","",""],["","blank","","","",""]];
    putgs_AVOToRange(aVO, "A1", sWorksheetName);
    removeEmptyRows(sWorksheetName);
    putgs_prependAVOToWorksheet([[],[],[],[]], sWorksheetName);
    putgs_appendAVOToWorksheet([[],[],[],[]], sWorksheetName);
    // resize all rows to same height
    var sheet = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
    sheet.setRowHeightsForced(1, sheet.getLastRow()-1, 20)
  }

  return aGet2DIslands(getgs_rangeToAVO(sWorksheetName + "!A27:"));
}
function alertgs_gsintegration() {
  // aVOIslands = aGet2DIslands(aVO);
  
  aVOIslands = getgs_gsintegration();
  
  aLabels_ = aVOIslands.map(e=>{
    return toRO(e).map(o=>{ return o.label; }).join(" ").replace(/\n/g, "");
  });
  sLabels = aLabels_.reduce( (a,e,i) => {
    if (e.trim().length > 0) {  // ignore empty labels
      a = a + i.toString() + " = " + e + "\n";
    }
    return a;
  }, "")
  // iIsland = prompt("which island? (eg: 0, 1, 2, etc whatever integer)");
  iIsland = prompt("aVOIslands = getgs_gsintegration()\n\nEvaluate which aVO island? eg: \n\n" + sLabels);

  // alertTextArea(JSON.stringify(aVOIslands));
  // alertHTML(CQPifyWithServer(toRO(aVOIslands[2])));
  aLabels = aVOIslands.reduce((a,o,i)=>{ if (o[0][0]=="label") { a.push(aVOIslands[i][1][0]) } else { a.push("empty label!"); }; return a; }, []);
  // aVOIslands_CQPifiedWithServer = aVOIslands.map((o,i)=>{
  aVOIslands_CQPifiedWithServer = [aVOIslands[iIsland]].map((o,i)=>{
    try {
      return CQPify(toRO(o));
    } catch(e) {
      return e;
    }
  });
  
  sHTML = aVOIslands_CQPifiedWithServer[0];
  sTitle = aLabels[iIsland];
  if (!(sTitle)) { sTitle = "GS Integration with iFrame/document.open"; }
  
  /* get rid of this abomination below of toggling between server-side in favor of prompting user for which island to run
  oGSIntegrationSolutions = aLabels.reduce( (a,e,i) => {
    a[e] = aVOIslands_CQPifiedWithServer[i];
    return a;
  }, {} )

  var sHTMLToggleBetweenSolutions = toHTMLSelect(Object.keys(oGSIntegrationSolutions));
  sHTMLToggleBetweenSolutions += `<div style="float:right; margin-right: 60%;"><p>Open in:</p><input checked type="radio" id="currentwindow" name="openinstructions" value="currentwindow"><label for="currentwindow">current window</label><br><input type="radio" id="newwindow" name="openinstructions" value="newwindow"><label for="newwindow">new window</label><br></div>`;
  
  sHTML = `<script>var oGSIntegrationSolutionsENCODED = "${superencode(JSON.stringify(oGSIntegrationSolutions))}";</script>`;
  sHTML += "<script>" + `function doAction() {
          var oGSIntegrationSolutions=JSON.parse(decodeURIComponent(oGSIntegrationSolutionsENCODED));
          sSolution = document.querySelector(".aArraySelect").value;
          if (!(document.querySelector("iframe"))) {
            var iframe = document.createElement('iframe');
            var div = document.createElement('div');
            div.innerHTML = "<br /><br />";
            iframe.id = "testiframe";
            iframe.width="100%";
            iframe.height="500px";
            // iframe.style.display = "none";
            // iframe.srcdoc = oGSIntegrationSolutions[sSolution];
            document.body.appendChild(div);
            document.body.appendChild(iframe);
          }
          if (document.querySelector("#newwindow").checked) { // vs "open in iframe"
            var wnd = window.open('', 'popup_name','_blank,height=' + screen.height + ',width=' + screen.width + ',resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes');
            // var div = wnd.document.createElement('div');
            // div.innerHTML = "<br /><br />"; 
            var iframe2 = wnd.document.createElement('iframe');
            iframe2.id = "testiframe";
            iframe2.width="100%";
            iframe2.height="500px";
            wnd.document.body.appendChild(iframe2);
            wnd.document.querySelector("iframe").srcdoc = oGSIntegrationSolutions[sSolution];
          } else {
            // alert("iframe?");
            document.querySelector("iframe").srcdoc = oGSIntegrationSolutions[sSolution];
          }
  }
  ` + HTMLDOMContentLoadedify(`
      document.querySelector(".aArraySelect").addEventListener("input", function() {
        doAction();
      });
      
      document.querySelector("select").selectedIndex=3; doAction();
    `) + "</script>";
  // sHTML = sHTML.replace(/\<body\>/, "<body>" + sHTMLToggleBetweenSolutions)
  sHTML += sHTMLToggleBetweenSolutions;
  */
  
  // alertHTML(sHTML, "1000x1000", "GS Integration with iFrame/document.open");
  alertHTML(sHTML, "1000x1000", sTitle);
  // alertTextArea(JSON.stringify(oGSIntegrationSolutions));
}
function alertgs_gsintegration_GSDS_ENGINE_FIRST() { //
  // aVOIslands = aGet2DIslands(aVO);
  // alertTextArea(JSON.stringify(aGet2DIslands(getgs_A1NotationToAVO())[0])); //  SpreadsheetApp.getActive().getRange("GSDS_ENGINE!A1:1")
  alertHTML(CQPify(toRO(getgs_gsintegration()[0])), "1000x1000", "cajamotora SOLUTION[0]");
  // alertHTML(CQPifyWithServer(toRO(aGet2DIslands(getgs_A1NotationToAVO("GSDS_ENGINE!A1:"))[0])), "1000x1000", "GSDS_ENGINE SOLUTION 1");
}
function alertgs_gsintegration_GSDS_ENGINE_LAST() {
  aVO = getgs_gsintegration();
  alertHTML(CQPify(toRO(aVO[aVO.length-1])), "1000x1000", "cajamotora SOLUTION[?]");
}

/* gsBASICgs */
function render_datascripts_menu() {
? // aHTMLGSDSFunctions = aGet2DIslands(getgs_rangeToAVO("GSDS_ENGINE"));
? // aLabels = aHTMLGSDSFunctions.reduce((a,o,i)=>{ if (o[0][0]=="label") { a.push(aHTMLGSDSFunctions[i][1][0]) }; return a; }, []);
? // aLabelsAndFunctions = aLabels.map(o=>{ return [o, "alertgs_integration_" + o.replace(/\W/g, '') ] }) // o.replace(/\W/g, ''
  // aGSDS_ENGINE = aLabelsAndFunctions;

? //SpreadsheetApp.getUi()
? //.createMenu('GSDS_ENGINE')
? //? // begin gsds_engine menu scripts here
? //? .addItem(aGSDS_ENGINE[0][0], aGSDS_ENGINE[0][1])
? //? .addItem(aGSDS_ENGINE[1][0], aGSDS_ENGINE[1][1])
? //? .addItem(aGSDS_ENGINE[2][0], aGSDS_ENGINE[2][1])
? //? .addItem(aGSDS_ENGINE[3][0], aGSDS_ENGINE[3][1])
? //? .addItem(aGSDS_ENGINE[4][0], aGSDS_ENGINE[4][1])
? //? .addItem(aGSDS_ENGINE[5][0], aGSDS_ENGINE[5][1])
? //? // end gsds_engine menu scripts
? //.addToUi(); ?
? 
? // eval(UrlFetchApp.fetch('https://cdn.jsdelivr.net/lodash/4/lodash.min.js').getContentText()); // grab lodash
? SpreadsheetApp.getUi()
? .createMenu('datascripts')
? .addItem('Remove Empty Rows&Cols', 'removeEmptyRowsAndCols')
? .addItem('S?e?l?e?c?t?e?d? ?C?e?l?l?s? ?-?>? ?c?o?m?b?i?n?e? Selected Cell(s) -> ???combine?!? and copy without annoying gs quotes', 'alertgs_selectedToCombinedString')
? .addItem('ActiveSheet() -> replace <googlesheetsbr> with /n since Find & Replace doesn\'t allow regex in the Replace', 'updategs_googlesheetsbr')
? .addItem('Selected Cell -> replace \\n with \\\\n', 'alertgs_slashnToslashslashn')
? .addItem('Selected Cell -> alert cell size/length', 'alertgs_sizeOfCell')
? .addItem('alertgs_gsintegration() ?(cajamotora island)[0]', 'alertgs_gsintegration_GSDS_ENGINE_FIRST') // "cajamotora island" vs "gsdsengine island" vs "aVO island"?
? .addItem('alertgs_gsintegration() ?(cajamotora islands)[*]', 'alertgs_gsintegration')
? .addItem('alertgs_gsintegration() ?(cajamotora island)[?]', 'alertgs_gsintegration_GSDS_ENGINE_LAST')
? .addItem('Selected Cell(s) -> alert(eval())', 'alertevalgs_selected')
? .addItem('Selected Cell(s) -> eval()', 'evalgs_selected')
? // .addItem('askAQuestion', 'askAQuestion')
? .addSeparator()
? // .addItem('Selected Cells -> tablify() rendered/text', 'getSelectedCellsToHTMLSteroids')
? .addItem('Selected Cells -> oSmartRange', 'alertgs_selectedToOSR')
? .addItem('Selected Cells -> <table>-ify', 'getgs_selectedToHTMLTableWHeaderFooter')
  .addItem('Selected Cells -> JSON', 'getSelectedCellsToJSON')
  .addItem('Selected Cell (maybe eventually Cell(s)) -> Jspreadsheet', 'getSelectedCellToJspreadsheet')
  .addItem('Selected Cells -> Mergely / Diffchecker', 'getSelectedCellsToMergely')
  .addItem('Selected Cell -> JS / Excel Beautifier', 'getSelectedCellToBeautifier')
  .addItem('Selected Cell -> CodeMirror', 'getSelectedCellToCodeMirror')
  // .addItem('Selected Cells -> aRecordsOriented', 'getSelectedCells') 
  // .addItem('Selected Cells -> aRecordsOriented (w 1st row as assumed header)', 'alertgs_selectedToARO_FIRSTROWASKEYS')
  // .addItem('Selected Cells -> aValuesOriented', 'alertgs_selectedToAVO')
  // .addItem('Selected Cells -> aValuesOriented (w 1st row as assumed header)', 'alertgs_selectedToAVO_FIRSTROWASKEYS')
  //?.addItem('Selected Cells -> aRecordsOriented (encoded)', 'alertgs_selectedToEncodedARO')
? .addSubMenu(SpreadsheetApp.getUi()
? ? ?.createMenu('Selected Cells ->')
? ? ?.addItem('Selected Cells -> aValuesOriented Transposed', 'alertgs_selectedToAVOT')
? ? ?.addItem('Selected Cells -> aArray (one dimensional)', 'alertgs_selectedToFlatArray')
? ? ?.addItem('Selected Cells -> cartesian Product', 'alertgs_selectedToCartesianProduct')
? ? ?.addItem('Selected Cells -> ? CurrentSheet', 'selectedCellsFunction')
? ? ?.addItem('Selected Cells -> ? aRecordsOriented', 'selectedCellsFunctionRecordsOriented')
? ? ?.addItem('Selected Cells -> setValues() with getBackground() html color', 'updategs_selectedWithColor')
     .addSeparator()
     .addItem('Remove Empty Rows', 'removeEmptyRows')
     .addItem('Remove Empty Columns', 'removeEmptyColumns')
     .addItem('pivottableaddItem() example', 'pivottableexample')
     .addSeparator()
     .addItem('cheatsheet', 'alertCheatSheet')
  )
? .addSeparator()
? .addItem('Selected Cell -> superencode()', 'alertgs_selectedCellToEncoded')
? .addItem('Selected Cell -> superhtmlentities()', 'alertgs_selectedCellToHTMLEntities')
? .addItem('Selected Cell -> Surrounding aVO Island -> aRO', 'alertgs_selectedCellToARO') // "cajamotora island" vs "gsdsengine island" vs "aVO island"?
? .addItem('Selected Cell -> Surrounding aVO Island -> aVO', 'alertgs_selectedCellToAVO')
? .addItem('Selected Cell -> Surrounding aVO Island -> CQPify() rendered', 'alertgs_selectedCellCQPified_rendered') // "CQPify" vs "cajamotorize"?
? .addItem('Selected Cell -> Surrounding aVO Island -> HTMLify() text', 'alertgs_selectedCellHTMLified_unrendered')
? .addSeparator()
? // .addItem('Selected Cells -> diffchecker()', 'alertgs_diffchecker')
? // .addItem('Selected Cells -> js_beautifier()', 'alertgs_jsbeautifier')
? // .addItem('Selected Cells -> codeMirror()', 'alertgs_codemirror')
? // .addItem('Selected Cells -> GS_integration()', 'alertgs_integration')
? // .addItem('Selected Cells -> D3_TESTING()', 'alertgs_D3_TESTING')
? // // .addItem('Selected Cells -> HTML header + HTML <table> + HTML footer', 'getSelectedCellsToHTMLHeaderTableFooter')
? //.addSeparator()
? .addSubMenu(SpreadsheetApp.getUi()
? ? .createMenu('Active Sheet/Multiple Sheets ->')
? ? .addItem('Active Sheet -> aRecordsOriented', 'getActiveSheet')
? ? .addItem('Active Sheet -> aRecordsOriented (encoded)', 'alertgs_sheetToEncodedARO')
? ? .addItem('Active Sheet -> aValuesOriented', 'alertgs_activeSheetToAVO') // getgs_activeSheetToAVO vs getgs_A1NotationToAVO
? ? .addItem('Active Sheet -> oSmartRange', 'alertgs_sheetToOSR')
? ? .addItem('Multiple Sheets -> aRecordsOrientedALL', 'getgs_multisheetsToARO')
? ? .addItem('Multiple Sheets -> aValuesOrientedALL', 'getgs_multisheetsToAVO')
? )
? // .addItem('Selected Cells -> CQPify()', 'alertgs_selectedCQPify')
? // .addSeparator() ? ? 
? .addSeparator() ? ? 
? // .addSeparator()
? .addSubMenu(SpreadsheetApp.getUi()
? ? ? ? ? ? ? .createMenu('My Submenu')
? ? ? ? ? ? ? .addItem('testing001', 'testing001')
? ? ? ? ? ? ?)
? .addToUi();
}

/* gsOVERKILLgs */
function updategs_googlesheetsbr() { // britney
// Why does this function exist - because: "Oh my god, thanks so much. Exactly what I needed. At least they have this, horrible how they don't allow regex in replace too." 
// https://stackoverflow.com/questions/7528169/find-replace-commas-with-newline-on-google-spreadsheet
? var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
? activeRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
? // activeRange = ss.getRange("A1:A1");
  forEachRangeCell(activeRange, (cell) => {
    sGetValue = cell.getValue();
    if (sGetValue) {
      if (sGetValue.match(/\<googlesheetsbr\>/g) ) {
        cell.setValue(`${sGetValue.replace(/\<googlesheetsbr\>/g, "\n").trim()}`);
      }
    }
  })
  alert("finally completed.");
}

/* gsGETMENUgs */
/* BEGIN "get" functions (for menu) */
function getActiveSheet(sInstruction) { // consider getting rid of this now that we have getgs_sheetToARO()?
? // getActiveSheet("noalert")
? var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
? activeRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
? aRecordsOriented = getgs_rangeToARO(activeRange);
? //var ss = SpreadsheetApp.getActiveSpreadsheet();
? //var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
? // var activeRange = selection.getActiveRange();
? // var aRecordsOriented = getgs_rangeToARO(activeRange);
? if (sInstruction != "noalert") {
? ? // alertHTML("<textarea style='width:100%; height:250px;'>var aRO = " + JSON.stringify(aRecordsOriented) + "</textarea>");
? ? alertTextArea("var aRO = " + JSON.stringify(aRecordsOriented) + ";\n");
? }
? return aRecordsOriented;
}

function getgs_sheetToEncodedARO(sWorksheetName) {
? sWorksheetName = getgs_worksheetname(sWorksheetName)
? activeRange = getgs_worksheetNameToFullRange(sWorksheetName);
? aRecordsOriented = getgs_rangeToARO(activeRange);
? aRecordsOriented.forEach(function(oElement) {
? ? Object.keys(oElement).forEach(function(oElement000) {
? ? ? ? oElement[oElement000] = superencode(oElement[oElement000]);
? ? })
? ? ? return oElement; 
? }) 
? return aRecordsOriented;
}; function alertgs_sheetToEncodedARO() { alertTextArea(JSON.stringify(getgs_sheetToEncodedARO)); } 

function functionFunction(aRecordsOriented, sWhereToDumpData) {
? 
? var sIntegerColumns = Object.keys(aRecordsOriented[0]).reduce(function(agg000, oElement000, iIndex000) {
? ? return agg000 + "\n" + iIndex000 + "-" + oElement000;
? }, "");
? 
? var sExampleInstructions = "\n\n" + 'explode 1 ";"\n0 ?1 listagg-sum\nmelt 0,1\nmelt -1,2\n';
? var sInstruction = prompt(sIntegerColumns + "\n\nOkay you want to perform a function on the selected cells? eg: " +sExampleInstructions + "\n Enter function here: ");
? 
? if (sInstruction != "" && sInstruction != undefined && sInstruction != null) {
? ? var sCommand = sInstruction.split(" ")[0];
? ? sCommand = sCommand.toLowerCase().trim();

? ? if (sCommand == "melt") {

? ? ? var sColumns = sInstruction.split(" ")[1];
? ? ? 
? ? ? //INVERSE COLUMNS sColumns = ?"-1,2";
? ? ? if (sColumns[0] == "-") { // then inverse list of columns
? ? ? ? sColumns = sColumns.slice(1, sColumns.length);
? ? ? ? aColumns = Object.keys(aRecordsOriented[0]).map(function(oElement098, iIndex098) { return iIndex098.toString() })
? ? ? ? sColumns.split(",").forEach(function(oElement098) {
? ? ? ? ? aColumns.splice( aColumns.indexOf(oElement098), 1)
? ? ? ? })
? ? ? } else { aColumns = sColumns.split(","); }
? ? ? sColumns = aColumns.join(",")
? ? ? 
? ? ? var sEvaluation = sCommand + "(aRecordsOriented, [" + sColumns + "])";
? ? ? var aManipulatedData = eval(sEvaluation);
? ? } else if (sCommand == "explode") { // refractor this solution because slice 2, 1000 is kinda a hack // also refractor explode() since it errors out when a value can't be exploded
? ? ? // var sEvaluation = sInstruction.split(" ")[0] + "(aRecordsOriented, [" + sInstruction.split(" ")[1] + "], " + sInstruction.split(" ")[2] + ")";
? ? ? var sEvaluation = sCommand + "(aRecordsOriented, [" + sInstruction.split(" ")[1] + "], " + sInstruction.split(" ").slice(2, 1000).join(" ") + ")";
? ? ? var aManipulatedData = eval(sEvaluation);
? ? } else if (sCommand == "t") { // transpose
? ? ? aManipulatedData = toRO(_.zip.apply(_, toVO(aRecordsOriented) ) );
? ? ? 
? ? } else { // assume it's a pivottable() function
? ? ? var aInstruction = sInstruction.split(" ");
? ? ? var sEvaluation = "pivottable(aRecordsOriented, [ [" + aInstruction[0] + "], [" + aInstruction[1] + "], [" + aInstruction[2] + "], [" + "\"" + aInstruction[3].split(",").join("\",\"") + "\"" + "] ]);"
? ? ? var aManipulatedData = eval(sEvaluation);
? ? }
? ? 
? ? if(sWhereToDumpData == "endOfCurrentSheet") {
? ? ? var sNameOfSpreadsheetToDumpDataInto = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName()

? ? } else if (sWhereToDumpData == "newSheet") {
? ? ? //var yourNewSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Name of your new sheet");
? ? ? 
? ? ? //if (yourNewSheet != null) {
? ? ? // ?SpreadsheetApp.getActiveSpreadsheet().deleteSheet(yourNewSheet);
? ? ? //}
? ? ? sNameOfSpreadsheetToDumpDataInto = "Name of your new sheet";
? ? ? yourNewSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
? ? ? yourNewSheet.setName(sNameOfSpreadsheetToDumpDataInto);
? ? } else if (sWhereToDumpData == "popupHTML") {

? ? } else if (sWhereToDumpData == "popupTextArea") {
? ? ? sEncodedJavascript = '%0Afunction%20fauxcopy(sString)%7B%0A%20%20var%20aux%20%3D%20document.createElement(%22textarea%22)%3B%0A%20%20aux.setAttribute(%22contentEditable%22%2C%20true)%3B%0A%20%20%2F%2F%20aux.innerHTML%20%3D%20sString%3B%0A%20%20aux.value%20%3D%20sString%3B%0A%20%20aux.setAttribute(%22onfocus%22%2C%20%22document.execCommand(%27selectAll%27%2Cfalse%2Cnull)%22)%3B%20%0A%20%20document.body.appendChild(aux)%3B%0A%20%20aux.focus()%3B%0A%20%20document.execCommand(%22copy%22)%3B%0A%20%20document.body.removeChild(aux)%3B%0A%7D%0Asuperencode%20%3D%20function%20(str)%7B%20%20return%20encodeURIComponent(str).replace(%2F%27%2Fg%2C%20%22%2527%22)%3B%20%7D%0AtoDelimited%20%3D%20function(aInputArray%2C%20sDelimiter%2C%20sQualifier)%20%7B%20function%20returnAllKeysAmongAllObjectsInRecordsOrientedArray(aRecordsOriented)%20%7B%20return%20aRecordsOriented.reduce(function(agg%2C%20oElement313)%20%7B%20agg%20%3D%20agg.concat(Object.keys(oElement313))%3B%20agg%20%3D%20unique(agg)%3B%20return%20agg%3B%20%7D%2C%20%5B%5D)%20%7D%20var%20aColumns%20%3D%20returnAllKeysAmongAllObjectsInRecordsOrientedArray(aInputArray)%3B%20return%20aInputArray.reduce(function(agg%2C%20oElement)%20%7B%20return%20agg%20%2B%20%22%0A%22%20%2B%20aColumns.filter(function(oElement777)%20%7B%20return%20oElement777.trim()%20!%3D%20%22%22%20%7D).reduce(function(agg001%2C%20oElement001%2C%20iIndex001)%20%7B%20return%20agg001%20%2B%20((iIndex001%20%3D%3D%200)%20%3F%20%22%22%20%3A%20sDelimiter)%20%2B%20sQualifier%20%2B%20((oElement%5BoElement001%5D%20%3D%3D%20undefined%20%3F%20%22%22%20%3A%20oElement%5BoElement001%5D)).toString().replace(%2F%0D%0A%2Fg%2C%20%22%3Cbr%3E%22).replace(%2F%0A%2Fg%2C%20%22%3Cbr%3E%22)%20%2B%20sQualifier%3B%20%7D%2C%20%22%22)%20%7D%2C%20aColumns.map(function(oElement002)%20%7B%20return%20sQualifier%20%2B%20oElement002%20%2B%20sQualifier%3B%20%7D).join(sDelimiter))%20%7D%0AtoTabDelimited%20%3D%20function(aInputArray%2C%20sQualifier)%20%7B%20if%20(sQualifier%20%3D%3D%20undefined)%20%7B%20sQualifier%20%3D%20%22%22%20%7D%20return%20toDelimited(aInputArray%2C%20%22%09%22%2C%20sQualifier)%3B%20%7D%0Aunique%20%3D%20function(aArray)%20%7B%20var%20a%20%3D%20%5B%5D%3B%20for%20(var%20i%3D0%2C%20l%3DaArray.length%3B%20i%3Cl%3B%20i%2B%2B)%20if%20(a.indexOf(aArray%5Bi%5D)%20%3D%3D%3D%20-1)%20a.push(aArray%5Bi%5D)%3B%20return%20a%3B%20%7D%3B%0A%2F%2F%20fauxcopy(toTabDelimited(JSON.parse(decodeURIComponent(document.querySelectorAll(%22.RecordsOrientedArrayToHTML%22)%5B0%5D%5B%22dataset%22%5D.arecordsoriented))))%0Afauxcopy(document.querySelectorAll(%22textarea.arecordsoriented%22)%5B0%5D.value)%3B%0A%0Aalert(%22copied%20to%20clipboard!%22)'
? ? ? sHTMLButtonToCopyaRecordsOrientedData = "<input type='button' onClick='" + sEncodedJavascript + "' value='copy' />";
? ? ? alertHTML(sHTMLButtonToCopyaRecordsOrientedData + "<br /><textarea style='width:100%; height:250px;' class='arecordsoriented'>" + JSON.stringify(aManipulatedData) + "</textarea><br />" + sHTMLButtonToCopyaRecordsOrientedData );

? ? }
? ? 
? ? if (sWhereToDumpData != "popupHTML") {
? ? ? putgs_AVOToRange (
? ? ? ? toVO(aManipulatedData),
? ? ? ? "A" + (SpreadsheetApp.getActiveSpreadsheet().getLastRow() + 2),
? ? ? ? sNameOfSpreadsheetToDumpDataInto
? ? ? ? );
? ? } else {
? ? ? sEncodedJavascript = 'eval(decodeURIComponent("function%20fauxcopy%28sString%29%7B%0A%20%20var%20aux%20%3D%20document.createElement%28%22textarea%22%29%3B%0A%20%20aux.setAttribute%28%22contentEditable%22%2C%20true%29%3B%0A%20%20%2F%2F%20aux.innerHTML%20%3D%20sString%3B%0A%20%20aux.value%20%3D%20sString%3B%0A%20%20aux.setAttribute%28%22onfocus%22%2C%20%22document.execCommand%28%27selectAll%27%2Cfalse%2Cnull%29%22%29%3B%20%0A%20%20document.body.appendChild%28aux%29%3B%0A%20%20aux.focus%28%29%3B%0A%20%20document.execCommand%28%22copy%22%29%3B%0A%20%20document.body.removeChild%28aux%29%3B%0A%7D%0Asuperencode%20%3D%20function%20%28str%29%7B%20%20return%20encodeURIComponent%28str%29.replace%28%2F%27%2Fg%2C%20%22%2527%22%29%3B%20%7D%0AtoDelimited%20%3D%20function%28aInputArray%2C%20sDelimiter%2C%20sQualifier%29%20%7B%20function%20returnAllKeysAmongAllObjectsInRecordsOrientedArray%28aRecordsOriented%29%20%7B%20return%20aRecordsOriented.reduce%28function%28agg%2C%20oElement313%29%20%7B%20agg%20%3D%20agg.concat%28Object.keys%28oElement313%29%29%3B%20agg%20%3D%20unique%28agg%29%3B%20return%20agg%3B%20%7D%2C%20%5B%5D%29%20%7D%20var%20aColumns%20%3D%20returnAllKeysAmongAllObjectsInRecordsOrientedArray%28aInputArray%29%3B%20return%20aInputArray.reduce%28function%28agg%2C%20oElement%29%20%7B%20return%20agg%20%2B%20%22%5Cn%22%20%2B%20aColumns.filter%28function%28oElement777%29%20%7B%20return%20oElement777.trim%28%29%20%21%3D%20%22%22%20%7D%29.reduce%28function%28agg001%2C%20oElement001%2C%20iIndex001%29%20%7B%20return%20agg001%20%2B%20%28%28iIndex001%20%3D%3D%200%29%20%3F%20%22%22%20%3A%20sDelimiter%29%20%2B%20sQualifier%20%2B%20%28%28oElement%5BoElement001%5D%20%3D%3D%20undefined%20%3F%20%22%22%20%3A%20oElement%5BoElement001%5D%29%29.toString%28%29.replace%28%2F%5Cr%5Cn%2Fg%2C%20%22%3Cbr%3E%22%29.replace%28%2F%5Cn%2Fg%2C%20%22%3Cbr%3E%22%29%20%2B%20sQualifier%3B%20%7D%2C%20%22%22%29%20%7D%2C%20aColumns.map%28function%28oElement002%29%20%7B%20return%20sQualifier%20%2B%20oElement002%20%2B%20sQualifier%3B%20%7D%29.join%28sDelimiter%29%29%20%7D%0AtoTabDelimited%20%3D%20function%28aInputArray%2C%20sQualifier%29%20%7B%20if%20%28sQualifier%20%3D%3D%20undefined%29%20%7B%20sQualifier%20%3D%20%22%22%20%7D%20return%20toDelimited%28aInputArray%2C%20%22%5Ct%22%2C%20sQualifier%29%3B%20%7D%0Aunique%20%3D%20function%28aArray%29%20%7B%20var%20a%20%3D%20%5B%5D%3B%20for%20%28var%20i%3D0%2C%20l%3DaArray.length%3B%20i%3Cl%3B%20i%2B%2B%29%20if%20%28a.indexOf%28aArray%5Bi%5D%29%20%3D%3D%3D%20-1%29%20a.push%28aArray%5Bi%5D%29%3B%20return%20a%3B%20%7D%3B%0Afauxcopy%28toTabDelimited%28JSON.parse%28decodeURIComponent%28document.querySelectorAll%28%22.RecordsOrientedArrayToHTML%22%29%5B0%5D%5B%22dataset%22%5D.arecordsoriented%29%29%29%29%0Aalert%28%22copied%20to%20clipboard%21%22%29"))'
? ? ? sHTMLButtonToCopyaRecordsOrientedData = "<input type='button' onClick='" + sEncodedJavascript + "' value='copy' />";
? ? ? alertHTML(sHTMLButtonToCopyaRecordsOrientedData + "<br />" + convertRecordsOrientedArrayToHTMLTable(aManipulatedData) + "<br />" + sHTMLButtonToCopyaRecordsOrientedData );
? ? }
? ? 
? } else { alert("no input, therefore nothing performed."); }

? //alert(SpreadsheetApp.getActiveSpreadsheet().getLastRow());
? //alertTextArea(JSON.stringify(aManipulatedData)); ?
}

function activeSheetFunction() {
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
? functionFunction(aRecordsOriented, "newSheet")
}

function selectedCellsFunctionRecordsOriented() {
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
? functionFunction(aRecordsOriented, "popupTextArea"); // lololoo
}

function selectedCellsFunction() {
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
? functionFunction(aRecordsOriented, "endOfCurrentSheet"); // wut
}

function selectedCellsFunctionHTMLTable() {
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
? functionFunction(aRecordsOriented, "popupHTML"); // k
}
/* END "get" functions (for menu) */

/* gsTOASTALERTSETCgs */
/* BEGIN alerts/toast/debugging/polyfills/shims/shortcuts */
function alert(sString, sString2) {
? if (sString2 != undefined) { // then the first parameter is title and second parameter is content
? ? ? SpreadsheetApp.getUi().alert(sString, sString2, SpreadsheetApp.getUi().ButtonSet.OK);
? } else { // then the first parameter is content
? ? ? SpreadsheetApp.getUi().alert(sString);
? }
}
console = {}; console.log = function(sString) { alert(sString) } // browser console simulating
// log = {}; log.debug = function(sString) { alert(sString) } ?// Netsuite simulating
function alertHTML(sHTML, sDimensions, sTitle) {
? ((sTitle) ? "" : sTitle='alertHTML()' );
? ((sDimensions) ? "" : sDimensions="700x500" );
  try {
    var htmlOutput = HtmlService
    // .createHtmlOutput(superhtmlEntities(sHTML))
    .createHtmlOutput((sHTML))
    .setWidth(sDimensions.split("x")[0])
    .setHeight(sDimensions.split("x")[1]);  
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, sTitle); // showModalDialog - This method does NOT suspend the server-side script while the dialog is open.
    // .showModalDialog vs .showModelessDialog vs .showSidebar vs .alert vs .prompt? - Modeless dialogs let the user interact with the editor behind the dialog. By contrast, modal dialogs do not. In almost all cases, a modal dialog or sidebar is a better choice than a modeless dialog.
  } catch(e) { 
    confirm(e);
    alertTextArea(sHTML);
  }
}; function showModalDialog(sHTML, sDimensions, sTitle) { return alertHTML(sHTML, sDimensions, sTitle); }
function showModelessDialog(sHTML, sDimensions, sTitle) { return alertHTML(sHTML, sDimensions, "pretend this dialog has no buttons because thats the definition of showModelessDialog lol" + sTitle); }
function alertTextArea(sString, sDimensions, sTitle) { alertHTML("<textarea style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>", sDimensions, sTitle); }
function toast(sString) { SpreadsheetApp.getActiveSpreadsheet().toast(sString, "toast()"); }
function sidebar(sHTML, sDimensions, sTitle) { //  This method does not suspend the server-side script while the sidebar is open. To communicate with the server-side script, the client-side component must make asynchronous callbacks using the google.script API for HtmlService. To close the sidebar programmatically, call google.script.host.close() on the client side of an HtmlService web app.
  if (!(sTitle)) { sTitle = "showSidebar"; }
  // Display a sidebar with custom HtmlService content.
  var htmlOutput = HtmlService
      .createHtmlOutput(sHTML)
      .setTitle(sTitle);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}; function showSidebar(sHTML, sDimensions, sTitle) { return sidebar(sHTML, sDimensions, sTitle); };
function prompt(sString) { return SpreadsheetApp.getUi().prompt(sString).getResponseText(); }
function confirm(sString, sTitle) { return SpreadsheetApp.getUi().alert((sTitle==undefined ? "confirm? " : sTitle), sString, SpreadsheetApp.getUi().ButtonSet.YES_NO) == "YES"; } // alert - This method suspends the server-side script while the dialog is open
function confirmS(sString, sTitle) { return confirm(JSON.stringify(sString), sTitle); }
function copy(sString) { alertHTML("<script>eval(decodeURIComponent(\"copyElementInnerText%20%3D%20function(sElement)%20%7B%0Adocument.querySelectorAll(sElement)%5B0%5D.select()%3B%20document.execCommand(%22copy%22)%3B%20alert(%22copied!%22)%3B%0A%7D%3B%20window.addEventListener(%27DOMContentLoaded%27%2C%20(event)%20%3D%3E%20%7B%20copyElementInnerText(%22%23myInput%22)%3B%7D)%3B\"))</script><button onclick='eval(decodeURIComponent(\"copyElementInnerText%20%3D%20function(sElement)%20%7B%0Adocument.querySelectorAll(sElement)%5B0%5D.select()%3B%20document.execCommand(%22copy%22)%3B%20alert(%22copied!%22)%3B%0A%7D%3B%20copyElementInnerText(%22%23myInput%22)%3B\"))'>copy</button><br /><textarea id='myInput' style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>"); }
//copy = function(sString) { alertHTML("<button onclick='document.getElementById(\"myInput\").select(); ?document.execCommand(\"copy\"); alert(\"copied!\");'>copy</button><br /><textarea id='myInput' style='width:100%; height:250px;'>" + superhtmlEntities(sString) + "</textarea>"); }
/* END alerts/toast/debugging/polyfills/shims/shortcuts */


/* gsSELECTED_GETSgs */
/* BEGIN getgs_selectedCellToAVO, getgs_selectedToAVO, getgs_rangeToAVO, getgs_selectionTo1DArray, getgs_selectedToAVO_FIRSTROWASKEYS, getgs_selectedToAVO_MCandFR */
function getgs_selectedCellToAVO() {
? sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation();
? sWorksheetName = getgs_worksheetname();
? return getgs_rangeToAVO(`${sWorksheetName}!` + GS_returnOuterRange(sA1Notation));
}; function alertgs_selectedCellToAVO() { alertTextArea(JSON.stringify(getgs_selectedCellToAVO()), "3000x2000", "aVO"); }
function getgs_selectedCellToARO() {
? return toRO(getgs_selectedCellToAVO());
}; function alertgs_selectedCellToARO() { alertTextArea(JSON.stringify(getgs_selectedCellToARO()), "3000x2000", "aRO"); }

function getgs_selectedToAVO() { // fix this bug / refactor the hardcode getSheetByName out of this customization. note2: IS THIS FLAT OR WHAT?? CONVERT THIS INTO PART OF getgs_selectedToARO() FAMILY OF FUNCTIONS?
? ? // this function assumes you're just grabbing non-sectional selections that isn't part of the first row, refactor into something more forwards compatible with any situash?
? ? // aFirstRow = SpreadsheetApp.getActive().getSheetByName("Partnumber/Matrix Template").getRange("A1:1").getValues()[0];
? ? // aRemainingRows = getgs_rangeToAVO(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange())
? ? // return [aFirstRow].concat(aRemainingRows);
? ? var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? ? // var aValuesOriented = toValuesOriented(getgs_rangeToARO(rRange)); // 6/30/2021 change request - get rid of toValuesOriented(getgs_rangeToARO()) in favor of getgs_rangeToAVO()
? ? // var aValuesOriented = getgs_rangeToAVO(rRange);
? ? return getgs_rangeToAVO(rRange);
? ? // alertHTML("<textarea style='width:100%; height:250px;'>var aVO = " + superhtmlEntities(JSON.stringify(aValuesOriented)) + "</textarea>");
? ? // return getgs_selectionTo1DArray();
}; function alertgs_selectedToAVO() { alertTextArea(JSON.stringify(getgs_selectedToAVO() )); }
function getgs_selectedToARO() { return toRO(getgs_selectedToAVO()) }; function alertgs_selectedToARO() { alertTextArea(JSON.stringify(getgs_selectedToARO() )); }

function getgs_rangeToAVO(rRange) { // getgs_sanitizeRange
    if (!(rRange)) { // if rRange is undefined, then get whole active spreadsheet?  or get selection from active spreadsheet?>?
      var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
      rRange = ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
    }
? ? rRange = getgs_sanitizeRange(rRange);
    
? ? aReturn = rRange.getValues().map(function(oEl) {
? ? ? return oEl.map(function(oEl2) {
? ? ? ? return (oEl2);
? ?   });
?   });
    
    return aReturn;
}; alertgs_rangeToAVO = function(rRange) { alertTextArea(JSON.stringify(getgs_rangeToAVO(rRange))); }
function getgs_rangeToARO(rRange) { return toRO(getgs_rangeToAVO(rRange)); }; alertgs_rangeToARO = function(rRange) { alertTextArea(JSON.stringify(getgs_rangeToARO(rRange))); }
//function getgs_selectedToARO() {
// ?var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
// ?return getgs_rangeToARO(rSelectedRange);
//}; function alertgs_selectedToARO() { // this assumes that first row in selection is in fact the columns
// ?// alertHTML("<textarea style='width:100%; height:250px;'>var aRO = " + superhtmlEntities(JSON.stringify(getgs_selectedToARO())) + "</textarea>");
// ?alertTextArea("var aRO = " + JSON.stringify(getgs_selectedToARO()) );
//}
function getgs_selectedToAVO_FIRSTROWASKEYS() {
  aFirstRowWhichIsActuallySecondRow = getgs_selectionTo2DArrayA1Notation()[0]
  sFirstColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[0]);
  sLastColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[aFirstRowWhichIsActuallySecondRow.length-1]);
  sAbsoluteFirstColumnRange = `${sFirstColumn}1:${sLastColumn}1`;
  aAbsoluteFirstRow = SpreadsheetApp.getActiveSpreadsheet().getRange(sAbsoluteFirstColumnRange).getValues()[0];
? aRemainingRows = getgs_rangeToAVO(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange());
? return [aAbsoluteFirstRow].concat(aRemainingRows);
  // aFirstRow = SpreadsheetApp.getActiveSpreadsheet().getRange("A1:1").getValues()[0];
? // var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? // var aValuesOriented = toValuesOriented(getgs_rangeToARO(rRange)); // 6/30/2021 change request - get rid of toValuesOriented(getgs_rangeToARO()) in favor of getgs_rangeToAVO()
? // var aValuesOriented = getgs_rangeToAVO(rRange);
? // alert("var aValuesOriented = " + JSON.stringify(aValuesOriented));
? // alertHTML("<textarea style='width:100%; height:250px;'>var aValuesOriented = " + JSON.stringify(aValuesOriented) + "</textarea>");
? // alertTextArea("var aValuesOriented = " + JSON.stringify(aValuesOriented) + ";");
}
function getgs_selectedToARO_FIRSTROWASKEYS() { return toRO(getgs_selectedToAVO_FIRSTROWASKEYS()); }
function alertgs_selectedToARO_FIRSTROWASKEYS() { alertTextArea("var aRO = " + JSON.stringify(getgs_selectedToARO_FIRSTROWASKEYS()) + ";\n"); }
function alertgs_selectedToAVO_FIRSTROWASKEYS() { alertTextArea("var aVO = " + JSON.stringify(getgs_selectedToAVO_FIRSTROWASKEYS()) + ";\n"); }

getgs_selectionTo1DArray = function() { // is this replacing getgs_selectedToAVO? ?no I don't think so, but if so, refactor it out
? var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
? aSelection = [];
? if (ranges.length > 0) {
? ? for (var i = 0; i < ranges.length; i++) {
? ? ? aSelection = aSelection.concat(rangeToArray(ranges[i]));
? ? }
? }
? return aSelection;
}; alertgs_selectionTo1DArray = function() { alertTextArea(JSON.stringify(getgs_selectionTo1DArray())); }

getgs_selectionTo1DArrayA1Notation = function() { // is this replacing getgs_selectedToAVO? ?no I don't think so, but if so, refactor it out
? var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
? aSelection = [];
? if (ranges.length > 0) {
? ? for (var i = 0; i < ranges.length; i++) {
      // rRange.getA1Notation()
? ? ? aSelection = aSelection.concat( GSDS_disjointedRangeToAVO(ranges[i].getA1Notation()).flat() );
? ? }
? }
? return aSelection;
};
getgs_selectionTo2DArrayA1Notation = function() {
? var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
  var sLastColumn = columnToLetter(SpreadsheetApp.getActiveSpreadsheet().getLastColumn()); var iLastRow = SpreadsheetApp.getActiveSpreadsheet().getLastRow();
  // confirm(ranges[0].getA1Notation()); 
? aSelection = [];
? if (ranges.length > 0) {
? ? for (var i = 0; i < ranges.length; i++) {
      sAbsoluteA1Notation = ranges[i].getA1Notation();
      // sAbsoluteA1Notation = "1:B1"; // works!
      // sAbsoluteA1Notation = "1:1"; // works!
      // sAbsoluteA1Notation = "1:B1,1"; // no funciona!
      sAbsoluteA1Notation = sAbsoluteA1Notation.replace(/(^|,)([0-9])(.*)/g, "$1A$2$3");
      sAbsoluteA1Notation = sAbsoluteA1Notation.replace(/(^.*:)([0-9])/g, "$1" + sLastColumn + "$2");
      // now do one for iLastRow
      
      // rRange.getA1Notation()
? ? ? aSelection = aSelection.concat( GSDS_disjointedRangeToAVO(sAbsoluteA1Notation) );
      //confirm(ranges[i].getA1Notation());
      //confirm(JSON.stringify(aSelection));
? ? }
? }
? return aSelection;
};

function getgs_selectedCellToA1Notation() {
? sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation();
? sWorksheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
? return `${sWorksheetName}!${sA1Notation}`;
}


function getgs_selectedCellToEncoded() { return superencode ( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue() ); }; function alertgs_selectedCellToEncoded() { alertTextArea( getgs_selectedCellToEncoded() ); }
function getgs_selectedCellToHTMLEntities() { return superhtmlEntities ( SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getValue() ) } 
function alertgs_selectedCellToHTMLEntities() { alertTextArea(getgs_selectedCellToHTMLEntities()); } 

function getgs_selectedToAVO_MCandFR() { // MC = multicolumn selection, FR = filtered rows (need to be REMOVED from getValues()
        // vs getgs_selectedToAVO() and vs getgs_selectedToAVO_FIRSTROWASKEYS() vs getgs_selectedToAVO_MCandFR()
        // ASSUMPTIONS - columns are selected (as opposed to rows being selected).  columns may or may not have a filter that will need to have rows eliminted from getValues()
        //
        // 
        // FIXED - fix bug where multicolumn selection only works when individually selecting each column
        // fix bug where filtered rows aren't filtered with good performance

        // getVisibleValues_() is some function from stackoverflow
        const getVisibleValues_ = (range) => {
                // sheet = range.getSheet().getName();
                sheet = range.getSheet();
                // confirm(range.getA1Notation());
                // /*
                   return range.getValues() 
                        .filter(
                                (_, rowIdx) =>
                                !sheet.isRowHiddenByFilter(rowIdx + 1) &&
                                !sheet.isRowHiddenByUser(rowIdx + 1)
                        ).map(e => {
                                return e[0]
                        }); 
                
                // */
                /*
                // return sheet.getFilter().getRange(range.getA1Notation())
                return sheet.getRange("A:E").getFilter().getHiddenValues()
                // return range.getFilter().getColumnFilterCriteria(range.getColumn()).getHiddenValues
                        // .getValues()
                        .map(e => {
                                return e[0]
                        }); // gotta include this since it's part of another solution that transposes the data
                 */      
        };

        // get ranges (eg: "A:A,C:C,D:D,E:F") - note how "E:F" is a multi-column range and needs to turn into two ranges (ie "E:E,F:F") for this solution to properly iterate thru the ranges
        var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();

        aSelection = [];
        if (ranges.length > 0) {
                for (var i = 0; i < ranges.length; i++) {
                   // the next 2 lines checks to see if the range is multi-column; if so then re-create the ranges per column since this solution assumes that entire columns are selected
                   // consider refactoring this into ranges = getgs_normalizeRangesBySplittingMultiColumnRangesIntoTheirOwnIndividualRange(ranges) or something similarly titled??
                   sRangeA1Notation = ranges[i].getA1Notation();
                   confirm(sRangeA1Notation);
                   aRangeOfA1Notations = GSDS_disjointedRangeToArray(sRangeA1Notation.replace(/([A-Z]+)/g, "$11"))
                   if (aRangeOfA1Notations.length>1) {
                      aRangeOfA1Notations.forEach(sA1Notation => {
                         sColumn = sA1Notation.replace(/1/g, "");
                         range = SpreadsheetApp.getActiveSpreadsheet().getRange(sColumn + ":" + sColumn);
                         aSelection = aSelection.concat([getVisibleValues_(range)]);
                      })

                   } else {
                      aSelection = aSelection.concat([getVisibleValues_(ranges[i])]);
                   }
                }
        }

        aSelectionTransposed = _.zip.apply(_, aSelection);
        return aSelectionTransposed;
        // confirm(JSON.stringify(aSelectionTransposed));
        // confirm(JSON.stringify( getVisibleValues_(ranges[0]) ));
}
function segmentRangesByColumn(aRanges) { //  vs flattenRangesByRow?
        // segments ranges such as "B2:D5" to 3 new ranges: B2:B5, C2:C5 and D2:D5"
        // sA1Notation = "B2:C5"
        aNewRanges = [];
        ss = aRanges[0].getSheet();

        if (aRanges.length > 0) {    
          for (var i = 0; i < aRanges.length; i++) {
            sRangeA1Notation = aRanges[i].getA1Notation();
            // confirm(sRangeA1Notation);
            sColumn1 = sRangeA1Notation.match(/^([A-Z]*)/)[0];
            sRow1 = sRangeA1Notation.match(/([0-9]*)\:/)[1];
            sColumn2 = sRangeA1Notation.match(/\:([A-Z]*)/)[1];
            sRow2 = sRangeA1Notation.match(/([0-9]*)$/)[0];
      
            if (sRow1) {} else { sRow1 = "1"; } // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then make sRow1 just the first row
            if (sRow2) {} else { sRow2 = SpreadsheetApp.getActive().getLastRow(); } // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then get "literal" or "contextualized" A1Notation (with the PRECISE last row)
            
            if (sColumn1 != sColumn2) { // then split each column into its own range
                aSetOfRanges = GSDS_disjointedRangeToArray(sColumn1 + sRow1 + ":" + sColumn2 + sRow1).map(function(oEl, iIn) {
                    sCurrentColumn = columnToLetter(letterToColumn(sColumn1)+iIn);
                    sSegmentedA1Notation = oEl + ":" + sCurrentColumn + sRow2;
                    return ss.getRange(sSegmentedA1Notation);
                });
                aNewRanges = aNewRanges.concat(aSetOfRanges);
            } else {
                aNewRanges.push(aRanges[i]);
            }
          }
        }
        return aNewRanges;
}
function getgs_firstCellFromRanges(aRanges) { // vs getgs_FirstCellAmongArrayOfRanges? and getgs_LastCellAmongArrayOfRanges
  sFirstCell = "";
  sLastCell = "";
  // .match(/^[A-Z]*[0-9]*/)[0] // first cell in an A1Notation
  // .match(/\:([A-Z]*[0-9]*)$/)[1] // last cell in an A1Notation
  aRanges.forEach(function(oEl, iIn) {
    if (iIn == 0) {
      if (aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)) { // if the A1Notation is "A:A" or "B:D" or some weird shit without rows, then get "literal" or "contextualized" A1Notation (with the PRECISE last row)
        sRow1 = "1"; 
        sColumn1 = aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)[0].split(":")[0];
        sColumn2 = aRanges[0].getA1Notation().match(/^[A-Z]*\:[A-Z]*/)[0].split(":")[1];
        sLastRow = SpreadsheetApp.getActive().getLastRow();
        sFirstCell = sColumn1 + sRow1;
      } else {
        sFirstCell = aRanges[0].getA1Notation().match(/^[A-Z]*[0-9]*/)[0];
      }
    } else {
      sRangeA1Notation = aRanges[iIn].getA1Notation();
      sColumn1 = sRangeA1Notation.match(/^([A-Z]*)/)[0];
      sRow1 = sRangeA1Notation.match(/([0-9]*)\:/)[1];
      sCurrentFirstCell = sColumn1 + sRow1;
      // confirm(sCurrentFirstCell);
      if (subtractCells(sFirstCell, sCurrentFirstCell)[0] > 1) {
          sFirstCell = sCurrentFirstCell
          // second parameter is "first"
      } else {
          // first parameter is "first"
          // sFirstCell = sFirstCell;
          // console.log("first")
      }
    }
  })
  return sFirstCell;

}
function getgs_SelectionFilteredToAVO() { // fix bug where multicolumn selection only works when individually selecting each column
        // some function from stackoverflow // PROBLEM - THIS FUNCTION RUNS TOO SLOW. PROBLEM10DAYSLATER - WAIT THIS FUNCTION IS FAST AND DOESNT FUNCTION NOW, WTF?
        const getVisibleValues_ = (range) => {
                // sheet = range.getSheet().getName();
                sheet = range.getSheet();
                return range
                        .getValues()
                        .filter(
                                (_, rowIdx) =>
                                !sheet.isRowHiddenByFilter(rowIdx + 1) &&
                                !sheet.isRowHiddenByUser(rowIdx + 1)
                        ).map(e => {
                                return e[0]
                        }); // gotta include this since it's part of another solution that transposes the data
        };
        const getVisibleValues = function(range) { return range.getValues().map(e=>{return e[0]}) }

        var ranges = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges();
        // confirm(ranges.length);

        // segments ranges such as "B2:D5" to 3 new ranges: B2:B5, C2:C5 and D2:D5"
        ranges = segmentRangesByColumn(ranges);
        // confirm(ranges.length);
        // confirm(getFirstCellAmongArrayOfRanges(ranges));
        
        aSelection = [];
        if (ranges.length > 0) {
          for (var i = 0; i < ranges.length; i++) {
            sRangeA1Notation = ranges[i].getA1Notation();
            aSelection = aSelection.concat([getVisibleValues(ranges[i])]);
          }
        }

        aSelectionTransposed = _.zip.apply(_, aSelection);
        return aSelectionTransposed;
        // confirm(JSON.stringify(aSelectionTransposed));
        // confirm(JSON.stringify( getVisibleValues_(ranges[0]) ));
}
/* END getgs_selectedCellToAVO, getgs_selectedToAVO, getgs_rangeToAVO, getgs_selectionTo1DArray, getgs_selectedToAVO_FIRSTROWASKEYS, getgs_selectedToAVO_MCandFR */

/* gsSELECTED_ALERTSgs */
function alertgs_selectedCellHTMLified_unrendered() {
? aCQPRO = toRO( getgs_selectedCellSurroundingAVO() );
? sTitle = aCQPRO[0]['label'];
? // alertHTML(CQPify(getgs_rangeToARO('scriptsnippets!' + GS_returnOuterRange('G30'))))
? alertTextArea(HTMLify(aCQPRO), undefined, sTitle)
}


function alertgs_selectedCQPify() {
? var aCQPRecordsOriented = getgs_selectedToARO_FIRSTROWASKEYS();
? alertTextArea(HTMLify(aCQPRecordsOriented), undefined, "raw html");
}

// function alertgs_selectedToARO_FIRSTROWASKEYS() {
// ?alertTextArea("var aRecordsOriented = " + JSON.stringify(getgs_selectedToARO_FIRSTROWASKEYS) + ";");
// }
function getgs_selectedToEncodedARO() { // this assumes that first row in selection is in fact the columns
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aRecordsOriented = getgs_rangeToARO(rSelectedRange);
? aRecordsOriented.forEach(function(oElement) {
? ? Object.keys(oElement).forEach(function(oElement000) {
? ? ? ? oElement[oElement000] = superencode(oElement[oElement000]);
? ? })
? ? ? return oElement; 
? })
? return aRecordsOriented;
? // alert("var aRecordsOrientedEncoded = " + JSON.stringify(aRecordsOriented));
? // alertHTML("<textarea style='width:100%; height:250px;'>var aROEncoded = " + JSON.stringify(aRecordsOriented) + "</textarea>");
}; function alertgs_selectedToEncodedARO() { alertTextArea("var aROEncoded = " + JSON.stringify(getgs_selectedToEncodedARO()) ); }

function alertgs_selectedToAVOT() {
? var rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var aValuesOriented = toVO(getgs_rangeToARO(rRange));
? // alert("var aValuesOrientedTransposed = " + JSON.stringify(_.zip.apply(_, aValuesOriented)));
? alertHTML("<textarea style='width:100%; height:250px;'>var aVOT = " + JSON.stringify(_.zip.apply(_, aValuesOriented)) + "</textarea>");
}

function alertgs_selectedToFlatArray() {
? var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection(); var ranges = selection.getActiveRangeList().getRanges();
? aArray = [];
? for (var i = 0; i < ranges.length; i++) {
? ? ? aArray = aArray.concat(rangeToArray(ranges[i]));
? }
? alertHTML("<textarea style='width:100%; height:250px;'>var aArray = " + JSON.stringify(aArray) + "</textarea>");
}

function alertgs_selectedToCartesianProduct() {
? var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection(); var ranges = selection.getActiveRangeList().getRanges();
? aArrays = [];
? for (var i = 0; i < ranges.length; i++) {
? ? ? aArrays.push(rangeToArray(ranges[i]));
? }
? alertTextArea(toTabDelimited(cartesian(aArrays)));
}

function alertgs_selectedToCombinedString() { // britney
/*
  try {
    var selection = SpreadsheetApp.getActiveSheet().getSelection();
    var rRange = selection.getActiveRange();
  } catch(e) { var rRange = SpreadsheetApp.getActiveSheet().getCurrentCell();  confirm("working?") }
? // var selection = SpreadsheetApp.getActiveSpreadsheet().getSelection();
  // if (selection) { } else { confirm("wat");  }
? // var aValuesOriented = toVO(getgs_rangeToARO(rRange));
? var aValuesOriented = getgs_rangeToAVO(rRange);
? var sCombined = aValuesOriented.reduce(function(oAg, oEl) {
? ? oAg += oEl.reduce(function(oAg2, oEl2) {
? ? ? ?oAg2 += oEl2;
? ? ? ?return oAg2 + "\n\n";
? ? }, ""); return oAg;
? }, "");
  */
? alertHTML("<textarea style='width:100%; height:250px;'>" + getgs_selectionTo1DArray().join("\n\n") + "</textarea>");
}

/* gsVARIOUSSHORTIES */
function getCellObject() {
  getCellObjectSpecific("A1");
}
function getCellObjectSpecific(sCell) {
  rCell = SpreadsheetApp.getActiveSpreadsheet().getActiveCell();
  // rCell = SpreadsheetApp.getActiveSpreadsheet().getRange(sCell + ":" + sCell);
  // JSON.stringify(rCell);
  alertTextArea(JSON.stringify(rCell));
  // alertTextArea(JSON.stringify(rCell.getHeight()));
}
// added 7/15/2021
function getgs_rangeWidth(sRange) {  // getgs_rangeWidth("H47:J54");
  if (typeof(sRange) == "string") { var rRange = SpreadsheetApp.getActive().getRange(sRange); } else { var rRange = sRange; }
  return rRange.getWidth();
}
function getgs_rangeHeight(sRange) { // getgs_rangeHeight("H47:J54");
  if (typeof(sRange) == "string") { var rRange = SpreadsheetApp.getActive().getRange(sRange); } else { var rRange = sRange; }
  return rRange.getHeight();
}

/* gsFUNCTIONSSERVERgs */
/* FUNCTIONS WITH SERVER ACCESS! */
function evalgs_selected() {
  var rSelectionRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
  // sActiveRange = "A1:" + columnToLetter(rSelectionRange.getLastColumn()) + rSelectionRange.getLastRow();
  // var firstCell= SpreadsheetApp.getActiveSheet().getActiveSelection().getCell(1,1);
  sGottenRange = getgs_firstCellFromRanges(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRangeList().getRanges());
  var firstCell = SpreadsheetApp.getActiveSpreadsheet().getRange(sGottenRange).getCell(1,1);
  
  var sA1Notation_server = rSelectionRange.getA1Notation();
  sEval = firstCell.getNote();
  if (sEval) { // selection is a solid grid, therefore eval the note onto the selection
    var aVO_server = getgs_rangeToAVO(rSelectionRange); // // CQPify's aVO_server vs evalgs_selected()'s aVO_server
    try { return eval(sEval) } catch(e) { toast(e) };       
  } else { // Selection can be anything (solid grid, scattered cells, solid column/row-selected,scattered column/row-selected), combine individual cells and eval whole thing?
    if(confirm("First Cell has no notation.  Pretend the notation are the cell contents and evaluate that instead?")) {
      var aArray = getgs_selectionTo1DArray();
      try { return eval(aArray.join("\n")) } catch(e) { toast(e) };
    }
  }
}; function alertevalgs_selected() { sReturn = evalgs_selected(); ((typeof(sReturn) == "string") ? alertTextArea(sReturn) : alertTextArea(JSON.stringify(sReturn)) ) }
function alertgs_selectedCellCQPified_rendered() { // move this to server access? edit: already here lol, renamed to CQPified instead of HTMLified
? aCQPRO = toRO( getgs_selectedCellSurroundingAVO() );
? // sHTMLCode = CQPify(aCQPRO);
? sTitle = aCQPRO[0]['label']; // refactored this on 10/9/2021, hopefully no bugs!
? // var sServer = aCQPRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
? // if (sServer) { eval(sServer); }
  var sHTMLCode = CQPify(aCQPRO); // refactored this on 10/9/2021, hopefully no bugs!
? alertHTML(sHTMLCode, "3000x2000", sTitle); ?
}; function alertgs_selectedCellHTMLified_rendered() { return alertgs_selectedCellCQPified_rendered(); }

function getgs_selectedCellSurroundingAVO(sA1Notation) { // fix/refactor/tasks/TODO this function to allow worksheet name within A1Notation. ?"distinguishWorksheetNameFromA1Notation"?
? if (!(sA1Notation)) { sA1Notation = SpreadsheetApp.getActiveSpreadsheet().getActiveCell().getA1Notation(); }
? sWorksheetName = getgs_worksheetname();
? return getgs_rangeToAVO(`${sWorksheetName}!` + GS_returnOuterRange(sA1Notation))
}
function getgs_CQPifiedSolutionIsland(sMatch) { // formerly alertgs_HTMLifiedSolution
? aCQPRO = getgs_rangeToARO("webapp!" + GS_returnOuterRange(getgs_quickAndDirtyLookup("webapp!A", sMatch)));
? // sHTMLCode = CQPify(aCQPRO);
? sTitle = aCQPRO[0]['label'];
? // var sServer = aCQPRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
? // if (sServer) { eval(sServer); }
  var sHTMLCode = CQPify(aCQPRO); // refactored this on 10/9/2021, hopefully no bugs!
? return sHTMLCode;
}; function alertgs_CQPifiedSolutionIsland(sMatch) { alertHTML(getgs_CQPifiedSolutionIsland(sMatch), "1000x2000", sTitle); }
function CQPify(aRO) { // renamed to CQPify: seems like HTMLify() is simple non-server resources, whereas CQPify() is w server access and "breaking the fourth wall"?
  var rSelectionRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();  var sA1Notation_server = rSelectionRange.getA1Notation(); var aVO_server = getgs_rangeToAVO(rSelectionRange); // CQPify's aVO_server vs evalgs_selected()'s aVO_server
  (aRO[0].script ? aRO[0].script = "var aVO_server = " + JSON.stringify(aVO_server) + ";var sA1Notation_server = " + JSON.stringify(sA1Notation_server) + ";\n" + aRO[0].script : aRO[0].script = "var aVO_server =" + JSON.stringify(aVO_server) + ";var sA1Notation_server = " + JSON.stringify(sA1Notation_server) + ";" );
  //   aRO.push([{ "server-globalvars": "aVO_server\nsA1Notation_server"}]); aRO = normalizeRecordsOriented(aRO);

  var sServer = aRO.reduce((o, e, i) => { o+=e.server+"\n"; return o; }, "");
? if (sServer) { eval(sServer); }
  
  var sServerGlobalVars = aRO.map(o=>o["server-globalvars"]?.trim()).join("\n").trim().split("\n").filter(o=>o).map(o=>{ return "var " + o + ` = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(eval(o)))}")) `} ).join("\n").trim();
  // this try/catch removes the above's "?."
  //try {
  //  var sServerGlobalVars = aRO.map(o=>o["server-globalvars"].trim()).join("\n").trim().split("\n").filter(o=>o).map(o=>{ return "var " + o + ` = JSON.parse(decodeURIComponent("${superencode(JSON.stringify(eval(o)))}")) `} ).join("\n").trim();
  // } catch(e) {}
  
  if (sServerGlobalVars) {
      aRO.push({"script": sServerGlobalVars});
      aRO = normalizeRecordsOriented(aRO)
  }
  sHTMLCode = HTMLify(aRO);

  try {
    // var sServerPostHTMLification = aRO.map(o=>o["server-posthtmlification"]?.trim()).join("\n").trim();
    var sServerPostHTMLification = aRO.map(o=>o["server-posthtmlification"].trim()).join("\n").trim();
  } catch(e) {}
? if (sServerPostHTMLification) { eval(sServerPostHTMLification); }

  return sHTMLCode;
}; function CQPifyWithServer(aRO) { return CQPify(aRO); }

// googlesheets formulas - I'm blurring the lines between macros and formulas here, so be careful
function EVALUATE(data, aVO_server, aVO_server2) {
  if (typeof(aVO_server) == "string") {aVO_server = [[aVO_server]]};
  if (typeof(aVO_server2) == "string") {aVO_server2 = [[aVO_server2]]};
  var sVO_server = aVO_server?.map(o=>o.join("\t")).join("\n");
  var sVO_server2 = aVO_server2?.map(o=>o.join("\t")).join("\n");

  try {
    aVO_server = _REMOVEEMPTYROWS(aVO_server); aVO_server2 = _REMOVEEMPTYROWS(aVO_server2);
  } catch(e) {}
  return eval(data);
}
function EVALUATES(data, aVO_server, aVO_server2) { return JSON.stringify(EVALUATE(data, aVO_server, aVO_server2)); }
/* END FUNCTIONS WITH SERVER ACCESS */

/* gsPUTGSgs */
function putgs_appendAVOToWorksheet(aVO, sWorksheetName) {
  var {sA1Notation, sWorksheetName, sLastCell} = distinguishA1NotationFromWorksheet("A1", sWorksheetName);
  // putgs_AVOToRange(aVO, convertArrayToCell(addCells(sLastCell, [0,1] )), sWorksheetName)
  putgs_AVOToRange(aVO, convertArrayToCell([1, convertCellToArray(sLastCell)[1]+1]), sWorksheetName)
}

function putgs_prependAVOToWorksheet(aVO, sWorksheetName) {
  // insert aArray.length empty rows to top
  if (sWorksheetName) {
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheetName).insertRows(1, aVO.length+1);
  } else {
    SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().insertRows(1, aVO.length+1);
  }
  // getRange(1,aVO.length).forEach(o=>{ SpreadsheetApp.getActive().insertRowBefore(1); })
  putgs_AVOToRange(aVO, "A1", sWorksheetName)
}


function putgs_AVOToRange(aArray, sA1Notation, sWorksheetName) {
  // consider refactoring putgs_AVOToRange(aArray, sA1Notation, sWorksheetName) to allow putgs_AVOToRange(aArray, sWorksheetName) as parameters, and to assume "A1" if no second parameter?
  // the next line of code cannot be here because this creates a new worksheet for samples such as "putgs_AVOToRange(aVO, addA1Notation(sA1Notation_server, [0,1]));"
  // if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
  oDistinguish = distinguishA1NotationFromWorksheet(sA1Notation, sWorksheetName);
  // the next line of code should be here because of the aforementioned bug with the creation of a new worksheet.
  sWorksheetName = oDistinguish.sWorksheetName;
  // confirm("sWorksheetName = " + sWorksheetName);
  if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
? // alertHTML(JSON.stringify(oDistinguish));
? sA1Notation = oDistinguish.sA1Notation;
? sWorksheetName = oDistinguish.sWorksheetName;

  // if worksheet no existe then create new sheet
? // alertHTML("sWorksheetName name is " + sWorksheetName);
? // {sCell, sWorksheetName} = distinguishA1NotationFromWorksheet(sCell, sWorksheetName);
? // sample usage - ?putgs_AVOToRange([1,2,3], "A2", "UPCs At-A-Glance");
? // sample usage - ?putgs_AVOToRange([[1,2,3],[4,5,6]], "A2", "UPCs At-A-Glance").setFontWeight('bold');
? // sCell = "AR353";
? sColumn = sA1Notation.replace(/[0-9]*$/g, "")
? sRow = sA1Notation.replace(/^[A-Z]*/g, "")

? aArray = normalizeValuesOriented(aArray);
? //var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheetName);
? var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);

? var sGoogleSheetRange = sA1Notation + ":" + columnToLetter((Array.isArray(aArray[0]) ? aArray[0].length + letterToColumn(sColumn) -1 : letterToColumn(sColumn) )) + (aArray.length + parseInt(sRow) - 1);
? // hack when Array is 1 dimmensional, then always preesent it vertically
? if (!Array.isArray(aArray[0])) { ?
? ? aArray = aArray.reduce(function(agg, oElement) {
? ? ? agg.push([oElement]);
? ? ? return agg;
? ? }, []) ?
? }
? try {
? ? var rRange = ss.getRange(sGoogleSheetRange)
? ? return rRange.setValues(aArray).setNumberFormat("@"); // @ = Plain Text. ? ?.setFontWeight('bold');
? } catch (e) {
? ? var rRange = ss.getRange(sA1Notation);
? ? rRange.setValue("ERROR\naArray.length = " + aArray.length + "\n" + "sGoogleSheetRange =" + sGoogleSheetRange + "\ne = " + JSON.stringify(e) );
? }
}

/* gsMULTISHEETSgs */
function getgs_multisheetsToARO() {
? ? ? // function sheetnms() {return SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function(x) {return x.getName();});}
? ? ? var sSpreadsheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().reduce(function(agg000, oElement) {
? ? ? ? ? ?agg000 += "+" + oElement.getName();
? ? ? ? ? ?return agg000;
? ? ? });
? ? ? // alert("only processing sponsorships+pandas+phptest, please manually change this in the MultisheetsToRecordsOriented code..");
?
? ? ? //sToProcessSpreadsheet = "sponsorships+pandas+phptest"
? ? ? // var sToProcessSpreadsheet = SpreadsheetApp.getUi().prompt("Which spreadsheets do you want to merge and generate aRecordsOriented from?\n\n\n" + sSpreadsheets).getResponseText();
? ? ? var sToProcessSpreadsheet = prompt("Which spreadsheets do you want to merge and generate aRecordsOriented from?\n\n\n" + sSpreadsheets);
? ? ? alert(sToProcessSpreadsheet);
? 
? ? ? aRecordsOriented = sToProcessSpreadsheet.split("+").reduce(function(oAg, oEl) {
? ? ? ? ? oAg = oAg.concat(getgs_sheetToARO(oEl));
? ? ? ? ? return oAg;
? ? ? }, []);

? ? ? // normalizeRecordsOriented() may be faster than the hack below
? ? ? aRecordsOriented = toRO(toVO(aRecordsOriented));
? ? ? return aRecordsOriented; // alert("var aALLRecordsOriented = " + JSON.stringify(aRecordsOriented));
}; function alertgs_multisheetsToARO() { alertTextArea(JSON.stringify(getgs_multisheetsToARO())); } 

function getgs_multisheetsToAVO() {
? ? ? var sSpreadsheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().reduce(function(agg000, oElement) {
? ? ? ? ? ?agg000 += "+" + oElement.getName();
? ? ? ? ? ?return agg000;
? ? ? });
? ? ? var sToProcessSpreadsheet = prompt("Which spreadsheets do you want to merge and generate aValuesOriented from?\n\n\n" + sSpreadsheets);
? ? ? aArray = sToProcessSpreadsheet.split("+").reduce(function(agg001, oElement001) {
? ? ? ? ? agg001 = agg001.concat(getWorksheetValuesOriented(oElement001));
? ? ? ? ? return agg001;
? ? ? }, []);

? ? ? alert("var aALLValuesOriented = " + JSON.stringify(aArray));
}; function alertgs_multisheetsToAVO() { alertTextArea(JSON.stringify(getgs_multisheetsToAVO())); }

/* gsUPDATE_REMOVE_GSgs */
/* BEGIN UPDATE/REMOVE FUNCTIONS */
function updategs_clearThisSheet(sSheet) {
  if ((SpreadsheetApp.getActive().getSheetByName(sSheet))) {
    SpreadsheetApp.getActive().getSheetByName(sSheet).getDataRange().clearContent();
  }
}
function updategs_createNewWorksheet(sName) { // rename to insertNewWorksheet? or make insertNewWorksheet the function that errors if worksheet already exists?
? if (sName == undefined) { sName = "NEWSHEET" + getYYYYMMDDHHMMSS(); }
  
  if ((SpreadsheetApp.getActive().getSheetByName(sName))) { // if sheet exists don't try to insertSheet.  Append or clear?
    updategs_clearThisSheet(sName);
  } else {
    // SAMPLE - createNewWorksheet('test' + getYYYYMMDDHHMMSS() )
    SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName(sName);
    SpreadsheetApp.getActive().getSheetByName(sName).getRange("A1:Z26").setNumberFormat("@");  
  }

}
function updategs_selectedWithColor() { ?
? var selection = SpreadsheetApp.getActive().getActiveSheet().getSelection(); var range = selection.getActiveRange();
? var numRows = range.getNumRows();
? var numCols = range.getNumColumns();
? var startRow = range.getRow();
? var startCol = range.getColumn();
? //Logger.log('row: ' + startRow); Logger.log('col: ' + startCol); Logger.log('num row: ' + numRows); Logger.log('num col: ' + numCols);
? // CONSIDER refractoring this to rRange.setValues() (fast?) instead of oCell.setValue() (slow!)
? for (var i = 0; i < numRows; i++) {
? ? for (var j = 0; j < numCols; j++) {
? ? ? //if ((startRow+i == okRow) || (startCol+j == okColumn)){
? ? ? ? //Logger.log('found: ' + i+' '+j);
? ? ? ? // alert(range.getCell(i+1,j+1).getBackground()) ?// .getFontColor() .setFontColor('#ffffff')
? ? ? ? oCell = range.getCell(i+1,j+1)
? ? ? ? oCell.setValue(oCell.getBackground());
? ? ? ? // alert(.getBackground()) ?// .getFontColor() .setFontColor('#ffffff')
? ? ? ? //.setValue('Hello')
? ? ? //}
? ? }
? } 
}

// Remove Empty Rows 
function updategs_removeEmptyRows(sWorksheetName) {
? sWorksheetName = getgs_worksheetname(sWorksheetName);
? var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName); ?
? var maxRows = ss.getMaxRows(); 
? var lastRow = ss.getLastRow();
? if (maxRows-lastRow != 0){
? ? ss.deleteRows(lastRow+1, maxRows-lastRow);
? }
}; function removeEmptyRows(sWorksheetName) { return updategs_removeEmptyRows(sWorksheetName); }
? ?
// Remove Empty Columns 
function updategs_removeEmptyColumns(sWorksheetName) {
? sWorksheetName = getgs_worksheetname(sWorksheetName);
? var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
? var maxColumns = ss.getMaxColumns(); 
? var lastColumn = ss.getLastColumn();
? if (maxColumns-lastColumn != 0){
? ? ss.deleteColumns(lastColumn+1, maxColumns-lastColumn);
? }
}; function removeEmptyColumns(sWorksheetName) { return updategs_removeEmptyColumns(sWorksheetName); }

function updategs_removeEmptyRowsAndCols(sWorksheetName) {
  removeEmptyRows(sWorksheetName);
  removeEmptyColumns(sWorksheetName);
}; function removeEmptyRowsAndCols(sWorksheetName) { return updategs_removeEmptyRowsAndCols(sWorksheetName); }

//Remove All Empty Rows in the Entire Workbook
// from https://stackoverflow.com/questions/18679669/google-script-for-deleting-blank-or-unused-columns
// consider refractoring into removeEmptyRows?
function removeEmptyRowsALLXXX() {
? var ss = SpreadsheetApp.getActive();
? var allsheets = ss.getSheets();
? for (var s in allsheets){
? ? var sheet=allsheets[s]
? ? var maxRows = sheet.getMaxRows(); 
? ? var lastRow = sheet.getLastRow();
? ? if (maxRows-lastRow != 0){
? ? ? sheet.deleteRows(lastRow+1, maxRows-lastRow);
? ? }
? }
}

//Remove All Empty Columns in the Entire Workbook
// from https://stackoverflow.com/questions/18679669/google-script-for-deleting-blank-or-unused-columns
// consider refractoring into removeEmptyColumns?
function removeEmptyColumnsALLXXX() {
? var ss = SpreadsheetApp.getActive();
? var allsheets = ss.getSheets();
? for (var s in allsheets){
? ? var sheet=allsheets[s]
? ? var maxColumns = sheet.getMaxColumns(); 
? ? var lastColumn = sheet.getLastColumn();
? ? if (maxColumns-lastColumn != 0){
? ? ? sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
? ? }
? }
}

function updategs_appendToMultisheets(oDataToSendToGS) {
? Object.keys(oDataToSendToGS).forEach(function(sWorksheet) {
? ? if (!SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sWorksheet)) { SpreadsheetApp.getActiveSpreadsheet().insertSheet(sWorksheet); }
? ? aValuesOriented = oDataToSendToGS[sWorksheet];
? ? sLastRow = "A" + (SpreadsheetApp.getActive().getSheetByName(sWorksheet).getLastRow()+1);
? ? putgs_AVOToRange(aValuesOriented, sLastRow, sWorksheet);
? })
}
/* END UPDATE/REMOVE FUNCTIONS */

/* gsQUIRKYgs */
/* BEGIN QUIRKY GS-FORMULA-ONLY-RELATED FUNCTIONS THAT WILL NEVER BE NEEDED IN DATASCRIPTS/DOMSCRIPTS.JS */
function googlesheetsCustomFormula(aValues, sColumn) {
? ? // aArray = [1224, 1256, "ID"]; copy(googlesheetsCustomFormula(aArray, "A"))
? ? return "=OR(" + aValues.reduce(function(agg0, oElement0, iIndex0) {
? ? ? ? return agg0 + 'REGEXMATCH(TO_TEXT($' + sColumn + ':$' + sColumn + '), "^' + oElement0 + '$")' + ((iIndex0!=aValues.length-1) ? ", " : "" );
? ? }, "") + ")"
}
/* END QUIRKY GS-ONLY FUNCTIONS THAT WILL NEVER BE NEEDED IN DATASCRIPTS/DOMSCRIPTS.JS */

/* gsEXTERNAL_and_SPECIALgs */
// BEGIN SPECIAL FUNCTIONS FROM OTHER DEVS OR FROM MYSELF
// PIVOT, EXPLODE AND MELT are googlesheets extensions of datascripts because I declared those functions differently that are inaccessible from formulas
// interesting that I can make it capitalized or not
// eg function EXPLODE () {} vs explode = function () {}
function PIVOT(data, sPivotInstructions, bReplaceColumnNames) {
  // AOT - =ArrayFormula(query(query({sort(QC_BACKEND!A3:B),if(len(QC_BACKEND!A3:A),row(QC_BACKEND!A3:A)-match(sort(QC_BACKEND!A3:A),sort(QC_BACKEND!A3:A),0),)},"Select Col1, max(Col2) where Col1 is not null group by Col1 Pivot Col3"),"Select * offset 1",0))
  // How to Aggregate Strings Using Query in Google Sheets https://infoinspired.com/google-docs/spreadsheet/aggregate-strings-using-query/
  return pivottable(data, sPivotInstructions, bReplaceColumnNames);  
}
function EXPLODE(data, sColumns, sDelimiter) {
  if (sDelimiter) {} else { sDelimiter = "," }
  return explode(data, sColumns, sDelimiter);
}
function EXPLODEH(data, sRows, sDelimiter) {
  if (sDelimiter) {} else { sDelimiter = "," }
  data = transpose(data);
  return transpose(((explode(data, sRows, sDelimiter))));
}
function MELT(data, sColumns) {
  return melt(data, sColumns);
}

// ES5 incompatible function REMOVEEMPTYROWS(data) { try { return data.filter(element => element.join("") != ""); } catch(e) { return data; } }
function _REMOVEEMPTYROWS(data) {
  return _removeemptyrows(data);
  //try { return data.filter(function(o) { return o.join("") != ""; }) } catch(e) { return data; }
}
/**
 * Join two tables using lodash-joins.js library functions
 *
 * @param {A1:D30} table A
 * @param {E1:J20} table B
 * @param {matching (multi-)column(s)} eg "id", "id;internalid", "first name,last name;First,Last", "first name,last name;fullname
 * @param {type} the name of the lodash-joins function, eg "hashInnerJoin", "hashFullOuterJoin", innerjoin" 
 * @param {"distance"[,...]} titleValue The title of pivot table values. Default "value".
 * @return The unpivoted table
 * @customfunction
 */
function _JOIN(a,b,match,type,merger) { return _join(a,b,match,type,merger); }

/*
function _JOIN(a, b, match, type, merger) {
  // _.assign({}, leftRow, rightRow);
  // merger = (a: Row, b: Row): Row => assign({}, a, b)
  // aLodashJoinsFormula = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"],["h_outer","hashFullOuterJoin"],["h_inner","hashInnerJoin"],["h_leftouter","hashLeftOuterJoin"],["h_leftsemi","hashLeftSemiJoin"],["h_leftanti","hashLeftAntiJoin"],["h_rightouter","hashRightOuterJoin"],["h_rightsemi","hashRightSemiJoin"],["h_rightanti","hashRightAntiJoin"],["nl_outer","nestedLoopFullOuterJoin"],["nl_inner","nestedLoopInnerJoin"],["nl_leftouter","nestedLoopLeftOuterJoin"],["nl_leftsemi","nestedLoopLeftSemiJoin"],["nl_leftanti","nestedLoopLeftAntiJoin"],["nl_rightouter","nestedLoopRightOuterJoin"],["nl_rightsemi","nestedLoopRightSemiJoin"],["nl_rightanti","nestedLoopRightAntiJoin"],["sm_outer","sortedMergeFullOuterJoin"],["sm_inner","sortedMergeInnerJoin"],["sm_leftouter","sortedMergeLeftOuterJoin"],["sm_leftsemi","sortedMergeLeftSemiJoin"],["sm_leftanti","sortedMergeLeftAntiJoin"],["sm_rightouter","sortedMergeRightOuterJoin"],["sm_rightsemi","sortedMergeRightSemiJoin"],["sm_rightanti","sortedMergeRightAntiJoin"]]);
  aLodashJoinsFormula = toRO([["type","lodashJoins_formula"],["outer","hashFullOuterJoin"],["inner","hashInnerJoin"],["leftouter","hashLeftOuterJoin"],["leftsemi","hashLeftSemiJoin"],["leftanti","hashLeftAntiJoin"],["rightouter","hashRightOuterJoin"],["rightsemi","hashRightSemiJoin"],["rightanti","hashRightAntiJoin"]]);
  if (type) { type = type.toLowerCase(); } else { type = 'inner'; }; type = type.replace(/^\_\./, "").replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");
  // if (type) {} else { type = '_.hashInnerJoin'; }; type = type.replace(/^\_\./, "");
  // es5 incompatible sType = findKey(aLodashJoinsFormula, "type", type)?.lodashJoins_formula;
  sType = (findKey(aLodashJoinsFormula, "type", type).lodashJoins_formula ? findKey(aLodashJoinsFormula, "type", type).lodashJoins_formula : undefined);
  if (sType) {} else { sType = '_.hashInnerJoin'; }; // sType = sType.replace(/^\_\./, "") // .replace(/hash/g, "").replace(/nestedloop/g, "").replace(/sortedmerge/g, "");;
  // type = sType;
  
  if (merger) {} else { merger = function(obj, leftRow, rightRow) { _.assign({}, leftRow, rightRow); } }
  // _.assign({}, leftRow, rightRow
  if (match.match(/\;/g)) { // ";" semicolon at the simplest level ("first;firstname") is a SINGLE column match where the column has different keys/columnnames between table A and table B 
    var match_a = match.split(";")[0];
    var match_b = match.split(";")[1];
  } else {
    var match_a = match;
    var match_b = match;
  }
  // a = REMOVEEMPTYROWS(a); b = REMOVEEMPTYROWS(b);
  if (isVO(a)) { a = toRO(_REMOVEEMPTYROWS(a)); } else { a = toRO(_REMOVEEMPTYROWS(toVO(a))); } // consider refactoring REMOVEEMPTYROWS to check for isVO?
  if (isVO(b)) { b = toRO(_REMOVEEMPTYROWS(b)); } else { b = toRO(_REMOVEEMPTYROWS(toVO(b))); }
  //if (typeof(match) == 'string') { 
  accessor_a = function (o) { // "," comma at the simplest level ("firstname,lastname;fullname") is a MULTI column match where the columns are concatenated in order to perform the match with a column (or multi columns) between table A and table B
    // return o[match_a];
    // es5 incompatible return match_a.split(",").map(o2=>o[o2]).join("-");
    return match_a.split(",").map(function(o2) { return o[o2]; }).join("-");
  } 
  accessor_b = function (o) {
    // return o[match_b];
    // es5 incompatible return match_b.split(",").map(o2=>o[o2]).join("-");
    return match_b.split(",").map(function(o2) { return o[o2]; }).join("-");
  }  
  //}
  sEv = `toVO(_.${sType}(a, accessor_a, b, accessor_b) )`;
  return eval(sEv);
  //return JSON.stringify(b);
  // return toVO(_.hashInnerJoin(a, accessor, b, accessor));
}
*/

function TOVO(data, aColumns) {
  data = eval(data);
  return toVO(data, aColumns);
}
function TOVOS(data, aColumns) {
  data = eval(data);
  return JSON.stringify(toVO(data, aColumns));
}
function TORO(data) {
  if (Array.isArray(data)) { } else { data = JSON.parse(eval(data)); } 
  return JSON.stringify(toRO(data));
}
// unpivot comes from here
// https://www.benlcollins.com/spreadsheets/unpivot-in-google-sheets/
// https://gist.github.com/philippchistyakov/57390ec98dcaea4502fabc5a32242b3a
/**
 * Unpivot a pivot table of any size.
 *
 * @param {A1:D30} data The pivot table.
 * @param {1} fixColumns Number of columns, after which pivoted values begin. Default 1.
 * @param {1} fixRows Number of rows (1 or 2), after which pivoted values begin. Default 1.
 * @param {"city"} titlePivot The title of horizontal pivot values. Default "column".
 * @param {"distance"[,...]} titleValue The title of pivot table values. Default "value".
 * @return The unpivoted table
 * @customfunction
 */
 function UNPIVOT(data,fixColumns,fixRows,titlePivot,titleValue) {  
  var fixColumns = fixColumns || 1; // how many columns are fixed
  var fixRows = fixRows || 1; // how many rows are fixed
  var titlePivot = titlePivot || 'column';
  var titleValue = titleValue || 'value';
  var ret=[],i,j,row,uniqueCols=1;
  
  // we handle only 2 dimension arrays
  if (!Array.isArray(data) || data.length < fixRows || !Array.isArray(data[0]) || data[0].length < fixColumns)
    throw new Error('no data');
  // we handle max 2 fixed rows
  if (fixRows > 2)
    throw new Error('max 2 fixed rows are allowed');
  
  // fill empty cells in the first row with value set last in previous columns (for 2 fixed rows)
  var tmp = '';
  for (j=0;j<data[0].length;j++)
    if (data[0][j] != '') 
      tmp = data[0][j];
    else
      data[0][j] = tmp;
  
  // for 2 fixed rows calculate unique column number
  if (fixRows == 2)
  {
    uniqueCols = 0;
    tmp = {};
    for (j=fixColumns;j<data[1].length;j++)
      if (typeof tmp[ data[1][j] ] == 'undefined')
      {
        tmp[ data[1][j] ] = 1;
        uniqueCols++;
      }
  }
  
  // return first row: fix column titles + pivoted values column title + values column title(s)
  row = [];
    for (j=0;j<fixColumns;j++) row.push(fixRows == 2 ? data[0][j]||data[1][j] : data[0][j]); // for 2 fixed rows we try to find the title in row 1 and row 2
    for (j=3;j<arguments.length;j++) row.push(arguments[j]);
  ret.push(row);
    
  // processing rows (skipping the fixed columns, then dedicating a new row for each pivoted value)
  for (i=fixRows;i<data.length && data[i].length > 0;i++)
  {
    // skip totally empty or only whitespace containing rows
    if (data[i].join('').replace(/\s+/g,'').length == 0 ) continue;
    
    // unpivot the row
    row = [];
    for (j=0;j<fixColumns && j<data[i].length;j++)
      row.push(data[i][j]);
    for (j=fixColumns;j<data[i].length;j+=uniqueCols)
      ret.push( 
        row.concat([data[0][j]]) // the first row title value
        .concat(data[i].slice(j,j+uniqueCols)) // pivoted values
      );
  }

  return ret;
}
// END EXTERNAL FUNCTIONS FROM OTHER DEVS


/* unfiled */
/* ?googlesheets.gs! - where AVOs, AROs, OSRs, and HTMLifications reign supreme!

// BEGIN SAMPLE CUSTOMIZED MENU
function onOpen() {
? render_datascripts_menu();
? ?SpreadsheetApp.getUi()
? ? ? .createMenu('Custom Menu')
? ? ? .addItem('Custom Menu 1', 'custommenu1')
? ? ? .addItem('Custom Menu 2', 'custommenu2')
? ? ? .addSeparator()
? ? ? .addItem('Custom Menu 3', 'custommenu3')
? ? ? .addSeparator()
? ? ? .addSeparator() ? ? 
? ? ? .addSeparator() ? ? 
? ? ? .addSubMenu(SpreadsheetApp.getUi()
? ? ? ? ?.createMenu('Custom Submenu')
? ? ? ? ?.addItem('Custom Submenu 1', 'customsubmenu1')
? ? ? ?)
? ? ? .addToUi(); ? ? ? 
}
// END SAMPLE CUSTOMIZED MENU - https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js

// QUESTIONS
// diff between SpreadsheetApp.getActiveSheet() & SpreadsheetApp.getActiveSpreadsheet()?
// diff between getMaxRow and getLastRow?
*/ 



function forEachRangeCell(range, f) {
// from https://stackoverflow.com/questions/13605213/iterate-over-range-append-string-to-each
  const numRows = range.getNumRows();
  const numCols = range.getNumColumns();

  for (let i = 1; i <= numCols; i++) {
    for (let j = 1; j <= numRows; j++) {
      const cell = range.getCell(j, i)
      f(cell)
    }
  }
}
function GETCOLOR(oCell) {
  return typeof(oCell) // .getA1Notation();
  // return oCell.getBackground();
  // getCell(row, column);
}
function alertgs_slashnToslashslashn() {
  confirm(getgs_selectedToAVO()[0][0].replace(/\\n/g, "\\\\n"));

}
function alertgs_sizeOfCell() {
  confirm("This cell has a size of " + getgs_selectedToAVO()[0][0].length);
}
function getSelectedCellToJspreadsheet() { alertgs_CQPifiedSolutionIsland("Jspreadsheet"); }
function getSelectedCellsToJSON() {  alertgs_CQPifiedSolutionIsland("Selected Cells -> JSONify"); }
function getSelectedCellsToMergely() {  alertgs_CQPifiedSolutionIsland("mergely.js diff checker"); }
function getSelectedCellToBeautifier() {  alertgs_CQPifiedSolutionIsland("beautify.js and excel-formula.js"); }
function getSelectedCellToCodeMirror() {  alertgs_CQPifiedSolutionIsland("codeMirror"); }


  /* // "old" getSelectedCellsToJSON() solution.  get rid of it or keep it as a copy?  
  aVO = [
    ["label", "body", "head", "onload", "server-globalvars", "server", "script", "library"],
    ["Selected Cells -> JSONify", "<div style=\"font-family:Tangerine, serif; font-size:50px;\">Selected Cells -> JSONify</div>", "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Tangerine\">", "// filler", "aAbsoluteFirstRow\naAbsoluteAbsoluteFirstRow\noSR\nsFirstColumn\nsLastColumn", "  aFirstRowWhichIsActuallySecondRow = getgs_selectionTo2DArrayA1Notation()[0]\n  sFirstColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[0]);\n  var sLastColumn = cellToColumn(aFirstRowWhichIsActuallySecondRow[aFirstRowWhichIsActuallySecondRow.length-1]);\n  sAbsoluteFirstColumnRange = `${sFirstColumn}1:${sLastColumn}1`;\n  aAbsoluteAbsoluteFirstRow = GSDS_disjointedRangeToArray(`${sFirstColumn}1:${sLastColumn}1`);\n  aAbsoluteFirstRow = SpreadsheetApp.getActiveSpreadsheet().getRange(sAbsoluteFirstColumnRange).getValues()[0];\n\n  // 10/18 - replaced aReminingRows with aVO_server;\n  // aRemainingRows = getgs_rangeToAVO(SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange());\n  // aRemainingRows = aVO_server;\n  // [aAbsoluteFirstRow].concat(aRemainingRows);\n\n  aSelection = getgs_selectionTo1DArray().map(oEl => superencode(oEl));;\n  // confirm(JSON.stringify(aAbsoluteFirstRow));\n\n\n  // toast(JSON.stringify(aSelection));\n\n  if (confirm(\"Load performance-heavy oSR?\")) {\n     oSR = getgs_selectedToOSR()\n  } else {\n     oSR = {};\n     //oSR = getgs_selectedToOSR(true);\n  }\n\n", "// sConcatenated_w_linebreak\n\nfunction populateTextArea() {\n  var aResult; var sHint = \"\";\n  if ($$$$(\"#none\").checked) {\n    $$$$(\"#includehint\").disabled = true;\n  } else {\n    $$$$(\"#includehint\").disabled = false;\n  }    \n  aRemainingRows = aVO_server;\n  aResult = aRemainingRows;\n\n  if ($$$$(\"#includeabsolutefirstrow\").checked) {\n      aResult = [aAbsoluteFirstRow].concat(aResult);\n  } else { }\n\n  if ($$$$(\"#includeletterrow\").checked) {\n      aResult = [aAbsoluteAbsoluteFirstRow].concat(aResult);\n  } else { }\n\n\n\n    \n  sVariable = $$$$(\"input[name=jsontype]:checked\").id;\n    \n  oJSONifyInstructionsTranslations_encodeEntireStructure_preeval = toXXXOrientated(toRecordsOriented([\n    [\"sVariable\",\"pre_eval\"],\n    [\"sConcatenated\",\"aResult = aResult.map(o=>o.join(\\\"\\\")).join(\\\"\\\");\"],\n    [\"sConcatenated_w_linebreak\",\"aResult = aResult.map(o=>o.join(\\\"\\\\n\\\")).join(\\\"\\\\n\\\");\"],\n    [\"aRO\",\"aResult = JSON.stringify(toRecordsOriented(aResult))\"],\n    [\"aVO\",\"aResult = JSON.stringify((aResult))\"],\n    [\"oSR\",\"aResult = oSR;\"],\n]), \"sVariable\");\n\n  oJSONifyInstructionsTranslations_encodeIndividualCells_preeval = toXXXOrientated(toRecordsOriented([\n     [\"sVariable\",\"pre_eval\"],\n     [\"sConcatenated\",\"aResult = [[aResult.map(o=>o.join(\\\"\\\")).join(\\\"\\\")]];\"],\n     [\"sConcatenated_w_linebreak\",\"aResult = [[aResult.map(o=>o.join(\\\"\\\\n\\\")).join(\\\"\\\\n\\\")]];\\n\"],\n     [\"aRO\",\"console.log(\\\"do nada\\\");\"],\n     [\"aVO\",\"console.log(\\\"do nada\\\");\"],\n     [\"oSR\",\"aResult = oSR;\"],\n]), \"sVariable\");\n    \n  if ($$$$(\"#encodeEntireStructure\").checked) { // ENCODE ENTIRE STRUCTURE (NOT INDIVIDUAL CELLS)\n\n    eval(oJSONifyInstructionsTranslations_encodeEntireStructure_preeval[sVariable][\"pre_eval\"]);\n        \n    if ($$$$(\"#superencoded\").checked) {\n      aResult = superencode(aResult);\n      if ($$$$(\"#includehint\").checked) {\n        sHint = `\\n\\nJSON.parse(decodeURIComponent(${sVariable}))`;\n      }\n    }\n    if ($$$$(\"#superhtmlentities\").checked) {\n      aResult = superhtmlEntities(aResult);\n      if ($$$$(\"#includehint\").checked) {\n        sHint = `\\n\\nJSON.parse(superHtmlDecode(${sVariable}))`;\n      }\n    } \n    if ($$$$(\"#cryptojs\").checked) {\n      sPassword = $$$$(\"#password\").value;\n      // sHackToGetPastCircularReferenceError = JSON.parse(JSON.stringify(aResult.toString()));\n      aResult = CryptoJS.AES.encrypt(aResult, sPassword).toString();\n      // CryptoJS.AES.decrypt(sEncrypted, \"password\").toString(CryptoJS.enc.Utf8)\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"aVO\" || sVariable == \"aRO\") {\n            sHint = `\\n\\nJSON.parse(CryptoJS.AES.decrypt(${sVariable}, \"${sPassword}\").toString(CryptoJS.enc.Utf8));`;\n        } else if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\nCryptoJS.AES.decrypt(${sVariable}, \"${sPassword}\").toString(CryptoJS.enc.Utf8);`;\n        }\n      }\n    }     \n    if ($$$$(\"#base64\").checked) {\n      aResult = btoa(aResult);\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"aVO\" || sVariable == \"aRO\") {\n            sHint = `\\n\\nJSON.parse(atob(${sVariable}))`;\n        } else if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\natob(${sVariable})`;                   \n        }\n      }\n    } \n    if ($$$$(\"#LZString\").checked) {\n      aResult = LZString.compressToUTF16(aResult);\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"sVO\" || sVariable == \"sRO\") {\n            sHint = `\\n\\nJSON.parse(LZString.decompress(${sVariable}))`;\n        } else if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\nLZString.decompress(${sVariable})`;\n        }\n      }\n    } \n\n  } else { // ENCODE INDIVIDUAL CELLS (NOT ENTIRE STRUCTURE)\n    \n    eval(oJSONifyInstructionsTranslations_encodeIndividualCells_preeval[sVariable][\"pre_eval\"]);\n      \n    if ($$$$(\"#superencoded\").checked) {\n      aResult = aResult.map(o=>{return o.map(o2=>{ return superencode(o2.toString()); }) })\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\ndecodeURIComponent(${sVariable}[0][0]);`;\n        } else if (sVariable == \"aVO\") {\n            sHint = `\\n\\naVO.map((o,i)=> { return o.map((o2,i2) => { return decodeURIComponent(o2); }) });`;\n        } else if (sVariable == \"aRO\") {\n            sHint = `\\n\\nntoRecordsOriented(toValuesOriented(aRO).map((o,i)=> { return o.map((o2,i2) => { return decodeURIComponent(o2); }) }) );`;\n        }\n      }\n    }    \n    if ($$$$(\"#superhtmlentities\").checked) {\n      aResult = aResult.map(o=>{return o.map(o2=>{ return superhtmlEntities(o2.toString()); }) })\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\superHtmlDecode(${sVariable}[0][0]);`;\n        } else if (sVariable == \"aVO\") {\n            sHint = `\\n\\naVO.map((o,i)=> { return o.map((o2,i2) => { return superHtmlDecode(o2); }) });`;\n        } else if (sVariable == \"aRO\") {\n            sHint = `\\n\\ntoRecordsOriented(toValuesOriented(aRO).map((o,i)=> { return o.map((o2,i2) => { return superHtmlDecode(o2); }) }) );`;\n        }   \n      }\n    } \n    if ($$$$(\"#cryptojs\").checked) {\n      sPassword = $$$$(\"#password\").value;\n      aResult = aResult.map(o=>{return o.map(o2=>{\n        return CryptoJS.AES.encrypt(o2.toString(), sPassword).toString();\n      }) });\n      if ($$$$(\"#includehint\").checked) {\n        \n        // CryptoJS.AES.decrypt(sConcatenated[0][0], \"password\").toString(CryptoJS.enc.Utf8)\n        if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\nCryptoJS.AES.decrypt(${sVariable}[0][0], \"${sPassword}\").toString(CryptoJS.enc.Utf8)`\n        } else if (sVariable == \"aVO\") {\n            sHint = `\\n\\n${sVariable}.map(o=>{ return o.map(o2=>{ return CryptoJS.AES.decrypt(o2, \"${sPassword}\").toString(CryptoJS.enc.Utf8) }) });`\n        } else if (sVariable == \"aRO\") {\n            sHint = \"\\n\\n\" + decodeURIComponent(\"aRO.map(o%3D%3E%7B%20return%20_.assign(...(%20Object.keys(o).map(o2%3D%3E%7B%0A%20%20%20%20oReturn%20%3D%20%7B%7D%3B%0A%20%20%20%20sKey%20%3D%20CryptoJS.AES.decrypt(o2%2C%20%22AES.encrypt%22).toString(CryptoJS.enc.Utf8).toString()%3B%0A%20%20%20%20oReturn%5BsKey%5D%20%3D%20CryptoJS.AES.decrypt(o%5Bo2%5D%2C%20%22AES.encrypt%22).toString(CryptoJS.enc.Utf8).toString()%3B%0A%20%20%20%20return%20oReturn%3B%0A%7D)%20)%20)%20%7D)%3B\");\n        } else {\n            alert(\"error - need to program for more scenarios??\");\n        }\n      }\n    }\n    if ($$$$(\"#base64\").checked) {\n      aResult = aResult.map(o=>{return o.map(o2=>{ return btoa(o2.toString()); }) })\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\natob(sConcatenated_w_linebreak[0][0])`;\n        } else if (sVariable == \"aVO\") {\n            sHint = `\\n\\naVO.map((o,i)=> { return o.map((o2,i2) => { return atob(o2); }) });`;\n        } else if (sVariable == \"aRO\") {\n            sHint = `\\n\\ntoRecordsOriented(toValuesOriented(aRO).map((o,i)=> { return o.map((o2,i2) => { return atob(o2); }) }) );`;\n        }   \n      }\n    } \n    if ($$$$(\"#LZString\").checked) {\n      aResult = aResult.map(o=>{return o.map(o2=>{ return LZString.compressToUTF16(o2.toString()); }) })\n      if ($$$$(\"#includehint\").checked) {\n        if (sVariable == \"sConcatenated\" || sVariable == \"sConcatenated_w_linebreak\") {\n            sHint = `\\n\\naLZString.decompress(sConcatenated_w_linebreak[0][0])`;\n        } else if (sVariable == \"aVO\") {\n            sHint = `\\n\\naVO.map((o,i)=> { return o.map((o2,i2) => { return LZString.decompress(o2); }) });`;\n        } else if (sVariable == \"aRO\") {\n            sHint = `\\n\\ntoRecordsOriented(toValuesOriented(aRO).map((o,i)=> { return o.map((o2,i2) => { return LZString.decompress(o2); }) }) );`;\n        }   \n      }\n    } \n      \n    if ($$$$(\"#aRO\").checked) {\n        aResult = toRecordsOriented(aResult);\n    } else { }\n    \n  }\n\n  $$$$(\"#sResult\").value = sVariable + \" = \" + JSON.stringify(aResult) + \";\\n\\n\" + sHint;\n}\n\n\n", "https://manueldelanda.github.io/datascripts.js\nhttps://manueldelanda.github.io/domscripts.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.8.8/beautify.js\n\nhttps://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js\nhttps://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js\nhttps://cdnjs.cloudflare.com/ajax/libs/openpgp/4.10.10/openpgp.min.js\nhttps://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.js"],
    ["", "<style>\n<!-- table id=\"jsontable\" -->\n\n#jsontable {\n   width: 100% !important;\n}\n</style><table id=\"jsontable\"><tr><td style='background-color:#ffdfbf; color:#000000; height:18px; width:200px; ' colspan=2 rowspan=1><br />\n  <p>select json type:</p>\n  <input type=\"radio\" id=\"sConcatenated\" name=\"jsontype\" value=\"sConcatenated\"><label for=\"sConcatenated\">?</label>\n  <input type=\"radio\" id=\"sConcatenated_w_linebreak\" name=\"jsontype\" value=\"sConcatenated_w_linebreak\"><label for=\"sConcatenated_w_linebreak\">? w linebreak</label>\n<br />\n<br />\n<br />\n  <input type=\"radio\" id=\"aRO\" name=\"jsontype\" value=\"aRO\"><label for=\"aRO\">aRO</label>\n  <input type=\"radio\" id=\"aVO\" name=\"jsontype\" value=\"aVO\" checked><label for=\"aVO\">aVO</label>\n<br />\n<br />\n  <input type=\"radio\" id=\"oSR\" name=\"jsontype\" value=\"oSR\"><label for=\"oSR\">oSR</label>\n</td><td style='background-color:#ffdfbf; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1><div style=\"font-size:6px\">RADIO BUTTONS NOT YET IMPLEMENTED:\n<br />\n\n<br />\n  <input disabled type=\"radio\" id=\"table\" name=\"jsontype\" value=\"table\"><label for=\"table\">html &lt;table&gt;-ify</label>\n  <input disabled type=\"radio\" id=\"aRO\" name=\"jsontype\" value=\"aRO\"><label for=\"aRO\">aRO</label>\n<br />\n<br />\n  <input disabled type=\"radio\" id=\"pddf\" name=\"jsontype\" value=\"pddf\"><label for=\"pddf\">pd df</label>\n  <input disabled type=\"radio\" id=\"pickle\" name=\"jsontype\" value=\"pickle\"><label for=\"pickle\">pickle</label>\n</div></td><td style='background-color:#ffdfbf; color:#000000; height:18px; width:400px; ' colspan=4 rowspan=1><br />\n<input id=\"includeletterrow\" type=\"checkbox\">\n<label for=\"includeletterrow\" style=\"font-size:12px\">include letter column title</label>\n<br />  \n<input id=\"includeabsolutefirstrow\" type=\"checkbox\">\n<label for=\"includeabsolutefirstrow\" style=\"font-size:12px\">include worksheet's absolute first row as this data type's first row?</label>\n<br />  \n<br />  </td></tr><tr><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>&nbsp;&nbsp;&nbsp;</td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#b7b7b7; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td></tr><tr><td style='background-color:#fce5cd; color:#000000; height:18px; width:200px; ' colspan=2 rowspan=1>  <p>structuraliation: <input id=\"encodeEntireStructure\" type=\"checkbox\"><label for=\"encodeEntireStructure\" style=\"font-size:8px\">encode entire structure?</label></p>  </td><td style='background-color:#fce5cd; color:#000000; height:18px; width:500px; ' colspan=5 rowspan=1><p>&nbsp;&nbsp;&nbsp;<input id=\"includehint\" type=\"checkbox\" checked><label for=\"includehint\" style=\"font-size:12px\">include hint to decode?</label></p></td></tr><tr><td style='background-color:#fce5cd; color:#000000; height:18px; width:200px; ' colspan=2 rowspan=1>  <input type=\"radio\" id=\"none\" name=\"encoding\" value=\"none\" checked><label for=\"none\">none</label></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"superencoded\" name=\"encoding\" value=\"superencoded\"><label for=\"superencoded\">superencoded</label></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"superhtmlentities\" name=\"encoding\" value=\"superhtmlentities\"><label for=\"superhtmlentities\">superhtmlentities</label>\n</td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"cryptojs\" name=\"encoding\" value=\"cryptojs\"><label for=\"cryptojs\">cryptojs</label>\n<br />\n<input id=\"password\" value=\"AES.encrypt\"><br />\n<!-- <input id=\"password\" value=\"password\"><br /> --></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"base64\" name=\"encoding\" value=\"base64\"><label for=\"base64\">base64 / btoa</label>\n   <br /></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"LZString\" name=\"encoding\" value=\"LZString\"><label for=\"LZString\">LZString</label>\n   <br /></td></tr><tr><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"pgp\" name=\"encoding\" value=\"pgp\"><label for=\"pgp\">pgp</label></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1>  <input type=\"radio\" id=\"jsencrypt\" name=\"encoding\" value=\"jsencrypt\"><label for=\"jsencrypt\">jsencrypt</label></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td><td style='background-color:#fce5cd; color:#000000; height:18px; width:100px; ' colspan=1 rowspan=1></td></tr></table>", "", "populateTextArea();\n\ndocument.querySelectorAll(\"input\").forEach(input => \n  // input.addEventListener(\"click\", () => populateTextArea() ) // with click I learned that encrypt can have multiple encryptions for the same password\n  // input.addEventListener(\"change\", () => populateTextArea() ) // with change i noticed this too\n  input.addEventListener(\"input\", () => populateTextArea() ) // with input fortunately I don't see the encryption changing all the time but I may forget this important information about encryption being able to map back to multiple decryptions\n)", "", "", "function beautify() {\n    $$$$(\"#sResult\").value = js_beautify($$$$(\"#sResult\").value.split(\"\\n\").join(\"\"), {\n        'indent_size': 1,\n        'indent_char': '  ',\n    });\n}", ""],
    ["", "<!-- filler -->", "", "", "", "", "", ""],
    ["", "<button onclick=\"beautify();\">beautify</button><br />\n<textarea id=\"sResult\" style=\"width:100%; height:275px\"></textarea>", "", "", "", "", "", ""]
  ];

  sHTMLCode = CQPify(toRecordsOriented(aVO));
  alertHTML(sHTMLCode, undefined, "JSON GS integration");
  */
  

//function alertgs_integration_MergelyDiffGSio() { alertgs_HTMLifiedSolution("Mergely Diff - GS.io"); } 
//function alertgs_integration_JSBeautifierGSio() { alertgs_HTMLifiedSolution("JS Beautifier GS.io"); } 
//function alertgs_integration_codeMirrorGSio() { alertgs_HTMLifiedSolution("codeMirror GS.io"); } 
//function alertgs_integration_PythonInterpreter() { alertgs_HTMLifiedSolution("Python Interpreter"); } 
//function alertgs_integration_phpparsertranspilerexecuter() { alertgs_HTMLifiedSolution("php parser/transpiler/executer"); } 
//function alertgs_integration_D3FUNCTIONS() { alertgs_HTMLifiedSolution("D3 FUNCTIONS!"); } 


function getgs_sanitizeRange(rRange) { // this converts a sRange to an rRange
  ((!(rRange)) ? rRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange() : "" );
  if (typeof(rRange) == "string") {
    if (rRange.match(/!/)) {       
       var { sA1Notation, sWorksheetName } = distinguishA1NotationFromWorksheet(rRange);
       rRange = SpreadsheetApp.getActive().getRange(sWorksheetName + "!" + sA1Notation);
    } else {
       if (rRange.match(/\:/)) {
         sWorksheetName = getgs_worksheetname();
         rRange = SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getRange(rRange)
       } else {
         rRange = getgs_worksheetNameToFullRange(rRange);       
       }
    }
  } 
  return rRange;
}
function getgs_worksheetname(sWorksheetName) { if (sWorksheetName == "" || sWorksheetName == undefined || sWorksheetName == null) { var sWorksheetName = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName(); }; return sWorksheetName; }
function getgs_worksheetName(sWorksheetName) { return getgs_worksheetname(sWorksheetName); }






function alertCheatSheet() {
? alertTextArea(`
? ? ? ? ? ? ? ? =ADDRESS(ROW(), COLUMN(), 4) // get current cell's A1Notation address
`)
}



function getgs_sheetName() {
? return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}

function encodeCellValue(sString){
? // SAMPLE USAGE sString = "pull C40 googlesheet cell CDD40 into variable"; encodeNotes(sString);
? // SAMPLE USAGE2 sString = "C40"; encodeNotes(sString);
? //STEP 1: EXTRACT CELL FROM STRING USING REGEX
? var re = /[A-Z]+[0-9]+/;
? var sCell = re.exec(sString)[0];

? //if (re.exec(sString) == null) { // if no match then assume the string is the name of the cell
? // ?var sCell = sString;
? //} else { // else there's a match, then pull from that matching cell
? // ?var sCell = re.exec(sString)[0];
? //}
? //STEP 2: GET CELL VALUE
? // SpreadsheetApp.getActiveSheet().getRange("A1").getValue()
? var sCellValue = SpreadsheetApp.getActiveSheet().getRange(sCell).getValue().trim();
? // superencode vs googlesheet's ENCODEURL - seems like ENCODEURL actually encodes apostrophe!
? return superencode(sCellValue);
}

function getFirstEmptyRow(ss) {
? // Gets first empty row in first column (alternative to SpreadsheetApp.getActiveSpreadsheet().getLastColumn(), which gets first empty row in amongst all columns
? // var spr = SpreadsheetApp.getActiveSpreadsheet();
? var column = ss.getRange('A:A');
? var values = column.getValues(); // get all data in one call
? var ct = 0;
? while ( values[ct][0] != "" ) {
? ? ct++;
? }
? return (ct);
}

function findTheLastRow(sSpreadsheet, sColumn, sFromStartingRow){
? // findTheLastRow("Men Rankings", "B", "5") ?VS findTheLastRow("Men Rankings", "B");
? var ss = SpreadsheetApp.getActive().getSheetByName(sSpreadsheet);
? // https://stackoverflow.com/questions/44562592/google-script-get-last-row-of-specific-column
? if (sFromStartingRow == undefined) { sFromStartingRow = "1"; }
? var ui = SpreadsheetApp.getUi();
? // var ss = SpreadsheetApp.getActiveSpreadsheet();
? //var sheet = ss.getActiveSheet();
? // var range = sheet.getRange("B1:B").getValues();
? var range = ss.getRange(sColumn + sFromStartingRow + ":" + sColumn).getValues();
? var filtered_r = range.filter(String).length;
? iLastRow = filtered_r + parseInt(sFromStartingRow) - 1;
? return iLastRow;
? // alert("Column " + sColumn + "'s last cell is number: " + iLastRow + " and its value is: " + range[filtered_r - 1][0]);
}

function getgs_worksheetNameToFullRange(sWorksheetName) {
? sWorksheetName = getgs_worksheetname(sWorksheetName);
? // var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
? // return ss.getRange("A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow());
? return SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getRange("A1:" + columnToLetter(SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getLastColumn()) + SpreadsheetApp.getActive().getSheetByName(sWorksheetName).getLastRow());
}

function rangeToArray(rRange) { // vs getgs_1DArray or whatever-the-fk?
?return rRange.getValues().flat();
}

distinguishA1NotationFromWorksheet = function(sA1Notation, sWorksheetName) {
  try {
    sWorksheetName = getgs_worksheetname(sWorksheetName);
  
    if (sA1Notation.match(/!/)) {
      sWorksheetName = sA1Notation.match("(^.*)(!)")[1]; // vs sA1Notation.split("!")[0];
      sA1Notation = sA1Notation.match("(!)(.*$)")[2];
    }
  
    var ss = SpreadsheetApp.getActive().getSheetByName(sWorksheetName);
    var sLastColumn = columnToLetter(ss.getLastColumn()); var iLastRow = ss.getLastRow();
    if (sA1Notation.match(/:$/)) { // eg "F1:" -> "F1:last column last row"
        sA1Notation = sA1Notation.replace(/:$/, ":" + sLastColumn + iLastRow);
      // ss.getlastrow and getlastcolumn //columnToLetter(ss.getLastColumn()) + ss.getLastRow()
    }
    if (sA1Notation.match(/(^|,)([0-9])(.*)/g)) { // eg "1:F3" -> "A1:F3"
        sA1Notation = sA1Notation.replace(/(^|,)([0-9])(.*)/g, "$1A$2$3");
    }
    if (sA1Notation.match(/(^.*:)([0-9])/g)) { // eg "B2:3"
        sA1Notation = sA1Notation.replace(/(^.*:)([0-9])/g, "$1" + sLastColumn + "$2");
    }
    sLastCell = sLastColumn + iLastRow.toString()
    return {sA1Notation, sWorksheetName, sLastCell};
   } catch(e) { confirm("ERROR in distinguishA1NotationFromWorksheet() - perhaps sheet doesnt exist? " + e) } //   if ((SpreadsheetApp.getActive().getSheetByName(sWorksheetName))) { } else { updategs_createNewWorksheet(sWorksheetName); }
}

/* unfiled2 */
function getgs_sheetToAVO(sWorksheetName) {
? sWorksheetName = getgs_worksheetname(sWorksheetName);
? // activeRange = getgs_worksheetNameToFullRange(sWorksheetName);
? aValuesOriented = getgs_rangeToAVO(getgs_worksheetNameToFullRange(sWorksheetName));
? return aValuesOriented;
}; function alertgs_sheetToARO() { alertTextArea("var aRO = " + JSON.stringify(getgs_sheetToAVO()) + ";\n"); }

function getgs_sheetToARO(sWorksheetName) {
? sWorksheetName = getgs_worksheetName(sWorksheetName)
? return toRO(getgs_sheetToAVO(sWorksheetName));
? // vs ?return getgs_rangeToARO(getgs_worksheetNameToFullRange(sWorksheetName));
}; function alertgs_sheetToARO() { alertTextArea("var aRO = " + JSON.stringify(getgs_sheetToARO()) + ";\n"); }

// function getgs_activeSheetToAVO() {
//   getgs_A1NotationToAVO()
// }; 
function alertgs_activeSheetToAVO() {
? alertTextArea(JSON.stringify(getgs_A1NotationToAVO()), undefined, "alertgs_activeSheetToAVO()");
}
function getgs_A1NotationToAVO(sA1Notation) {
  var {sA1Notation, sWorksheetName} = distinguishA1NotationFromWorksheet(sA1Notation);
  activeRange = SpreadsheetApp.getActive().getRange(sWorksheetName + "!" + sA1Notation);
? //if (sA1Notation) {
? //? activeRange = SpreadsheetApp.getActive().getRange(sA1Notation);
? //} else {
? //? activeRange = SpreadsheetApp.getActive().getRange("A1:" + columnToLetter(SpreadsheetApp.getActive().getLastColumn()) + SpreadsheetApp.getActive().getLastRow());
? //}
? return getgs_rangeToAVO(activeRange);
? // var ss = ; SpreadsheetApp.getActive()// .getSheetByName('Netsuite Items');
}
getgs_quickAndDirtyLookup = function(sA1NotationColumnOnly, sString) {
  // quick and dirty lookup uses the sA1NotationColumnOnly (always column "A") as the index column to match the sString on 
? sTable = sA1NotationColumnOnly.split("!")[0]
? sColumn = sA1NotationColumnOnly.split("!")[1];
? sA1Notation = sA1NotationColumnOnly + "1:" + sColumn;
? // sA1Notation = sA1NotationColumnOnly + "27:"; // switched all solutions to only look at webapp!A27: to assist with performance; also removed + sColumn because "A27:A" doesn't mean anything
? // getgs_quickAndDirtyLookup("html!A", "jexcel");
? // aVO = getgs_A1NotationToAVO("html!A1:A")
? // rMatch = new RegExp("jexcel");
? aVO = getgs_A1NotationToAVO(sA1Notation);
  // confirm(aVO.length);
? rMatch = new RegExp(sString);
? return sA1NotationColumnOnly + aVO.reduce((o, e, i) => { ?( (o==-1) && e[0].toString().match(rMatch) ? o=i+1 : "" ); return o; ? ? ? ?}, -1).toString();
}


/* BEGIN oSmartRange functions */
// function getSelectedCellsToHTMLSteroidsNOIDS() {
// ?//  getSelectedCellsToHTMLSteroids("noIDs");
//}

function getgs_selectedToHTMLTableWHeaderFooter () {
? // getSelectedCellsToHTMLSteroids("", "headerfooter");
? sHTML = convertOSRToHTMLTable(getgs_selectedToOSR(false), "headerfooter" != "headerfooter");
? alertHTML("<br />" + sHTML + "<br /><br />" + "<textarea style='width:100%; height:250px'>" + superhtmlEntities(sHTML) + "</textarea>");
}
function getgs_selectedToOSR(bSimple) { // getgs_selectedToOSR-britn vs getSelectedCellsToHTMLSteroids-britn, convertOSRToHTMLTable
? // getActiveSheetToOSmartRange() 
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? // sActiveRange = "A1:" + columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
? var firstCell= SpreadsheetApp.getActiveSheet().getActiveSelection().getCell(1,1);
? // sFirstCell = columnToLetter(firstCell.getColumn()) + firstCell.getRow();
? sFirstCell = columnToLetter(rSelectedRange.getCell(1,1).getColumn()) + rSelectedRange.getCell(1,1).getRow();
? sLastCell = columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
? sActiveRange = sFirstCell + ":" + sLastCell;
? //return firstCell;
? // alert( sActiveRange );
? oSmartRange = getgs_rangeToOSR(sActiveRange, bSimple);
? return oSmartRange; // alertTextArea("var oSmartRange = " + JSON.stringify(oSmartRange)); ?
}; function alertgs_selectedToOSR() { alertTextArea("var oSmartRange = " + JSON.stringify(getgs_selectedToOSR())); }

function getgs_rangeToOSR(sRange, bSimple) { // MAIN SMARTRANGE, getgs_rangeToOSR vs getSelectedCellsToHTMLSteroids?
? var aArray = [];
? var oSmartRange = {};
? if (typeof(sRange) == "string") {
? ? var aRange = getGoogleSheetRangeValuesOriented(sRange); // vs getGoogleSheetRangeValuesOriented vs getgs_rangeToAVO?  the former is a datascripts.js script! maybe rename it to getgs_A1NotationToAVO?
? ? var rRange = SpreadsheetApp.getActive().getRange(sRange);
? } else { var rRange = sRange; }
// function forEachRangeCell(range, f) {
? const numRows = rRange.getNumRows();
? const numCols = rRange.getNumColumns();

? // var bIncludeColumnWidthAndRowHeight = confirm("Include cells' column width and row height (performance problem)?");
? // var bIncludeMergedProperties = confirm("Include cells' merged properties? (also performance problem)?");
? var bIncludeColumnWidthAndRowHeight = true; // !(bSimple);
? var bIncludeMergedProperties = true; // !(bSimple);

? for (var i = 1; i <= numCols; i++) {
? ? for (var j = 1; j <= numRows; j++) {
? ? ? const cell = rRange.getCell(j, i);
? ? ? var sCellKey = aRange[j-1][i-1]; // eg "A1"
? ? ? var oObject = {};
? ? ? oObject[sCellKey] = cell;
? ? ? aArray.push( oObject );
? ? ? 
? ? ? if (bIncludeColumnWidthAndRowHeight) {
? ? ? ? iGetColumnWidth = SpreadsheetApp.getActiveSpreadsheet().getColumnWidth(cell.getColumnIndex());
? ? ? ? iGetRowHeight = SpreadsheetApp.getActiveSpreadsheet().getRowHeight(cell.getRowIndex());
? ? ? } else {
? ? ? ? iGetColumnWidth = 100;
? ? ? ? iGetRowHeight = 24;
? ? ? }
? ? ? 
? ? ? //sCellsAddress = 
? ? ? sFirstCell = columnToLetter(cell.getCell(1,1).getColumn()) + cell.getCell(1,1).getRow();
? ? ? //sLastCell = columnToLetter(rSelectedRange.getLastColumn()) + rSelectedRange.getLastRow();
? ? ? //sActiveRange = sFirstCell + ":" + sLastCell;
? ? ? var bIsPartOfMerge = false;
      //if (!bSimple) {
      bIsPartOfMerge = cell.isPartOfMerge();
      if (bIsPartOfMerge) {
        var sGetMergedRanges = cell.getMergedRanges()[0].getA1Notation();
        iColspan = cell.getMergedRanges()[0].getWidth();
        iRowspan = cell.getMergedRanges()[0].getHeight();
      } else {
        var iColspan = 1;
        var iRowspan = 1;
      }
      //}
? ? ? oSmartRange[sCellKey] = {
? ? ? ? gscell: cell, // gscell object
? ? ? ? // cells: columnToLetter(i) + j, // removed because it assumes "A1" is first cell; should be the same as sCellKey; consider refractoring merged cells into this solution
? ? ? ? note: cell.getNote(),
? ? ? ? comment: cell.getComment(),
? ? ? ? value: cell.getValue(),
? ? ? ? formula: cell.getFormula(),
? ? ? ? "background-color": ( !bSimple ? cell.getBackground() : "white"),
? ? ? ? "font-color": ( !bSimple ? cell.getFontColor() : "black"),
? ? ? ? isPartOfMerge: (bIsPartOfMerge ? sGetMergedRanges : false),
? ? ? ? // cells: sFirstCell, // should be the same as sCellKey; consider refractoring merged cells into this solution
? ? ? ? cells: (bIsPartOfMerge ? getGoogleSheetRange(sGetMergedRanges).join(";") : sFirstCell), // getGoogleSheetRange("H48:H51").join(";"),
? ? ? ? // getMergedRanges: sGetMergedRanges, ?
? ? ? ? getColumnWidth: iGetColumnWidth,
? ? ? ? getRowHeight: iGetRowHeight,
? ? ? ? colspan: iColspan,
? ? ? ? rowspan: iRowspan,
? ? ? }; 
? ? }
? }
? 
? oSmartRange.allcells = unique(Object.keys(oSmartRange).reduce(function(agg, oElement) {
? ? return agg.concat(oElement).concat(oSmartRange[oElement].cells.split(";") );
? },[])).sort(sortAlphaNum);
? 
? // add width, height and valuesoriented final values to the oSmartRange object
? sRange = oSmartRange.allcells[0] + ":" + oSmartRange.allcells[oSmartRange.allcells.length-1];
? var iHeight = getgs_rangeHeight(sRange); // 1; // getgs_rangeHeight(sRange) // britney - do gsds math instead?
? var iWidth = getgs_rangeWidth(sRange); // 1; // getgs_rangeWidth(sRange)
? oSmartRange.height = iHeight;
? oSmartRange.width = iWidth;
? oSmartRange.range = sRange;
? oSmartRange.allcells_valuesoriented = getRange3(1, iHeight).map(function(oEl) {
? ? return getRange3(1, iWidth).map(function(oEl2) {
? ? ? return oSmartRange.allcells[iHeight * oEl2 - iHeight + oEl - 1];
? ? })
? }); ?

? return oSmartRange;
}; function alertgs_sheetToOSR(sWorksheetName) {
? // var ss = SpreadsheetApp.getActive(); // .getSheetByName('Netsuite Items');
? sWorksheetName = getgs_worksheetname(sWorksheetName); ?
? sActiveRange = "A1:" + columnToLetter(ss.getLastColumn()) + ss.getLastRow();
? oSmartRange = getgs_rangeToOSR(sActiveRange);
? alertTextArea("var oSmartRange = " + JSON.stringify(oSmartRange));
}


/*
function getSelectedCellsToHTMLSteroids(bOption, sHeaderFooter) { // getgs_selectedToOSR-britn vs getSelectedCellsToHTMLSteroids-britn
? var sStyle = "";
? var sFooter = "";
? var sGSWorksheet = ""; // sGSWorksheet is the name of the "worksheet" (aka table id in html)
? bOption = confirm("IDs on each <td> or no IDs? ");
? // bOption = (bOption == "no");
? ? 
? if (sHeaderFooter != "headerfooter") {
? ? if (!bOption) { sGSWorksheet = prompt("Please enter a worksheet name:"); ?} else { sGSWorksheet = ""; } 
? } else { sGSWorksheet = ""; }
? // bOption = (bOption == "noIDs");
? // sStyle = prompt("please enter styletag:");
? // bOption = "headerfooter";
? // alert(sGSWorksheet);
? var rSelectedRange = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange();
? var oSmartRange = getgs_rangeToOSR(rSelectedRange.getA1Notation());
? oSmartRange = shiftCellsInSmartRange(oSmartRange, "A1");
? sHTML = convertOSRToHTMLTable(oSmartRange, (sHeaderFooter == "headerfooter") );
? alertHTML("<br />" + sHTML + "<br /><br />" + "<textarea style='width:100%; height:250px'>" + superhtmlEntities(sHTML) + "</textarea>");
? // "<textarea style='width:100%; height:250px;'>" + sString + "</textarea>"
}
*/

function shiftCellsInSmartRange(oSmartRange, sCellStarter) {
? // perform shift towards A1
? aCellShift = subtractCells(oSmartRange.allcells[0], sCellStarter)
? ooSmartRange = JSON.parse(JSON.stringify(oSmartRange))
? ooSmartRange.allcells = oSmartRange.allcells.map(function(oElement) {
? ? return convertArrayToCell(subtractCells(oElement, aCellShift))
? })
? Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
? ? oSmartRange[oElement000].cells = oSmartRange[oElement000].cells.split(";").map(function(oElement) { return convertArrayToCell(subtractCells(oElement, aCellShift)) }).join(";")
? })
? 
? Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
? ? delete ooSmartRange[oElement000];
? })
? 
? Object.keys(oSmartRange).filter(function(oElement00) { return oElement00.match(/[A-Z]+[0-9]+/) }).forEach(function(oElement000) {
? ? ooSmartRange[convertArrayToCell(subtractCells(oElement000, aCellShift))] = oSmartRange[oElement000];
? ? // delete ooSmartRange[oElement000];
? })
? 
? sRange = ooSmartRange.allcells[0] + ":" + ooSmartRange.allcells[ooSmartRange.allcells.length-1];
? var iHeight = getgs_rangeHeight(sRange)
? var iWidth = getgs_rangeWidth(sRange)
? ooSmartRange.heigth = iHeight;
? ooSmartRange.width = iWidth;
? ooSmartRange.range = sRange;
? ooSmartRange.allcells_valuesoriented = getRange3(1, iHeight).map(function(oEl) {
? ? return getRange3(1, iWidth).map(function(oEl2) {
? ? ? return ooSmartRange.allcells[iHeight * oEl2 - iHeight + oEl - 1];
? ? })
? }); ?
? return ooSmartRange;
}

function convertOSRToHTMLTable(oSR, bHeaderFooter) {
? var sTableID = ""; var sHeader = ""; var sFooter = "";
  // confirm(JSON.stringify(oSR));
  sHeader += oSR.allcells_valuesoriented[0].map(function(oEl) { return oSR[oEl].comment; }).join("");
  sFooter += oSR.allcells_valuesoriented[oSR.allcells_valuesoriented.length-1].map(function(oEl) { return oSR[oEl].comment; }).join("");
    
  if (bHeaderFooter) {
? ? sHeader += oSR.allcells_valuesoriented[0].map(function(oEl) { return oSR[oEl].value; }).join("");
? ? sFooter += oSR.allcells_valuesoriented[oSR.allcells_valuesoriented.length-1].map(function(oEl) { return oSR[oEl].value; }).join("");
? ? aIterable = oSR.allcells_valuesoriented.slice(1,oSR.allcells_valuesoriented.length-1);
? 
? } else { aIterable = oSR.allcells_valuesoriented; }
  
  if (sHeader.match(/(id=)(\")?([a-zA-Z]*)/)) { // look for <!-- id="whatever" or id=whatever --> string in style tag
    sTableID = sHeader.match(/(id=)(\")?([a-zA-Z]*)/)[3]; // .replace(/[\W_]+/g," ")?
  } else {} 
  
? sHTML = sHeader + `<table id="${sTableID}">` + aIterable.map(function(oEl, iIn) {
? ? return "<tr>" + oEl.map(function(oEl2) { // oEl2 = sCellAddress
? ? ? if (oSR[oEl2].cells.indexOf(oEl2) == 0) { // if "J2".indexOf("J2;J3;J4") == 0
? ? ? ? iColspan = oSR[oEl2].colspan;
? ? ? ? iRowspan = oSR[oEl2].rowspan;
? ? ? ? sStyle='background-color:' + oSR[oEl2]["background-color"] + '; ';
? ? ? ? sStyle+='color:' + oSR[oEl2]["font-color"] + '; ';
? ? ? ? sStyle+='height:' + iRowspan * parseInt(oSR[oEl2]["getRowHeight"]) + 'px; ';
? ? ? ? sStyle+='width:' + iColspan * parseInt(oSR[oEl2]["getColumnWidth"]) + 'px; ';
? ? ? ? return "<td style='" + sStyle + "' colspan=" + iColspan + " rowspan=" + iRowspan + ">" + oSR[oEl2].value + "</td>";
? ? ? } else {
? ? ? ? return "";
? ? ? }
? ? }).join("") + "</tr>";
? }).join("") + "</table>" + sFooter
? 
? return sHTML.replace(/ id\=\"\"/g, ""); // replace blank ids just in case!
}
/* END oSmartRange functions */

function GS_returnOuterRange(sCell) { // this returns the range that contains surrounding cells with data in them ? ?
? ? // refactor this quickhack for tables!cell
? ? sWorksheetName = "";
? ? // confirm(sCell);
? ? if (sCell.match(/\!/)) { sWorksheetName = sCell.split("!")[0] + ""; sCell = sCell.split("!")[1] }
? ? sWorksheetName = getgs_worksheetname(sWorksheetName);
? ? // confirm(sTable);
? ? iRow = convertCellToArray(sCell)[1];
? ? iRowUpper = iRow; iRowLower = iRow;
? ? do {
? ? ? ?iRowLower = iRowLower-1;
? ? ? ?aArray = getgs_rangeToAVO(sWorksheetName + `!A${iRowLower}:${iRowLower}`);
? ? } while ( aArray[0].filter(e => (e.toString().trim() != "") ).length != 0 )

? ? do {
? ? ? ?iRowUpper = iRowUpper+1;
? ? ? ?aArray = getgs_rangeToAVO(sWorksheetName + `!A${iRowUpper}:${iRowUpper}`);
? ? ? ?// toast(iRowUpper);
? ? } while ( aArray[0].filter(e => (e.toString().trim() != "") ).length != 0 )
? ? // confirm(`wat A${iRowLower+1}:${iRowUpper-1}`);
? ? return `A${iRowLower+1}:${iRowUpper-1}`
}

