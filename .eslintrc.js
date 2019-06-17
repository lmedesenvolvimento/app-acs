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
        'react/jsx-filename-extension': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-no-bind': 'off',
        'react/prop-types': 'off',
        'react/sort-comp': 'off',
        'arrow-body-style': 'off',
        'class-methods-use-this':'off',
        'comma-dangle': 'off',
        'dot-notation': 'off',
        'global-require': 'off',
        'no-trailing-spaces': 'warn',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off'
    },
    'globals': {
        "fetch": false
    }
}