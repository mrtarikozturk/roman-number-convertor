/*  Elements   */
const toRomanInput = document.querySelector('#toRoman input:first-child');
const toRomanButton = document.querySelector('#toRoman input:nth-child(2)');
const toRomanShow = document.querySelector('#toRoman input:read-only');
const fromRomanInput = document.querySelector('#fromRoman input:first-child');
const fromRomanButton = document.querySelector('#fromRoman input:nth-child(2)');
const fromRomanShow = document.querySelector('#fromRoman input:read-only');

/*  Functions   */
function fromRoman(roman, accept) {
    var s = roman.toUpperCase().replace(/ +/g, ''),
        L = s.length, sum = 0, i = 0, next, val,
        R = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };

    function fromBigRoman(rn) {
        var n = 0, x, n1, S, rx = /(\(*)([MDCLXVI]+)/g;

        while ((S = rx.exec(rn)) != null) {
            x = S[1].length;
            n1 = Number.fromRoman(S[2])
            if (isNaN(n1)) return NaN;
            if (x) n1 *= Math.pow(1000, x);
            n += n1;
        }
        return n;
    }

    if (/^[MDCLXVI)(]+$/.test(s)) {
        if (s.indexOf('(') == 0) return fromBigRoman(s);

        while (i < L) {
            val = R[s.charAt(i++)];
            next = R[s.charAt(i)] || 0;
            if (next - val > 0) val *= -1;
            sum += val;
        }
        if (accept || sum.toRoman() === s) return sum;
    }
    return NaN;
}

function convertToRoman(num) {
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';

    for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }

    return str;
}

/*  Event Listeners   */
toRomanButton.addEventListener('click', () => {
    toRomanShow.value = convertToRoman(toRomanInput.value);
});

fromRomanButton.addEventListener('click', () => {
    fromRomanShow.value = fromRoman(fromRomanInput.value.toUpperCase(), true);
});