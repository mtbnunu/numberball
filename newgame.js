const unique = require("./unique");
const mem = require("./memory");
const rd = require("./randomestring");
const config = require("./config");

module.exports = function(val){
    if(val === config.PICK_ONE){
        throw {status:400, message: `replace ${config.PICK_ONE} with your desired value for other people to guess`}
    }
    if(!val){
        throw {status:400, message: "provide a value for people to guess using /new?val=1234"}
    }
    if(!unique(val)){
        throw {status:400, message: "your number must be unique"}
    }
    if(!isFinite(val)){
        throw {status:400, message: "it's not a number.."}
    }

    const gameId = rd(); //todo:collision

    const game = {
        val: val,
        attempts: {}
    } //todo: expire and cleanup

    mem.set(gameId,game)

    return {
        gameId: gameId, 
        playUrl:`${config.host}/play?game=${gameId}&guess=${config.YOURGUESS}`,
        statusUrl:`${config.host}/status?game=${gameId}`
    }
}