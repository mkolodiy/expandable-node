export interface Node {
  readonly id: string;
  readonly description: string;
  readonly childNodes: ReadonlyArray<Node>;
}

export interface Options {
  readonly container: string;
  readonly nodes: ReadonlyArray<Node>;
}
