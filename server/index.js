// Сервер для раздачи страничек
const SERVER_PORT = 3000;
const http = require('http');
const fs = require('fs');
const debug = require('debug');

// Environment variable
const log = debug('server');

// Создаем сервер
const server = http.createServer((req, res) => {
    const {url} = req;
    log('request', url);

    const fileName = url === '/' ? '/index.html' : url;

    // Читаем HTML-файл
    // Данный метод в отличие от readFileSync не блокирует выполнение других процессов
    fs.readFile(`${__dirname}/..${fileName}`, (err, file) => {
        if(err) {
            log('error');
            res.write('404 not found');
            res.end();
            return;
        }

        res.write(file);
        res.end();
    });
});

server.listen(SERVER_PORT);