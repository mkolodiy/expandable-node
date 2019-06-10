import { Node } from './models';
/**
 * Component used to render a expandable node.
 */
export class ExpNodeComponent {
  /**
   * Creates a new ExpNodeComponent and adds it to a HTML element.
   *
   * @param containerEl A HTML element that should be a container for the ExpNodeComponent.
   * @param node        A node object that should be rendered in the ExpNodeComponent.
   */
  public static create(node: Node, containerEl: Element): ExpNodeComponent {
    return new ExpNodeComponent(node, containerEl);
  }

  /**
   * A HTML element where the ExpNodeComponent will be appended to.
   */
  private readonly containerEl: Element;

  /**
   *  A node object that should be rendered in the ExpNodeComponent.
   */
  private readonly node: Node;

  /**
   * Initializes [[containerEl]] variable.
   *
   * @param containerEl A HTML element that should be a container for the ExpNodeComponent.
   */
  constructor(node: Node, containerEl: Element) {
    this.containerEl = containerEl;
    this.node = node;
    this.render();
  }

  /**
   * Creates HTML structure for an expandable node and adds it to the [[containerEl]].
   */
  private render(): void {
    const { id } = this.node;
    const { description } = this.node;
    const { childNodes } = this.node;

    const expNodeComponent = document.createElement('div');
    expNodeComponent.classList.add('exp-node-container');
    expNodeComponent.innerHTML = `
      <div>Id: ${id}</div>
      <div>Description: ${description}</div>
      <div>ChildNodes: ${childNodes.length}</div>
    `;

    this.containerEl.appendChild(expNodeComponent);
  }
}
