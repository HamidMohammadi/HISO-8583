'use strict';
let {getHex} = require('../lib/tools')
let iso1Pack = require('../lib/8583');
let testData1 = {
    "0": "0100",
    "2": "4180875104555684",
    "3": "000000",
    "4": "000000002000",
    "7": "0901105843",
    "11": "123456",
    "12": "105843",
    "13": "0901",
    "14": "1905",
    "18": "4111",
    "22": "051",
    "23": "000",
    "25": "00",
    "26": "12",
    "32": "423935",
    "33": "111111111",
    "35": "4180875104555684D190522611950628",
    "37": "724410123456",
    "41": "12345678",
    "42": "MOBITILL0000001",
    "43": "Mobitll Merchant 1 0000000 NAIROBI KE KE",
    "49": "404",
    "52": "481C9038075937B1",
    "56": "1510",
    "123": "91010151134C101",
    "127": "000000800000000001927E1E5F7C0000000000000000200000000000000014A00000000310107C0000C2FF004934683D9B5D1447800280000000000000000410342031F024103021406010A03A42002008CE0D0C84042100000488004041709018000003276039079EDA"
}
let testData2 = {
    "0": "0200",
    "2": "5060990103738877557",
    "3": "310000",
    "4": "000000000000",
    "7": "0604074705",
    "11": "804058",
    "12": "074808",
    "13": "0604",
    "14": "1812",
    "15": "0905",
    "18": "6011",
    "22": "901",
    "23": "000",
    "25": "00",
    "26": "12",
    "28": "C00000000",
    "30": "C00000000",
    "32": "483912",
    "33":  "506099",
    "35": "5060990103738877557D18126018307250",
    "37": "MBTL00000009",
    "40": "601",
    "41": "NIC00002",
    "42": "NIC000200000009",
    "43":  "NIC HOUSE 1            NAIROBI        KE",
    "49": "404",
    "56": "1510",
    "123": "511201511344002",
    "127.2": "0007713856",
    "127.3": "NIC HOUSE 1            NAIROBI        KE        ",
    "127.20": "20100604"
}

let testData3 = {
    "0": "0100",
    "2": "4180875104555684",
    "3": "000000",
    "4": "000000002000",
    "7": "0901105843",
    "11": "123456",
    "12": "105843",
    "13": "0901",
    "14": "1905",
    "18": "4111",
    "22": "051",
    "23": "000",
    "25": "00",
    "26": "12",
    "32": "423935",
    "33": "111111111",
    "35": "4180875104555684D190522611950628",
    "37": "724410123456",
    "41": "12345678",
    "42": "MOBITILL0000001",
    "43": "Mobitll Merchant 1 0000000 NAIROBI KE KE",
    "49": "404",
    "52": "481C9038075937B1",
    "56": "1510"
}
let testData4 = {}
let iso1 = new iso1Pack(testData1)
let iso2 = new iso1Pack(testData2)
let iso3 = new iso1Pack(testData3)
let iso4 = new iso1Pack(testData4)

/*
    Assemble Data Test
    This test assembling of 0-127, 127.0-63 and 127.25.0-63
    calling the the assembler assemble0_127_Fields returns a buffer with the mti but without the length indicator
    calling assemble127_extensions returns buffer with the length indicator
    to get a final buffer call the getBufferMessage method
    Note that the return from assemble127_extensions is only added to the final buffer if it has a bytelength greater tha 10
    To get the full buffer with len+mti+bitmap+data+?127 len+bitmap+data +?127.25 +len+mti+bitmap+data,
    call the getBufferMessage method
*/
console.log(iso1.assemble0_127_Fields().toString())
console.log(iso1.assemble127_extensions().toString())
console.log(iso1.getBufferMessage().toString())

console.log(iso2.assemble0_127_Fields().toString())
console.log(iso2.assemble127_extensions().toString())
console.log(iso2.getBufferMessage().toString())


console.log(iso3.assemble0_127_Fields().toString())
console.log(iso3.assemble127_extensions().toString())
console.log(iso3.getBufferMessage().toString())

console.log(iso4.assemble0_127_Fields())
console.log(iso4.assemble127_extensions())
console.log(iso4.getBufferMessage())