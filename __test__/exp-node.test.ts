// tslint:disable:no-expression-statement
import { ExpNode } from '../src/lib/exp-node';
import { Options } from '../src/lib/models';
import { Errors } from '../src/lib/variables';

test('container element can be found using id', () => {
  const containerEl: Element = createContainerElWithId();
  expect(containerEl).toBeDefined();
  const options: Options = createMinimalOptions();
  const expNode = ExpNode.create(options);
  expect(expNode).toBeDefined();
  expect(expNode).toBeInstanceOf(ExpNode);
  containerEl.remove();
});

test('container element can be found using id', () => {
  const containerEl: Element = createContainerElWithClass();
  expect(containerEl).toBeDefined();
  const options: Options = createMinimalOptions();
  const expNode: ExpNode = ExpNode.create(options);
  expect(expNode).toBeDefined();
  expect(expNode).toBeInstanceOf(ExpNode);
  containerEl.remove();
});

test('container element can not be found', () => {
  const options: Options = createMinimalOptions();
  const error = () => ExpNode.create(options);
  expect(error).toThrowError(Errors.CONTAINER_NOT_FOUND);
});

test('wrapper element is created and appended to container element', () => {
  const containerEl: Element = createContainerElWithClass();
  expect(containerEl).toBeDefined();
  const options: Options = createMinimalOptions();
  const expNode = ExpNode.create(options);
  expect(expNode).toBeDefined();
  expect(expNode).toBeInstanceOf(ExpNode);
  const wrapperEl: Element | null = document.querySelector('.exp-node-wrapper');
  expect(wrapperEl).toBeDefined();
  expect(wrapperEl).not.toBeNull();
  containerEl.remove();
});

test('nodes array is empty', () => {
  const containerEl: Element = createContainerElWithClass();
  expect(containerEl).toBeDefined();
  const options: any = {
    container: 'someContainerId'
  };
  const error = () => ExpNode.create(options);
  expect(error).toThrowError(Errors.NODES_ARRAY_NOT_FOUND);
  containerEl.remove();
});

/* Helper Methods */

const createContainerElWithId = (): Element => {
  const containerEl = document.createElement('div');
  containerEl.id = 'someContainerId';
  document.body.appendChild(containerEl);
  return containerEl;
};

const createContainerElWithClass = (): Element => {
  const containerEl = document.createElement('div');
  containerEl.classList.add('someContainerId');
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
