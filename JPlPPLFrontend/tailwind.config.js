/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ckc: {
          bg: "#0f172a",
          card: "#111c34",
          cardSoft: "#1e293b",
          primary: "#6366f1",
          accent: "#22d3ee",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        display: ["Poppins", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
}
