import { config } from 'dotenv';
import server from './server';
import { env } from 'node:process';

const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;
env.MODE = 'prod';

server.listen(PORT, () => {
	console.log(`Sever is running on the port Localhost:${PORT}`);
});
