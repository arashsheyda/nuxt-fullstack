import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'vue/no-restricted-syntax': [
        'error',
        {
          selector: 'VElement[name=\'a\']',
          message: 'Use NuxtLink instead.',
        },
        {
          selector: 'VElement[name=\'router-link\']',
          message: 'Use NuxtLink instead.',
        },
      ],
    },
  },
)
