import { config } from 'dotenv';
import server from './server';

const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;

server.listen(PORT, () => {
	console.log(`Сервер запущен на Localhost:${PORT}`);
});
