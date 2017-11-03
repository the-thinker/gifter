function getOutterId(a) {
    var b = '';
    for (var i = 0; i < a.length; i++) {
        if (a[i] >= 'A' && a[i] <= 'z' || a[i] >= '0' && a[i] <= '9') b += a[i];
    }
    return b;
}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.getOutterId = getOutterId;
exports.jsUcfirst = jsUcfirst;
