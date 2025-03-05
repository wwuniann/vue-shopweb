import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
    {
        files: ['**/*.{js,mjs,jsx,vue}'],
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest'
        },
        rules: {
            ...js.configs.recommended.rules,
            ...pluginVue.configs['flat/essential'].rules,
            // 关闭组件命名必须多单词的规则
            'vue/multi-word-component-names': 'false'
        }
    }
];