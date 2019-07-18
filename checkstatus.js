const mem = require("./memory");
const config = require("./config");

module.exports = function(gameId){
    const game = mem.get(gameId);
    if(!game){
        return {exists:false}
    }

    const censordAttempts = Object.keys(game.attempts).map(ip=>{
        return {
            numAttempts: game.attempts[ip].length,
            succeeded: game.attempts[ip].some(a=>a.success)
        }
    })

    return{
        gameId: gameId,
        exists:true,
        attempts: censordAttempts,
        answerLength: game.val.length,
        playUrl:`${config.host}/play?game=${gameId}&guess=${config.YOURGUESS}`,
        newGameUrl:`${config.host}/new?answer=${config.CHOOSE_ONE}`
    }
}