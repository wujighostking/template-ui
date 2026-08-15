import { defineConfig } from 'oxlint'

export default defineConfig({
  rules: {
    'no-console': 'off',
    'no-unused-vars': [
      'warn',
      {
        // 自动删除未使用的导入（oxfmt 不负责此功能，需通过 lint:fix 应用）
        fix: {
          imports: 'safe-fix',
        },
      },
    ],
  },
})
