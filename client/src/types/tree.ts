export interface TreeNode {
  _id: string;
  name: string;
  children: TreeNode[];
  parentId?: string;
}

export interface TreeNodeProps {
  node: TreeNode;
  onAddChild: (parentId: string, name: string) => Promise<void>;
  onDelete: (nodeId: string) => Promise<void>;
  level?: number;
}
