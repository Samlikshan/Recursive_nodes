import { Folder } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Folder className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NodeTree
              </h1>
              <p className="text-xs text-muted-foreground">
                Recursive Hierarchy Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
