const findThreeResult = (arr)=> {
    // a * bc
    const a = arr[0];
    const bc = Number(arr[1].toString() + arr[2].toString());
    return a * bc;
}
const findFoutResult  = (arr) => {
    // ad * bc
    const ad = Number(arr[0].toString() + arr[3].toString());
    const bc = Number(arr[1].toString() + arr[2].toString());
    return ad * bc;
}
const findFiveResult = (arr)=> {
    // ad * bce
    const ad = Number(arr[0].toString() + arr[3].toString());
    const bce = Number(arr[1].toString() + arr[2].toString()+ arr[4].toString());
    return ad * bce;
}
const findSixResult = (arr)=> {
    // adf * bce      
    const adf = Number(arr[0].toString() + arr[3].toString()+ arr[5].toString());
    const bce = Number(arr[1].toString() + arr[2].toString()+ arr[4].toString());
    return adf * bce;
}
const findSevenResult = (arr)=> {
    // adf *  bceg
    const adf = Number(arr[0].toString() + arr[3].toString()+ arr[5].toString());
    const bceg = Number(arr[1].toString() + arr[2].toString()+ arr[4].toString()+ arr[6].toString());
    return adf * bceg;
}
const findEightResult = (arr)=> {
    //  adfh *  bceg
    const adfh = Number(arr[0].toString() + arr[3].toString()+ arr[5].toString()+ arr[7].toString());
    const bceg = Number(arr[1].toString() + arr[2].toString()+ arr[4].toString()+ arr[6].toString());
    return adfh*bceg;
}
const findNineResult = (arr)=> {
    // bcegi *  adfh
    const bcegi= Number(arr[1].toString() + arr[2].toString()+ arr[4].toString()+ arr[6].toString()+ arr[8].toString());
    const adfh = Number(arr[0].toString() + arr[3].toString()+ arr[5].toString()+ arr[7].toString());
    return bcegi*adfh;
}

/////////////////main/////////////////
const input = [1,2,3,4,5,6,7,8, 9];
input.sort((a, b) => {
    return b - a;
})
let result;
switch(input.length){
    case 1 :
        result = input[0];
        break;
    case 2 :
        result = input[0] * input[1];
        break;
    case 3 :
        result = findThreeResult(input);
        break;
    case 4 :
        result = findFoutResult(input);
        break;
    case 5 :
        result = findFiveResult(input);
        break;
    case 6 :
        result = findSixResult(input);
        break;
    case 7 :
        result = findSevenResult(input);
        break;
    case 8 :
        result = findEightResult(input);
        break;
    case 9 :
        result = findNineResult(input);
        break;
    default :
}
console.log(result);