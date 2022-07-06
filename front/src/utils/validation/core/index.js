
const checkIdea = (subject, content)=> {
    console.log(content)
    if(subject === ''){
        return {message : '제목을 입력해주세요.'};
    }
    if(content === ''){
        return {message : '내용을 입력해주세요.'};
    }
    return true;
}



export default {
    checkIdea
}