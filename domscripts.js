// domBASICscripts => domscripts.serverUNsafe and ES5_UNsafe
try { // domscripts.serverUNsafe and ES5_UNsafe
  /* BEGIN - THESE FUNCTIONS SHOULD NEVER BE ADDED TO datascripts.js? */
  // REFACTORING NOTES:
  // make GSDS_disjointedRangeToArray es5 safe (I don't think Array.flat() is a function in es5?)
  // bring googlesheets.convertOSRToHTMLTable() into domscripts (since toHTMLTable() is dependent on it?)?  then figure out how to bring domscripts functions into cajamotora backend without the NaN popup? Or it doesn't matter because domscripts.serversafe is minified into googlesheets' datascripts.js??
  // vanilla-fy the jQuery() functions (eg $) out of this domscripts.js solution
  // replace Array.prototype.slice.call and Array.from with $$$a?
  // DONE - refactor: create $$$a(el) (which is the equivalent of Array.prototype.call($$$(el)) )?
  // DONE - refactor: convertRecordsOrientedArrayToHTMLTable(), convertValuesOrientedToHTMLTable(), convertRecordsOrientedArrayToExcelXML(), convertaRecordsOrientedToInputBoxesForm(), oHTMLSelect() into DATASCRIPTS
  // DONE - GSDS_disjointedRangeToAVO(), GSDS_disjointedRangeToArray(), Into datahtmlscripts.js?
  // cellToColumn("C10") vs columnToLetter(convertCellToArray("C10")[0])?
  // function consolelog(sReturn) {   setTimeout (console.log.bind(console, sReturn)); }
  // function dumpCSSText(element){ var s = ''; var o = getComputedStyle(element); for(var i = 0; i < o.length; i++){ s+=o[i] + ':' + o.getPropertyValue(o[i])+';'; } return s; }

    // BEGIN useful vanilla dom scripts - consider refactoring out the overloading prototypes?
    
    // BEGIN VANILLA-FIED JQUERY
    // var $$$ = document.querySelectorAll.bind(document);
    function $$$(el) { if (typeof(el) == "string") { return document.querySelectorAll(el) } else { return el; } ; };    
    function $$$a(el) { return Array.prototype.slice.call($$$(el)); };    
    // var $$$$ = document.querySelector.bind(document);
    function $$$$(el) { if (typeof(el) == "string") { return document.querySelector(el) } else { return el; } ; };    

    // HTMLElement.prototype.$$$ = function (element) { return this.querySelectorAll(element); }; 
    HTMLElement.prototype.$$$ = function (element) { if (typeof(element) == "string") { return this.querySelectorAll(element) } else { return element; } ; };
    HTMLElement.prototype.$$$a = function (element) { return Array.prototype.slice.call(this.querySelectorAll(element)); }; 
    // HTMLElement.prototype.$$$$ = function (element) { return this.querySelector(element); }; 
    HTMLElement.prototype.$$$$ = function (element) { if (typeof(element) == "string") { return this.querySelector(element) } else { return element; } ; };
    // END VANILLA-FIED JQUERY
  
    domRemoveNode = function(domEl) { domEl.parentNode.removeChild(domEl); }
    domRemoveChildren = function(domEl) { Array.from(domEl.children).forEach(function(oEl) { domEl.removeChild(oEl); }) }
    domTableAssumed = function(domTable) { ((domTable) ? "" : domTable = $$$$("table")); ((typeof(domTable) == "string") ? domTable = $$$(domTable)[0] : ""); return domTable; }
    domTableToValuesOrientedTDs = function(domTable) { domTable = domTableAssumed(domTable); return Array.prototype.slice.call((domTable).$$$("tr")).map(function(oElement) { return Array.prototype.slice.call(oElement.$$$("th,td")); }) }
    domTableToValuesOrientedDomTDs = domTableToValuesOrientedTDs;

    // 3 SCRIPTS - INJECT STYLES AND SCRIPTS (TO DEPRECATE) 
    domAppendToHead = function(s){ $$$('head')[0].append(s); }
    domAppendStyle = function(e){const t=document.createElement("style");t.textContent=e,document.head.append(t)}; addStyle = domAppendStyle;
    domLoadScripts = function(e,n){!function t(){var a,o,c;0!=e.length?(a=e.shift(),o=t,(c=document.createElement("script")).src=a,c.onload=c.onreadystatechange=function(){c.onreadystatechange=c.onload=null,o()},(document.getElementsByTagName("head")[0]||document.body).appendChild(c)):n&&n()}()}
    // 4 SCRIPTS - INJECT STYLES AND SCRIPTS (TO REFACTOR INTO EVERYTHING)
    // these two <style>-related functions nudged me to refactor domLoadScripts into domLoadScripts_Link and domLoadScripts_Script, where the latter is actual script code
    domLoadStyles_CSS = function(aCSS){ // creates <style> tags
        // eg domLoadStyles_CSS("* {font-size: 4px}")
        // eg domLoadStyles_CSS(["* {font-size: 4px}", "* {color: red; }"])
        // function addcss(css){
        if (Array.isArray(aCSS)) {} else { aCSS = [aCSS]; } 
        aCSS.forEach(function(css) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            if (s.styleSheet) {   // IE
            s.styleSheet.cssText = css;
            } else {                // the world
            s.appendChild(document.createTextNode(css));
            }
            head.appendChild(s);
        })
    }
    domLoadStyles_Link = function(aLinks){ // creates <link> tags
        // eg domLoadStyles_Link("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css")
        // eg domLoadStyles_Link(["https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"])
        // `<link rel="stylesheet" href="${e}" type="text/css" />`
        // function addcss(css){
        if (Array.isArray(aLinks)) {} else { aLinks = [aLinks]; }
        aLinks.forEach(function(sLink) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('link');
            s.setAttribute('rel', 'stylesheet');
            s.setAttribute('type', 'text/css');
            s.setAttribute('href', sLink);
            head.appendChild(s);
        })
    }
    // these two were refactored from domLoadScripts
    domLoadScripts_SCRIPT = function(aScripts){ // injects <script> tags
        // eg domLoadScripts_SCRIPT("var sGlobal = 'blah';")
        // eg domLoadScripts_SCRIPT(["var sGlobal1 = 'global 1';", "var sGlobal2 = 'global 2';"])
        if (Array.isArray(aScripts)) {} else { aScripts = [aScripts]; } 
        aScripts.forEach(function(sScript) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            s.appendChild(document.createTextNode(sScript));
            head.appendChild(s);                 
        })
    }
    domLoadScripts_Link = function (aLinks){ // creates <script src='whatever.js'> tags
        // eg domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js")
        // eg domLoadScripts_Link(["https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js", "https://code.jquery.com/jquery-3.6.0.min.js"])
        // `<link rel="stylesheet" href="${e}" type="text/css" />`
        // function addcss(css){
        if (Array.isArray(aLinks)) {} else { aLinks = [aLinks]; }
        aLinks.forEach(function(sLink) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            s.setAttribute('src', sLink.trim());
            head.appendChild(s);
        })
    }
    /* // this is already minified in domscripts "3 SCRIPTS" section above, so don't run it
    domLoadScripts = function(e, n) {
        ! function t() {
            var a, o, c;
            0 != e.length ? (a = e.shift(), o = t, (c = document.createElement("script")).src = a, c.onload = c.onreadystatechange = function() {
                c.onreadystatechange = c.onload = null, o()
            }, (document.getElementsByTagName("head")[0] || document.body).appendChild(c)) : n && n()
        }()
    }
    */

    function domReplaceDom(oEl, oEl2) { // simplifies .replaceChild()
        // domReplaceDom($$$("table")[0], '<div id="my_dataviz">test!</div>');
        if (typeof(oEl) == "string") {
            oEl = $$$(oEl)[0];
        }
        if (typeof(oEl2) == "string") {
            var oElTemp = document.createElement("div");
            oElTemp.innerHTML = oEl2;
            oEl2 = oElTemp;
        }
        // oEl.parentElement.appendChild(oEl2);
        // oEl.parentElement.replaceChild(oEl, oEl2);
        document.body.insertBefore(oEl2, oEl)
        document.body.removeChild(oEl);
    }


    domTableToValuesOriented = function(domTable) { return domTableToValuesOrientedDomTDs(domTable).map(function(oEl) { return oEl.map(function(oEl2) { return domGetTDTextOrValue(oEl2); }) }) }
    convertHTMLTableToValuesOriented = domTableToValuesOriented;    
    
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
    HTMLElement.prototype.insertAfterDOM = function (newNode) {
        if (typeof(newNode)=="string") {
            var div = document.createElement('div');
            div.innerHTML = newNode;
            newNode = div;
        }
        this.parentNode.insertBefore(newNode, this.nextSibling);
    };

    HTMLElement.prototype.insertBeforeDOM = function (newNode) {
        if (typeof(newNode)=="string") {
            var div = document.createElement('div');
            div.innerHTML = newNode;
            newNode = div;
        }
        this.parentNode.insertBefore(newNode, this);
    };
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
  
    /* refactored this on 7/16/2021 in favor of
    convertHTMLTableToValuesOriented = function(sHTMLTable) {
        // convertHTMLTableToValuesOriented(".convertValuesOrientedToHTMLTable");
        // sHTMLTable = ".convertValuesOrientedToHTMLTable";
        return Array.prototype.slice.call($(sHTMLTable)[0].querySelectorAll("tr")).map(function(oElement) {
            return Array.prototype.slice.call(oElement.querySelectorAll("th, td")).map(function(oElement0) {
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
    
    function getAnimateCSSAnimations() {
        return "bounce\nflash\npulse\nrubberBand\nshakeX\nshakeY\nheadShake\nswing\ntada\nwobble\njello\nheartBeat\nbackInDown\nbackInLeft\nbackInRight\nbackInUp\nbackOutDown\nbackOutLeft\nbackOutRight\nbackOutUp\nbounceIn\nbounceInDown\nbounceInLeft\nbounceInRight\nbounceInUp\nbounceOut\nbounceOutDown\nbounceOutLeft\nbounceOutRight\nbounceOutUp\nfadeIn\nfadeInDown\nfadeInDownBig\nfadeInLeft\nfadeInLeftBig\nfadeInRight\nfadeInRightBig\nfadeInUp\nfadeInUpBig\nfadeInTopLeft\nfadeInTopRight\nfadeInBottomLeft\nfadeInBottomRight\nfadeOut\nfadeOutDown\nfadeOutDownBig\nfadeOutLeft\nfadeOutLeftBig\nfadeOutRight\nfadeOutRightBig\nfadeOutUp\nfadeOutUpBig\nfadeOutTopLeft\nfadeOutTopRight\nfadeOutBottomRight\nfadeOutBottomLeft\nflip\nflipInX\nflipInY\nflipOutX\nflipOutY\nlightSpeedInRight\nlightSpeedInLeft\nlightSpeedOutRight\nlightSpeedOutLeft\nrotateIn\nrotateInDownLeft\nrotateInDownRight\nrotateInUpLeft\nrotateInUpRight\nrotateOut\nrotateOutDownLeft\nrotateOutDownRight\nrotateOutUpLeft\nrotateOutUpRight\nhinge\njackInTheBox\nrollIn\nrollOut\nzoomIn\nzoomInDown\nzoomInLeft\nzoomInRight\nzoomInUp\nzoomOut\nzoomOutDown\nzoomOutLeft\nzoomOutRight\nzoomOutUp\nslideInDown\nslideInLeft\nslideInRight\nslideInUp\nslideOutDown\nslideOutLeft\nslideOutRight\nslideOutUp".split("\n");

    }
    
    function toggleAnimationVisbDisp(o,sVHvsDN,animation,i) {
        // sVHvsDN is sVisibilityHiddenVsDisplayNone
        if (sVHvsDN == "none") {
            sVHvsDN = "displaynone";
        } else {
            sVHvsDN = "displayhidden";
        }
        if (o) {} else { o="*"; }
        if (i) {} else { i=0; }
        if (animation) {

        } else {
            sInAnimation = getRandomArrayToken(getAnimateCSSAnimationsMatch("In"));
            sOutAnimation = getRandomArrayToken(getAnimateCSSAnimationsMatch("Out"));
        }
        if ($$$$(o).style.visibility == "hidden" || $$$$(o).style.display == "none") {

            $$$animate(o, sInAnimation, i, "display");

        } else {
            $$$animate(o, sOutAnimation, i, sVHvsDN)
        }

    }
    
    function getAnimateCSSAnimationsMatch(s) { return getAnimateCSSAnimations().filter(o=>o.match(new RegExp(s, "g"))); }
    getRandomArrayToken = function(a,i) { // consider refactoring this into datascripts.js?  make es5-friendly
        if (i) {} else (i = 1);
        if (i==1) {
            return a[getRandomInt(0,a.length-1)];
        } else {
            return getRange(0, i-1).map(o=>{ return a[getRandomInt(0,a.length-1)]; });
        }
    }      
    var animateCSS = (element, animation, prefix = 'animate__') =>
      // We create a Promise and return it
      new Promise((resolve, reject) => {
        if (animation) {} else { animation = "bounce"; }
        if (animation=="random") {
          // animation = getAnimateCSSAnimations()[getRandomInt(0,96)];
          animation = getRandomArrayToken(getAnimateCSSAnimations());
          console.log(animation);
        }
        const animationName = `${prefix}${animation}`;

        if (typeof(element) == "string") { var node = document.querySelector(element); } else { var node = element; }

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
          event.stopPropagation();
          node.classList.remove(`${prefix}animated`, animationName);
          // resolve('Animation ended');
          resolve(event.target);
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
      });      

      function $$$animate(el,animation,idelay, fFunction1, fFunction2) {
          // fFunction1=fFunction_beforeAnimation, fFunction2=fFunction2_afterAnimation
          // fFunction = function(o) { o.style.display=""; }
          if (animation) {} else { animation = "random"; }
          if (el) {} else { el = "*"; }
          if (idelay != undefined) {} else { idelay = 10; }
          fNada = function(o) {};
          oAnimateFunctions = {
              "display": { "fFunction1": function(o) { o.style.display=""; o.style.visibility="visible" }, "fFunction2": function(o) { o.style.display=""; o.style.visibility="visible" } },
              "displaynone": { "fFunction1": fNada, "fFunction2": function(o) { o.style.display="none"; } },
              "displayhidden": { "fFunction1": fNada, "fFunction2": function(o) { o.style.visibility="hidden"; } },

              "displaynonedisplay": { "fFunction1": fNada, "fFunction2": fNada, },
              "displayhiddendisplay": { "fFunction1": fNada, "fFunction2": fNada, },
              "displaydisplaynone": { "fFunction1": fNada, "fFunction2": fNada, },
              "displaydisplayhidden": { "fFunction1": fNada, "fFunction2": fNada, },

              // "displaynonedisplay": function(o) { o.style.display="none"; setTimeout(() => { o.style.display=""; ; o.style.visibility=""; }, idelay) },
              // "displayhiddendisplay": function(o) { o.style.visibility="hidden"; setTimeout(() => { o.style.visibility=""; }, idelay) } ,
              // "displaydisplaynone": function(o) { o.style.display=""; o.style.visibility=""; setTimeout(() => { o.style.display="none"; }, idelay) },
              // "displaydisplayhidden": function(o) { o.style.display=""; o.style.visibility=""; setTimeout(() => { o.style.visibility="hidden"; }, idelay) },
              "": function(o) {},
          }

          if (typeof(fFunction1)=="string") {
              if (oAnimateFunctions[fFunction1]) {} else { fFunction1 = ""; }
              fFunction2 = oAnimateFunctions[fFunction1]["fFunction2"];
              fFunction1 = oAnimateFunctions[fFunction1]["fFunction1"];
          } else {};

          if (fFunction1) {} else { fFunction1 = fNada; }
          if (fFunction2) {} else { fFunction2 = fNada; }
          $$$a(el).forEach((o,i)=>{
              setTimeout(() => {
                  fFunction1(o)
                  animateCSS(o,animation).then(o=>fFunction2(o)); // o.addEventListener('animationend', () => {
              }, i*idelay);
          });
      }; function $$$a_animate(el,animation,idelay,fFunction1,fFunction2) { return $$$animate(el,animation,idelay,fFunction1,fFunction2); };
      
    // END animate.css scripts

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

} catch(e) { console.log("ERROR in domscripts.js " - e) }

// domGSDSscripts => NEW googlesheets scripts
// GSDS_CELL, GSDS_RANGE1D, GSDS_RANGE2D, GSDS_CELL_value, GSDS_CELL_valueParseInt, GSDS_RANGE1D_values, GSDS_RANGE2D_values
// GSDS_getOSR, GSDS_distinguishDomTableAndA1Notation, GSDS_domReplaceAsterisksInA1Notation, GSDS_inputifyTDRANGE, GSDS_eval, GSDS_domTDToA1Notation, GSDS_evalifyTDRANGE
// domGetTDTextOrValue, domGetTDTextOrValueParseInt, domSetTDTextOrValue
// domscriptsSTEROIDS.js
// try {
    GSDS_CELL = function(domTable, sA1Notation) { return GSDS_RANGE1D(domTable, sA1Notation)[0]; }
    GSDS_RANGE1D = function(domTable, sA1Notation) { return GSDS_disjointedRangeToAVOdomTDs(domTable, sA1Notation).flat().filter(function(oEl) { return oEl }); }
    GSDS_RANGE2D = function(domTable, sA1Notation) { return GSDS_disjointedRangeToAVOdomTDs(domTable, sA1Notation); }

    GSDS_CELL_value = function (domTable, sA1Notation) { return domGetTDTextOrValue(GSDS_CELL(domTable, sA1Notation)); }
    GSDS_CELL_valueParseInt = function (domTable, sA1Notation) { return domGetTDTextOrValueParseInt(GSDS_CELL(domTable, sA1Notation)); }

    GSDS_RANGE1D_values = function (domTable, sA1Notation) { return GSDS_RANGE1D(domTable, sA1Notation).map(function(oEl) { return domGetTDTextOrValue(oEl) }); }
    GSDS_RANGE2D_values = function (domTable, sA1Notation) { return GSDS_RANGE2D(domTable, sA1Notation).map(function(oEl) { return oEl.map(function(oEl2) { return domGetTDTextOrValue(oEl2) }) }) }

    GSDS_GSDSifyTDRANGE = function(domTable, sA1Notation, sElementType, sAttributes, fOptionsFunction, sFormula) {
        GSDS_inputifyTDRANGE(domTable, sA1Notation, sElementType, sAttributes, fOptionsFunction);
        GSDS_evalifyTDRANGE(domTable, sA1Notation, sFormula);
    }
    GSDS_disjointedRangeToAVOdomTDs = function(domTable, sA1Notation) { // this function IS FOR DOM-ONLY.
      var oDomTableAndA1Notation=GSDS_distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];
      // console.log(sA1Notation);
      if (domTable.oSmartRange == undefined) {
        GSDS_setOSR(domTable);
      }
      // sA1Notation = GSDS_domReplaceAsterisksInA1Notation(domTable, sA1Notation);
      var aCellsFromRange = GSDS_disjointedRangeToAVO(sA1Notation).flat();
      // console.log(sA1Notation);
      return domTable.oSmartRange.allcells_valuesoriented.map(function(oEl) {
        return oEl.map(function(oEl2) {
          return ((aCellsFromRange.indexOf(oEl2) > -1) ? domTable.oSmartRange[oEl2].tdcell : null );
        })
      })
    }

    GSDS_distinguishDomTableAndA1Notation = function(domTable, sA1Notation) {
        // GSDS_distinguishDomTableAndA1Notation($$$('table'), "A1:*") vs GSDS_distinguishDomTableAndA1Notation("table!A1:A*")
        if (domTable.nodeName == "TD") {
            sA1Notation = GSDS_domTDToA1Notation(domTable);
            domTable = domTable.closest("table");
        }
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
        sA1Notation = GSDS_domReplaceAsterisksInA1Notation(domTable, sRange);
        // domTable.oSmartRange.sA1Notation should be used to replace asterisks
        return { "domTable": domTable, "sA1Notation": sA1Notation }
    }

    GSDS_domReplaceAsterisksInA1Notation = function(domTable, sA1Notation) {
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
        var oDomTableAndA1Notation=GSDS_distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];  
        var domTableAVO = Array.from(domTable.$$$("tr")).map(oEl => Array.from(oEl.$$$("th,td")) );
        // sA1Notation = GSDS_domReplaceAsterisksInA1Notation(domTable, sA1Notation);
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
        var oDomTableAndA1Notation=GSDS_distinguishDomTableAndA1Notation(domTable, sA1Notation); domTable = oDomTableAndA1Notation["domTable"]; sA1Notation = oDomTableAndA1Notation["sA1Notation"];
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
    oGlobalXXX = {};
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
                //sAttributes += " onClick=this.select();' style='padding: 0 0 0 0 !important; margin: 0 0 0 0 !important;' "        
                var domElement = document.createElement(sElementType);        
                Array.from(domTD.children).forEach(function(oEl) { domTD.removeChild(oEl) }); // remove ALL children from a node        
                domTD.appendChild(domElement);        
                // domTD.width = "50px !important"; domTD.height = "20px !important";        
                domTD.style.width = "50px"; domTD.style.height = "20px";
                // var sDefaultStyle = "padding: 0 0 0 0 !important; margin: 0 0 0 0 !important; height:100% !important; width: 100% !important;";
                var sDefaultStyle = "padding: 0 0 0 0 !important; margin: 0 0 0 0 !important; height:100%; width: 100%;";
                if (sAttributes == undefined) { sAttributes = sDefaultStyle; }
                if (sAttributes.match(/^\;/)) { sAttributes = sDefaultStyle+=sAttributes; }
                domElement.style = sAttributes;        

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
                $(domElement).on('keypress', function (e) {        
                    if (e.which == 13) {        
                        e.preventDefault();        
                        domWhatever = e.target;        
                        // console.log(oGlobalXXX);        
                        oSmartRange = domWhatever.closest("table").oSmartRange;        
                        sA1Notation = GSDS_domTDToA1Notation(domWhatever.closest("td"));        
                        sLastCell = oSmartRange.range.split(":")[1];        
                        sLastColumn = cellToColumn(sLastCell);        
                        iLastRow = parseInt(cellToRow(sLastCell));        
                        // console.log("iLastRow =" + iLastRow + "; sLastColumn=" + sLastColumn + "; sLastCell=" + sLastCell)        
                        if(!!e.shiftKey) {        
                            if (sA1Notation == "A1") {        
                                sNextA1Notation = sLastCell;        
                            } else if ((parseInt(cellToRow(sA1Notation))) == 1) {        
                                sNextA1Notation = columnToLetter(letterToColumn(cellToColumn(sA1Notation))-1) + iLastRow;        
                            } else {        
                                sNextA1Notation = cellToColumn(sA1Notation) + (parseInt(cellToRow(sA1Notation))-1);        
                            }        
                        } else {        
                            if (sA1Notation == sLastCell) {        
                                sNextA1Notation = "A1"        
                            } else if (parseInt(cellToRow(sA1Notation)) == iLastRow) {        
                                sNextA1Notation = columnToLetter(parseInt(letterToColumn(cellToColumn(sA1Notation)))+1) + "1";        
                            } else {        
                                sNextA1Notation = cellToColumn(sA1Notation) + (parseInt(cellToRow(sA1Notation))+1);        
                            }        
                        }        
                        // console.log("sA1Notation = " + sA1Notation + "; sNextA1Notation " + sNextA1Notation);         
                        //oSmartRange[sBelowA1Notation].gscell.select();        
                        //console.log(oSmartRange);        
                        oSmartRange[sNextA1Notation].tdcell.$$$("input,select,textarea")[0].select();        
                        oSmartRange[sNextA1Notation].tdcell.$$$("input,select,textarea")[0].focus();        
                        oSmartRange[sNextA1Notation].tdcell.$$$("input,select,textarea")[0].scrollIntoViewIfNeeded();        
                        //sCurrentColumn = this.parentNode.classList.value.match(/column[A-Z]+/g)[0]        
                        //sNextColumn = "column" + columnToLetter(letterToColumn(sCurrentColumn.replace(/column/g, "")) + 1)        
                        //aArrayOfTDs = Array.prototype.slice.call(document.querySelectorAll(".gsws td." + sCurrentColumn)).concat( Array.prototype.slice.call( document.querySelectorAll(".gsws td." + sNextColumn) ) );        
                        //iIndex = Array.prototype.indexOf.call(aArrayOfTDs, this.parentNode);        
                        //aArrayOfTDs[iIndex+1].querySelectorAll("input, select, textarea")[0].focus();        
                    }        
                });        
            //}        
        })        
    }

    GSDS_eval = function(oThis, sCellContents) {
        sCellContents = sCellContents.replace(/^\=/g, "").trim();
        var domTable = oThis.closest("table");
        if (domTable.oSmartRange==undefined) {
            GSDS_setOSR(domTable);
        }
        sCellContents = sCellContents.replace(/\{COLUMN/, "{COL")
        if (sCellContents.match(/\{COL(\-|\+|)[0-9]*\}/g)) {
            sA1Notation = GSDS_domTDToA1Notation(oThis.closest("td"));
            sColumn = cellToColumn(sA1Notation);

            //  REFACTOR IN COL+1 COL-1 SORT OF LOGIC HERE?
            if (sCellContents.match(/COL(\-|\+)[0-9]+}/g)) {
                sOperation = sCellContents.match(/COL(\-|\+)[0-9]+\}/g)[0].replace(/COL/, "").replace(/\}/, "");
                sColumn = columnToLetter(eval(letterToColumn(sColumn).toString()+sOperation))
            }        
            sCellContents = sCellContents.replace(/\{COL(\-|\+|)[0-9]*\}/g, sColumn);
        }

        if (sCellContents.match(/\{ROW(\-|\+|)[0-9]*\}/g)) {
            sA1Notation = GSDS_domTDToA1Notation(oThis.closest("td"));
            sRow = cellToRow(sA1Notation);
            if (sCellContents.match(/ROW(\-|\+)[0-9]+}/g)) {
                sOperation = sCellContents.match(/ROW(\-|\+)[0-9]+\}/g)[0].replace(/ROW/, "").replace(/\}/, "");
                sRow = eval(sRow.toString()+sOperation)
            }    
            sCellContents = sCellContents.replace(/\{ROW(\-|\+|)[0-9]*\}/g, sRow)
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
                // console.log("var sCellContents = " + sCellContents);
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
    GSDS_evalifyCell = function(domTable, sCellA1Notation, sFormula) {
        // GSDS_evalifyCell("table!E6", "=A1:B2") // refactor this to accept dom and sCellA1Notation?
        // sFormula = "=A1:A2";
        // sCellA1Notation = "table!D6";
        // if (sFormula) { } else { sFormula = decodeURIComponent(domInput.dataset.gseval); }
        // domTD = GSDS_getTDRANGE(domTable, sCellA1Notation)[0][0];
        // domInput = domTD.$$$("input,select,textarea")[0];
        // domInput.dataset.gseval = superencode(sFormula);
        GSDS_evalifyTDRANGE(domTable, sCellA1Notation, sFormula);
    }

    //var oThis;
    //var domTD;
    GSDS_evalifyTDRANGE = function(domTable, sA1Notation, sFormula) {
        GSDS_getTDRANGE(domTable, sA1Notation).flat().forEach(function(domTD) {
            var domInput = domTD.$$$("input,select,textarea")[0];
            if (domInput) {
                if (sFormula) {
                    domInput.dataset.gseval = superencode(sFormula);
                    domInput.closest("td").dataset.gseval = superencode(sFormula);
                }
                if (domInput.dataset.gseval) {
                   domInput.value = GSDS_eval(domInput, decodeURIComponent(domInput.dataset.gseval));
                   // domInput.style.backgroundColor="honeydew";
                } else {
                   // domInput.style.backgroundColor="azure";
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
                        // oThis.style.backgroundColor="honeydew";
                    } else if (oThis.closest("td").dataset.gseval) {
                        if (oThis.value != GSDS_eval(oThis, oThis.value)) {
                            oThis.closest("td").dataset.gseval = "";
                            oThis.dataset.gseval = "";
                        }
                        // oThis.style.backgroundColor="honeydew";
                    } else {
                        oThis.closest("td").dataset.gseval = "";
                        oThis.dataset.gseval = "";
                        // oThis.style.backgroundColor="azure";
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
    domGetTDTextOrValue = function(domTD) {
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
    domSetTDTextOrValue = function(domTD, sString) {
        if (domTD.$$$("input")[0]) { domTD.$$$("input")[0].value = sString; }
        else if (domTD.$$$("textarea")[0]) { domTD.$$$("textarea")[0].innerText = sString }
        else if (domTD.$$$("select")[0]) {}
        else {domTD.innerText = sString} 
    }

// } catch(e) { console.log(e); }
// END NEW googlesheets.scripts.js


// domADDELscripts =>
    function addEL(oElements, sType, iIndex, fFunction) { // vs addEventListenerClickXYZ's o, i, f
        if (fFunction) {} else { f = function() { alert("undefined ? and ?"); } }
        if (typeof(oElements) == "string") { oElements = $$$a(oElements); }
        if (Array.isArray(oElements)) { } else { oElements = [oElements]; }
        oElements.forEach(oElement=>{
            oElement.addEventListener(sType, function (evt) {
                if (evt.detail === iIndex) {
                  if (typeof(fFunction)=="string") {
                     eval(fFunction);
                  } else {
                     fFunction();
                  }
                } 
            })
        })
    }; // DO NOT USE - overrides addEventListener: addEventListener = function(oElements, sType, iIndex, fFunction) { return addEL(oElements, sType, iIndex, fFunction); }
    function addEventListenerClickXYZ(o,i,f) { // vs addEL's o, t, i, f
        // defaults
        if (o) {} else { o = "body"; }
        if (i) {} else { i=2; }
        addEL(o, "click", i, f);
    }

// domANIMATEscripts => animate.css
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
    
    function getAnimateCSSAnimations() {
        return "bounce\nflash\npulse\nrubberBand\nshakeX\nshakeY\nheadShake\nswing\ntada\nwobble\njello\nheartBeat\nbackInDown\nbackInLeft\nbackInRight\nbackInUp\nbackOutDown\nbackOutLeft\nbackOutRight\nbackOutUp\nbounceIn\nbounceInDown\nbounceInLeft\nbounceInRight\nbounceInUp\nbounceOut\nbounceOutDown\nbounceOutLeft\nbounceOutRight\nbounceOutUp\nfadeIn\nfadeInDown\nfadeInDownBig\nfadeInLeft\nfadeInLeftBig\nfadeInRight\nfadeInRightBig\nfadeInUp\nfadeInUpBig\nfadeInTopLeft\nfadeInTopRight\nfadeInBottomLeft\nfadeInBottomRight\nfadeOut\nfadeOutDown\nfadeOutDownBig\nfadeOutLeft\nfadeOutLeftBig\nfadeOutRight\nfadeOutRightBig\nfadeOutUp\nfadeOutUpBig\nfadeOutTopLeft\nfadeOutTopRight\nfadeOutBottomRight\nfadeOutBottomLeft\nflip\nflipInX\nflipInY\nflipOutX\nflipOutY\nlightSpeedInRight\nlightSpeedInLeft\nlightSpeedOutRight\nlightSpeedOutLeft\nrotateIn\nrotateInDownLeft\nrotateInDownRight\nrotateInUpLeft\nrotateInUpRight\nrotateOut\nrotateOutDownLeft\nrotateOutDownRight\nrotateOutUpLeft\nrotateOutUpRight\nhinge\njackInTheBox\nrollIn\nrollOut\nzoomIn\nzoomInDown\nzoomInLeft\nzoomInRight\nzoomInUp\nzoomOut\nzoomOutDown\nzoomOutLeft\nzoomOutRight\nzoomOutUp\nslideInDown\nslideInLeft\nslideInRight\nslideInUp\nslideOutDown\nslideOutLeft\nslideOutRight\nslideOutUp".split("\n");

    }
    
    function toggleAnimationVisbDisp(o,sVHvsDN,animation,i) {
        // sVHvsDN is sVisibilityHiddenVsDisplayNone
        if (sVHvsDN == "none") {
            sVHvsDN = "displaynone";
        } else {
            sVHvsDN = "displayhidden";
        }
        if (o) {} else { o="*"; }
        if (i) {} else { i=0; }
        if (animation) {

        } else {
            sInAnimation = getRandomArrayToken(getAnimateCSSAnimationsMatch("In"));
            sOutAnimation = getRandomArrayToken(getAnimateCSSAnimationsMatch("Out"));
        }
        if ($$$$(o).style.visibility == "hidden" || $$$$(o).style.display == "none") {

            $$$animate(o, sInAnimation, i, "display");

        } else {
            $$$animate(o, sOutAnimation, i, sVHvsDN)
        }

    }
    
    function getAnimateCSSAnimationsMatch(s) { return getAnimateCSSAnimations().filter(o=>o.match(new RegExp(s, "g"))); }
    getRandomArrayToken = function(a,i) { // consider refactoring this into datascripts.js?  make es5-friendly
        if (i) {} else (i = 1);
        if (i==1) {
            return a[getRandomInt(0,a.length-1)];
        } else {
            return getRange(0, i-1).map(o=>{ return a[getRandomInt(0,a.length-1)]; });
        }
    }      
    var animateCSS = (element, animation, prefix = 'animate__') =>
      // We create a Promise and return it
      new Promise((resolve, reject) => {
        if (animation) {} else { animation = "bounce"; }
        if (animation=="random") {
          // animation = getAnimateCSSAnimations()[getRandomInt(0,96)];
          animation = getRandomArrayToken(getAnimateCSSAnimations());
          console.log(animation);
        }
        const animationName = `${prefix}${animation}`;

        if (typeof(element) == "string") { var node = document.querySelector(element); } else { var node = element; }

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
          event.stopPropagation();
          node.classList.remove(`${prefix}animated`, animationName);
          // resolve('Animation ended');
          resolve(event.target);
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
      });      

      function $$$animate(el,animation,idelay, fFunction1, fFunction2) {
          // fFunction1=fFunction_beforeAnimation, fFunction2=fFunction2_afterAnimation
          // fFunction = function(o) { o.style.display=""; }
          if (animation) {} else { animation = "random"; }
          if (el) {} else { el = "*"; }
          if (idelay != undefined) {} else { idelay = 10; }
          fNada = function(o) {};
          oAnimateFunctions = {
              "display": { "fFunction1": function(o) { o.style.display=""; o.style.visibility="visible" }, "fFunction2": function(o) { o.style.display=""; o.style.visibility="visible" } },
              "displaynone": { "fFunction1": fNada, "fFunction2": function(o) { o.style.display="none"; } },
              "displayhidden": { "fFunction1": fNada, "fFunction2": function(o) { o.style.visibility="hidden"; } },

              "displaynonedisplay": { "fFunction1": fNada, "fFunction2": fNada, },
              "displayhiddendisplay": { "fFunction1": fNada, "fFunction2": fNada, },
              "displaydisplaynone": { "fFunction1": fNada, "fFunction2": fNada, },
              "displaydisplayhidden": { "fFunction1": fNada, "fFunction2": fNada, },

              // "displaynonedisplay": function(o) { o.style.display="none"; setTimeout(() => { o.style.display=""; ; o.style.visibility=""; }, idelay) },
              // "displayhiddendisplay": function(o) { o.style.visibility="hidden"; setTimeout(() => { o.style.visibility=""; }, idelay) } ,
              // "displaydisplaynone": function(o) { o.style.display=""; o.style.visibility=""; setTimeout(() => { o.style.display="none"; }, idelay) },
              // "displaydisplayhidden": function(o) { o.style.display=""; o.style.visibility=""; setTimeout(() => { o.style.visibility="hidden"; }, idelay) },
              "": function(o) {},
          }

          if (typeof(fFunction1)=="string") {
              if (oAnimateFunctions[fFunction1]) {} else { fFunction1 = ""; }
              fFunction2 = oAnimateFunctions[fFunction1]["fFunction2"];
              fFunction1 = oAnimateFunctions[fFunction1]["fFunction1"];
          } else {};

          if (fFunction1) {} else { fFunction1 = fNada; }
          if (fFunction2) {} else { fFunction2 = fNada; }
          $$$a(el).forEach((o,i)=>{
              setTimeout(() => {
                  fFunction1(o)
                  animateCSS(o,animation).then(o=>fFunction2(o)); // o.addEventListener('animationend', () => {
              }, i*idelay);
          });
      }; function $$$a_animate(el,animation,idelay,fFunction1,fFunction2) { return $$$animate(el,animation,idelay,fFunction1,fFunction2); };
      
    // END animate.css scripts


// domINJECTIFYscripts => domLoadStyles_CSS, domLoadStyles_Link, etc
    // 3 SCRIPTS - INJECT STYLES AND SCRIPTS (TO DEPRECATE) 
    domAppendToHead = function(s){ $$$('head')[0].append(s); }
    domAppendStyle = function(e){const t=document.createElement("style");t.textContent=e,document.head.append(t)}; addStyle = domAppendStyle;
    domLoadScripts = function(e,n){!function t(){var a,o,c;0!=e.length?(a=e.shift(),o=t,(c=document.createElement("script")).src=a,c.onload=c.onreadystatechange=function(){c.onreadystatechange=c.onload=null,o()},(document.getElementsByTagName("head")[0]||document.body).appendChild(c)):n&&n()}()}
    // 4 SCRIPTS - INJECT STYLES AND SCRIPTS (TO REFACTOR INTO EVERYTHING)
    // these two <style>-related functions nudged me to refactor domLoadScripts into domLoadScripts_Link and domLoadScripts_Script, where the latter is actual script code
    domLoadStyles_CSS = function(aCSS){ // creates <style> tags
        // eg domLoadStyles_CSS("* {font-size: 4px}")
        // eg domLoadStyles_CSS(["* {font-size: 4px}", "* {color: red; }"])
        // function addcss(css){
        if (Array.isArray(aCSS)) {} else { aCSS = [aCSS]; } 
        aCSS.forEach(function(css) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('style');
            s.setAttribute('type', 'text/css');
            if (s.styleSheet) {   // IE
            s.styleSheet.cssText = css;
            } else {                // the world
            s.appendChild(document.createTextNode(css));
            }
            head.appendChild(s);
        })
    }
    domLoadStyles_Link = function(aLinks){ // creates <link> tags
        // eg domLoadStyles_Link("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css")
        // eg domLoadStyles_Link(["https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"])
        // `<link rel="stylesheet" href="${e}" type="text/css" />`
        // function addcss(css){
        if (Array.isArray(aLinks)) {} else { aLinks = [aLinks]; }
        aLinks.forEach(function(sLink) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('link');
            s.setAttribute('rel', 'stylesheet');
            s.setAttribute('type', 'text/css');
            s.setAttribute('href', sLink);
            head.appendChild(s);
        })
    }
    // these two were refactored from domLoadScripts
    domLoadScripts_SCRIPT = function(aScripts){ // injects <script> tags
        // eg domLoadScripts_SCRIPT("var sGlobal = 'blah';")
        // eg domLoadScripts_SCRIPT(["var sGlobal1 = 'global 1';", "var sGlobal2 = 'global 2';"])
        if (Array.isArray(aScripts)) {} else { aScripts = [aScripts]; } 
        aScripts.forEach(function(sScript) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            s.appendChild(document.createTextNode(sScript));
            head.appendChild(s);                 
        })
    }
    domLoadScripts_Link = function (aLinks){ // creates <script src='whatever.js'> tags
        // eg domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js")
        // eg domLoadScripts_Link(["https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js", "https://code.jquery.com/jquery-3.6.0.min.js"])
        // `<link rel="stylesheet" href="${e}" type="text/css" />`
        // function addcss(css){
        if (Array.isArray(aLinks)) {} else { aLinks = [aLinks]; }
        aLinks.forEach(function(sLink) {
            var head = document.getElementsByTagName('head')[0];
            var s = document.createElement('script');
            s.setAttribute('src', sLink.trim());
            head.appendChild(s);
        })
    }
    /* // this is already minified in domscripts "3 SCRIPTS" section above, so don't run it
    domLoadScripts = function(e, n) {
        ! function t() {
            var a, o, c;
            0 != e.length ? (a = e.shift(), o = t, (c = document.createElement("script")).src = a, c.onload = c.onreadystatechange = function() {
                c.onreadystatechange = c.onload = null, o()
            }, (document.getElementsByTagName("head")[0] || document.body).appendChild(c)) : n && n()
        }()
    }
    */

