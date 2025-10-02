import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify.types";
import { INodeRepository } from "../../domain/repositories/node.repository";
import Node from "../../domain/entities/node.entity";

@injectable()
export class GetTreeUseCase {
  constructor(@inject(TYPES.INodeRepository) private repo: INodeRepository) {}

  async execute(): Promise<Node[]> {
    const nodes = await this.repo.getAll();
    return this.buildTree(nodes);
  }

  private buildTree(nodes: Node[]): Node[] {
    const map = new Map();
    const roots: Node[] = [];

    nodes.forEach((n) => map.set(n._id, { ...n, children: [] }));

    map.forEach((node) => {
      if (node.parentId) {
        const parent = map.get(node.parentId);
        if (parent) parent.children.push(node);
      } else {
        roots.push(node);
      }
    });
    return roots;
  }
}
