import { injectable } from "inversify";
import Node from "../../domain/entities/node.entity";
import { INodeRepository } from "../../domain/repositories/node.repository";
import { NodeModel } from "../models/node.schema";

@injectable()
export class NodeRepository implements INodeRepository {
  async create(name: string, parentId?: string | null): Promise<Node> {
    const node = new NodeModel({ name, parentId, children: [] });
    await node.save();

    if (parentId) {
      await NodeModel.findByIdAndUpdate(parentId, {
        $push: { children: node._id.toString() },
      });
    }

    return this.map(node);
  }

  async getAll(): Promise<Node[]> {
    const docs = await NodeModel.find();
    return docs.map(this.map);
  }

  private map(doc: Node): Node {
    return {
      _id: doc._id.toString(),
      name: doc.name,
      isDeleted: doc.isDeleted,
      parentId: doc.parentId,
      children: doc.children || [],
    };
  }
}
