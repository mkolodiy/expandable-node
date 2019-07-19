import { Node, NodeCallbacks, NodeType } from './models';
import { Utils } from './utils';
import { Errors } from './variables';
/**
 * Component used to render a expandable node.
 */
export class ExpNodeComponent {
  /**
   * Creates a new ExpNodeComponent and adds it to a HTML element.
   *
   * @param node        A node object that should be rendered in the ExpNodeComponent.
   * @param containerEl A HTML element that should be a container for the ExpNodeComponent.
   * @param callbacks   An object with passed callback functions.
   * @param types       An array containing types that can be used for a node.
   */
  public static create(
    node: Node,
    containerEl: Element,
    callbacks?: NodeCallbacks,
    types?: ReadonlyArray<NodeType>
  ): ExpNodeComponent {
    return new ExpNodeComponent(node, containerEl, callbacks, types);
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
   * An object containing callbacks for all buttons defined for a node.
   */
  private readonly callbacks?: NodeCallbacks;

  /**
   * Defines an array of types that can be used for a node.
   */
  private readonly types?: ReadonlyArray<NodeType>;

  /**
   * Initializes [[node]], [[containerEl]], [[callbacks]] and [[types]] variable.
   *
   * @param node        A node object that should be rendered in the ExpNodeComponent.
   * @param containerEl A HTML element that should be a container for the ExpNodeComponent.
   * @param callbacks   An object with passed callback functions.
   * @param types       An array containing types that can be used for a node.
   */
  constructor(
    node: Node,
    containerEl: Element,
    callbacks?: NodeCallbacks,
    types?: ReadonlyArray<NodeType>
  ) {
    this.node = node;
    this.containerEl = containerEl;
    this.callbacks = callbacks;
    this.types = types;
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
        <div class="exp-node-shape ${Utils.getCssClassForAssignedType(
          this.node,
          this.types
        )}"></div>
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

    if (Utils.arrayNotEmpty(childNodes)) {
      this.enableChildrenActions(expNodeComponent);
      this.renderChildNodes(expNodeComponent);
    }

    this.containerEl.appendChild(expNodeComponent);

    if (enableEditBtn) {
      this.registerEditBtnClickListener(expNodeComponent);
    }
    this.registerDeleteBtnClickListener(expNodeComponent);
    this.registerSelectClickListener(expNodeComponent);
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
    const { childNodes = [] } = this.node;
    const childrenContainerEl = expNodeComponent.querySelector(
      '.exp-node-children'
    );
    if (childrenContainerEl !== null) {
      childNodes.forEach(childNode =>
        ExpNodeComponent.create(
          childNode,
          childrenContainerEl,
          this.callbacks,
          this.types
        )
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

        if (Utils.checkIfObjectHasProperty(this.callbacks, 'expandBtnCb')) {
          const { expandBtnCb } = this.callbacks!;
          if (Utils.isDefined(expandBtnCb)) {
            expandBtnCb!(this.node);
          } else {
            throw new Error(Errors.EXPAND_BTN_CB_UNDEFINED);
          }
        }
      });
    } else {
      throw new Error(Errors.EXPAND_BTN_NOT_FOUND);
    }
  }

  /**
   * Registers an event listener and enables the edit button for a given expandable node.
   *
   * @param expNodeComponent An expandable node for which the edit button should be registered.
   */
  private registerEditBtnClickListener(expNodeComponent: Element): void {
    const editBtnEl = expNodeComponent.querySelector('.exp-node-edit-btn');

    if (editBtnEl != null) {
      editBtnEl.classList.remove('exp-node-hide');
      editBtnEl.addEventListener('click', () => {
        if (Utils.checkIfObjectHasProperty(this.callbacks, 'editBtnCb')) {
          const { editBtnCb } = this.callbacks!;
          if (Utils.isDefined(editBtnCb)) {
            editBtnCb!(this.node);
          } else {
            throw new Error(Errors.EDIT_BTN_CB_UNDEFINED);
          }
        }
      });
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
    const deleteBtnEl = expNodeComponent.querySelector('.exp-node-delete-btn');
    const parentEl = (expNodeComponent as HTMLElement).parentElement;

    if (deleteBtnEl != null && parentEl != null) {
      deleteBtnEl.addEventListener('click', () => {
        parentEl.removeChild(expNodeComponent);
        if (Utils.checkIfObjectHasProperty(this.callbacks, 'deleteBtnCb')) {
          const { deleteBtnCb } = this.callbacks!;
          if (Utils.isDefined(deleteBtnCb)) {
            deleteBtnCb!(this.node);
          } else {
            throw new Error(Errors.DELETE_BTN_CB_UNDEFINED);
          }
        }
      });
    } else {
      throw new Error(Errors.DELETE_BTN_NOT_FOUND);
    }
  }

  /**
   * Registers an event listener for the selection of a expandable node.
   *
   * @param expNodeComponent An expandable node for which the edit button should be registered.
   */
  private registerSelectClickListener(expNodeComponent: Element): void {
    const shapeEl = expNodeComponent.querySelector('.exp-node-shape');
    const shapeSelectionEl = expNodeComponent.querySelector(
      '.exp-node-shape-selection'
    );

    if (shapeEl != null && shapeSelectionEl != null) {
      shapeEl.addEventListener('click', () => {
        Utils.removeSelectionFromAllShapes();
        shapeSelectionEl.classList.add('z-depth-1');
        if (Utils.checkIfObjectHasProperty(this.callbacks, 'selectCb')) {
          const { selectCb } = this.callbacks!;
          if (Utils.isDefined(selectCb)) {
            selectCb!(this.node);
          } else {
            throw new Error(Errors.SELECT_BTN_CB_UNDEFINED);
          }
        }
      });
    } else {
      throw new Error(Errors.SHAPE_NOT_FOUND);
    }
  }
}
