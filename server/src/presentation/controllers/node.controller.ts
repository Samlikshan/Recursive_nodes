import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateNodeUseCase } from "../../application/node/createNode.usecase";
import { GetTreeUseCase } from "../../application/node/getTree.usecase";
import TYPES from "../../config/inversify.types";
import { DeleteNodeUseCase } from "../../application/node/deleteNode.usecase";
import { AppError } from "../../application/errors/AppError";
import { HttpStatusCodes } from "../../application/constants/HttpStatusCodes";
import { successResponse } from "../middlewares/responseHandler";

@injectable()
export class NodeController {
  constructor(
    @inject(TYPES.CreateNodeUseCase)
    private createNodeUseCase: CreateNodeUseCase,
    @inject(TYPES.GetTreeUseCase) private getTreeUseCase: GetTreeUseCase,
    @inject(TYPES.DeleteNodesUseCase)
    private deleteNodesUseCase: DeleteNodeUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, parentId } = req.body;

      if (!name) {
        throw new AppError("Name is required", HttpStatusCodes.BAD_REQUEST);
      }

      const node = await this.createNodeUseCase.execute(name, parentId);
      return successResponse(
        res,
        node,
        "Node created successfully",
        HttpStatusCodes.OK,
      );
    } catch (err) {
      next(err);
    }
  }

  async getTree(_req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await this.getTreeUseCase.execute();

      return successResponse(
        res,
        tree,
        "Tree fetched successfully",
        HttpStatusCodes.OK,
      );
    } catch (err) {
      next(err);
    }
  }

  async deleteNodes(req: Request, res: Response, next: NextFunction) {
    try {
      const { nodeId } = req.body;
      if (!nodeId) {
        throw new AppError("Node id is required", HttpStatusCodes.BAD_REQUEST);
      }
      const response = await this.deleteNodesUseCase.execute(nodeId);
      return successResponse(
        res,
        nodeId,
        response?.message,
        HttpStatusCodes.OK,
      );
    } catch (err) {
      next(err);
    }
  }
}
