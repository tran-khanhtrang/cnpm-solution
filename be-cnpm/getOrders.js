const http = require('http');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTUxZmY4ZjI5NWJjZTA0Y2Y3ZmUxZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc3MjQyOTUyOCwiZXhwIjoxNzcyNTE1OTI4fQ.Nukwv58zcXJ3tBpqw2fxqFPbUunS3Sn0H9Shbq1p8r4";

const options = {
    hostname: '127.0.0.1',
    port: 3001,
    path: '/api/order/get-all-order',
    method: 'GET',
    headers: {
        'token': `Bearer ${token}`
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        try {
            const response = JSON.parse(body);
            console.log(JSON.stringify(response, null, 2));
        } catch (e) {
            console.log(body);
        }
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.end();
