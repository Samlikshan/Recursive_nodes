import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CreateNodeUseCase } from "../../application/node/createNode.usecase";
import { GetTreeUseCase } from "../../application/node/getTree.usecase";
import TYPES from "../../config/inversify.types";

@injectable()
export class NodeController {
  constructor(
    @inject(TYPES.CreateNodeUseCase)
    private createNodeUseCase: CreateNodeUseCase,
    @inject(TYPES.GetTreeUseCase) private getTreeUseCase: GetTreeUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name, parentId } = req.body;
      const node = await this.createNodeUseCase.execute(name, parentId);
      res.json(node);
    } catch (err) {
      res.status(500).json({ message: "server error please try again." });
    }
  }

  async getTree(_req: Request, res: Response) {
    try {
      const tree = await this.getTreeUseCase.execute();
      res.json(tree);
    } catch (err) {
      res.status(500).json({ message: "server error please try again." });
    }
  }
}
