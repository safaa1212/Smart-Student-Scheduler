const http = require('http');

const data = JSON.stringify({
  name: "Lama",
  email: "lama@mail.com",
  password: "lama123"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/students',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('✅ Response:', res.statusCode);
    console.log('📦 Body:', body);
  });
});

req.on('error', error => {
  console.error('❌ Error:', error.message);
});

req.write(data);
req.end();