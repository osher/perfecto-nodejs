//global scope:
//  console, Array, Buffer, String, Object ....
//
//function(require, module, exports, __dirname, __filename) {


function presentDestructure({ name, age}) {
    const present = `hello, I'm ${name}, and I'm ${age}`
    return present
}
    


function presentRef(o) {
    const present = `hello, I'm ${o.name}, and I'm ${o.age}`
    return present
}

console.log( present({name: "Osher", age: 45}) )

//}