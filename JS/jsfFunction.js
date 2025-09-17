// function hello(user='Guest'){
//     console.log(`hello ${user}`);
// }

// hello('pankaj');
// hello();

// function sum(a,b=1){
//     console.log("Before return");
//     return a+b;
//     console.log("After return");
// }
//  let s = sum(12,35);
//  console.log(s);
//  console.log(sum(1));
//  console.log(sum());

// anonymous function
// const hello= ()=>{
//     console.log("hello world");
// }
// hello();
// //console.log(hello());
const add=(a,b)=>{
    console.log(a+b);
}
//add(4,5);

// IIFE
// (function(){
//     console.log("hello pankaj");
// })();

// callback
function hello(user,callback){
    console.log(`hello ${user}`);
    callback();
}
hello('Admin',()=>{{
    console.log(add(4,6));
}});