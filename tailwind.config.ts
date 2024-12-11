import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#D1C4E9",
          dark: "#6B46C1",
        },
        accent: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
        },
        metallic: {
          light: "#F1F0FB",
          DEFAULT: "#9F9EA1",
          dark: "#8E9196",
        },
        chat: {
          user: "#E5DEFF",
          assistant: "#FFFFFF",
        },
      },
      backgroundImage: {
        'noise': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09vT8+vzs7uxH16TeAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAuFJREFUOI0Vk+3NLiEIRG1B8ClAYAsQ2AIEt4D9ePtv5Xp/mZgYJ2fOFJKEfInkVWY2aglmQFkimRTV7MblYyVqD7HXyhKsSuPX12MeDhRHLtGvRG+P+B/S0Vu4OswR9tmvwNPyhdCDbVayJGads/WiUWcjCvCnruTBNHS9gmX2VzVbk7ZvB1gb1hkWFGl+A/n+/FowcO34U/XvKqZ/fHY+6vgRfU92XrOBUbGeeDfQmjWjdrK+frc6FdGReQhfSF5JvR29O2QrfNw1huTwlgsyXLo0u+5So82sgv7tsFZR2nxB6lXiquHrfD8nfYZ9SeT0LiuvSoVrxGY16pCNRZKqvwWsn5OHypPBELzohMCaRaa0ceTHYqe7X/gfJEEtKFbJpWoNqO+aS1cuTykGPpK5Ga48m6L3NefTr013KqYBQu929iP1oQ/7UwSR+i3zqruUmT84qmhzLpxyj7pr9kg7LKvqaXxZmdpn+6o8bvnmlocX+q0wt7KYoY54vhWaYZF3P6l5mI3F8cURbSwy3e6RpuUQRS3ylWMaclgzHJXTcL+Y/2UHjqKnjxyCK6OLYA9jFZqO/2AhZu0kHKELRhGXTc/Ybba0HnTZbqCcNNHmFDf3lOZr/1TSNT0WiDKOHqK0o1lUj8T+EGrMnPnuDqWL/jCeQvBBX89mROvkE8JHQCLc0Z7+5PXKH1KXYHkE7BHYk58M4lfxYYi1jAX3ucR0n3I0YEXZBYoYoXKhUlQE7hXY8SQHg6OhGhJDe3sPptcZhZg6QoGVkV5T4bTJp4j4iyroJjc5ggQzswGBzZ6OQWXkzQKm2sLPjHHkz9oHuUZHtU+PI/ZhPkWQ5VIDI6qn7kHE6J4jnTHp1T3qWBtc3GNM31yGDXUeXYhH8nkOqPKf3Jb+R/B/Xh3Yl/wB4EysJ+TvqEwAAAAASUVORK5CYII=')",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;