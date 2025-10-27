export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        open: "#22c55e",
        in_progress: "#f59e0b",
        closed: "#9ca3af",
      },
      maxWidth: {
        screen1440: "1440px",
      },
    },
  },
  plugins: [],
};
