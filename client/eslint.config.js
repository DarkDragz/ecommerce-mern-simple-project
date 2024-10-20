import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser, // Existing browser globals
        process: "readonly", // Add process as a global variable
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./src"]], // Add the alias mapping
          extensions: [".js", ".jsx", ".json"], // Include only relevant extensions for now
        },
        node: {
          paths: ["src"],
          moduleDirectory: ["node_modules", "src/"],
          extensions: [".js", ".jsx"], // Only include JavaScript extensions
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/prop-types": 0, // Disable prop-types as you may be using TypeScript later
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
];
