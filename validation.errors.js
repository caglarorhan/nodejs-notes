// you can iterate over validation errors (if multiple)

try{
    //save operations
}
catch(ex){
    for(field in ex.errors){
        //console.log(ex.errors[field]);
        console.log(ex.errors[field].message);
    }
}
