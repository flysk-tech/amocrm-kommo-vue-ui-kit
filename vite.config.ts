import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'

  const baseConfig = {
    plugins: [
      vue(),
      svgLoader(),
      ...(isProduction ? [dts({
        tsconfigPath: './tsconfig.build.json',
        include: ['src/**/*'],
        outDir: 'dist',
        copyDtsFiles: true,
        rollupTypes: true
      })] : [])
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/abstracts/_variables.scss" as *; @use "@/styles/abstracts/_mixins.scss" as *;`
        }
      }
    },

    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  }

  // Конфигурация для разработки (playground)
  if (!isProduction) {
    return {
      ...baseConfig,
      root: './playground',
      server: {
        port: 3000,
        open: true
      }
    }
  }

  // Конфигурация для production сборки библиотеки
  return {
    ...baseConfig,
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: 'index',
        formats: ['es']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'styles/[name][extname]'
            }
            return 'assets/[name][extname]'
          }
        }
      },
      sourcemap: true,
      emptyOutDir: true
    }
  }
})