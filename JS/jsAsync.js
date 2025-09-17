// function register(){
//     setTimeout(()=>{
//         console.log('register end');
//     },2000);
// }
// function sendEmail(){
//     setTimeout(()=>{
//         console.log('send email end');
//     },2000);
    
// }
// function login(){
//     setTimeout(()=>{
//         console.log('login end');
//     },2000);
// }
// function getData(){
//     setTimeout(()=>{
//         console.log('get data end');
//     },2000);
    
// }
// function displayData(){
//     setTimeout(()=>{
//         console.log('display Data End');
//     },2000);
    
// }

// register();
// sendEmail();
// login();
// getData();
// displayData();
// console.log('call other application');

// callback hell

// register(()=>{
//     sendEmail(()=>{
//         login(()=>{
//             getData(()=>{
//                 displayData(()=>{
//                     console.log('call other application');
//                 });
//             });
//         });
//     });
// });

function register(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log('register end');
        resolve();
    },2000);
    })
}
function sendEmail(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log('send email end');
        resolve();
    },2000)
    }) 
}
function login(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log('login end');
        resolve();
    },2000);
    })
}
function getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log('get data end');
        reject();
    },2000);
    }) 
}
function displayData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log('display Data End');
        resolve();
    },2000);
    }) 
}
// register().then(sendEmail).then(login).then(getData).then(displayData)
// console.log("call other application")

async function f1() {
    try{
        await register();
    await sendEmail();
    await login();
    await getData();
    await displayData();
    }
    catch(err){
        console.log("Error : ",err);
    }
}
f1();
console.log('call other application');