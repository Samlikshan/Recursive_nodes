import { NodeTree } from "@/components/NodeTree";
import { Network } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Network className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Node Tree Manager
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Create and manage recursive node hierarchies with ease
          </p>
        </div>

        {/* Tree Container */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <NodeTree />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Click the + icon to add children • Click the trash icon to delete nodes</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
