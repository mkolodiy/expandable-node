import { Options } from './models';

/**
 * Main class responsible for creating and managing of expandable nodes.
 *
 * ```
 * const expNode = ExpNode.create(options);
 * ```
 */
export class ExpNode {
  /**
   * Static method to create a new instance of ExpNode class.
   *
   * @param options Object containing values needed for creating new expandable node.
   * @returns       A new instance of ExpNode class.
   */
  public static create(options: Options): ExpNode {
    return new ExpNode(options);
  }

  private readonly options: Options;

  constructor(options: Options) {
    this.options = { ...options };
    this.createWrapper();
  }

  private createWrapper(): void {
    const { container } = this.options;
    const containerEl = document.querySelector(container);
    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('.exp-node-wrapper');
    if (containerEl !== null) {
      containerEl.appendChild(wrapperEl);
    } else {
      throw new Error('Container could not be found.');
    }
  }
}
