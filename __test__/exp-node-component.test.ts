// tslint:disable:no-expression-statement
import { ExpNode } from '../src/lib/exp-node';
import { Options } from '../src/lib/models';
// import { Errors } from '../src/lib/variables';

afterEach(() => {
  document.body.querySelector('#someContainerId')!.remove();
});

test('expandable node element should be added to the wrapper element', () => {
  const wrapperEl = createExpNode(createOptions1());
  const expNodeContainerEl = wrapperEl.querySelector('.exp-node-container');
  expect(expNodeContainerEl).toBeDefined();
  expect(expNodeContainerEl).not.toBeNull();
  expect(expNodeContainerEl!.id).toBe('node01');
  const description = expNodeContainerEl!
    .querySelector('.exp-node-desc')!
    .innerHTML.trim();
  expect(description).toBe('Level 1 node.');
});

test('expandable node element should have expand button', () => {
  const wrapperEl = createExpNode(createOptions2());
  const expNodeChildrenActionsWrapper = wrapperEl.querySelector(
    '.exp-node-children-actions-wrapper'
  );
  expect(expNodeChildrenActionsWrapper).toBeDefined();
  expect(expNodeChildrenActionsWrapper).not.toBeNull();
  const expNodeExpandBtn = expNodeChildrenActionsWrapper!.querySelector(
    '.exp-node-expand-btn'
  );
  expect(expNodeExpandBtn).toBeDefined();
  expect(expNodeExpandBtn).not.toBeNull();
});

test('expand button functionality of a expandable node', () => {
  const options: Options = createOptions2();
  const expandBtnCbSpy = jest.spyOn(options.callbacks!, 'expandBtnCb');

  const wrapperEl = createExpNode(options);
  const expNodeChildrenActionsWrapper = wrapperEl.querySelector(
    '.exp-node-children-actions-wrapper'
  );
  expect(expNodeChildrenActionsWrapper).toBeDefined();
  expect(expNodeChildrenActionsWrapper).not.toBeNull();
  const expNodeExpandBtn = expNodeChildrenActionsWrapper!.querySelector(
    '.exp-node-expand-btn'
  );
  expect(expNodeExpandBtn).toBeDefined();
  expect(expNodeExpandBtn).not.toBeNull();
  const childrenContainerEl = wrapperEl.querySelector('.exp-node-children');
  expect(childrenContainerEl).toBeDefined();
  expect(childrenContainerEl).not.toBeNull();

  // Collapse child nodes
  (expNodeExpandBtn as HTMLElement).click();
  expect(childrenContainerEl!.classList.contains('exp-node-hide')).toBeTruthy();
  expect(
    expNodeExpandBtn!.querySelector('.material-icons')!.innerHTML.trim()
  ).toBe('expand_more');
  expect(expandBtnCbSpy).toHaveBeenCalled();
  expect(expandBtnCbSpy).toHaveReturned();
  expect(expandBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );

  // Expand child nodes
  (expNodeExpandBtn as HTMLElement).click();
  expect(childrenContainerEl!.classList.contains('exp-node-hide')).toBeFalsy();
  expect(
    expNodeExpandBtn!.querySelector('.material-icons')!.innerHTML.trim()
  ).toBe('expand_less');
  expect(expandBtnCbSpy).toHaveBeenCalled();
  expect(expandBtnCbSpy).toHaveReturned();
  expect(expandBtnCbSpy).toHaveReturnedWith(
    `Node clicked: ${options.nodes[0].id}`
  );
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
      expandBtnCb: node => `Node clicked: ${node.id}`
    },
    nodes: [
      {
        id: 'node01',
        description: 'Level 1 node.',
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
  const wrapperEl = containerEl.querySelector('.exp-node-wrapper');
  expect(wrapperEl).toBeDefined();
  expect(wrapperEl).not.toBeNull();
  return wrapperEl!;
};
