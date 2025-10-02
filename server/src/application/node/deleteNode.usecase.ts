import { inject, injectable } from "inversify";
import { INodeRepository } from "../../domain/repositories/node.repository";
import TYPES from "../../config/inversify.types";
import { AppError } from "../errors/AppError";
import { HttpStatusCodes } from "../constants/HttpStatusCodes";

@injectable()
export class DeleteNodeUseCase {
  constructor(@inject(TYPES.INodeRepository) private repo: INodeRepository) {}

  async execute(nodeId: string) {
    let rootNode = await this.repo.getNodeById(nodeId);
    if (!rootNode) {
      throw new AppError("Node not found", HttpStatusCodes.NOT_FOUND);
    }

    const nodeIdsToDelete: string[] = [];
    const queue: string[] = [nodeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      nodeIdsToDelete.push(currentId);

      const currentNode = await this.repo.getNodeById(currentId);
      if (
        currentNode &&
        currentNode.children &&
        currentNode.children.length > 0
      ) {
        queue.push(...currentNode.children);
      }
    }

    const response = await this.repo.deleteManyByIds(nodeIdsToDelete);
    if (response.modifiedCount) {
      return { message: "Nodes deleted successfully" };
    }
  }
}
