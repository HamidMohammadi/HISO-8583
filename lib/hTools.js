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

module.exports = hTools;
