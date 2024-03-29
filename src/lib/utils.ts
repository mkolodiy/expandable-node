import { Node, NodeType } from './models';
import { ClassNames, Errors, Selectors } from './variables';

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
    const wrapperEl = document.querySelector(Selectors.WRAPPER);
    if (wrapperEl != null) {
      wrapperEl
        .querySelectorAll(Selectors.SHAPE_SELECTION)
        .forEach((el) =>
          el.classList.remove(ClassNames.SHAPE_SELECTION_ACTIVE)
        );
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
    types: ReadonlyArray<NodeType> = []
  ): string {
    const { type } = node;

    if (type != null && this.arrayNotEmpty(types)) {
      const nodeType = types.find((t) => t.type === type);
      return nodeType != null ? nodeType.cssClass : '';
    }

    return '';
  }

  /**
   * Checks if an array is empty.
   *
   * @param array Array that should be checked.
   */
  public static arrayEmpty(array: ReadonlyArray<any> = []): boolean {
    return array === undefined || array === null || array.length === 0;
  }

  /**
   * Checks if an array is not empty.
   *
   * @param array Array that should be checked.
   */
  public static arrayNotEmpty(array: ReadonlyArray<any> = []): boolean {
    return !this.arrayEmpty(array);
  }

  /**
   * Checks if an object has a property.
   *
   * @param object   An object that should be checked if it has a property.
   * @param property Property that should be used for check.
   */
  public static checkIfObjectHasProperty(
    object: any = {},
    property: string
  ): boolean {
    return Reflect.has(object, property);
  }

  /**
   * Checks if an object is not undefined and not null.
   *
   * @param object Object that should be tested.
   */
  public static isDefined(object: any): boolean {
    return object !== undefined && object !== null;
  }
}
