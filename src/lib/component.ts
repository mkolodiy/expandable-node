import { Node, NodeCallbacks, NodeType } from './models';
import { Utils } from './utils';
import { ClassNames, Errors, Selectors } from './variables';

/**
 * Component used to render a node.
 */
export class ExpNodeComponent {
  /**
   * Creates a new instance of ExpNodeComponent and adds it to a container.
   *
   * @param node        Node object that should be rendered in the ExpNodeComponent.
   * @param containerEl Element that should be a container for the ExpNodeComponent.
   * @param callbacks   Object with callback functions.
   * @param types       Array containing types that can be used for a node.
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
   * Defines an element where the ExpNodeComponent will be appended to.
   */
  private readonly containerEl: Element;

  /**
   *  Defines a node object that should be rendered in the ExpNodeComponent.
   */
  private readonly node: Node;

  /**
   * Defines an object containing callbacks for all buttons defined for a node.
   */
  private readonly callbacks?: NodeCallbacks;

  /**
   * Defines an array of types that can be used for a node.
   */
  private readonly types?: ReadonlyArray<NodeType>;

  /**
   * Initializes [[node]], [[containerEl]], [[callbacks]] and [[types]] variable. Calls [[render]] to render passed node.
   *
   * @param node        Node object that should be rendered in the ExpNodeComponent.
   * @param containerEl Element that should be a container for the ExpNodeComponent.
   * @param callbacks   Object with callback functions.
   * @param types       Array containing types that can be used for a node.
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
   * Creates a node and adds it to the [[containerEl]].
   */
  private render(): void {
    const { id } = this.node;
    const { description } = this.node;
    const { enableEditBtn } = this.node;
    const { childNodes } = this.node;

    const expNodeComponent: Element = document.createElement('div');
    expNodeComponent.id = id;
    expNodeComponent.classList.add(ClassNames.CONTAINER);
    expNodeComponent.innerHTML = `
    <div class="exp-node-row">
      <div class="exp-node-element">
        <div class="exp-node-shape ${Utils.getCssClassForAssignedType(
          this.node,
          this.types
        )}"></div>
        <div class="exp-node-shape-selection"></div>
      </div>
      <div class="exp-node-element">
        <div class="exp-node-actions">
          <button type="button" class="exp-node-delete-btn"></button>
          <button type="button" class="exp-node-edit-btn exp-node-hide"></button>
        </div>
        <div class="exp-node-description">
            ${description}
        </div>
      </div>
    </div>
    <div class="exp-node-row">
      <div class="exp-node-element exp-node-children-actions-wrapper"></div>
      <div class="exp-node-element exp-node-children-wrapper">
          <div class="exp-node-children"></div>
      </div>
    </div>`;

    if (
      Utils.checkIfElementContainsClassName(
        this.containerEl,
        ClassNames.WRAPPER
      )
    ) {
      this.containerEl.appendChild(expNodeComponent);
    } else {
      const childrenContainerEl = this.containerEl.querySelector(
        Selectors.CHILDREN
      );
      if (childrenContainerEl !== null) {
        childrenContainerEl.appendChild(expNodeComponent);
      }
    }

    if (Utils.arrayNotEmpty(childNodes)) {
      this.enableChildrenActions(expNodeComponent);
      this.renderChildNodes(expNodeComponent);
    }
    if (enableEditBtn) {
      this.registerEditBtnClickListener(expNodeComponent);
    }
    this.registerDeleteBtnClickListener(expNodeComponent);
    this.registerSelectClickListener(expNodeComponent);
  }

  /**
   * Enables children actions for a given node.
   *
   * @param expNodeComponent Node which should have children actions enabled.
   */
  private enableChildrenActions(expNodeComponent: Element): void {
    const childrenActionsContainerEl = expNodeComponent.querySelector(
      Selectors.CHILDREN_ACTIONS_WRAPPER
    );
    if (childrenActionsContainerEl !== null) {
      childrenActionsContainerEl.innerHTML = `<div class="exp-node-children-actions">
        <button type="button" class="exp-node-expand-btn exp-node-expand-less-btn"></button>
      </div>`;
      this.registerExpandBtnClickListener(expNodeComponent);
    }
  }

  /**
   * Renders children nodes of a node.
   *
   * @param expNodeComponent Node which children should be rendered out.
   */
  private renderChildNodes(expNodeComponent: Element): void {
    const { childNodes = [] } = this.node;
    childNodes.forEach((childNode) =>
      ExpNodeComponent.create(
        childNode,
        expNodeComponent,
        this.callbacks,
        this.types
      )
    );
  }

  /**
   * Registers an event listener for the children action button to show/collapse the children nodes.
   *
   * @param expNodeComponent Node for which the expand button should be registered.
   */
  private registerExpandBtnClickListener(expNodeComponent: Element): void {
    const expandBtnEl = expNodeComponent.querySelector(Selectors.EXPAND_BTN);
    const childrenContainerEl = expNodeComponent.querySelector(
      Selectors.CHILDREN
    );

    if (expandBtnEl !== null && childrenContainerEl !== null) {
      expandBtnEl.addEventListener('click', () => {
        childrenContainerEl.classList.toggle(ClassNames.HIDE);

        if (
          Utils.checkIfElementContainsClassName(
            childrenContainerEl,
            ClassNames.HIDE
          )
        ) {
          expandBtnEl.classList.remove('exp-node-expand-less-btn');
          expandBtnEl.classList.add('exp-node-expand-more-btn');
        } else {
          expandBtnEl.classList.remove('exp-node-expand-more-btn');
          expandBtnEl.classList.add('exp-node-expand-less-btn');
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
   * Registers an event listener and enables the edit button for a given node.
   *
   * @param expNodeComponent Node for which the edit button should be registered.
   */
  private registerEditBtnClickListener(expNodeComponent: Element): void {
    const editBtnEl = expNodeComponent.querySelector(Selectors.EDIT_BTN);

    if (editBtnEl != null) {
      editBtnEl.classList.remove(ClassNames.HIDE);
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
   * Registers an event listener and enables the edit button for a given node.
   *
   * @param expNodeComponent Node for which the edit button should be registered.
   */
  private registerDeleteBtnClickListener(expNodeComponent: Element): void {
    const deleteBtnEl = expNodeComponent.querySelector(Selectors.DELETE_BTN);
    const parentEl = (expNodeComponent as HTMLElement).parentElement;

    if (deleteBtnEl != null && parentEl != null) {
      deleteBtnEl.addEventListener('click', () => {
        parentEl.removeChild(expNodeComponent);

        const childrenActionsContainerEl = this.containerEl.querySelector(
          Selectors.CHILDREN_ACTIONS_WRAPPER
        );
        const childrenContainerEl = this.containerEl.querySelector(
          Selectors.CHILDREN
        );

        if (
          childrenActionsContainerEl != null &&
          childrenContainerEl != null &&
          childrenContainerEl.children.length === 0
        ) {
          childrenActionsContainerEl.innerHTML = '';
        }

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
   * Registers an event listener for the selection of a node.
   *
   * @param expNodeComponent Node for which the edit button should be registered.
   */
  private registerSelectClickListener(expNodeComponent: Element): void {
    const shapeEl = expNodeComponent.querySelector(Selectors.SHAPE);
    const shapeSelectionEl = expNodeComponent.querySelector(
      Selectors.SHAPE_SELECTION
    );

    if (shapeEl != null && shapeSelectionEl != null) {
      shapeEl.addEventListener('click', () => {
        Utils.removeSelectionFromAllShapes();
        shapeSelectionEl.classList.add(ClassNames.SHAPE_SELECTION_ACTIVE);
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
