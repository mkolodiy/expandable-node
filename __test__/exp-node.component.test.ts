// tslint:disable:no-expression-statement
import { ExpNode } from '../src/lib/exp-node';
import { Options } from '../src/lib/models';
// import { Errors } from '../src/lib/variables';

test('expandable node element should be added to the wrapper element', () => {
  const wrapperEl = createExpNodeWithMinimalOptions();
  const expNodeContainerEl = wrapperEl.querySelector('.exp-node-container');
  expect(expNodeContainerEl).toBeDefined();
  expect(expNodeContainerEl).not.toBeNull();
  expect(expNodeContainerEl!.id).toBe('node01');
  const description = expNodeContainerEl!
    .querySelector('.exp-node-desc')!
    .innerHTML.trim();
  expect(description).toBe('Level 1 node.');
});

/* Helper Methods */

const createContainerElWithId = (): Element => {
  const containerEl = document.createElement('div');
  containerEl.id = 'someContainerId';
  document.body.appendChild(containerEl);
  return containerEl;
};

const createMinimalOptions = (): Options => {
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

const createExpNodeWithMinimalOptions = (): Element => {
  const containerEl = createContainerElWithId();
  expect(containerEl).toBeDefined();
  const options: Options = createMinimalOptions();
  const expNode: ExpNode = ExpNode.create(options);
  expect(expNode).toBeDefined();
  expect(expNode).toBeInstanceOf(ExpNode);
  const wrapperEl = containerEl.querySelector('.exp-node-wrapper');
  expect(wrapperEl).toBeDefined();
  return wrapperEl!;
};
