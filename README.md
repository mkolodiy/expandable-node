# expandable-node

> [!IMPORTANT]
> This repository is archived and is not being maintained.

A library for creating a tree like node structure.

```
npm i expandable-node
```

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/expandable-node/master/docs/basic-configuration.PNG" alt="Basic configuration" />
</p>

## Usage

* Include provided CSS styles
* Use JS API to create a new node

API documentation: https://mkolodiy.github.io/expandable-node/

### Options

Object containing values needed for creating a new node.

| Name      | Optional | Description                                                                      |
| --------- | :------: | -------------------------------------------------------------------------------- |
| container | &#10062; | Defines id or class of a HTML element which should be used to create a new node. |
| callbacks | &#9989;  | Defines an object containing callbacks for all buttons defined for a node.       |
| types     | &#9989;  | Defines an array of types that can be used for a node.                           |
| nodes     | &#10062; | Defines an array of nodes.                                                       |

### Callbacks

| Name        | Optional | Description                                              |
| ----------- | :------: | -------------------------------------------------------- |
| deleteBtnCb | &#9989;  | Defines a callback function for the delete button.       |
| editBtnCb   | &#9989;  | Defines a callback function for the edit button.         |
| expandBtnCb | &#9989;  | Defines a callback function for the expand button.       |
| selectCb    | &#9989;  | Defines a callback function for the selection of a node. |

### Types

Array containing type objects that might be used in a node.

| Name     | Optional | Description                                                       |
| -------- | :------: | ----------------------------------------------------------------- |
| type     | &#10062; | Defines the name of the type.                                     |
| cssClass | &#10062; | Defines a css class that should be appended to a expendable node. |

### Nodes

Array containing node objects that should be displayed in the provided container.

| Name          | Optional | Description                                                |
| ------------- | :------: | ---------------------------------------------------------- |
| id            | &#10062; | Defines a unique id of a node.                             |
| description   | &#10062; | Defines a description of a node.                           |
| enableEditBtn | &#9989;  | Defines if the edit button should be shown for a node.     |
| type          | &#9989;  | Defines the name of the type.                              |
| childNodes    | &#9989;  | Defines an array of child nodes that a node might contain. |

## Basic configuration

Following code snippet shows a simple configuration:

```javascript
import ExpNode from 'expandable-node';

const options = {
  container: 'container',
  nodes: [
    {
      id: 'node01',
      description: 'Level 1 node.',
      childNodes: [
        {
          id: 'node01-childNode01',
          description: 'Level 2 node.'
        },
        {
          id: 'node01-childNode02',
          description: 'Level 2 node.'
        }
      ]
    }
  ]
};

ExpNode.create(options);
```

Using the configuration above you will get the following output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/expandable-node/master/docs/basic-configuration.PNG" alt="Basic configuration" />
</p>

## Full configuration

Following code snippets shows a full configuration:

```scss
.green-node {
  background-image: none;
  background-color: green;
}

.magenta-node {
  background-image: none;
  background-color: magenta;
}
```

```javascript
import ExpNode from 'expandable-node';

const editBtnCb = function(node) {
  console.log('editBtnCb');
  console.log(node);
};

const deleteBtnCb = function(node) {
  console.log('deleteBtnCb');
  console.log(node);
};

const expandBtnCb = function(node) {
  console.log('expandBtnCb');
  console.log(node);
};

const selectCb = function(node) {
  console.log('selectCb');
  console.log(node);
};

const options = {
  container: 'container',
  callbacks: {
    editBtnCb: editBtnCb,
    deleteBtnCb: deleteBtnCb,
    expandBtnCb: expandBtnCb,
    selectCb: selectCb
  },
  types: [
    {
      type: 'greenNode',
      cssClass: 'green-node'
    },
    {
      type: 'magentaNode',
      cssClass: 'magenta-node'
    }
  ],
  nodes: [
    {
      id: 'node01',
      description: 'Level 1 node.',
      enableEditBtn: true,
      type: 'greenNode',
      childNodes: [
        {
          id: 'node01-childNode01',
          description: 'Level 2 node.',
          enableEditBtn: true,
          type: 'magentaNode',
          childNodes: [
            {
              id: 'node01-childNode01-childNode01',
              description: 'Level 3 node.',
              enableEditBtn: true,
              type: 'greenNode'
            }
          ]
        },
        {
          id: 'node01-childNode02',
          description: 'Level 2 node.',
          enableEditBtn: true,
          type: 'magentaNode'
        }
      ]
    },
    {
      id: 'node02',
      description: 'Level 1 node.',
      enableEditBtn: true,
      type: 'greenNode'
    }
  ]
};

ExpNode.create(options);
```

Using the configuration above you will get the following output:

<p align="center">
  <img src="https://raw.githubusercontent.com/mkolodiy/expandable-node/master/docs/full-configuration.PNG" alt="Full configuration" />
</p>

## Technology used to build this library

- TypeScript Starter ([License](https://github.com/bitjson/typescript-starter/blob/master/LICENSE))
- Material design icons ([License](https://github.com/google/material-design-icons/blob/master/LICENSE))

## License

Released under MIT license.
