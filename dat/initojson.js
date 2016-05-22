var fs = require('fs')

var array = fs.readFileSync(process.argv[2]).toString().split("\n");

var items = {};

var actual = null;


var esObj = /\[OBJ([0-9]+)\]/;

var isKV = /^([A-Za-z0-9]+)=(.*)/;

array.forEach(function (l) {
    if (esObj.test(l)) {
        var matches = esObj.exec(l);
        actual = { id: parseInt(matches[1]) };
        items[actual.id] = actual;
    } else if (actual && isKV.test(l)) {
        var matches = isKV.exec(l);
        actual[matches[1]] = matches[2];
    }
})

console.log(JSON.stringify(items,null, 2));
