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

module.exports = hTools;
