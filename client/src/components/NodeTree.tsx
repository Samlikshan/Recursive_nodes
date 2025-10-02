import { TreeNode } from "./TreeNode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNodes } from "@/hooks/useNodes";

export const NodeTree = () => {
  const { toast } = useToast();
  const { nodes, isLoading, addNode, deleteNode } = useNodes();

  const [showRootInput, setShowRootInput] = useState(false);
  const [rootNodeName, setRootNodeName] = useState("");
  const [isAddingRoot, setIsAddingRoot] = useState(false);

  const handleAddChild = async (parentId: string, name: string) => {
    try {
      await addNode({ parentId, name });
      toast({ title: "Success", description: "Node added successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add node",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (nodeId: string) => {
    try {
      await deleteNode(nodeId);
      toast({ title: "Success", description: "Node deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete node",
        variant: "destructive",
      });
    }
  };

  const handleAddRoot = async () => {
    if (!rootNodeName.trim()) return;
    setIsAddingRoot(true);
    try {
      await addNode({ parentId: null, name: rootNodeName });
      setRootNodeName("");
      setShowRootInput(false);
      toast({ title: "Success", description: "Root node added successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add root node",
        variant: "destructive",
      });
    } finally {
      setIsAddingRoot(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add Root Node Section */}
      {!showRootInput ? (
        <Button
          onClick={() => setShowRootInput(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Root Node
        </Button>
      ) : (
        <div className="flex items-center gap-2 p-4 rounded-lg border border-node-border bg-card">
          <Input
            type="text"
            placeholder="Root node name..."
            value={rootNodeName}
            onChange={(e) => setRootNodeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddRoot();
              if (e.key === "Escape") setShowRootInput(false);
            }}
            disabled={isAddingRoot}
            autoFocus
          />
          <Button
            onClick={handleAddRoot}
            disabled={isAddingRoot || !rootNodeName.trim()}
          >
            {isAddingRoot ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowRootInput(false);
              setRootNodeName("");
            }}
            disabled={isAddingRoot}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Tree Nodes */}
      {nodes && nodes.length > 0 ? (
        <div className="space-y-3">
          {nodes.map((node) => (
            <TreeNode
              key={node._id}
              node={node}
              onAddChild={handleAddChild}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No nodes yet. Add a root node to get started.
        </div>
      )}
    </div>
  );
};
