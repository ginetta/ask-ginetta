/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [
    "variant",
    [
      "@media (prefers-color-scheme: dark) { &:not(.light *) }",
      "&:is(.dark *)",
    ],
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // tremor
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      screens: {
        "2xl": "1420px",
        "3xl": "1700px",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
      width: {
        "message-xs": "450px",
        "message-sm": "550px",
        "message-default": "740px",
        "searchbar-xs": "560px",
        "searchbar-sm": "660px",
        searchbar: "850px",
        "document-sidebar": "800px",
        "document-sidebar-large": "1000px",
      },
      maxWidth: {
        "document-sidebar": "1000px",
      },
      colors: {
        popup: "#ffffff", // white
        accent: require("tailwindcss/colors").indigo[500], // indigo-500
        "accent-hover": require("tailwindcss/colors").indigo[500], // indigo-500
        error: require("tailwindcss/colors").red[500], // red-500
        success: require("tailwindcss/colors").emerald[600], // emerald-600
        alert: require("tailwindcss/colors").amber[600], // amber-600
        user: require("tailwindcss/colors").yellow[400], // yellow-400
        ai: require("tailwindcss/colors").blue[400], // blue-400
        "background-strong": {
          light: require("tailwindcss/colors").neutral[200], // neutral-200
          DEFAULT: require("tailwindcss/colors").neutral[200], // neutral-200
          dark: require("tailwindcss/colors").neutral[200], // neutral-200
        },
        "border-light": {
          light: require("tailwindcss/colors").neutral[100], // neutral-100
          DEFAULT: require("tailwindcss/colors").neutral[100], // neutral-100
          dark: require("tailwindcss/colors").neutral[900], // neutral-900
        },
        "border-strong": {
          light: require("tailwindcss/colors").neutral[400], // neutral-400
          DEFAULT: require("tailwindcss/colors").neutral[400], // neutral-400
          dark: require("tailwindcss/colors").neutral[500], // neutral-500
        },
        highlight: {
          text: require("tailwindcss/colors").yellow[100], // yellow-100
        },
        "hover-light": {
          light: require("tailwindcss/colors").neutral[100], // neutral-100
          DEFAULT: require("tailwindcss/colors").neutral[100], // neutral-100
          dark: require("tailwindcss/colors").neutral[900], // neutral-900
        },
        hover: {
          light: require("tailwindcss/colors").neutral[200], // neutral-200
          DEFAULT: require("tailwindcss/colors").neutral[200], // neutral-200
          dark: require("tailwindcss/colors").neutral[800], // neutral-800
        },
        link: {
          light: require("tailwindcss/colors").blue[500], // blue-500
          DEFAULT: require("tailwindcss/colors").blue[500], // blue-500
          dark: require("tailwindcss/colors").blue[100], // blue-100
        },
        subtle: {
          light: require("tailwindcss/colors").neutral[500], // neutral-500
          DEFAULT: require("tailwindcss/colors").neutral[500], // neutral-500
          dark: require("tailwindcss/colors").neutral[200], // neutral-200
        },
        emphasis: {
          light: require("tailwindcss/colors").neutral[700], // neutral-700
          DEFAULT: "#374151",
          dark: "#d1d5db",
        },
        strong: {
          light: require("tailwindcss/colors").neutral[900], // neutral-900
          DEFAULT: require("tailwindcss/colors").neutral[900], // neutral-900
          dark: require("tailwindcss/colors").neutral[200], // neutral-900
        },
        inverted: {
          light: "#ffffff", // white
          DEFAULT: "#ffffff",
          dark: "#000000",
        },
        default: {
          light: require("tailwindcss/colors").neutral[600], // neutral-600
          DEFAULT: require("tailwindcss/colors").neutral[600], // neutral-600
          dark: require("tailwindcss/colors").neutral[100], // neutral-100
        },
        background: {
          light: require("tailwindcss/colors").neutral[50], // neutral-50
          DEFAULT: require("tailwindcss/colors").neutral[50], // neutral-50
          dark: require("tailwindcss/colors").neutral[900], // neutral-900
        },
        "background-emphasis": {
          light: require("tailwindcss/colors").neutral[100], // neutral-100
          DEFAULT: require("tailwindcss/colors").neutral[100], // neutral-100
          dark: require("tailwindcss/colors").neutral[900], // neutral-900
        },
        border: {
          light: require("tailwindcss/colors").neutral[500] + "22", // neutral-500
          DEFAULT: require("tailwindcss/colors").neutral[500] + "22", // neutral-500
          dark: require("tailwindcss/colors").neutral[500] + "22", // neutral-800
        },
        tremor: {
          brand: {
            faint: require("tailwindcss/colors").blue[50], // blue-50
            muted: require("tailwindcss/colors").blue[200], // blue-200
            subtle: require("tailwindcss/colors").blue[400], // blue-400
            DEFAULT: require("tailwindcss/colors").blue[500], // blue-500
            emphasis: require("tailwindcss/colors").blue[700], // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: require("tailwindcss/colors").neutral[50], // neutral-50
            subtle: require("tailwindcss/colors").neutral[100], // neutral-100
            DEFAULT: "#ffffff", // white
            emphasis: require("tailwindcss/colors").neutral[700], // neutral-700
            light: require("tailwindcss/colors").neutral[50], // neutral-50
          },
          border: {
            light: require("tailwindcss/colors").neutral[200], // neutral-200
            DEFAULT: require("tailwindcss/colors").neutral[200], // neutral-200
            dark: require("tailwindcss/colors").neutral[800], // neutral-800
          },
          ring: {
            DEFAULT: require("tailwindcss/colors").neutral[200], // neutral-200
          },
          content: {
            subtle: require("tailwindcss/colors").neutral[400], // neutral-400
            DEFAULT: require("tailwindcss/colors").neutral[600], // neutral-600
            emphasis: require("tailwindcss/colors").neutral[700], // neutral-700
            strong: require("tailwindcss/colors").neutral[900], // neutral-900
            inverted: "#ffffff", // white
          },
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229", // custom
            muted: require("tailwindcss/colors").blue[950], // blue-950
            subtle: require("tailwindcss/colors").blue[800], // blue-800
            DEFAULT: require("tailwindcss/colors").blue[500], // blue-500
            emphasis: require("tailwindcss/colors").blue[400], // blue-400
            inverted: require("tailwindcss/colors").neutral[950], // neutral-950
          },
          background: {
            muted: "#131A2B", // custom
            subtle: require("tailwindcss/colors").neutral[800], // neutral-800
            DEFAULT: require("tailwindcss/colors").neutral[900], // neutral-900
            emphasis: require("tailwindcss/colors").neutral[300], // neutral-300
          },
          border: {
            light: require("tailwindcss/colors").neutral[800], // neutral-800
            DEFAULT: require("tailwindcss/colors").neutral[800], // neutral-800
            dark: require("tailwindcss/colors").neutral[200], // neutral-200
          },
          ring: {
            DEFAULT: require("tailwindcss/colors").neutral[800], // neutral-800
          },
          content: {
            subtle: require("tailwindcss/colors").neutral[500], // neutral-500
            DEFAULT: require("tailwindcss/colors").neutral[300], // neutral-300
            emphasis: require("tailwindcss/colors").neutral[100], // neutral-100
            strong: require("tailwindcss/colors").neutral[50], // neutral-50
            inverted: "#000000", // black
          },
        },
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
  ],
};
