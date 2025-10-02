import api from "@/lib/axios";

export interface Node {
  _id: string;
  name: string;
  children: string[];
  parentId?: string | null;
}

export const getNodes = async (): Promise<Node[]> => {
  const res = await api.get("/node");
  console.log(res.data);
  return res.data.data;
};

export const createNode = async (
  parentId: string | null,
  name: string,
): Promise<Node> => {
  const res = await api.post("/node", { parentId, name });
  return res.data;
};

export const deleteNode = async (nodeId: string): Promise<void> => {
  await api.delete(`/node/${nodeId}`);
};
