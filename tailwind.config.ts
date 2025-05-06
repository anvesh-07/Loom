/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        background: "hsl(var(--background))", // This matches your --background
        foreground: "hsl(var(--foreground))", // This matches your --foreground
        primary: {
          DEFAULT: "hsl(var(--primary))", // Primary color for buttons, links, etc.
          foreground: "hsl(var(--primary-foreground))", // Foreground text color for primary
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Secondary color
          foreground: "hsl(var(--secondary-foreground))", // Foreground color for secondary
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Danger or alert color
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Muted background color
          foreground: "hsl(var(--muted-foreground))", // Muted text color
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Accent color
          foreground: "hsl(var(--accent-foreground))", // Accent foreground color
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Popover background color
          foreground: "hsl(var(--popover-foreground))", // Popover text color
        },
        card: {
          DEFAULT: "hsl(var(--card))", // Card background color
          foreground: "hsl(var(--card-foreground))", // Card text color
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))", // Sidebar background color
          foreground: "hsl(var(--sidebar-foreground))", // Sidebar text color
          primary: "hsl(var(--sidebar-primary))", // Primary sidebar color
          primaryForeground: "hsl(var(--sidebar-primary-foreground))", // Sidebar text in primary section
          accent: "hsl(var(--sidebar-accent))", // Sidebar accent color
          accentForeground: "hsl(var(--sidebar-accent-foreground))", // Sidebar accent text color
          border: "hsl(var(--sidebar-border))", // Sidebar border color
          ring: "hsl(var(--sidebar-ring))", // Sidebar ring (focus) color
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
