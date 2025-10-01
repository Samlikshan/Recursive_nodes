import { Container } from "inversify";
import TYPES from "./inversify.types";
import { NodeRepository } from "../infrastructure/repositories/node.repository";
import { CreateNodeUseCase } from "../application/node/createNode.usecase";
import { NodeController } from "../presentation/controllers/node.controller";
import { INodeRepository } from "../domain/repositories/node.repository";
import { GetTreeUseCase } from "../application/node/getTree.usecase";
import { DeleteNodeUseCase } from "../application/node/deleteNode.usecase";

const container = new Container();

// Repositories
container
  .bind<INodeRepository>(TYPES.INodeRepository)
  .to(NodeRepository)
  .inSingletonScope();

// Use cases
container
  .bind<CreateNodeUseCase>(TYPES.CreateNodeUseCase)
  .to(CreateNodeUseCase)
  .inSingletonScope();
container
  .bind<GetTreeUseCase>(TYPES.GetTreeUseCase)
  .to(GetTreeUseCase)
  .inSingletonScope();
container
  .bind<DeleteNodeUseCase>(TYPES.DeleteNodesUseCase)
  .to(DeleteNodeUseCase)
  .inSingletonScope();

// Controllers
container
  .bind<NodeController>(TYPES.NodeController)
  .to(NodeController)
  .inSingletonScope();

export default container;
