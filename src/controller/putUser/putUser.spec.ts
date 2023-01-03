import { Server, IncomingMessage, ServerResponse } from 'http';
//@ts-ignore
import server from '../../server.ts';
import request from 'supertest';

let application: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeEach(async () => {
	jest.setTimeout(60000);
	application = server;
});

describe('Put user', () => {
	it('Server should answer with status code 200 and updated record', async () => {
		const user = await request(application)
			.post('/api/users')
			.send({
				username: 'Rarity',
				age: '30',
				hobbies: ['chess'],
			});

		const id = user.body.id;

		const res = await request(application)
			.put(`/api/users/${id}`)
			.send({
				username: 'Kiselwomen',
				age: '1',
				hobbies: ['math'],
			});
		expect(res.statusCode).toBe(200);
		expect(res.body).toMatchObject({ username: 'Kiselwomen' });
		expect(res.body).toMatchObject({ age: '1' });
		expect(res.body).toMatchObject({ hobbies: ['math'] });
	}, 60000);

	it('Server should answer with status code 400 and and corresponding message if  request body does not contain required fields', async () => {
		const user = await request(application)
			.post('/api/users')
			.send({
				username: 'Rarity',
				age: '30',
				hobbies: ['chess'],
			});

		const id = user.body.id;

		const res1 = await request(application).put(`/api/users/${id}`).send({});
		expect(res1.statusCode).toBe(400);
		expect(res1.body).toEqual('Request body does not contain required fields');

		const res2 = await request(application).put(`/api/users/${id}`);
		expect(res2.statusCode).toBe(400);
		expect(res2.body).toEqual('Request body does not contain required fields');
	}, 60000);

	it('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
		const user = await request(application)
			.post('/api/users')
			.send({
				username: 'Rarity',
				age: '30',
				hobbies: ['chess'],
			});

		const id = user.body.id;

		const res = await request(application)
			.put(`/api/users/${id}asd`)
			.send({
				username: 'Kiselwomen',
				age: '1',
				hobbies: ['math'],
			});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual('UserId is invalid (not uuid)');
	}, 60000);

	it('Server should answer with status code 404 and corresponding message if record with id === userId does not exist', async () => {
		const user = await request(application)
			.post('/api/users')
			.send({
				username: 'Rarity',
				age: '30',
				hobbies: ['chess'],
			});

		const id = user.body.id;
		await request(application).delete(`/api/users/${id}`);

		const res = await request(application)
			.put(`/api/users/${id}`)
			.send({
				username: 'Kiselwomen',
				age: '1',
				hobbies: ['math'],
			});
		expect(res.statusCode).toBe(404);
		expect(res.body).toEqual('User not found');
	}, 60000);
});

afterEach(async () => {
	application.close();
});
