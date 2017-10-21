const {add} = require("./index");

describe('Remove me', () => {
  test('Remove this', () => {
   expect(1).toBe(1);
  });
	describe('add', () =>{
		test('Should successfully add two integers together', () => {
			expect(add(1,1)).toBe(2);
		});
	});
	describe('add', () => {
		test('should return just 1', () => {
			expect(add(null, 1)).toBe(1);
		});
	});
	describe('add', () => {
		test('nothing is entered returns 0', () => {
			expect(add()).toEqual(NaN);
		});
	});
});
