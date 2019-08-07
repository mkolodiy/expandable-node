import { Node, NodeCallbacks, NodeType } from './models';
/**
 * Component used to render a node.
 */
export declare class ExpNodeComponent {
    /**
     * Creates a new instance of ExpNodeComponent and adds it to a container.
     *
     * @param node        Node object that should be rendered in the ExpNodeComponent.
     * @param containerEl Element that should be a container for the ExpNodeComponent.
     * @param callbacks   Object with callback functions.
     * @param types       Array containing types that can be used for a node.
     */
    static create(node: Node, containerEl: Element, callbacks?: NodeCallbacks, types?: ReadonlyArray<NodeType>): ExpNodeComponent;
    /**
     * Defines an element where the ExpNodeComponent will be appended to.
     */
    private readonly containerEl;
    /**
     *  Defines a node object that should be rendered in the ExpNodeComponent.
     */
    private readonly node;
    /**
     * Defines an object containing callbacks for all buttons defined for a node.
     */
    private readonly callbacks?;
    /**
     * Defines an array of types that can be used for a node.
     */
    private readonly types?;
    /**
     * Initializes [[node]], [[containerEl]], [[callbacks]] and [[types]] variable. Calls [[render]] to render passed node.
     *
     * @param node        Node object that should be rendered in the ExpNodeComponent.
     * @param containerEl Element that should be a container for the ExpNodeComponent.
     * @param callbacks   Object with callback functions.
     * @param types       Array containing types that can be used for a node.
     */
    constructor(node: Node, containerEl: Element, callbacks?: NodeCallbacks, types?: ReadonlyArray<NodeType>);
    /**
     * Creates a node and adds it to the [[containerEl]].
     */
    private render;
    /**
     * Enables children actions for a given node.
     *
     * @param expNodeComponent Node which should have children actions enabled.
     */
    private enableChildrenActions;
    /**
     * Renders children nodes of a node.
     *
     * @param expNodeComponent Node which children should be rendered out.
     */
    private renderChildNodes;
    /**
     * Registers an event listener for the children action button to show/collapse the children nodes.
     *
     * @param expNodeComponent Node for which the expand button should be registered.
     */
    private registerExpandBtnClickListener;
    /**
     * Registers an event listener and enables the edit button for a given node.
     *
     * @param expNodeComponent Node for which the edit button should be registered.
     */
    private registerEditBtnClickListener;
    /**
     * Registers an event listener and enables the edit button for a given node.
     *
     * @param expNodeComponent Node for which the edit button should be registered.
     */
    private registerDeleteBtnClickListener;
    /**
     * Registers an event listener for the selection of a node.
     *
     * @param expNodeComponent Node for which the edit button should be registered.
     */
    private registerSelectClickListener;
}
