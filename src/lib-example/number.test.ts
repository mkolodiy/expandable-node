// tslint:disable:no-expression-statement
import { double, power } from './number';

test('power', () => {
  expect(power(2, 2)).toBe(4);
});

test('double', () => {
  expect(double(2)).toBe(4);
});
