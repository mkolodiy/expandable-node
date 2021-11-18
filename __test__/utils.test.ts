// tslint:disable:no-expression-statement
import { Node, NodeCallbacks, NodeType } from '../src/lib/models';
import { Utils } from '../src/lib/utils';
import { ClassNames, Errors, Selectors } from '../src/lib/variables';

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
    const wrapperEl = document.body.querySelector(Selectors.WRAPPER);
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
    selectionEl.classList.add(ClassNames.SHAPE_SELECTION);
    selectionEl.classList.add(ClassNames.SHAPE_SELECTION_ACTIVE);
    return selectionEl;
  };
});

describe('getCssClassForAssignedType', () => {
  test('return css class', () => {
    const node: Node = createTestNode('someType');
    const types: ReadonlyArray<NodeType> = createTypesArray();

    expect(Utils.getCssClassForAssignedType(node, types)).toBe('someCssClass');
  });

  test('return empty string when type is not present in types array', () => {
    const node: Node = createTestNode('someDifferentType');
    const types: ReadonlyArray<NodeType> = createTypesArray();

    expect(Utils.getCssClassForAssignedType(node, types)).toBe('');
    expect(Utils.getCssClassForAssignedType(node)).toBe('');
  });

  test('return empty string when type is not set on a node', () => {
    const node: Node = createTestNode();
    const types: ReadonlyArray<NodeType> = createTypesArray();

    expect(Utils.getCssClassForAssignedType(node, types)).toBe('');
  });

  const createTestNode = (nodeType?: string): Node => {
    return nodeType !== undefined
      ? {
          id: 'someNode',
          description: 'someNode',
          type: nodeType
        }
      : {
          id: 'someNode',
          description: 'someNode'
        };
  };

  const createTypesArray = (): ReadonlyArray<NodeType> => {
    return [
      {
        type: 'someType',
        cssClass: 'someCssClass'
      }
    ];
  };
});

test('arrayEmpty', () => {
  const testArray1: ReadonlyArray<number> = [1, 2, 3];
  const testArray2: ReadonlyArray<number> = [];
  const testArray3: any = null;
  expect(Utils.arrayEmpty(testArray1)).toBeFalsy();
  expect(Utils.arrayEmpty(testArray2)).toBeTruthy();
  expect(Utils.arrayEmpty(testArray3)).toBeTruthy();
  expect(Utils.arrayEmpty()).toBeTruthy();
});

test('arrayNotEmpty', () => {
  const testArray1: ReadonlyArray<number> = [1, 2, 3];
  const testArray2: ReadonlyArray<number> = [];
  const testArray3: any = null;
  expect(Utils.arrayNotEmpty(testArray1)).toBeTruthy();
  expect(Utils.arrayNotEmpty(testArray2)).toBeFalsy();
  expect(Utils.arrayNotEmpty(testArray3)).toBeFalsy();
  expect(Utils.arrayNotEmpty()).toBeFalsy();
});

test('checkIfObjectHasProperty', () => {
  const object1 = {
    property1: 'property',
    property2: 123
  };
  expect(Utils.checkIfObjectHasProperty(object1, 'property1')).toBeTruthy();
  expect(Utils.checkIfObjectHasProperty(object1, 'property2')).toBeTruthy();
  expect(Utils.checkIfObjectHasProperty(object1, 'property3')).toBeFalsy();

  const dummyFn = () => {
    // Unused body
  };
  const object2: NodeCallbacks = {
    deleteBtnCb: dummyFn,
    editBtnCb: dummyFn
  };
  expect(Utils.checkIfObjectHasProperty(object2, 'deleteBtnCb')).toBeTruthy();
  expect(Utils.checkIfObjectHasProperty(object2, 'editBtnCb')).toBeTruthy();
  expect(Utils.checkIfObjectHasProperty(object2, 'expandBtnCb')).toBeFalsy();
  expect(Utils.checkIfObjectHasProperty(object2, 'selectCb')).toBeFalsy();

  const object3 = undefined;
  expect(Utils.checkIfObjectHasProperty(object3, 'someProperty')).toBeFalsy();
});

test('isDefined', () => {
  const test1 = 123;
  const test2 = 'someTestString';
  const test3 = null;
  const test4 = undefined;
  const test5 = () => {
    // Unused body
  };
  expect(Utils.isDefined(test1)).toBeTruthy();
  expect(Utils.isDefined(test2)).toBeTruthy();
  expect(Utils.isDefined(test3)).toBeFalsy();
  expect(Utils.isDefined(test4)).toBeFalsy();
  expect(Utils.isDefined(test5)).toBeTruthy();
});
