/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var paxData={};
window.addEventListener("load", function(){
  init();
});

var app = {
    // Application Constructor
    initialize: function() {
        console.log("deviceReady call");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log("deviceReady done");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        if(parentElement){
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        }
        console.log('Received Event: ' + id);
    }
};

function init(){
    console.log("Initializing the client ..");
    document.getElementById("scanImageId").setAttribute('style', 'display:block;');
    document.getElementById("searchResultId").setAttribute('style', 'display:none;');
    document.getElementById("paxName").value = "";
    document.getElementById("pnr").value = "";
    document.getElementById("upd").setAttribute('style', 'display:none;');
}

function searchPax(action){
    if(action == 'search'){
      var paxName = document.getElementById("paxName").value;
      var pnrNumber = document.getElementById("pnr").value;
      document.getElementById("scanImageId").setAttribute('style', 'display:none;');
      document.getElementById("searchResultId").setAttribute('style', 'display:block;');
      document.getElementById("flightDataId").innerHTML = "&nbsp;&nbsp;" + paxData.carrierCode + paxData.flightNumber + '/' + convertJulianDate(paxData.flightDate) + '/' + paxData.boardPoint + '-' + paxData.destination;
      document.getElementById("paxNameValueId").innerHTML = paxData.paxName;
      document.getElementById("referenceValueId").innerHTML = paxData.referenceNumber;
      document.getElementById("seatValueId").innerHTML = paxData.seatNumber;
      document.getElementById(action).setAttribute('style', 'display:none;');
      document.getElementById("upd").setAttribute('style', 'display:block;');
    } else {
       document.getElementById("upd").setAttribute('style', 'display:none;');
       document.getElementById("search").setAttribute('style', 'display:block;');
       document.getElementById("scanImageId").setAttribute('style', 'display:block;');
       document.getElementById("searchResultId").setAttribute('style', 'display:none;');
    }
}

function checkIn(){
    document.getElementById("scanImageId").setAttribute('style', 'display:block;');
    document.getElementById("searchResultId").setAttribute('style', 'display:none;');
}

function scanBarcode(){
    let scanner = null;
        (async()=>{
            scanner = await Dynamsoft.BarcodeScanner.createInstance();
            await scanner.updateVideoSettings({ video: { width: 720, height: 720, facingMode: "environment" } });
            await scanner.updateRuntimeSettings("speed");
            scanner.onFrameRead = results => {};
            scanner.onUnduplicatedRead = (txt, result) => {
              var scannedCode = txt.split('***')[0];
              console.log(scannedCode);
              paxData = parseBPPData(scannedCode);
              console.log(paxData);
              document.getElementById("paxName").value = paxData.paxName;
              document.getElementById("pnr").value = paxData.pnr;
              scanner.hide();
            };
            await scanner.show();
        })();
    //barcode event
   /* cordova.plugins.barcodeScanner.scan(
      function (result) {
         console.log(result);
         paxData = parseBPPData(result.text);
         console.log(paxData);
         document.getElementById("paxName").value = paxData.paxName;
         document.getElementById("pnr").value = paxData.pnr;
      },
      function (error) {
          console.error("Scanning failed: " + error);
      },
      {
        formats : "QR_CODE,PDF_417,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,ITF"
      }
   ); */

}

function parseBPPData(bppString){
    var flightData = {};
    if(bppString.indexOf('M1') != -1){
      bppString = bppString.substr(bppString.indexOf('M1'));
      BOARDING_PASS_RULE.documentRules.forEach(document=>{
        var startIndex = parseInt(document.formatType.split(',')[0]);
        var endIndex = parseInt(document.formatType.split(',')[1]);
        var actualString = bppString.substr(startIndex,endIndex);
        actualString = actualString.trim();
        if(regTest(actualString,document.validation)){
          if(BOARDING_PASS_ELEMENTS.includes(document.elementName)){
            flightData[document.elementName] = actualString;
          }
        }else{
          console.log("ERROR : Invalid String" + document.elementName + ' : ' + actualString);
          flightData['error'] = "ERROR : Invalid String " + document.elementName + ' : ' + actualString;
        }
      })
    }
    return flightData;
  }
  
function regTest (string, expression) {
    var regularExpression = new RegExp(expression);
    return regularExpression.test(string);
}

function convertJulianDate(julianDate){
  var diffDate = parseInt(julianDate) - moment().dayOfYear();
  var year = moment().year();
  if (diffDate < 0 && diffDate * -1 < 367 && diffDate * -1 > 359) {
    // Next year
    year++;
  } else if (diffDate < 367 && diffDate > 329) {
    // between 330-366
    // Previous year
    year--;
  }
  var date = moment('01-01-' + year, 'DD-MM-YYYY').add(parseInt(julianDate) - 1, 'days');
  return date.format('DDMMMYY').toUpperCase();
}



app.initialize();

