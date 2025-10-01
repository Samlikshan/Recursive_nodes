import Node from "../entities/node.entity";

export interface INodeRepository {
  create(name: string, parentId?: string | null): Promise<Node>;
  getAll(): Promise<Node[]>;
}
