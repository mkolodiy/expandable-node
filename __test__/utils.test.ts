// tslint:disable:no-expression-statement
import { Utils } from '../src/lib/utils';
import { Errors } from '../src/lib/variables';
import { Node, NodeType } from '../src/lib/models';

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

describe('getCssClassForAssignedType', () => {
  test('return css class', () => {
    const node: Node = createTestNode('someType');
    const types: ReadonlyArray<NodeType> = createTypesArray();

    expect(Utils.getCssClassForAssignedType(node, types)).toBe('someCssClass');
  });

  test('return empty string', () => {
    const node: Node = createTestNode('someDifferentType');
    const types: ReadonlyArray<NodeType> = createTypesArray();

    expect(Utils.getCssClassForAssignedType(node, types)).toBe('');
  });

  const createTestNode = (nodeType: string): Node => {
    return {
      id: 'someNode',
      description: 'someNode',
      enableEditBtn: false,
      type: nodeType,
      childNodes: []
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
