// tslint:disable:no-expression-statement
import { Utils } from '../src/lib/utils';
import { Errors } from '../src/lib/variables';

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

describe('removeSelectionFromAllShapes', () => {
  afterEach(() => {
    const wrapperEl = document.body.querySelector('.exp-node-wrapper');
    if (wrapperEl != null) {
      document.body.removeChild(wrapperEl);
    }
  });

  test('success', () => {
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('exp-node-wrapper');
    document.body.appendChild(wrapperEl);
    const selectionEl1 = createSelectionEl();
    const selectionEl2 = createSelectionEl();
    wrapperEl.appendChild(selectionEl1);
    wrapperEl.appendChild(selectionEl2);
    Utils.removeSelectionFromAllShapes();
    expect(selectionEl1.classList.length).toBe(1);
    expect(selectionEl2.classList.length).toBe(1);
  });

  test('failure', () => {
    expect(Utils.removeSelectionFromAllShapes).toThrowError(
      Errors.WRAPPER_NOT_FOUND
    );
  });

  const createSelectionEl = (): Element => {
    const selectionEl: Element = document.createElement('div');
    selectionEl.classList.add('exp-node-shape-selection');
    selectionEl.classList.add('z-depth-1');
    return selectionEl;
  };
});
