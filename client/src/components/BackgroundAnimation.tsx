export const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed" />
      <div
        className="absolute -bottom-8 left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"
        style={{ animationDelay: "10s" }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMTggMzZjOS45NCAwIDE4LTguMDYgMTgtMTgiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-40" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animated icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const icons = [
            // Checkmark SVG
            <svg
              key={`check-${i}`}
              className="w-4 h-4 text-primary/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>,
            // Plus SVG
            <svg
              key={`plus-${i}`}
              className="w-4 h-4 text-accent/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>,
            // Node circle
            <div
              key={`node-${i}`}
              className="w-3 h-3 bg-card/50 rounded-full border border-border/50"
            />,
          ];
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];
          return (
            <div
              key={i}
              className="absolute opacity-40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            >
              {randomIcon}
            </div>
          );
        })}
      </div>
    </div>
  );
};
