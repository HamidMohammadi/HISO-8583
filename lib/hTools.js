let hTools = {};

hTools.padLeft = function(str, len, pad) {
    if (len === undefined) {
        len = 1;
    } else if (pad === undefined) {
        pad = '0';
    }

    var pads = '';
    while (pads.length < len) {
        pads += pad;
    }
    var s = str.toString();
    var res = pads.substring(0, pads.length - s.length) + s;
    return res;
};

hTools.getToday = function() {
    var date = new Date();
    return (
        hTools.padLeft(date.getFullYear(), 4) +
        '-' +
        hTools.padLeft(date.getMonth() + 1, 2) +
        '-' +
        hTools.padLeft(date.getDate() + 1, 2)
    );
};

hTools.hexToBinary = function(hex) {
    var result = '';
    for (var i = 0; i < hex.length - 1; i += 2) {
        result += parseInt(hex.substr(i, 2), 16).toString(2).padStart(8, '0');
        // result += ConvertBase(hex.substr(i, 2)).from(16).to(2);
    }
    // let convertInt = parseInt(hex, 16);
    // let str = convertInt.toString(2);
    // let pad = str.padStart(8, '0');
    // return parseInt(hex, 16).toString(2).padStart(8, '0');
    return result;
};

module.exports = hTools;
