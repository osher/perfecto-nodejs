//global scope:
//  console, Array, Buffer, String, Object ....
//
//function(require, module, exports, __dirname, __filename) {


function present(o) {
    //from the next line - present changes it's lexical meaning
    const present = `hello, I'm ${o.name}, and I'm ${o.age}`
    return present
}

console.log( present({name: "Osher", age: 45}) )



function saverFactory({name: saverName, dal}) { 

    return { process, getName() { return name } }

    function process({ name, age }) {
        console.log(`saver ${saverName} wrote ${name}`);
        dal.save({ name, age, createdAt: Date.now() })
    }
}

//}