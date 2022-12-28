import http from 'http';
import customRouter from './src/router.js';

const port = 4000;

const server = http.createServer((req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    
    try {
        if (req.url && req.method) {
            const router = customRouter(req, res );
        }
    } catch (error) {
        res.writeHead(500);
        res.end('Server error');
    }

});

server.listen(port, () => {
    console.log(`Сервер запущен на Localhost:${port}`);
})