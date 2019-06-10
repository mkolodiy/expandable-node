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
}
