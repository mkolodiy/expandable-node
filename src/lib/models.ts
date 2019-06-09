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
   * Defines an array of child nodes that a node might contain.
   */
  readonly childNodes: ReadonlyArray<Node>;
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
   * Defines an array of nodes.
   */
  readonly nodes: ReadonlyArray<Node>;
}
