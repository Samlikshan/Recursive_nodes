import mongoose, { Schema } from "mongoose";
import Node from "../../domain/entities/node.entity";

const NodeSchema = new Schema<Node>(
  {
    name: { type: String, required: true },
    parentId: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    children: [{ type: String }],
  },
  { timestamps: true },
);

export const NodeModel = mongoose.model<Node>("Nodes", NodeSchema);
