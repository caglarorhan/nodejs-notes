**Node Basic Notes**
---
**Re**presentational **S**tate **T**ransfer

HTTP Methods
 - GET
 - POST
 - PUT
 - DELETE
 
 
 ---
 Change listening port from cli
 
 ``set PORT=5000`` in Windows (change listening port to 5000)
 
 ``export PORT=5000`` in Mac (change listenin port to 5000)
 
 to get default port in use/ or otherwise use port 3000
 
 ``const port = process.env.PORT || 3000;``
 
 ---
 **raw parameters**
 
 http://localhost:3000/api/posts/**2019/05**?sortBy=name
 
 app.get('/api/posts/:year/:month', (req,res)=> {
     res.send(req.params);
 })

**query string parameters**

 
 http://localhost:3000/api/posts/2019/05**?sortBy=name**
 
 app.get('/api/posts/:year/:month', (req,res)=> {
     res.send(req.query);
 }
 
 ---
 in express when we create
    
    const express = require('express');
    const app = express();
    
    
 and after every ``app.use()`` we are entering middleware section
    
    app.use(function(req, res, next)){
    // this function is a middle ware
    // this function can return a res or pass something to other middleware (function)
    // next ends the middleware if we will end the function it is a must.
    }
 
 - middleware functions runs in sequence
 - for clean coding middleware functions written in another file than exported
 ---
 **Package:** 
 joi
 
 ---
 
`` process.env.NODE_ENV`` gives the environment of this running application


> cli uzerinden set edilir

 ``set NODE_ENV=production`` seklinde


---
    console.log(`Node Env: ${process.env.NODE_ENV}`); // default is undefined

    console.log(`app : ${app.get('env')}`) // default is development


---
config isimli package bak, konfigurasyonu yonetmeye yariyor

birden fazla config olabilir (production.json, development.json, default.json)

bazi ozel degiskenleri production surumunde sadece NODE_ENV icinde saklamak isteriz
development surumunde ise config icinde yer almasi sorun dogurmaz. Production da yer alacak NODE_ENV degerlerine atifta bulunan json dosyasinin sabit adi ``custon-environment-variables.json`` olmalidir. Bu dosya da config klasorunde yer alir.
Bu dosyada degiskenlere NODE_ENV degiskeni adi verilir

    {
      "mail": {
        "password": "app_password"
      }
    }
//
asagidaki sekilde **cli** icinden degistirilir

    set app_password=56789


--- belirli bir namespace icindeki debug mesajlari icin ``debug`` isimli modulu kullaniriz
`npm install debug`

Daha sonra bunlari

    const startupDebugger = require('debug')('app:startup');
    const dbDebugger = require('debug')('app:db');

seklinde require ettikten sonra cli de debug mesalarini gorebiliriz.
