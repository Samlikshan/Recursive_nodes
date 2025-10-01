import { Router } from "express";
import { NodeController } from "../controllers/node.controller";
import container from "../../config/inversify.container";
import TYPES from "../../config/inversify.types";

const router = Router();
const nodeController = container.get<NodeController>(TYPES.NodeController);

router.post("/", nodeController.create.bind(nodeController));
router.get("/", nodeController.getTree.bind(nodeController));
router.delete("/", nodeController.deleteNodes.bind(nodeController));

export default router;
