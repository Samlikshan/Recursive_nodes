import { UpdateWriteOpResult } from "mongoose";
import Node from "../entities/node.entity";

export interface INodeRepository {
  create(name: string, parentId?: string | null): Promise<Node>;
  getAll(): Promise<Node[]>;
  getNodeById(id: string): Promise<Node | null>;
  deleteManyByIds(ids: string[]): Promise<UpdateWriteOpResult>;
}
