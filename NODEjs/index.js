const fs = require('fs');
// fs.writeFile("./ad.txt","code is very good time pass",()=>{});
// fs.readFile("./ad.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// })

// fs.appendFile("./ad.txt","and i am happy",()=>{});
// fs.appendFile("./ad.txt","also enjoying",(err,result)=>{
//     if(err){
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// });

// fs.writeFile("./a1.txt","Hello world",()=>{});
// fs.writeFile("./b1.txt","",()=>{});
fs.cp("./a1.txt","./b1.txt",(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});