const mem = require("./memory")
mem.set("a","true")
mem.get("a")

const mem2 = require("./memory")
console.log(mem2.get("a"))
console.log(mem.get("a"))

require("./test2")
console.log(mem2.get("a"))
console.log(mem.get("a"))