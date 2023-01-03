import { config } from 'dotenv';
//@ts-ignore
import server from './server.ts';

const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;

server.listen(PORT, () => {
	console.log(`Сервер запущен на Localhost:${PORT}`);
});
