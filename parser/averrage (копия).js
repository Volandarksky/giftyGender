fs = require("fs");
var a = [[1,2,3],
         [2,3,4]];
var b = [];

for (var i = 0; i < a[1].length; i++) {
  var sum = 0;
    for (var j = 0; j < a.length; j++) {
        sum += a[j][i];
    }
b[i] = sum/a.length;
}
console.log(b);
//fs.writeFileSync("text/averrage.txt", b, "utf8");
