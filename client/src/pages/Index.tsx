import { NodeTree } from "@/components/NodeTree";
import { Navbar } from "@/components/Navbar";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Recursive Node Hierarchies
          </h2>
          <p className="text-muted-foreground">
            Create and manage infinite nested structures with ease
          </p>
        </div>

        {/* Tree Container */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
          <NodeTree />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Click the + icon to add children • Click the trash icon to delete
            nodes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
