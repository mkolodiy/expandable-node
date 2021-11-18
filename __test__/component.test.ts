// tslint:disable:no-expression-statement
import { ExpNode } from '../src/lib/lib';
import { Options } from '../src/lib/models';
import { ClassNames, Selectors } from '../src/lib/variables';

afterEach(() => {
  document.body.querySelector('#someContainerId')!.remove();
});

test('node element should be added to the wrapper element', () => {
  const wrapperEl = createExpNode(createOptions1());
  const containerEl = wrapperEl.querySelector(Selectors.CONTAINER);
  expect(containerEl).toBeDefined();
  expect(containerEl).not.toBeNull();
  expect(containerEl!.id).toBe('node01');
  const description = containerEl!
    .querySelector('.exp-node-description')!
    .innerHTML.trim();
  expect(description).toBe('Level 1 node.');
});

test('node element should have expand button', () => {
  const wrapperEl = createExpNode(createOptions2());
  const childrenActionsWrapper = wrapperEl.querySelector(
    Selectors.CHILDREN_ACTIONS_WRAPPER
  );
  expect(childrenActionsWrapper).toBeDefined();
  expect(childrenActionsWrapper).not.toBeNull();
  const expNodeExpandBtn = childrenActionsWrapper!.querySelector(
    Selectors.EXPAND_BTN
  );
  expect(expNodeExpandBtn).toBeDefined();
  expect(expNodeExpandBtn).not.toBeNull();
});

test('expand button functionality of a node', () => {
  const options = createOptions2();
  const expandBtnCbSpy = jest.spyOn(options.callbacks!, 'expandBtnCb');

  const wrapperEl = createExpNode(options);
  const childrenActionsWrapper = wrapperEl.querySelector(
    Selectors.CHILDREN_ACTIONS_WRAPPER
  );
  expect(childrenActionsWrapper).toBeDefined();
  expect(childrenActionsWrapper).not.toBeNull();
  const expandBtnEl = childrenActionsWrapper!.querySelector(
    Selectors.EXPAND_BTN
  );
  expect(expandBtnEl).toBeDefined();
  expect(expandBtnEl).not.toBeNull();
  const childrenContainerEl = wrapperEl.querySelector(Selectors.CHILDREN);
  expect(childrenContainerEl).toBeDefined();
  expect(childrenContainerEl).not.toBeNull();

  // Collapse child nodes
  (expandBtnEl as HTMLElement).click();
  expect(childrenContainerEl!.classList.contains(ClassNames.HIDE)).toBeTruthy();
  expect(
    expandBtnEl!.classList.contains(ClassNames.EXPAND_MORE_BTN)
  ).toBeTruthy();
  expect(expandBtnCbSpy).toHaveBeenCalled();
  expect(expandBtnCbSpy).toHaveReturned();
  expect(expandBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );

  // Expand child nodes
  (expandBtnEl as HTMLElement).click();
  expect(childrenContainerEl!.classList.contains(ClassNames.HIDE)).toBeFalsy();
  expect(
    expandBtnEl!.classList.contains(ClassNames.EXPAND_LESS_BTN)
  ).toBeTruthy();
  expect(expandBtnCbSpy).toHaveBeenCalled();
  expect(expandBtnCbSpy).toHaveReturned();
  expect(expandBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );
});

test('node should contain children nodes', () => {
  const wrapperEl = createExpNode(createOptions2());
  const expNodeChildrenEl = wrapperEl.querySelector(Selectors.CHILDREN);
  expect(expNodeChildrenEl).toBeDefined();
  expect(expNodeChildrenEl).not.toBeNull();
  const childrenEls = expNodeChildrenEl!.querySelectorAll(Selectors.CONTAINER);
  expect(childrenEls.length).toBe(2);
});

test('edit button functionality of a node', () => {
  const options = createOptions2();
  const editBtnCbSpy = jest.spyOn(options.callbacks!, 'editBtnCb');

  const wrapperEl = createExpNode(options);
  const editBtnEl = wrapperEl.querySelector(Selectors.EDIT_BTN);
  expect(editBtnEl).toBeDefined();
  expect(editBtnEl).not.toBeNull();
  (editBtnEl as HTMLElement).click();
  expect(editBtnCbSpy).toHaveBeenCalled();
  expect(editBtnCbSpy).toHaveReturned();
  expect(editBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );
});

