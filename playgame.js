const mem = require("./memory");
const config = require("./config")
const guessNumber = require("./guess")

module.exports = function(gameId, guess, ip){
    const game = mem.get(gameId)
    if(!game){
        throw {status:404, message: "game not found for id " + gameId}
    }
    if(guess == config.YOURGUESS){
        throw {
            status: 400,
            message: `replace ${config.YOURGUESS} with 'your guess' and try again`
        }
    }

    if(!game.attempts[ip]){
        game.attempts[ip] = []
    }

    if(game.attempts[ip].some(e=>e.success)){
        throw {
            status: 400,
            message: "already completed!",
            statusUrl:`${config.host}/status?game=${gameId}`,
            newGameUrl:`${config.host}/new?answer=${config.CHOOSE_ONE}`
        }
    }
    
    const result = guessNumber(game.val, guess);
    game.attempts[ip].push(result)
    return result    
}