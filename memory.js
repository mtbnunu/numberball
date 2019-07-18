const config = require("./config")

//todo not this
const mem = {};

module.exports = 
{
    get: function(id){
      return mem[id];
    },
    set:function(id, obj){
        mem[id] = obj;

        //at least..
        if(mem.length > config.maxGames){
            delete Object.keys(mem)[0] //random victim
        }
    }
}
