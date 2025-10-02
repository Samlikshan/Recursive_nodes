import { useState } from "react";
import { ChevronRight, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TreeNodeProps } from "@/types/tree";
import { cn } from "@/lib/utils";

export const TreeNode = ({
  node,
  onAddChild,
  onDelete,
  level = 0,
}: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const handleAddChild = async () => {
    if (!newNodeName.trim()) return;

    setIsAdding(true);
    try {
      await onAddChild(node._id, newNodeName);
      setNewNodeName("");
      setShowInput(false);
      setIsExpanded(true);
    } catch (error) {
      console.error("Failed to add child:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(node._id);
    } catch (error) {
      console.error("Failed to delete node:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div
        className={cn(
          "group flex items-center gap-2 p-3 rounded-lg border border-node-border bg-node-bg",
          "hover:bg-node-hover transition-all duration-200",
          "shadow-sm hover:shadow-md",
        )}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-6 w-6 p-0 transition-transform duration-200",
            !hasChildren && "invisible",
            isExpanded && "rotate-90",
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Node Name */}
        <span className="flex-1 font-medium text-foreground">{node.name}</span>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
            onClick={() => setShowInput(!showInput)}
            disabled={isAdding || isDeleting}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={handleDelete}
            disabled={isAdding || isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Add Child Input */}
      {showInput && (
        <div
          className="flex items-center gap-2 mt-2 p-3 rounded-lg border border-node-border bg-card animate-slide-down"
          style={{ marginLeft: `${(level + 1) * 24}px` }}
        >
          <Input
            type="text"
            placeholder="Node name..."
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddChild();
              if (e.key === "Escape") setShowInput(false);
            }}
            disabled={isAdding}
            className="flex-1"
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleAddChild}
            disabled={isAdding || !newNodeName.trim()}
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowInput(false);
              setNewNodeName("");
            }}
            disabled={isAdding}
          >
            Cancel
          </Button>
        </div>
      )}

      {isExpanded && hasChildren && (
        <div className="mt-2 space-y-2 animate-slide-down">
          {node.children.map((child) => (
            <TreeNode
              key={child._id}
              node={child}
              onAddChild={onAddChild}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
