module.exports = {
    padLeft: function(str, len, pad) {
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
    },

    getToday: function() {
        var date = new Date();
        return (
            module.exports.padLeft(date.getFullYear(), 4) +
            '-' +
            module.exports.padLeft(date.getMonth() + 1, 2) +
            '-' +
            module.exports.padLeft(date.getDate() + 1, 2)
        );
    },

    hexToBinary: function(hex) {
        var result = '';
        for (var i = 0; i < hex.length - 1; i += 2) {
            result += parseInt(hex.substr(i, 2), 16)
                .toString(2)
                .padStart(8, '0');
        }
        return result;
    },

    binaryToAscii: function(bin) {
        return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
            return String.fromCharCode(parseInt(bin, 2));
        });
    },

    asciiToHex: function(ascii) {
        var hex = '';
        for (var i = 0; i < ascii.length; i++) {
            hex += '' + ascii.charCodeAt(i).toString(16);
        }
        return hex;
    },

    asciiToBinary: function(str, spaceSeparatedOctets) {
        return str.replace(/[\s\S]/g, function(str) {
            str = module.exports.zeroPad(str.charCodeAt().toString(2));
            return !1 == spaceSeparatedOctets ? str : str + ' ';
        });
    },

    zeroPad: function(num) {
        return '00000000'.slice(String(num).length) + num;
    }
};
// module.exports = hTools;
