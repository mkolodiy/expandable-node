/**
 * Contains all error messages that might be thrown if errors appear during the use of the library.
 */
export const Errors = {
  CONTAINER_NOT_FOUND: 'Could not find the container element.',
  EDIT_BTN_NOT_FOUND: 'Could not find the edit button element.',
  EXPAND_BTN_NOT_FOUND: 'Could not find the expand button element.',
  DELETE_BTN_NOT_FOUND: 'Could not find the delete button element.',
  SHAPE_NOT_FOUND: 'Could not find the shape element.',
  WRAPPER_NOT_FOUND: 'Could not find the wrapper element.',
  NODES_ARRAY_NOT_FOUND: 'The options object does not contain the nodes array.',
  EXPAND_BTN_CB_UNDEFINED:
    'The expandBtnCb is not correctly defined. Please provide a proper callback function.',
  EDIT_BTN_CB_UNDEFINED:
    'The editBtnCb is not correctly defined. Please provide a proper callback function.',
  DELETE_BTN_CB_UNDEFINED:
    'The deleteBtnCb is not correctly defined. Please provide a proper callback function.',
  SELECT_BTN_CB_UNDEFINED:
    'The selectCb is not correctly defined. Please provide a proper callback function.'
};

/**
 * Contains all class names that are used in the library.
 */
export const ClassNames = {
  WRAPPER: 'exp-node-wrapper',
  SHAPE_SELECTION: 'exp-node-shape-selection',
  CONTAINER: 'exp-node-container',
  CHILDREN_ACTIONS_WRAPPER: 'exp-node-children-actions-wrapper',
  CHILDREN: 'exp-node-children',
  EXPAND_BTN: 'exp-node-expand-btn',
  HIDE: 'exp-node-hide',
  Z_DEPTH_1: 'z-depth-1'
};

/**
 * Contains all class selectors that are used in the library.
 */
export const Selectors = {
  WRAPPER: `.${ClassNames.WRAPPER}`,
  SHAPE_SELECTION: `.${ClassNames.SHAPE_SELECTION}`,
  CONTAINER: `.${ClassNames.CONTAINER}`,
  CHILDREN_ACTIONS_WRAPPER: `.${ClassNames.CHILDREN_ACTIONS_WRAPPER}`,
  CHILDREN: `.${ClassNames.CHILDREN}`,
  EXPAND_BTN: `.${ClassNames.EXPAND_BTN}`
};
