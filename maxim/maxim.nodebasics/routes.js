
const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;

    switch (method) {
        case "POST":
            const body = [];
            let userName='';

            req.on('data', (chunk) => {
                //console.log(chunk);
                body.push(chunk);
            });
            req.on('end',()=>{
                const parsedBody = Buffer.concat(body).toString();
                userName = parsedBody.split('=')[1];
                console.log('username:'+userName);
                switch (url) {
                    case "/create-user":
                        res.write('<html>');
                        res.write('<head><title>New User</title></head>');
                        res.write(`<body>New user is: ${userName}</body>`)
                        res.write('<html>');
                        return res.end();
                        break;
                }
            })
            break;
        case "GET":
            switch (url) {
                case "/":
                    res.write('<html>');
                    res.write('<head><title>Welcome to Users Pages</title></head>');
                    res.write(`
                                <body><h1>Welcome to Users List</h1>
                                <form action="/create-user" method="POST">
                                    New User:<input type="text" name="userName">
                                    <button type="submit">Submit</button>
                                </form>
                                </body>

                             `);
                    res.write('<html>');
                    return res.end();
                    break;
                case "/users":
                    res.write('<html>');
                    res.write('<head><title>Users Lists</title></head>');
                    res.write(`<body><ul><li>Caglar Orhan</li><li>Ahmet Orhan</li><li>Johny Orhan</li></ul></body>`)
                    res.write('<html>');
                    return res.end();
                    break;
                default:
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                    break;

            }

            break;
        default:
            console.log('Error!')
    }
}

module.exports = requestHandler;

