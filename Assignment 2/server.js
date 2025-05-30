const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const folderPath = path.join(__dirname, 'files');

// Ensure 'files' folder exists
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const filename = url.searchParams.get('name') || 'test.txt';
    const filepath = path.join(folderPath, filename);

    // Serve index.html
    if (pathname === '/' && req.method === 'GET') {
        const htmlPath = path.join(__dirname, 'index.html');
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading HTML');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // Handle POST /create with custom content
    else if (pathname === '/create' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                const content = parsed.content || 'Empty file';
                fs.writeFile(filepath, content, (err) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Error creating file');
                    }
                    res.writeHead(200);
                    res.end(`File "${filename}" created with your content.`);
                });
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }

    // Handle GET /read
    else if (pathname === '/read' && req.method === 'GET') {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    // Handle GET /delete
    else if (pathname === '/delete' && req.method === 'GET') {
        fs.unlink(filepath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found or already deleted');
            }
            res.writeHead(200);
            res.end(`File "${filename}" deleted`);
        });
    }

    // Fallback
    else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});