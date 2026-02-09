const http = require('http');
const server=http.createServer((req,res)=>{
    if(req.url==='/' && req.method=="POST"){
        res.end("Home Page")
    }
    else if(req.url==='/data'){
        res.end('display data');
    }
    else if(req.url==="/add" && req.method=="POST"){
        let body='';

        req.on("data",(chunk)=>{
            body += chunk;
        })
        req.on("end",()=>{
        req.writeHead(200,{"content-type":"application/json"})
        res.end(body);
        })
    }
    else{
        res.end("Error : URL NOT Found")
    }
})

server.listen(4000,()=>{
    console.log("server os runing on the port 4000");
});

