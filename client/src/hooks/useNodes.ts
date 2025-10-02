import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNodes, createNode, deleteNode } from "@/api/nodes";
import type { Node } from "@/api/nodes";

export const useNodes = () => {
  const queryClient = useQueryClient();

  const {
    data: nodes,
    isLoading,
    isError,
  } = useQuery<Node[]>({
    queryKey: ["nodes"],
    queryFn: getNodes,
  });

  // Add node
  const addNodeMutation = useMutation({
    mutationFn: ({
      parentId,
      name,
    }: {
      parentId: string | null;
      name: string;
    }) => createNode(parentId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
    },
  });

  // Delete node
  const deleteNodeMutation = useMutation({
    mutationFn: (nodeId: string) => deleteNode(nodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
    },
  });

  return {
    nodes,
    isLoading,
    isError,
    addNode: addNodeMutation.mutateAsync,
    deleteNode: deleteNodeMutation.mutateAsync,
  };
};
