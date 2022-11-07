// 문제 : 1,3,5,7,9 숫자를 한번씩 써서 만들 수 있는 두개의 숫자(예를들면 13, 579)중 곱한 값이 가장 큰 조합을 찾아주세요.

/**
* 조합 알고리즘을 사용하여 만들 수 있는 배열 찾는 함수
* @param {int[]} arr - 사용자가 입력한 input 배열
* @param {int} r - input배열의 길이 중 뽑은 개수 ex)4C3 이라면 3개를 뽑았으니 r = 3;
* @returns
*/

const testres = [];
const combination = (arr, r) => {
    if (r === 1) { // 1개를 택할 때에는 input 배열의 원소 return
        return arr.map((value) => [value]);
    }
    const results = [];

    arr.forEach((element, index) => {
        const smallerComb = combination(arr.slice(index + 1), r - 1);
        smallerComb.forEach((comb) => {
            const test = [element, ...comb];
            if(test.length === 3){
                myArray = arr.filter( ( el ) => !test.includes( el ) );
                testres.push({ 'first': test, 'seconde': myArray })
                console.log(myArray)
                
            }
            results.push([element, ...comb]);
            
        })
    });
    return results;
}
/**
* input 배열에서의 나머지를 찾는 함수
* @param {iut[]} arr 조합을 통해서 찾아낸 수
* @param {int[]} input 사용자가 처음에 입력한 input 배열
* @returns
*/
const findNmg = (arr, input) => {
    const results = [];
    arr.forEach((element) => {
        let difference = input.filter((x) => !element.includes(x));
        results.push(difference)
    })
    return results;
}
/**
* result * nmg 를 하여 최대값 찾는 함수
* @param {int[]} result 조합 함수 결과의 배열
* @param {int[]} nmg 그 나머지 함수의 결과 배열
* @returns
*/
const findResult = (result, nmg) => {
    let max = -1;
    for (let i = 0; i < result.length; i++) {
        let a = result[i].join();
        a = a.replace(/,/g, '');
        let b = nmg[i].join();
        b = b.replace(/,/g, '');
        a = Number(a); b = Number(b);
        // console.log(`${a} * ${b} = ${a*b}`);
        const res = a * b;
        if (max < res) {
            max = res;
        }
    }
    return max;
}

/////////////////main/////////////////
const input = [1, 3, 5, 7, 9];
input.sort((a, b) => {
    return b - a;
})
// 5C3에 해당 하는 결과
const r = Math.ceil(input.length / 2);
const result = combination(input, r);

console.log(testres);
//result 배열에서의 숫자를 제외한 숫자에 대한 배열
const nmg = findNmg(result, input);
console.log(result , nmg)
const answer = findResult(result, nmg);

console.log(answer);
console.log(751 * 93);



