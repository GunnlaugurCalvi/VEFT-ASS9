import mongo from 'mongodb-memory-server';
import app from './app'
import mongoose from 'mongoose';
import {loop, add, throws} from './app';
import * as Module from './app';
import request from 'supertest';
// import mockingoose from 'mockingoose';

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
			add(2,3);
			add(4,6);
			expect(mySpy).toHaveBeenCalledTimes(2);
	});
});

describe('server', () => {
	test('should return empty for employee', (done) => {
		request(server).get('/').expect(200).then(res => {
			expect(res.body).toEqual({data :[]});
			done();
		});
	});
});