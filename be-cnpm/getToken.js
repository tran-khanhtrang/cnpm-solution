const http = require('http');

const data = JSON.stringify({
    email: 'admin@gmail.com',
    password: 'admin'
});

const options = {
    hostname: '127.0.0.1',
    port: 3001,
    path: '/api/user/sign-in',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        const response = JSON.parse(body);
        console.log(response.access_token);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
