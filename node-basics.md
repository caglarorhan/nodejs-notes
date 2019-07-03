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
 
 **Joi** gelen verilerin validasyonunda kullaniliyor. 
Joi nin MongoDB ObjectId'sinin validasyonu da yapabilmesi icin **joi-objectid** paketi de kurulmalidir.
 Joi icin bir paket daha var, joi-password-complexity, parola girisini kontrol etmeye yariyor.
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


--- 
belirli bir namespace icindeki debug mesajlari icin ``debug`` isimli modulu kullaniriz
`npm install debug`

Daha sonra bunlari

    const startupDebugger = require('debug')('app:startup');
    const dbDebugger = require('debug')('app:db');

seklinde require ettikten sonra cli de debug mesajlarini gorebiliriz.


---

**YAYGIN PAKETLER ve KULLANIM AMACLARI**

**winston:** error, exception ve unhandledrejection vb. loglanmasinda kullanilir, txt dosyasina veya mongodb uzerine kayit yapabilir. Express bagimlidir. Ancak express disindaki node hatalari icin Node process ozelligi kullanilarak yine log aldirilabilir. 

    process.on('unhandleRejection', ()=> {
    // burada exception throw edilebilir, boylece winston yakalar
    })
---

**TESTS**

**Types of Test**
- Unit
- Integration
- End-to-end

**Test Pyramid**

Unit tests at the base of pyramid. Most of test are unit test. Easy to write, written quickly. Edge cases tested with unit test.

Integration test are tests integration of your application code with its external dependencies. They don't dealing with and includes user interface complexities.

E2E test for key functions of application. You should not test edge cases with e2e. You only test the happy path. User interface tested here.

**Recommendations**
- Favour unit tests to e2e test.
- Cover unit test gaps with integration test.
- Use end-to-end test sparingly.

**Test Frameworks**
- Jasmine
- Mocha (+plugins: Chai, Sinon)
- Jest (a kind of wrapper around Jasmine)

> Mocha has a library/plugin dependencies. Jest is wrapped Jasmine (test are worked on jasmine too). Because of these reasons we will stick to Jest. Every thing we need is in Jest.

**Jest**
- in package.json change 

    ``"scripts": { "test": COMMAND}``
    
> npm test

runs the command. If we use ``jest`` in place of ``COMMAND`` it will run ``jest`` test scripts.

Jest runs test in ``spec`` or ``test`` `.js files`

- Create test files in ``tests`` folder with ``filename.test.js`` format. Filename is the targeted js files name.

