import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';
import { config } from 'dotenv';
import server from './server';
// import { IUser } from './interfaces';

const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;
const numCPUs = cpus().length;
// let users: IUser[] = [];

if (cluster.isPrimary) {
	console.log(`Primary ${process.pid} is running`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.schedulingPolicy = cluster.SCHED_NONE;
		cluster.fork({ workerPort: Number(PORT) + i + 1 });
	}

	cluster.on('fork', (worker) => {
		console.log(`${worker.id} is running`);
	});

	// cluster.on('listening', (worker, address) => {
	// 	console.log(`A worker is now connected to ${address.address}:${address.port}`);
	// });

	cluster.on('exit', (worker) => {
		console.log(`The worker ${worker.id} died`);
		cluster.fork();
	});
	server.listen(PORT, () => console.log(`Sever is running on the port: ${PORT}`));
} else {
	server.listen(process.env.workerPort, () =>
		console.log(`Sever is running on the port: ${process.env.workerPort}`),
	);
	console.log(`Worker ${process.pid} started`);
}

// if (cluster.isPrimary) {
// 	console.log(`Primary ${process.pid} is running`);

// 	for (let i = 0; i < numCPUs; i++) {
// 		cluster.schedulingPolicy = cluster.SCHED_NONE;
// 		cluster.fork();
// 	}

// 	cluster.on('fork', (worker) => {
// 		console.log(`${worker.id} is running`);
// 	});

// 	cluster.on('exit', (worker) => {
// 		console.log(`The worker ${worker.id} died`);
// 		cluster.fork();
// 	});
// } else {
// 	server.listen(PORT, () => console.log(`Sever is running on the port: ${PORT}`));
// 	console.log(`Worker ${process.pid} started`);
// }

// export default users;
