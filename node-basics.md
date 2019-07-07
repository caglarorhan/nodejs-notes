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

Tests are important as the production code. They are first-class citizens :)

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

- Create test files in ``tests`` folder with ``modulename.test.js`` format. Module name is the targeted js files name.

- in this file using builtin jest function ``test()`` which accept 2 arguments. First argument is the name of our test, we see this in command line. Second argument is a function which runs when we call this test.

- In this function there must be unit tests count as much as execution path counts.
- Execution paths are decision to return something and done with the function.

    // Testing numbers
    
in ``text.js`` file
    
    module.exports.absolute = function(number) {
        if(number > 0 ) return number; //1
        if(number < 0 ) return -number; //2 
        return 0; // 3
    }

In the function above, there are 3 execution paths that shown with numbers.
These paths must have covered in test file.

> lib.test.js file code is like this

    const lib = require('../lib'); // require origin js file
    //first execution path test
    test('absolute - should return positive number if input is positive', ()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })
    //second execution path test
    test('absolute - should return positive number if input is negative', ()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })
    //third execution path test
    test('absolute - should return zero if input is zero', ()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
    
**Grouping Tests**    
``absolute`` is test name pattern. In grouping we can give this name to group instead of tests.
Always group related test in ``describe`` block. And use ``it`` function instead of ``test`` function.

    const lib = require('../lib'); // require origin js file
    describe('absolute', ()=>{
    
    it('should return positive number if input is positive', ()=>{
            const result = lib.absolute(1);
            expect(result).toBe(1);
        })
        //second execution path test
        it('should return positive number if input is negative', ()=>{
            const result = lib.absolute(-1);
            expect(result).toBe(1);
        })
        //third execution path test
        it('should return zero if input is zero', ()=>{
            const result = lib.absolute(0);
            expect(result).toBe(0);
        })
 
    });
    
    
Unit test must be not too general and not too specific. If so it would be easily break.

instead of this

    describe('greet', ()=>{
        it('should return greeting message',()=>{
            const result = lib.greet('Caglar');
                expect(result).toBe('Welcome Caglar');
        })
    })

use this

    describe('greet', ()=>{
        it('should return greeting message',()=>{
            const result = lib.greet('Caglar');
                expect(result).toMatch(/Caglar/); // Regular Expressions
                //OR
                expect(result).toContain('Caglar');
        })
    })    

If we want to test multiple conditions in an array


describe('registerUser', ()=>{

        it('should throw if username is falsy', ()=>{
            // null
            // undefined
            // NaN
            // ''
            // 0
            // false
    
         //const result = lib.registerUser(null); // this is not working in toThrow
            // we are going to use another approach
            const args = [null, undefined, NaN, '', 0, false];
            args.forEach( a=>{
                expect(()=>{lib.registerUser(a)}).toThrow();
            });
    
        })
    
         //happy path
         it('should return a user object if valid username is passed', ()=>{
             const result = lib.registerUser('Caglar');
             expect(result).toMatchObject({username:'Caglar'});
             //we cant control id because in the registeredUser function id is current time and it would be passed till we check it in unit test
             // but we can control if it is greater than the function run time value at least.
             expect(result.id).toBeGreaterThan(0);
         })
    
    });

- **Unit tests are**
    - Easy to write
    - Fast to execute
    - Ideal for testing algorithms    
    
**Testing Continually**

Configure package.json     

    "scripts" : {
       "test": "jest --watchAll"         
    }

---

In unit test, you should not contact any external resources like databases. If so that will be an integration test. Bu we can use mock implementation. This means for example we can indirectly connect to a database. For this we use fake/mock functions. This is as easy as overwriting the original function.

Like if ``db.getCustomerSync`` function is original, but we will use 


    db.getCustomerSync = (userId)=> {
        //our test
        console.log('Fake db connection. Reading from db ;-) ');
        return {userId: userId, points:20}
    }

**Jest Mock Functions**

Jest has built-in mock function. This is an empty function. We can fill it with anything.

    const mockFunction = jest.fn();
    //mockFunction.mockReturnValue(1) // 1 may be any value
    
    mockFunction.mockResolvedValue(1); // this returns a Promise
    //mockFunction.mockRejectedValue(new Error('....')); // for rejecting
    const result = await mockFunction();
    
**Integration Testing**

Here is the real tests, for example database document CRUD processes.
In config folder, create ``test.json`` and paste all ``default.json`` content in it (db, JWTkey etc.) after that change db connection string into test database connection string.

**Test Driven Development (TDD)**

- Write failing test
- Write simplest code to make the test past
- Refactor if necessary
