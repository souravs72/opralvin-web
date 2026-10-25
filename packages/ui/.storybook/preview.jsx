import "../src/tokens.css";

export const globalTypes = {
  theme: {
    description: "Paper theme",
    toolbar: {
      title: "Theme",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
    },
  },
};

export const initialGlobals = { theme: "light" };

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme === "dark" ? "theme-dark" : "theme-light";
    return (
      <div className={theme}>
        <Story />
      </div>
    );
  },
];
