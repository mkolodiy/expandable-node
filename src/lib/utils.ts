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
}
