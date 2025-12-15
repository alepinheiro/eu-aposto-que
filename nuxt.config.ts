import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'reka-ui/nuxt',
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  // Configuração para deploy na Vercel
  nitro: {
    preset: 'vercel',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
    checker: {
      lintOnStart: true,
      fix: true,
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
});
