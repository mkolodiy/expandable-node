/**
 * Representation of a node.
 */
export interface Node {
  /**
   * Defines a unique id of a node.
   */
  readonly id: string;
  /**
   * Defines a description of a node.
   */
  readonly description: string;

  /**
   * Defines if the edit button should be shown for a node.
   */
  readonly enableEditBtn?: boolean;

  /**
   * Defines the name of the type.
   */
  readonly type?: string;

  /**
   * Defines an array of child nodes that a node might contain.
   */
  readonly childNodes?: ReadonlyArray<Node>;
}

/**
 * Representation of options object.
 */
export interface Options {
  /**
   * Defines id or class of a HTML element which should be used to create a new expandable node.
   */
  readonly container: string;

  /**
   * Defines an object containing callbacks for all buttons defines for a node.
   */
  readonly callbacks?: NodeCallbacks;

  /**
   * Defines an array of types that can be used for a node.
   */
  readonly types?: ReadonlyArray<NodeType>;

  /**
   * Defines an array of nodes.
   */
  readonly nodes: ReadonlyArray<Node>;
}

export interface NodeCallbacks {
  /**
   * Defines a callback function for the delete button.
   */
  readonly deleteBtnCb?: (node: Node) => void;

  /**
   * Defines a callback function for the edit button.
   */
  readonly editBtnCb?: (node: Node) => void;

  /**
   * Defines a callback function for the expand button.
   */
  readonly expandBtnCb?: (node: Node) => void;

  /**
   * Defines a callback function for the selection of a expandable node.
   */
  readonly selectCb?: (node: Node) => void;
}

export interface NodeType {
  /**
   * Defines the name of the type.
   */
  readonly type: string;

  /**
   * Defines a css class that should be appended to a expendable node.
   */
  readonly cssClass: string;
}
