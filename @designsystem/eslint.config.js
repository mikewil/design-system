import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default tseslint.config(
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            'react-hooks': reactHooksPlugin,
        },
        extends: [
            pluginReact.configs.flat.recommended,
            pluginReact.configs.flat['jsx-runtime'],
        ],
        settings: { react: { version: 'detect' } },
        rules: {
            'no-console': 'warn',
            'react/jsx-no-undef': 'off',
            'react/no-unescaped-entities': 'off',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off', // No longer needed as of React v17
            ...reactHooksPlugin.configs.recommended.rules,
        },
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [...tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-extra-semi': 'off', // handled by prettier
            '@typescript-eslint/no-empty-function': 'off',
            'no-console': 'warn',
        },
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
            'no-console': 'off',
        },
    },
)
