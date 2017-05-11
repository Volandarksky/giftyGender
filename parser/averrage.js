fs = require("fs");
/*
var a = [[0.002001,0.002210,-0.001915,-0.001639,0.000683],
         [-0.459660,0.381687,0.431925,0.188446,0.115270],
         [-0.060982,-0.220535,0.255766,0.434586,-0.089905],
         [0.363459,-0.338617,0.211090,1.333059,0.311983]]
*/
var a = fs.readFile('/text/new.csv', 'utf8');
var b = [];

for (var i = 0; i < a[1].length; i++) {
  var sum = 0;
    for (var j = 0; j < a.length; j++) {
        sum += a[j][i];
    }
b[i] = sum/a.length;
}


console.log(a);
//fs.writeFileSync("/home/kk/sex/w2v/averrage/averrage.json", a, "utf8");