test('select functionality of a node', () => {
  const options = createOptions2();
  const selectBtnCbSpy = jest.spyOn(options.callbacks!, 'selectCb');

  const wrapperEl = createExpNode(options);
  const shapeEl = wrapperEl.querySelector(Selectors.SHAPE);
  const shapeSelectionEl = wrapperEl.querySelector(Selectors.SHAPE_SELECTION);
  expect(shapeEl).toBeDefined();
  expect(shapeEl).not.toBeNull();
  expect(shapeSelectionEl).toBeDefined();
  expect(shapeSelectionEl).not.toBeNull();
  (shapeEl as HTMLElement).click();
  expect(selectBtnCbSpy).toHaveBeenCalled();
  expect(selectBtnCbSpy).toHaveReturned();
  expect(selectBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );
  expect(
    shapeSelectionEl!.classList.contains(ClassNames.SHAPE_SELECTION_ACTIVE)
  ).toBeTruthy();
});

test('delete button functionality of a node', () => {
  const options = createOptions2();
  const deleteBtnCbSpy = jest.spyOn(options.callbacks!, 'deleteBtnCb');

  const wrapperEl = createExpNode(options);
  const containerEl = wrapperEl.querySelector(Selectors.CONTAINER);
  expect(containerEl).toBeDefined();
  expect(containerEl).not.toBeNull();
  const deleteBtnEl = wrapperEl.querySelector(Selectors.DELETE_BTN);
  expect(deleteBtnEl).toBeDefined();
  expect(deleteBtnEl).not.toBeNull();

  (deleteBtnEl as HTMLElement).click();
  expect(deleteBtnCbSpy).toHaveBeenCalled();
  expect(deleteBtnCbSpy).toHaveReturned();
  expect(deleteBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );

  const containerEls = wrapperEl.querySelectorAll(Selectors.CONTAINER);
  expect(containerEls.length).toBe(0);
});

test('node should have a type', () => {
  const wrapperEl = createExpNode(createOptions2());
  const shapeEl = wrapperEl.querySelector(Selectors.SHAPE);
  expect(shapeEl).toBeDefined();
  expect(shapeEl).not.toBeNull();
  expect(shapeEl!.classList.contains('test-class')).toBeTruthy();
});

/* Helper Methods */

const createContainerElWithId = (): Element => {
  const containerEl = document.createElement('div');
  containerEl.id = 'someContainerId';
  document.body.appendChild(containerEl);
  return containerEl;
};

const createOptions1 = (): Options => {
  return {
    container: 'someContainerId',
    nodes: [
      {
        id: 'node01',
        description: 'Level 1 node.'
      }
    ]
  };
};

const createOptions2 = (): Options => {
  return {
    container: 'someContainerId',
    callbacks: {
      expandBtnCb: (node) => `Node clicked: ${node.id}`,
      deleteBtnCb: (node) => `Node clicked: ${node.id}`,
      editBtnCb: (node) => `Node clicked: ${node.id}`,
      selectCb: (node) => `Node clicked: ${node.id}`
    },
    types: [
      {
        type: 'testType',
        cssClass: 'test-class'
      }
    ],
    nodes: [
      {
        id: 'node01',
        description: 'Level 1 node.',
        enableEditBtn: true,
        type: 'testType',
        childNodes: [
          {
            id: 'node01-childNode01',
            description: 'Child node 1.'
          },
          {
            id: 'node01-childNode02',
            description: 'Child node 2.'
          }
        ]
      }
    ]
  };
};

const createExpNode = (options: Options): Element => {
  const containerEl = createContainerElWithId();
  expect(containerEl).toBeDefined();
  const expNode: ExpNode = ExpNode.create(options);
  expect(expNode).toBeDefined();
  expect(expNode).toBeInstanceOf(ExpNode);
  const wrapperEl = containerEl.querySelector(Selectors.WRAPPER);
  expect(wrapperEl).toBeDefined();
  expect(wrapperEl).not.toBeNull();
  return wrapperEl!;
};
