const fs = require('fs');
const path = require('path');
const fullPath = require('../util/path');


module.exports = class User{
    constructor(u){
        this.username = u;
    }

    save(){
        const targetFile = path.join(fullPath,'data','users.json');
        fs.readFile(targetFile, (err, fileContent)=>{
            let users = [];
            if(!err){
                 users = JSON.parse(fileContent); 
                }
            users.push(this);
            fs.writeFile(targetFile, JSON.stringify(users), (err)=>{
                console.log(err);
            } )
        })
    }

    

    static fetchAll(){
        const targetFile = path.join(fullPath,'data','users.json');
        fs.readFile(targetFile, (err, fileContent)=>{
            if(err){
                return [];
            }
            //console.log(JSON.parse(fileContent));
                return JSON.parse(fileContent); 
                
        });
    }
}