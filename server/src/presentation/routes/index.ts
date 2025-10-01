import { Router } from "express";

import nodeRoutes from "./node.routes";

const router = Router();

router.use("/node", nodeRoutes);

export default router;
