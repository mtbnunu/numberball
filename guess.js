const unique = require ("./unique.js");
module.exports = function(val,guess){
    if(!unique(guess)){
        throw {status:400,message:"guess is not a valid set of unique numbers"}
    }
    if(guess.length !== val.length){
        throw {status:400, message: `length of guess is incorrect: should be ${val.length}`}
    }

    let nStrike = 0;
    let nBall = 0;

    for(let i = 0;i<4;i++){
        if(val[i] === guess[i]){
            nStrike++
        }else if(val.includes(guess[i])){
            nBall++
        }
    }
    if(nStrike === val.length){
        return {success:true}
    }

    return{ball:nBall, strike:nStrike}
}