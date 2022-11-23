

const apolloMutation = async (query) => {
    let result;
    try{
        result = await query;
    }catch(err){
        console.log(err);
    }
    console.log(result);
    return result;
}

export  {
    apolloMutation
}