const number =[1,2,3,4,5,6,7,8,9,10];
const newnumber = number.filter((num) => num%2!=0 );
console.log(newnumber)
const sum = number.reduce((acc , curr) => acc + curr);
console.log(sum);