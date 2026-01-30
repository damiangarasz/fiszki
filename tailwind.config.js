/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-primary)"],
        buttons: ["var(--font-buttons)"],
        card: ["var(--font-card)"],
        SourGummy: ["SourGummy"],
      },
      colors: {
        //Main colors
        bg: "var(--bg)",
        "bg-primary": "var(--bg-primary)",
        "text-primary": "var(--text-color-primary)",

        // MOJE FISZKI
        "btn-know": "var(--btn-bg-know)",
        "btn-maybe": "var(--btn-bg-maybe)",
        "btn-dontKnow": "var(--btn-bg-dontKnow)",
        "border-know": "var(--btn-border-know)",
        "border-maybe": "var(--btn-border-maybe)",
        "border-dontKnow": "var(--btn-border-dontKnow)",
        "text-card": "var(--text-card)",
        "text-name-moje-fiszki": "var(--text-color-primary)",

        // Języki
        "btn-lang": "var(--btn-lang-bg)",
        "border-lang": "var(--btn-lang-border)",
        "bg-lang": "var(--bg-lang)",

        // EDYCJA
        "btn-addNew": "var(--btn-bg-addNew)",
        "border-addNew": "var(--btn-border-addNew)",
        "text-addNew": "var(--text-btn-addNew)",

        // PRZYCISKI DODAJ / ANULUJ
        "btn-add": "var(--btn-bg-add)",
        "border-add": "var(--btn-border-add)",
        "btn-add-dis": "var(--btn-bg-add-dis)",
        "border-dis": "var(--btn-border-dis)",
        "btn-cancel": "var(--btn-bg-cancel)",
        "border-cancel": "var(--btn-border-cancel)",
        "text-add-cancel": "var(--text-btn-add-cancel)",

        // STATYSTYKI
        "btn-stat": "var(--btn-bg-stat)",
        "border-stat": "var(--btn-border-stat)",
        "text-stat": "var(--text-btn-stat)",
        "chart-line": "var(--chart-bar-line)",
        "text-chart": "var(--text-chart)",
        "text-stat-main": "var(--text-stat)",

        //INPUT
        "in-bg": "var(--bg-input)",
      },
    },
  },
  plugins: [],
};
