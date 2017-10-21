const {add, throws} = require("./index");
//import * as th from './index';

describe('add', () =>{
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
/*	test('should test if it returns false', () => {
		throws(true,() => {
			expect(true).toThrowError('You need to mock me');
		});	
	});	*/
});
