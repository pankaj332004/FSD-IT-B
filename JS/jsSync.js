function register(){
    waitForFiveSeconds();
    console.log('register end');
}

function sendEmail(){
    waitForFiveSeconds();
    console.log('send email end');
}

function login(){
    waitForFiveSeconds();
    console.log('login end');
}

function getData(){
    waitForFiveSeconds();
    console.log('get data end');
}

function displayData(){
    waitForFiveSeconds();
    console.log('display data end');
}
function waitForFiveSeconds(){
    const ms= new Date().getTime()+5000;
    const ct = new Date().getTime();
    while(ct<ms){

    }
}
register();
sendEmail();
login();
getData();
displayData();
console.log('call other application');