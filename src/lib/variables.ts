/**
 * Contains all error messages that might be thrown if errors appear during the use of the library.
 */
export const Errors = {
  CONTAINER_NOT_FOUND: 'Could not find the container element.',
  DELETE_BTN_CB_UNDEFINED:
    'The deleteBtnCb is not correctly defined. Please provide a proper callback function.',
  DELETE_BTN_NOT_FOUND: 'Could not find the delete button element.',
  EDIT_BTN_NOT_FOUND: 'Could not find the edit button element.',
  EDIT_BTN_CB_UNDEFINED:
    'The editBtnCb is not correctly defined. Please provide a proper callback function.',
  EXPAND_BTN_NOT_FOUND: 'Could not find the expand button element.',
  EXPAND_BTN_CB_UNDEFINED:
    'The expandBtnCb is not correctly defined. Please provide a proper callback function.',
  NODES_ARRAY_NOT_FOUND: 'The options object does not contain the nodes array.',
  SHAPE_NOT_FOUND: 'Could not find the shape element.',
  SELECT_BTN_CB_UNDEFINED:
    'The selectCb is not correctly defined. Please provide a proper callback function.',
  WRAPPER_NOT_FOUND: 'Could not find the wrapper element.'
};

/**
 * Contains all class names that are used in the library.
 */
export const ClassNames = {
  CHILDREN: 'exp-node-children',
  CHILDREN_ACTIONS_WRAPPER: 'exp-node-children-actions-wrapper',
  CONTAINER: 'exp-node-container',
  DELETE_BTN: 'exp-node-delete-btn',
  EDIT_BTN: 'exp-node-edit-btn',
  EXPAND_BTN: 'exp-node-expand-btn',
  HIDE: 'exp-node-hide',
  SHAPE_SELECTION: 'exp-node-shape-selection',
  SHAPE: 'exp-node-shape',
  WRAPPER: 'exp-node-wrapper'
};

/**
 * Contains all class selectors that are used in the library.
 */
export const Selectors = {
  CHILDREN_ACTIONS_WRAPPER: `.${ClassNames.CHILDREN_ACTIONS_WRAPPER}`,
  CHILDREN: `.${ClassNames.CHILDREN}`,
  CONTAINER: `.${ClassNames.CONTAINER}`,
  DELETE_BTN: `.${ClassNames.DELETE_BTN}`,
  EXPAND_BTN: `.${ClassNames.EXPAND_BTN}`,
  EDIT_BTN: `.${ClassNames.EDIT_BTN}`,
  SHAPE_SELECTION: `.${ClassNames.SHAPE_SELECTION}`,
  SHAPE: `.${ClassNames.SHAPE}`,
  WRAPPER: `.${ClassNames.WRAPPER}`
};
