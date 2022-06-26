module.exports = {
  root: true,
  ignorePatterns: [
    "projects/**/*",
    "**/*.html"
  ],
  overrides: [
    {
			files: ["*.ts"],
			parserOptions: {
				project: [
					"tsconfig.*?.json",
				],
				createDefaultProgram: true
			},
			extends: [
				"plugin:import/recommended",
				"plugin:@angular-eslint/recommended",
				'airbnb-typescript/base'
			],
			rules: {
				"@typescript-eslint/indent": 0,
				"indent": ["error", 4]
			}
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }],
      }
    }
  ]
}
