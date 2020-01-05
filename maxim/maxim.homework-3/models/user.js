const users =[];
module.exports = class User{
    constructor(u){
        this.username = u;
    }

    save(){
        users.push(this);
    }

    static fetchAll(){
        return users;
    }
}