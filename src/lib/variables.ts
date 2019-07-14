/**
 * Contains all error messages that might be thrown if errors appear during the use of the library.
 */
export class Errors {
  public static readonly CONTAINER_NOT_FOUND =
    'Could not find the container element.';

  public static readonly EDIT_BTN_NOT_FOUND =
    'Could not find the edit button element.';

  public static readonly DELETE_BTN_NOT_FOUND =
    'Could not find the delete button element.';

  public static readonly SHAPE_NOT_FOUND = 'Could not find the shape element.';

  public static readonly WRAPPER_NOT_FOUND =
    'Could not find the wrapper element.';

  public static readonly NODES_ARRAY_NOT_FOUND =
    'The options object does not contain the nodes array.';

  public static readonly EXPAND_BTN_CB_UNDEFINED =
    'The expandBtnCb is not correctly defined. Please provide a proper callback function.';

  public static readonly EDIT_BTN_CB_UNDEFINED =
    'The editBtnCb is not correctly defined. Please provide a proper callback function.';

  public static readonly DELETE_BTN_CB_UNDEFINED =
    'The deleteBtnCb is not correctly defined. Please provide a proper callback function.';

  public static readonly SELECT_BTN_CB_UNDEFINED =
    'The selectCb is not correctly defined. Please provide a proper callback function.';
}
