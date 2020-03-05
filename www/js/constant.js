
var BOARDING_PASS_ELEMENTS = ['boardPoint','carrierCode','referenceNumber','flightDate','flightNumber','seatNumber','destination','paxName','pnr'];
var BOARDING_PASS_RULE =
        {
            "documentType": "boarding pass1",
            "stationCode": "DXB",
            "validation": "M1[A-Z0-9//| ]{58}(>[A-Z0-9 ]+)?",
            "validation1": "M1[A-Z0-9// ]{58}>[A-Z0-9 ]+",
            "docTypeName": "BP",
            "formatType": "M1",
            "documentRules": [
              {
                "formatType": "0,1",
                "elementName": "formatType",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[a-zA-Z]+$",
                "isTrimReq": ""
              },
              {
                "formatType": "1,1",
                "elementName": "segments",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[\\d]+$",
                "isTrimReq": ""
              },
              {
                "formatType": "2,20",
                "elementName": "paxName",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": "Y"
              },
              {
                "formatType": "22,1",
                "elementName": "eti",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": ""
              },
              {
                "formatType": "23,7",
                "elementName": "pnr",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": "Y"
              },
              {
                "formatType": "30,3",
                "elementName": "boardPoint",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[a-zA-Z]+$",
                "isTrimReq": ""
              },
              {
                "formatType": "33,3",
                "elementName": "destination",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[a-zA-Z]+$",
                "isTrimReq": ""
              },
              {
                "formatType": "36,3",
                "elementName": "carrierCode",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": "Y"
              },
              {
                "formatType": "39,5",
                "elementName": "flightNumber",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[\\d]+$",
                "isTrimReq": "Y"
              },
              {
                "formatType": "44,3",
                "elementName": "flightDate",
                "isActive": "Y",
                "dateFormat": "date|JJJ|ddMMMYYYY",
                "checksumDigit": "",
                "validation": "^[\\d]+$",
                "isTrimReq": ""
              },
              {
                "formatType": "47,1",
                "elementName": "compartmentCode",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": ""
              },
              {
                "formatType": "48,4",
                "elementName": "seatNumber",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": ""
              },
              {
                "formatType": "52,5",
                "elementName": "referenceNumber",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "^[\\d]+$",
                "isTrimReq": "Y"
              },
              {
                "formatType": "57,1",
                "elementName": "paxStatus",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": ""
              },
              {
                "formatType": "58,2",
                "elementName": "fieldSize",
                "isActive": "Y",
                "dateFormat": "",
                "checksumDigit": "",
                "validation": "",
                "isTrimReq": ""
              }
            ]
          };
          
          

