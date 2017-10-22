import {loop, add, throws} from './index';
import * as Module from './index';
import mockingoose from 'mockingoose';
import employeeSchema from './index';

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

describe('mockingoose', () => {
	beforeEach(() => mockingoose.resetAll());

/*	describe('mock tests', () => {
		test('validate', () => {
			const emp = new employeeSchema({
				name: 'name',
				jobTitles: ['namejob', 'jobname']
			});
			return emp.validate().then(() => { 
				expect(emp.toObject()).toHaveProperty('_id');
			});
		});
	});*/


});	
