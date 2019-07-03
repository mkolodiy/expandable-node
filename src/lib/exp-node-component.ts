import { Node, NodeCallbacks } from './models';
import { Utils } from './utils';
import { Errors } from './variables';
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
  public static create(
    node: Node,
    containerEl: Element,
    callbacks: NodeCallbacks
  ): ExpNodeComponent {
    return new ExpNodeComponent(node, containerEl, callbacks);
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
   * An object containing callbacks for all buttons defines for a node.
   */
  private readonly callbacks: NodeCallbacks;

  /**
   * Initializes [[containerEl]] variable.
   *
   * @param containerEl A HTML element that should be a container for the ExpNodeComponent.
   */
  constructor(node: Node, containerEl: Element, callbacks: NodeCallbacks) {
    this.containerEl = containerEl;
    this.node = node;
    this.callbacks = callbacks;
    this.render();
  }

  /**
   * Creates HTML structure for an expandable node and adds it to the [[containerEl]].
   */
  private render(): void {
    const { id } = this.node;
    const { description } = this.node;
    const { enableEditBtn } = this.node;
    const { childNodes } = this.node;

    const expNodeComponent: Element = document.createElement('div');
    expNodeComponent.id = id;
    expNodeComponent.classList.add('exp-node-container');
    expNodeComponent.innerHTML = `
    <div class="row">
      <div class="col s6 exp-node-first-lvl-col">
        <div class="exp-node-shape-selection"></div>
        <div class="exp-node-shape"></div>
      </div>
      <div class="col s6 exp-node-first-lvl-col">
        <div class="z-depth-1 exp-node-actions">
          <a class="btn-floating waves-effect waves-light exp-node-btn exp-node-delete-btn"><i class="material-icons">delete</i></a>
          <a class="btn-floating waves-effect waves-light exp-node-btn exp-node-edit-btn exp-node-hide"><i class="material-icons">open_in_new</i></a>
        </div>
        <div class="z-depth-1 valign-wrapper exp-node-desc">
            ${description}
        </div>
      </div>
      <div class="col s6 center-align exp-node-second-lvl-col exp-node-children-actions-wrapper">
      </div>
      <div class="col s6 exp-node-second-lvl-col exp-node-children"></div>
    </div>`;

    if (enableEditBtn) {
      this.registerEditBtnClickListener(expNodeComponent);
    }

    if (childNodes.length !== 0) {
      this.enableChildrenActions(expNodeComponent);
      this.renderChildNodes(expNodeComponent);
    }

    this.containerEl.appendChild(expNodeComponent);

    this.registerDeleteBtnClickListener(expNodeComponent);
  }
  /**
   * Enables children actions for a given expandable node.
   *
   * @param expNodeComponent A expandable node which should have children actions enabled.
   */
  private enableChildrenActions(expNodeComponent: Element): void {
    const childrenActionsContainerEl = expNodeComponent.querySelector(
      '.exp-node-children-actions-wrapper'
    );
    if (childrenActionsContainerEl !== null) {
      childrenActionsContainerEl.innerHTML = `<div class="z-depth-1 exp-node-children-actions">
          <a class="btn-floating waves-effect waves-light exp-node-btn exp-node-expand-btn"><i class="material-icons">expand_less</i></a>
        </div>`;
      this.registerExpandBtnClickListener(expNodeComponent);
    }
  }

  /**
   * Renders children nodes of an expandable node.
   *
   * @param expNodeComponent An expandable node which children should be rendered out.
   */
  private renderChildNodes(expNodeComponent: Element): void {
    const { childNodes } = this.node;
    const childrenContainerEl = expNodeComponent.querySelector(
      '.exp-node-children'
    );
    if (childrenContainerEl !== null) {
      childNodes.forEach(childNode =>
        ExpNodeComponent.create(childNode, childrenContainerEl, this.callbacks)
      );
    }
  }

  /**
   * Registers an event listener for the children action button to show/collapse the children nodes.
   *
   * @param expNodeComponent An expandable node for which the expand button should be registered.
   */
  private registerExpandBtnClickListener(expNodeComponent: Element): void {
    const expandBtnEl = expNodeComponent.querySelector('.exp-node-expand-btn');
    const childrenContainerEl = expNodeComponent.querySelector(
      '.exp-node-children'
    );

    if (expandBtnEl !== null && childrenContainerEl !== null) {
      expandBtnEl.addEventListener('click', () => {
        childrenContainerEl.classList.toggle('exp-node-hide');

        if (
          Utils.checkIfElementContainsClassName(
            childrenContainerEl,
            'exp-node-hide'
          )
        ) {
          expandBtnEl.innerHTML = '<i class="material-icons">expand_more</i>';
        } else {
          expandBtnEl.innerHTML = '<i class="material-icons">expand_less</i>';
        }
      });
    }
  }

  /**
   * Registers an event listener and enables the edit button for a given expandable node.
   *
   * @param expNodeComponent An expandable node for which the edit button should be registered.
   */
  private registerEditBtnClickListener(expNodeComponent: Element): void {
    const { editBtnCb } = this.callbacks;
    const editBtnEl = expNodeComponent.querySelector('.exp-node-edit-btn');

    if (editBtnEl != null) {
      editBtnEl.classList.remove('exp-node-hide');
      editBtnEl.addEventListener('click', () => editBtnCb(this.node));
    } else {
      throw new Error(Errors.EDIT_BTN_NOT_FOUND);
    }
  }

  /**
   * Registers an event listener and enables the edit button for a given expandable node.
   *
   * @param expNodeComponent An expandable node for which the edit button should be registered.
   */
  private registerDeleteBtnClickListener(expNodeComponent: Element): void {
    const { deleteBtnCb } = this.callbacks;
    const deleteBtnEl = expNodeComponent.querySelector('.exp-node-delete-btn');
    const parentEl = (expNodeComponent as HTMLElement).parentElement;

    if (deleteBtnEl != null && parentEl != null) {
      deleteBtnEl.addEventListener('click', () => {
        parentEl.removeChild(expNodeComponent);
        deleteBtnCb(this.node);
      });
    } else {
      throw new Error(Errors.DELETE_BTN_NOT_FOUND);
    }
  }
}
