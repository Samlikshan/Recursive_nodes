import { useState } from "react";
import {
  ChevronRight,
  Plus,
  Trash2,
  Loader2,
  Folder,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TreeNodeProps } from "@/types/tree";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [validationError, setValidationError] = useState("");

  const hasChildren = node.children && node.children.length > 0;

  const handleAddChild = async () => {
    // Validation
    if (!newNodeName.trim()) {
      setValidationError("Node name is required");
      return;
    }

    setValidationError("");
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

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteDialog(false);
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
      <div className="relative">
        {/* Tree connector lines */}
        {level > 0 && (
          <>
            <div
              className="absolute top-0 bottom-0 border-l-2 border-node-border"
              style={{ left: `${(level - 1) * 24 + 12}px` }}
            />
            <div
              className="absolute top-6 h-0 border-t-2 border-node-border"
              style={{ left: `${(level - 1) * 24 + 12}px`, width: "12px" }}
            />
          </>
        )}

        <div
          className={cn(
            "relative group flex items-center gap-3 p-3 rounded-lg border border-node-border bg-node-bg",
            "hover:bg-node-hover transition-all duration-300",
            "shadow-sm hover:shadow-md",
          )}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-5 w-5 p-0 transition-transform duration-200 flex items-center justify-center",
              !hasChildren && "invisible",
              isExpanded && "rotate-90",
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>

          {/* Node Icon */}
          {isExpanded && hasChildren ? (
            <FolderOpen className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <Folder className="h-5 w-5 text-accent flex-shrink-0" />
          )}

          {/* Node Name */}
          <span className="flex-1 font-medium text-foreground">
            {node.name}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => {
                setShowInput(!showInput);
                setValidationError("");
              }}
              disabled={isAdding || isDeleting}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={handleDeleteClick}
              disabled={isAdding || isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Add Child Input */}
      {showInput && (
        <div
          className="mt-2 p-3 rounded-lg border border-node-border bg-card animate-slide-down"
          style={{ marginLeft: `${(level + 1) * 24}px` }}
        >
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Node name..."
              value={newNodeName}
              onChange={(e) => {
                setNewNodeName(e.target.value);
                if (validationError) setValidationError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddChild();
                if (e.key === "Escape") {
                  setShowInput(false);
                  setValidationError("");
                }
              }}
              disabled={isAdding}
              className={cn("flex-1", validationError && "border-destructive")}
              autoFocus
            />
            <Button size="sm" onClick={handleAddChild} disabled={isAdding}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowInput(false);
                setNewNodeName("");
                setValidationError("");
              }}
              disabled={isAdding}
            >
              Cancel
            </Button>
          </div>
          {validationError && (
            <p className="text-xs text-destructive mt-2 animate-fade-in">
              {validationError}
            </p>
          )}
        </div>
      )}

      {/* Children */}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Node?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{node.name}" and all its
              children? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
