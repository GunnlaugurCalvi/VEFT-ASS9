import mongo from 'mongodb-memory-server';
import app from './app'
import mongoose from 'mongoose';
import {loop, add, throws, Employee} from './app';
import * as Module from './app';
import request from 'supertest';

mongoose.Promise = global.Promise;
let mongoServer;
let server;

beforeAll(() => {
	return new Promise((resolve, reject) => {
		mongoServer = new mongo();
		mongoServer.getConnectionString().then((mongoUri) => {
			mongoose
			.connect(mongoUri, {
			  useMongoClient: true,
			})
			.then(db => {
				server = app(db);
				resolve();
			});
		});
	});
});

afterEach(() => {
	return Promise.all([
		new Promise((resolve, reject) => {		
			Employee.deleteMany({}, (err, data) => {
				resolve();
			});
		})
	]);
});

const createEmployee = (human, cb) => {
	let promises = [];
	for(let i = 0; i < human; i++){
		promises.push(
			new Promise((resolve, reject) => {
				request(server)
				.post('/job')
				.send({name: 'Billie Joe JimBob', jobTitles: [`laywer ${i}`]}).set("Authorization", "admin")
				.then(res => {
					 resolve();
				});
			})
		);
	}
	Promise.all(promises).then(cb);
};

describe('add', () => {
	test('Should successfully add two integers together', () => {
		expect(add(1,1)).toBe(2);
	});
	test('should return just 1', () => {
		expect(add(null, 1)).toBe(1);
	});
	test('nothing is entered returns 0', () => {
		expect(add()).toEqual(NaN);
	});
});

describe('throws', () => {
	test('Should not throw error', () => {
		const callSum = () => {
			throws(true);
		};
	expect(callSum).toThrowError('You need to mock me');
	});	
});

describe('loop', () => {
	test('Add should get called N times', () => {	
			const mySpy = jest.spyOn(Module, 'add');
			for(let i = 0; i < 100; i++)
			{
				add(1,15);
			}		
			add(2,3);
			add(4,6);
			expect(mySpy).toHaveBeenCalledTimes(102);
	});
});

describe('server', () => {
	
	test('should return 400 when posting data is invalid', (done) => {
		request(server).post('/job').send({name: 'gulli'}).set("Authorization", "admin")
		.expect(400).then(res => done());
	});

	test('should return 200 when posting data', (done) => {
		request(server).post('/job').send({name: 'gulli', jobTitles: ['hakks']}).set("Authorization", "admin")
		.expect(200).then(res =>{
			expect(res.body.name).toBe('gulli');
			expect(res.body.jobTitles).toEqual(['hakks']);
			done();
		});
	});

	test('should return 401 when posting data is denied', (done) => {
		request(server).post('/job').send({name: 'gulli', jobTitles: ['hakks']})
		.expect(401).then(res =>{
			done();
		});
	});

 	test('should return empty for employee', (done) => {
		request(server).get('/job').expect(200).then(res => {
			expect(res.body).toEqual({data :[]});
			done();
		});
	});

	test('should create 5 employees as a lawyer when its created', (done) => {
		createEmployee(5, () => {
			request(server).get('/job').expect(200).then(res => {	
				expect(res.body).toMatchSnapshot('should create 5 employees as a lawyer when its created');
				done();
			})
		});
	});

});
