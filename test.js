// 문제 : 1,3,5,7,9 숫자를 한번씩 써서 만들 수 있는 두개의 숫자(예를들면 13, 579)중 곱한 값이 가장 큰 조합을 찾아주세요.

const combination = (arr, r) => {
    if (r === 1) { // 1개를 택할 때에는 input 배열의 원소 return
        return arr.map((value) => [value]);
    }
    const results = [];

    arr.forEach((element, index) => {
        const smallerComb = combination(arr.slice(index + 1), r - 1);
        smallerComb.forEach((comb) => {
            results.push([element].concat(comb));
        })
    });
    return results;
}

const findNmg = (arr, input) => {
    const results = [];
    arr.forEach((element) => {
        let difference = input.filter((x) => !element.includes(x));
        results.push(difference)
    })
    return results;
}
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
//result 배열에서의 숫자를 제외한 숫자에 대한 배열
const nmg = findNmg(result, input);
const answer = findResult(result, nmg);

console.log(answer);