import { Options } from './models';
/**
 * Contains all variables and methods necessary for creating and managing a node.
 *
 * A new instance of ExpNode can be created as following:
 * ```
 * const expNode = ExpNode.create(options);
 * ```
 */
export declare class ExpNode {
    /**
     * Creates a new instance of ExpNode class.
     *
     * @param options [[Options]] object containing values needed for creating a new node.
     * @returns       A new instance of ExpNode.
     */
    static create(options: Options): ExpNode;
    /**
     * Object containing values needed for creating a new node.
     */
    private readonly options;
    /**
     * Initializes [[options]] variable. Calls [[createWrapper]] to create a wrapper element.
     *
     * @param options Object containing values needed for creating a new node.
     */
    constructor(options: Options);
    /**
     * Creates a wrapper element that will contain all nodes that are present in [[options]] object.
     * Throws an error if the container property passed in [[options]] object can not be found.
     */
    private createWrapper;
    /**
     * Creates a new element for every node element that is present in the nodes array. Will throw an error if the nodes array is empty.
     *
     * @param wrapperEl Element that will contain all nodes.
     */
    private renderNodes;
}
