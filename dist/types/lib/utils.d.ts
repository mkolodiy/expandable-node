import { Node, NodeType } from './models';
/**
 * Contains helper methods.
 */
export declare class Utils {
    /**
     * Checks if an element contains a class name in its class list.
     *
     * @param element   An element which should be checked if it contains a class name.
     * @param className Class name that should be used for checking.
     */
    static checkIfElementContainsClassName(element: Element, className: string): boolean;
    /**
     * Removes selection from all nodes presented in wrapper element.
     */
    static removeSelectionFromAllShapes(): void;
    /**
     * Retrieves the css class from types array bases on the type assigned to a node.
     *
     * @param node  Node object containing the type for which the css class should be retrieved from types array.
     * @param types Array containing list of types.
     */
    static getCssClassForAssignedType(node: Node, types?: ReadonlyArray<NodeType>): string;
    /**
     * Checks if an array is empty.
     *
     * @param array Array that should be checked.
     */
    static arrayEmpty(array?: ReadonlyArray<any>): boolean;
    /**
     * Checks if an array is not empty.
     *
     * @param array Array that should be checked.
     */
    static arrayNotEmpty(array?: ReadonlyArray<any>): boolean;
    /**
     * Checks if an object has a property.
     *
     * @param object   An object that should be checked if it has a property.
     * @param property Property that should be used for check.
     */
    static checkIfObjectHasProperty(object: {} | undefined, property: string): boolean;
    /**
     * Checks if an object is not undefined and not null.
     *
     * @param object Object that should be tested.
     */
    static isDefined(object: any): boolean;
}