// domFETCHscripts => SubmitSuperNinjaForm,fetch_XMLHttpRequest,oGetAllParameters_CLIENT(), oSetAParameter_CLIENT
fetch_XMLHttpRequest=function(oHTTPMethodURLPayload) {
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
        xmlhttp.open(oHTTPMethodURLPayload.type, oHTTPMethodURLPayload.url, true);
        var sParams;
        if (oHTTPMethodURLPayload.payload != undefined) {
            sParams = Object.keys(oHTTPMethodURLPayload.payload).map(function(oElement) {
                return superencode(oElement) + "=" + superencode(oHTTPMethodURLPayload.payload[oElement]);
            }).join("&");
        }

        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // JSON SENDING DOESN'T WORK!  HELP!
        //xmlhttp.setRequestHeader("Content-type","application/json;charset=UTF-8");

        xmlhttp.send(sParams);
    })
// }.then(function(sResponse) {  console.log(sResponse.trim());  })
};

function SubmitSuperNinjaForm(oHTTPMethodURLPayload, sTarget) {
    // SubmitSuperNinjaForm("");
    // SubmitSuperNinjaForm({url: "", payload: "whatever"});
    // SubmitSuperNinjaForm({url: "", type: "POST", payload: {"wat": "whatever"}},  );
    // SubmitSuperNinjaForm({url: "", method: "POST", payload: {"wat": "whatever"}},  );
    superencode = function (str){  return encodeURIComponent(str).replace(/'/g, "%27"); }
    // BEGIN fuzzy parameters: assume a string oHTTPMethodURLPayload is a URL, and assume a string oHTTPMethodURLPayload.payload is an object with a .payload key
    if (typeof(oHTTPMethodURLPayload) == "string") { oHTTPMethodURLPayload = { url: oHTTPMethodURLPayload, method: "GET" }; };
    if (oHTTPMethodURLPayload.type) { oHTTPMethodURLPayload.method = oHTTPMethodURLPayload.type; }; oHTTPMethodURLPayload.method = oHTTPMethodURLPayload.method.toUpperCase();
    if (oHTTPMethodURLPayload.method != "GET" && oHTTPMethodURLPayload.method != "POST") { oHTTPMethodURLPayload.method = "GET" }; // research other browser-based methods?  UPSERT???
    // HTML forms support GET and POST. (HTML5 at one point added PUT/DELETE, but those were dropped.)
    // XMLHttpRequest supports every method, including CHICKEN, though some method names are matched against case-insensitively (methods are case-sensitive per HTTP) and some method names are not supported at all for security reasons (e.g. CONNECT).
    // Fetch API also supports any method except for CONNECT, TRACE, and TRACK, which are forbidden for security reasons.
    // Browsers are slowly converging on the rules specified by XMLHttpRequest, but as the other comment pointed out there are still some differences.
    
    if (typeof(oHTTPMethodURLPayload.payload)=="string") {
        oHTTPMethodURLPayload.payload = { payload: oHTTPMethodURLPayload.payload };
    } else {} // it's a good .payload.
    // END fuzzy parameters
    console.log(JSON.stringify(oHTTPMethodURLPayload.payload));

    if ((oHTTPMethodURLPayload == null) || (oHTTPMethodURLPayload == undefined) || (oHTTPMethodURLPayload == "")) {
       var oHTTPMethodURLPayload = { type:"POST" , payload: {script: 84, deploy: 1, context: "llave", payload: "just testing" } }; 
       var sURL = "https://www.acct138579ns.com/app/site/hosting/scriptlet.nl?script=84&deploy=1&context=llave";
       oHTTPMethodURLPayload.url = sURL;
    }    
    
    var dom_form = document.createElement('form');
    if (sTarget != false && sTarget != "false") { dom_form.setAttribute("target","_blank"); }
    // if (sTarget) { dom_form.setAttribute("target",sTarget); }
    dom_form.name = 'superninjaform';
    dom_form.id = 'superninjaform';
    dom_form.method = oHTTPMethodURLPayload.method;
    dom_form.action = ((oHTTPMethodURLPayload.url != undefined) ? oHTTPMethodURLPayload.url : window.location.href.split("?")[0] ); 
    document.body.appendChild(dom_form);
    // BEGIN bring URL parameters into payload (and bring payload into URL parameters or nah?)
    // NOTE - for GET: even if URL has parameters, I MUST oGetAllParameters_CLIENTize out the parameters and put them into the form.inputs because why?  IDK.  POST doesn't make me do this.  But to stay safe I'm doing it for POST too.  REFACTORING opportunity: if-else by POST
    ooGetAllParameters_CLIENT = oGetAllParameters_CLIENT(oHTTPMethodURLPayload.url);
    Object.keys((ooGetAllParameters_CLIENT)).forEach(o=>{
    // console.log(oHTTPMethodURLPayload.payload);
        oHTTPMethodURLPayload.payload[o]=ooGetAllParameters_CLIENT[o];
    });
    // END bring URL parameters into payload
    dom_form.innerHTML = Object.keys(oHTTPMethodURLPayload.payload).map((o,i)=>{
        return '<input type="hidden" name="' + o + '" id="' + o + '" value="' + superencode(oHTTPMethodURLPayload.payload[o]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
    }).join("");
    //alert(dom_form.innerHTML);
    /*
    dom_form.innerHTML = Object.keys(oHTTPMethodURLPayload.payload).reduce(function(agg, oElement) {
        agg += '<input type="hidden" name="' + oElement + '" id="' + oElement + '" value="' + superencode(oHTTPMethodURLPayload.payload[oElement]) + '" />' + String.fromCharCode(10) + String.fromCharCode(13);
        return agg;
    }, "")
    */
    dom_form.submit();
}
SubmitSuperNinjaForm.sample = function() { 
  console.log(`
            // with oHTTPMethodURLPayload:
            // oHTTPMethodURLPayload allows method, url, payload to be undefined
            // if payload == string, then payload becomes {payload: payload}
            // if GET method, then url parameters automatically payloadified into payload KeyboardEvent
            // if POST method, then consider pushing payload into URL parameters? (NO!)
            var oHTTPMethodURLPayload = { method:"POST", url: "url", payload: {sampledata: "2asdf"}};

            // oldschool html & javascript: SubmitSuperNinjaForm
            SubmitSuperNinjaForm(oHTTPMethodURLPayload);

            // oldschool javascript: fetch_XMLHttpRequest
            fetch_XMLHttpRequest(oHTTPMethodURLPayload).then(function(sResponse) { console.log(sResponse.trim()); });
            sResponse = await fetch_XMLHttpRequest(oHTTPMethodURLPayload);

            // without oHTTPMethodURLPayload:

            // traditional modern - simple
            fetch("url").then(o=>{return o.text().then(oo=>{ // vs o.json() vs o.blob()?
            console.log(oo);
            }) })

            // traditional modern - complex
            var myHeaders = new Headers();
            var myRequest = new Request('flowers.jpg', {
              method: 'GET',
              headers: myHeaders,
              mode: 'cors',
              cache: 'default',
            });
            fetch(myRequest).then(response => response.blob()).then(myBlob => {
                myImage.src = URL.createObjectURL(myBlob);
            });

  `)
}; fetch_XMLHttpRequest.sample = SubmitSuperNinjaForm.sample;
  
  
oGetAllParameters_CLIENT = function(sURL) {
        if (sURL) { var sURL_location_search = "?" + sURL.split("?")[1]; } else { var sURL_location_search = location.search; }
    return sURL_location_search.substring(1) ? JSON.parse('{"' + sURL_location_search.substring(1).split("&").map(function(e) {
        return -1 == e.indexOf("=") ? e + "=" : e
    }).join("&").replace(/&/g, '","').replace(/=/g, '":"') + '"}', function(e, t) {
        return "" === e ? t : decodeURIComponent(t)
    }) : {}
}

function oSetAParameter_CLIENT(oParameters) {
    // this function resets a parameter(s) from oGetAllParameters_CLIENT()
    // defaults to resetting &DOMContentLoaded parameter when a string and not an object is passed
    if (typeof(oParameters)=="string") {
        oParameters = { "DOMContentLoaded": oParameters }
    }

    var sURL = window.location.origin + window.location.pathname;

    oGetAllParameters_COPY = JSON.parse(JSON.stringify(oGetAllParameters_CLIENT()));
    Object.keys(oParameters).forEach(o=>{
        console.log(o)
        oGetAllParameters_COPY[o] = oParameters[o];
    })

    sURL = sURL + "?" + Object.keys(oGetAllParameters_COPY).map(o=>o + "=" + superencode(oGetAllParameters_COPY[o])).join("&");
    return sURL;
}

// domENCRYPTscripts => superencrypt and decrypt (CryptoJS)
function superencrypt(aVO, sPassword) {
  // domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js")
  // copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"))
  try {
      if (aVO) {} else { 
        console.log(`copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"))`);
        return "";
      }
      if (typeof(aVO)=="string") {
        aVO = [[aVO]]; // Arrayify? or Array2Dify?
      }
      aVO = aVO.map((o,i)=>{
          return o.map(oo=> {
            if (true) {
            // if (i>0) {
              if (sPassword) {} else {sPassword="AES.encrypt"}
              if (sPassword=="superencode" || sPassword=="encode") {
                return superencode(oo);
              // } else if (sPassword=="hint") {
              //  return "";
              } else if (sPassword=="btoa" || sPassword=="base64") {
                try {
                    return btoa(oo);
                } catch(e) {
                    return "unknown system/engine without base64Encode...";
                    /*
                    try {
                        return Utilities.base64Encode(oo);
                    } catch(e) {
                    } */
                }
              } else {
                return CryptoJS.AES.encrypt(superencode(oo), sPassword).toString();        
              }    
            //return e;
            } else {
                return oo;
            }
      }) });
      if (sPassword =="hint") {
        return `${JSON.stringify(aVO)}.map(o=>o.map(oo=>{ return decodeURIComponent( 
    CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8)
    ) }) )`;
      } else {
        return aVO;
      }
  } catch(e) {
    return superdecrypt();
  }
}

function superdecrypt(aVO, sPassword) {
    if (typeof(aVO)=="string") {
        aVO = [[aVO]]; // Arrayify? or Array2Dify?
    }

    if (sPassword) {
        if (sPassword=="encode"||sPassword=="superencode") {
            return aVO.map(o=>o.map(oo=>{ return decodeURIComponent( oo )}));
        } else if (sPassword=="btoa"||sPassword=="base64") {
            return aVO.map(o=>o.map(oo=>{ return atob( oo )}));
        } else {
            return aVO.map(o=>o.map(oo=>{ return decodeURIComponent( CryptoJS.AES.decrypt(oo, sPassword).toString(CryptoJS.enc.Utf8))}))
        }
    } else {
        sError = `
    domLoadScripts_Link("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js")

                copy(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "hint"));

                aVO.map(o=>o.map(oo=>{ return decodeURIComponent( CryptoJS.AES.decrypt(oo, "hint").toString(CryptoJS.enc.Utf8))}))
                aVO.map(o=>o.map(oo=>{ return decodeURIComponent( oo )}));
                aVO.map(o=>o.map(oo=>{ return atob( oo )}));

                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "password"), "password")
                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "btoa"), "btoa")
                superdecrypt(superencrypt([["a", "b", "c"],["d - 1", "e - 2", "f - 3"]], "encode"), "encode")


    `;
        console.log("LOAD CRYPTOJS:\n\n" + sError);
        return sError;
    }

}

// domUNITTESTS
// domscripts.serversafe - moved to datahtmlscripts.js since they don't need the dom

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
// GSDS_GSDSifyTDRANGE("A1:*", undefined, "textarea", undefined, undefined, "=89");
// GSDS_RANGE1D("A1:*").forEach(function(domTD, iIn) { ((iIn%2==0) ? sType = "textarea" : sType = "input"); GSDS_GSDSifyTDRANGE(domTD, undefined, sType); });).then

// domDATAHTML.es6.scripts
/* domDATAHTMLscripts (superset of dataHTMLscripts.js) => datahtmlscripts.js => isomorphic, vanilla, es5-ish datascripts that are related to HTML and datascripts, without needing libraries (the dom, jquery, or lodash */
// refactor this whole solution into dataDATAHTMLscripts?  or dataHTMLscripts?  why dom?  because es5?
// note hyperlink() is both html and gs formula related? more functions similar to this concept"?
// HTMLLibrarify, HTMLInjecify, HTMLDOMContentLoadedLibrarify, HTMLDOMContentLoadedLibrarifySample, HTMLDOMContentLoadedify, getHelpfulDOMScripts
// aGet2DIslands, HTMLify, GSDS_disjointedRangeToAVO, GSDS_disjointedRangeToArray
// toHTMLTable, returnIDAndOrClasses, toHTMLSelect, hyperlink, convertRecordsOrientedArrayToExcelXML, convertValuesOrientedArrayToHTMLTable, convertRecordsOrientedArrayToHTMLTable

// server and client-side friendly vanilla es5-ish data scripts that are related to HTML and datascripts, without needing librarys (the dom, jquery, or lodash)
// "FIRST PRINCIPLES FRAMEWORKING"
// obviously not a lot of these are pure es5 so I guess refactor this
// pending refactoring/TODO/tasks: move aGet2DIslands() off of this, es5-ify it, and move it to datascripts.js
// pending refactoring/TODO/tasks: getHelpfulDOMScripts - get rid of this or wat?
// completed refactoring/TODO/tasks: I removed CQPify polyfill because "CQPify()" is now defined as "HTMLify() with server access".  Make this vibe/jive with NS and WP solutions?
// pending refactoring/TODO/tasks: rename/polyfill CQPify to "CodePenify"?  Because that's basically all it is now, it's a first principles thinking/frameworking to carry to each system
function HTMLLibrarify (sHeadList) { // HTMLLibrarify is essentially a <script src> and <link> generator
  // consider refactoring this for domcontenloaded scripts?  also consider refactoring to allow async scripts (wtf that is?), also refactor from es5 to es6 i guess
  // eg HTMLLibrarify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js;https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css;https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
  if (Array.isArray(sHeadList)) { sHeadList = sHeadList.join("\n"); }
  sHeadList = sHeadList.replace(/\;/g, "\n");
  return sHeadList.split("\n")
        .filter(oEl => oEl.trim().match(/\.js$||\.css$/) )
        .filter(oEl => !oEl.trim().match(/^\/\//) )
        .filter(oEl => oEl.trim().length > 0)
        .map(e => ((e.match(/\.js$/) ? `<script src="${e}"></script>`: `<link rel="stylesheet" href="${e}" type="text/css" />`)))
        .join("\n"); 
}
function HTMLInjecify(sHeadList) { // HTMLInjectify() is essentially a smart wrapper for domLoadStyles_Link() and domLoadScripts_Link(), refactor to allow domLoadScripts_SCRIPT() and domLoadStyles_CSS() too?
  // eg HTMLInjecify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js;https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css;https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
  // The following sScripts variable is minified scripts from domscripts nobrainer section
  var sScripts = `domLoadStyles_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("link");r.setAttribute("rel","stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",t),e.appendChild(r)})},domLoadScripts_Link=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){var e=document.getElementsByTagName("head")[0],r=document.createElement("script");r.setAttribute("src",t.trim()),e.appendChild(r)})};`
  if (Array.isArray(sHeadList)) { sHeadList = sHeadList.join("\n"); }
  sHeadList = sHeadList.replace(/\;/g, "\n");
  return sScripts + "\n\n" + sHeadList.split("\n")
        .filter(oEl => oEl.trim().match(/\.js$||\.css$/) )
        .filter(oEl => !oEl.trim().match(/^\/\//) )
        .filter(oEl => oEl.trim().length > 0)
        .map(e => ((e.match(/\.js$/) ? `domLoadScripts_Link("${e}")`: `domLoadStyles_Link("${e}")`)))
        .join("\n"); 
}
function HTMLDOMContentLoadedLibrarify(sHeadList) { // for loading CDN scripts dynamically injecting into <script>
  sHeadList = sHeadList.replace(/\;/g, "\n");
  var aLoadScripts = JSON.stringify(sHeadList.split("\n"));
  sCode = `
  var aLoadScripts=${aLoadScripts};
  
  function domLoadScripts(e,n){!function t(){var a,o,c;0!=e.length?(a=e.shift(),o=t,(c=document.createElement("script")).src=a,c.onload=c.onreadystatechange=function(){c.onreadystatechange=c.onload=null,o()},(document.getElementsByTagName("head")[0]||document.body).appendChild(c)):n&&n()}()}
  
  domLoadScripts(aLoadScripts,function(){
    alert('loaded cdn scripts');
  });
`;
  return sCode.trim();
  // alertTextArea(sCode);
}; function HTMLDOMContentLoadedLibrarifySample() { return 'HTMLDOMContentLoadedLibrarify("https://manueldelanda.github.io/datascripts.js;https://manueldelanda.github.io/domscripts.js;https://cdn.jsdelivr.net/lodash/4/lodash.min.js")'; }


function HTMLDOMContentLoadedify(sScript) {
        return `\n\nwindow.addEventListener('DOMContentLoaded', (event) => { \n\ntry {\n\n ${sScript} \n\n}\ncatch(e) { console.log(e); }\n})\n`;
}
function getHelpfulDOMScripts() { // note the 5 dollar signs instead of 3...seems like dollar signs vanish when used in a match function   
        return decodeURIComponent("%0A%3Cscript%3E%0A%20%20%20%20var%20%24%24%24%24%24%20%3D%20document.querySelectorAll.bind(document)%3B%0A%20%20%20%20HTMLElement.prototype.%24%24%24%24%24%20%3D%20function%20(element)%20%7B%20return%20this.querySelectorAll(element)%3B%20%7D%3B%0A%20%20%20%20domAppendStyle%20%3D%20function(e)%7Bconst%20t%3Ddocument.createElement(%22style%22)%3Bt.textContent%3De%2Cdocument.head.append(t)%7D%3B%20addStyle%20%3D%20domAppendStyle%3B%0A%20%20%20%20domAppendToHead%20%3D%20function(s)%7B%20%24%24%24%24%24(%27head%27)%5B0%5D.append(s)%3B%20%7D%0A%20%20%20%20domLoadScripts%20%3D%20function(e%2Cn)%7B!function%20t()%7Bvar%20a%2Co%2Cc%3B0!%3De.length%3F(a%3De.shift()%2Co%3Dt%2C(c%3Ddocument.createElement(%22script%22)).src%3Da%2Cc.onload%3Dc.onreadystatechange%3Dfunction()%7Bc.onreadystatechange%3Dc.onload%3Dnull%2Co()%7D%2C(document.getElementsByTagName(%22head%22)%5B0%5D%7C%7Cdocument.body).appendChild(c))%3An%26%26n()%7D()%7D%0A%3C%2Fscript%3E");
}
function aGet2DIslands(r){function n(r){return function(r){if(Array.isArray(r))return C(r)}(r)||function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}(r)||e(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(r,n){return function(r){if(Array.isArray(r))return r}(r)||function(r,n){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null==t)return;var e,C,a=[],o=!0,i=!1;try{for(t=t.call(r);!(o=(e=t.next()).done)&&(a.push(e.value),!n||a.length!==n);o=!0);}catch(r){i=!0,C=r}finally{try{o||null==t.return||t.return()}finally{if(i)throw C}}return a}(r,n)||e(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(r,n){if(r){if("string"==typeof r)return C(r,n);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?C(r,n):void 0}}function C(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,e=new Array(n);t<n;t++)e[t]=r[t];return e}var a=function(r,n){var e={};return function(){for(var r=arguments.length,n=new Array(r),C=0;C<r;C++)n[C]=arguments[C];var a=function(r){var n=t(r,2),e=n[0],C=n[1];return"".concat(e,"_").concat(C)}(n);return e[a]||(e[a]=function(r,n){return{r:r,c:n}}.apply(void 0,n)),e[a]}}();a.neighbors=function(r){var n=r.r,t=r.c;return[a(n,t+1),a(n+1,t),a(n,t-1),a(n-1,t)]};var o=function(r){return{minR:r.r,maxR:r.r+1,minC:r.c,maxC:r.c+1,cells:new Set([r])}};o.merge=function(r,t){return{minR:Math.min(r.minR,t.minR),maxR:Math.max(r.maxR,t.maxR),minC:Math.min(r.minC,t.minC),maxC:Math.max(r.maxC,t.maxC),cells:new Set([].concat(n(r.cells),n(t.cells)))}},o.extractFromGrid=function(r){return function(n){var t=n.minR,e=n.maxR,C=n.minC,a=n.maxC;return r.slice(t,e).map(function(r){return r.slice(C,a)})}};var i=r,c=i.flatMap(function(r,n){return r.map(function(r,t){return a(n,t)})}),u=new Map;return c.forEach(function(r){if(""!==i[r.r][r.c]){var n=a.neighbors(r).filter(function(r){return u.has(r)}).map(function(r){return u.get(r)}).reduce(o.merge,o(r));n.cells.forEach(function(r){u.set(r,n)})}}),n(new Set(u.values())).map(o.extractFromGrid(i))}aGet2DIslands.sample=function(){return decodeURIComponent("%0A%0Avar%20aVO%20%3D%20%5B%0A%20%20%5B%22col1%22%2C%20%22col2%22%2C%20%22col3%22%2C%20%22col4%22%2C%20%22col5%22%2C%20%22col6%22%2C%20%22col7%22%2C%20%22col8%22%2C%20%22col9%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B1%2C%202%2C%203%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B4%2C%205%2C%206%2C%20%22%22%2C%20%22%22%2C%20%22a%22%2C%20%22b%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B7%2C%208%2C%209%2C%20%22%22%2C%20%22%22%2C%20%22c%22%2C%20%22d%22%2C%20%22%22%2C%201%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%202%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22z%22%2C%20%22y%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%203%5D%2C%0A%20%20%5B%22%22%2C%20%22x%22%2C%20%22w%22%2C%20%22v%22%2C%20%22%22%2C%207%2C%207%2C%207%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22A1%22%2C%20%22B1%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%2C%20%22%22%5D%2C%0A%20%20%5B%22%22%2C%20%22A2%22%2C%20%22B2%22%2C%20%22C2%22%2C%20%22%22%2C%20%22%22%2C%20%22HELLO%22%2C%20%22%22%2C%20%22%22%5D%0A%5D%3B%0AaGet2DIslands(aVO)%3B%0A%0A")};

function HTMLify(aCQPRecordsOriented, bSansHTMLTag) {
  // context, label, server, server-condition, head, head-script/script/js, DOMContentLoaded/onload, html, body, css/style, and headlist/library
  var sHTML = undefined;
  var sHead = "";
  var sHeadStyles = "";
  var sHeadBabel = "";
  var sBodyTypeScript = "";
  var sHeadScripts = "";
  var sDomContentLoaded = "";
  var sBody = ""; 
  var sDomContentLoadedHEADSCRIPT = undefined;
  // alertTextArea(JSON.stringify(aCQPRecordsOriented));
  aCQPRecordsOriented.forEach(function(oEl) {
    var sLabel = superencode(oEl["label"]);
    if (oEl["html"]) {
      sHTML = oEl["html"]; // don't do +=, only =, only allow one cell in entire Solution Island to contain html data?  prioritize the last instance?  lots of assumptions to reconcile here...
    }
    if (oEl["head"]) {
      sHead += "\n" + oEl["head"] + "\n";
    }
    if (oEl["headlist"]) {
      oEl["headlist"] = HTMLLibrarify(oEl["headlist"]);
      sHeadScripts += "\n" + oEl["headlist"] + "\n";
    }
    if (oEl["library"]) {
      oEl["library"] = HTMLLibrarify(oEl["library"]);
      sHeadScripts += "\n" + oEl["library"] + "\n";
    }
    if (oEl["head-script"]) {
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["head-script"] + "\n</script>\n";
    }
    if (oEl["script"]) {
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["script"] + "\n</script>\n";
    }
    if (oEl["js"]) { // js is a hack that I suspect codepen does to load the script in both script and DOMContentLoaded, but idk
      sHeadScripts += "<script>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["js"] + "\n</script>\n";
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["js"]);
    }
    if (oEl["babel"]) { //<script type="text/babel"></script> 
      sHeadBabel = "<script src='https://unpkg.com/@babel/standalone/babel.min.js'></script>";
      sHeadScripts += "<script type='text/babel' charset='utf-8'>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["babel"] + "\n</script>\n";
    }
    if (oEl["typescript"]) {
      sBodyTypeScript = '<script type="text/javascript" src="https://niutech.github.io/typescript-compile/js/typescript.min.js"></script><script type="text/javascript" src="https://niutech.github.io/typescript-compile/js/typescript.compile.min.js"></script>';
      sHeadScripts += "<script type='text/typescript' charset='utf-8'>\n//" + sLabel + ":";
      sHeadScripts += "\n" + oEl["typescript"] + "\n</script>\n";      
    }
    if (oEl["style"]) {
      // sHeadStyles += "<style>\n//" + sLabel + ":";
      sHeadStyles += "<style>\n" + oEl["style"] + "\n</style>\n";
    }
    if (oEl["css"]) {
      // sHeadStyles += "<style>\n//" + sLabel + ":";
      sHeadStyles += "<style>\n" + oEl["css"] + "\n</style>\n";
    }
    if (oEl["head-script-document.addEventListener-DOMContentLoaded"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["head-script-document.addEventListener-DOMContentLoaded"]);
    }
    if (oEl["DOMContentLoaded"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["DOMContentLoaded"]);
    }
    if (oEl["onload"]) {
      sDomContentLoaded += HTMLDOMContentLoadedify(oEl["onload"]);
    }
    if (oEl.bodytable) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += oEl.bodytable + "\n<br />\n";
    }
    if (oEl.body) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += oEl.body + "\n<br />\n";
    }
    if (oEl.textarea) {
      if (sLabel) {sBody += "\n<!-- " + sLabel + "-->\n"; }
      sBody += "<textarea rows='10' style='width:100%;'>" + oEl.textarea + "</textarea>\n<br />\n";
    }
    // console.log(oEl)
  });
  
  ((sDomContentLoaded) ? sDomContentLoadedHEADSCRIPT = "<script>\n\n" + sDomContentLoaded + "\n\n</script>" : sDomContentLoadedHEADSCRIPT = "");
  sHead = sHead + sHeadStyles + sHeadBabel + sHeadScripts + sDomContentLoadedHEADSCRIPT;
  if (sHTML) { // sHTML is defined, therefore I need to DOMParse it and append all data thru DOMContentLoaded.  Sike I'm just doing a replace on the opening <head> tag, probably making my HTMLify solution less browser-tolerant but I can refactor/task/TODO this out later...
     // debugging - sHTML = "<html><head></head><body></body></html>"; sDomContentLoaded = "";
     sHelpfulDOMScripts = getHelpfulDOMScripts();
     sHead = sHelpfulDOMScripts + sHead;
     sHTML = sHTML.replace(/\<head\>/, `<head>\n${sHead}`);
     if (sBody) { sHTML = sHTML.replace(/\<body\>/, `<body>\n${sBody + sBodyTypeScript}`); } // a little charity for the body tag I guess
  } else { // sHTML is undefined, therefore define it using the usual vanilla html CQPify way
    if (bSansHTMLTag) { // then generate html without the <html> opening/closing tag
        sHTML = "<head>" + sHead + "</head>\n<body>" + sBody + sBodyTypeScript + "</body>";     
    } else {
        sHTML = "<html><head>" + sHead + "</head>\n<body>" + sBody + sBodyTypeScript + "</body></html>"; 
    }
  }
  return sHTML;
};
// I removed CQPify polyfill because "CQPify()" is now defined as "HTMLify() with server access"
// HTMLify alone is itself just a pure vanilla datascript.js function
// function CQPify(aCQPRecordsOriented) { return HTMLify(aCQPRecordsOriented) };

// domDATAHTML.es5.scripts
// THE FOLLOWING CODE USED TO BE "domscripts.serversafe", but now its just part of domDATAHTML.es.js scripts
// pseudocode for new domscript function - refactor convertOSRToHTMLTable, convertRecordsOrientedArrayToHTMLTable, convertValuesOrientedToHTMLTable into one solution? 
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
    var sTableClasses = (returnIDAndOrClasses(sTableIDOrClasses).classes + " aRO aRecordsOriented convertRecordsOrientedArrayToHTMLTable convertRecordsOrientedToHTMLTable RecordsOrientedArrayToHTML _gsws gsws").trim();
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
        "<thead><tr>" + aColumns.reduce(function(agg001, oElement001, iIndex001) {
            var sCell = columnToLetter(iIndex001+1) + "1";
            var sClasses = "gsws gscell gsws_" + sTableID + " " + sCell + " row1 column" + columnToLetter(iIndex001+1) + " cellcolumn" + iIndex001;
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