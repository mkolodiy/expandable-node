import { Node, NodeType } from './models';
import { Errors } from './variables';

/**
 * Contains helper methods.
 */
export class Utils {
  /**
   * Checks if an element contains a class name in its class list.
   *
   * @param element   An element which should be checked if it contains a class name.
   * @param className Class name that should be used for checking.
   */
  public static checkIfElementContainsClassName(
    element: Element,
    className: string
  ): boolean {
    return element.classList.contains(className);
  }

  /**
   * Removes selection from all nodes presented in wrapper element.
   */
  public static removeSelectionFromAllShapes(): void {
    const wrapperEl = document.querySelector('.exp-node-wrapper');
    if (wrapperEl != null) {
      wrapperEl
        .querySelectorAll('.exp-node-shape-selection')
        .forEach(el => el.classList.remove('z-depth-1'));
    } else {
      throw new Error(Errors.WRAPPER_NOT_FOUND);
    }
  }

  /**
   * Retrieves the css class from types array bases on the type assigned to a node.
   *
   * @param node  Node object containing the type for which the css class should be retrieved from types array.
   * @param types Array containing list of types.
   */
  public static getCssClassForAssignedType(
    node: Node,
    types: ReadonlyArray<NodeType>
  ): string {
    const { type } = node;

    if (type != null) {
      const nodeType = types.find(t => t.type === type);
      return nodeType != null ? nodeType.cssClass : '';
    }

    return '';
  }

  public static arrayEmpty(array: ReadonlyArray<any>): boolean {
    return array === undefined || array === null || array.length === 0;
  }

  public static arrayNotEmpty(array: ReadonlyArray<any>): boolean {
    return !this.arrayEmpty(array);
  }
}
