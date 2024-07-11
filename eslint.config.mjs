import globals from "globals";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {},
}, ...compat.extends("plugin:jest/recommended").map(config => ({
    ...config,
    files: ["**/*/*.test.js"],
})), {
    files: ["**/*/*.test.js"],

    plugins: {
        jest,
    },

    rules: {
        "jest/prefer-expect-assertions": "off",
    },
}];