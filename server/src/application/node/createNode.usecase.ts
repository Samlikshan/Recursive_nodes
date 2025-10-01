import { inject, injectable } from "inversify";
import TYPES from "../../config/inversify.types";
import Node from "../../domain/entities/node.entity";
import { INodeRepository } from "../../domain/repositories/node.repository";

@injectable()
export class CreateNodeUseCase {
  constructor(@inject(TYPES.INodeRepository) private repo: INodeRepository) {}

  async execute(name: string, parentId?: string): Promise<Node> {
    return this.repo.create(name, parentId);
  }
}
