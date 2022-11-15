// 문제 : 1,3,5,7,9 숫자를 한번씩 써서 만들 수 있는 두개의 숫자(예를들면 13, 579)중 곱한 값이 가장 큰 조합을 찾아주세요.

let fixedR;
const results = [];

const combination = (arr, r) => {
    if (r === 1) { // 1개를 택할 때에는 input 배열의 원소 return
        return arr.map((value) => [value]);
    }
    const combResult = [];

    arr.forEach((element, index) => {
        const smallerComb = combination(arr.slice(index + 1), r - 1);
        smallerComb.forEach((comb) => {
            const highDigit = [element, ...comb];
            if(highDigit.length === fixedR){
                const lowDigit = arr.filter( ( el ) => !highDigit.includes( el ) );
                results.push({ 'highDigit': highDigit, 'lowDigit': lowDigit })
            }
            combResult.push([element, ...comb]);
        })
    });
    return combResult;
}

const findResult = ()=> {
    let max = -1;
    results.forEach(el => {
        const highDigit = el.highDigit;
        const lowDigit = el.lowDigit;
        let formedHigh = '';
        let formedLow = '';
        highDigit.forEach((el)=> {
            el.toString();
            formedHigh = formedHigh.concat(el);
        })
        lowDigit.forEach((el)=> {
            el.toString();
            formedLow = formedLow.concat(el);
        })
        formedHigh = Number(formedHigh);
        formedLow = Number(formedLow);
        
        const res = formedHigh * formedLow;
        if (max < res) {
            max = res;
        }
    })
    return max;
}

/////////////////main/////////////////
const input = [1,2,3,4,5,6,7,8, 9];
input.sort((a, b) => {
    return b - a;
})
// 5C3에 해당 하는 결과
const r = Math.ceil(input.length / 2);
fixedR = r;
combination(input, r); // combination을 돌려주면서 results를 찾아냄.
const result = findResult();

console.log(result);




