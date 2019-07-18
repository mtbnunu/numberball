const http = require('http');
const url = require('url');
const config = require("./config")

const newgame = require("./newgame")
const playgame = require("./playgame")
const checkstatus = require("./checkstatus")

http.createServer(function (req, res) {
    const parts = url.parse(req.url, true)
    try{
        let response;
        switch(parts.pathname){
            case "/new":
                response = newgame(parts.query.answer);
                break;

            case "/play":
                response = playgame(parts.query.game, parts.query.guess, req.connection.remoteAddress);
                break;

            case "/status":
                response = checkstatus(parts.query.game);
                break;

            default:
                throw {status:404, message: "not found"}
                break;

        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();

    }
    catch(err){
        if(err.status){
            res.writeHead(err.status, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(err));
            res.end();
        }else{
            console.error(err)
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.write('error');
            res.end();
        }
    }

  }).listen(8080);
