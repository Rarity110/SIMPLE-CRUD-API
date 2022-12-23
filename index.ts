import http from 'http';

const host = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/api/users':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(res);
                    break;
                default:
                    break;
            }
            break;
        case 'POST':

            break;
        default:
                break;
    }


   
});

server.listen(port, host, () => {
    console.log("Сервер запущен");
})