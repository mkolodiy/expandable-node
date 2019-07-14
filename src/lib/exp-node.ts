import { ExpNodeComponent } from './exp-node-component';
import { Options } from './models';
import { Utils } from './utils';
import { Errors } from './variables';

/**
 * Contains all variables and methods necessary for creating and managing of a expandable node.
 *
 * A new instance of ExpNode can be created as following:
 * ```
 * const expNode = ExpNode.create(options);
 * ```
 */
export class ExpNode {
  /**
   * Creates a new instance of ExpNode class.
   *
   * @param options [[Options]] object containing values needed for creating a new expandable node.
   * @returns       A new instance of ExpNode.
   */
  public static create(options: Options): ExpNode {
    return new ExpNode(options);
  }

  /**
   * Object containing values needed for creating a new expandable node.
   */
  private readonly options: Options;

  /**
   * Initializes [[options]] variable. Calls [[createWrapper]] to create a wrapper HTML element.
   *
   * @param options Object containing values needed for creating a new expandable node.
   */
  constructor(options: Options) {
    this.options = { ...options };
    this.createWrapper();
  }

  /**
   * Creates a wrapper HTML element that will contain all expandable nodes that are present in [[options]] object.
   * Throws an error if the container property passed in [[options]] object can not be found.
   */
  private createWrapper(): void {
    const { container } = this.options;
    const containerEl = document.querySelector(`#${container}`)
      ? document.querySelector(`#${container}`)
      : document.querySelector(`.${container}`);
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('exp-node-wrapper');
    if (containerEl !== null) {
      containerEl.appendChild(wrapperEl);
      this.renderNodes(wrapperEl);
    } else {
      throw new Error(Errors.CONTAINER_NOT_FOUND);
    }
  }

  /**
   * Creates a HTML element for every node element that is present in the nodes array. Will throw an error if the nodes array is empty.
   *
   * @param wrapperEl A HTML element that will contain all expandable nodes.
   */
  private renderNodes(wrapperEl: Element): void {
    const { nodes } = this.options;
    const { callbacks } = this.options;
    const { types } = this.options;

    if (Utils.arrayEmpty(nodes)) {
      throw Error(Errors.NODES_ARRAY_NOT_FOUND);
    }

    nodes.forEach(node => {
      ExpNodeComponent.create(node, wrapperEl, callbacks, types);
    });
  }
}
