const mem = require("./memory")
mem.set("b","true")
mem.set("a","false")

const mem2 = require("./memory")
console.log("b",mem2.get("b"))
console.log("b",mem.get("b"))