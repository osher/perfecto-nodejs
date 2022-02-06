//global scope:
//  console, Array, Buffer, String, Object ....
//
//function(require, module, exports, __dirname, __filename) {
var a, b, bb
var inc
const inc2 = () =>  {   ...implDetail...  }

if (bitsAndBites()) {
    inc()
} else {
    var bb
    implDetail()
}

inc = function() {   ...implDetail...  }



a = 1
console.log('first line', {a, b, bb, inc: inc() });


if (true) {
    bb = 'a'
    console.log(bb);
}


a++
console.log('last line', {a, b});


function inc() {
    return ++a;
}

function implDetail() {}


function bitsAndBites() {}



//}