export default interface Node {
  _id: string;
  name: string;
  isDeleted: boolean;
  parentId?: string | null;
  children: string[];
}
