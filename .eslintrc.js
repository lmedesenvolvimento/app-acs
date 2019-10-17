module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
    },
    'rules': {
        'indent': ['error', 4],
        'camelcase': 'off',
        'lines-between-class-members': 'off',
        'no-use-before-define': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-no-bind': 'off',
        'react/prop-types': 'off',
        'react/sort-comp': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-unused-prop-types': 'off',
        'react/require-default-props': 'off',
        'arrow-body-style': 'off',
        'class-methods-use-this':'off',
        'comma-dangle': 'off',
        'dot-notation': 'off',
        'global-require': 'off',
        'no-underscore-dangle': 'off',
        'no-return-assign': 'off',
        'no-trailing-spaces': 'warn',
        'no-param-reassign': 'warn',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off'
    },
    'globals': {
        "fetch": false
    }
}