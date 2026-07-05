import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: "#0B1026",
                nebula: "#211A45",
                "nebula-light": "#332a63",
                gold: "#F2C94C",
                comet: "#6FC3DF",
                cream: "#F5F3EE",
                slate: "#8B92B0",
            },
            fontFamily: {
                display: ["var(--font-fraunces)", "serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            backgroundImage: {
                "sky-gradient":
                    "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(111,195,223,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(242,201,76,0.10), transparent 60%), linear-gradient(180deg, #0B1026 0%, #0E1530 55%, #0B1026 100%)",
            },
            keyframes: {
                twinkle: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.45" },
                },
                rise: {
                    "0%": { opacity: "0", transform: "translateY(14px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                twinkle: "twinkle 3.2s ease-in-out infinite",
                rise: "rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
            },
        },
    },
    plugins: [],
};

export default config;
