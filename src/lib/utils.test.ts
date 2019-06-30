// tslint:disable:no-expression-statement
import { Utils } from './utils';

test('checkIfElementContainsClassName', () => {
  const element: Element = document.createElement('div');
  element.classList.add('testClass1');
  expect(
    Utils.checkIfElementContainsClassName(element, 'testClass1')
  ).toBeTruthy();
  expect(
    Utils.checkIfElementContainsClassName(element, 'testClass2')
  ).toBeFalsy();
});
