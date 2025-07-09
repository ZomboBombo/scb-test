// Core Plugins
import autoprefixer from 'autoprefixer'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import imageminWebp from 'imagemin-webp'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

// Custom Plugins
import cvpStackSvg from './custom-vite-plugins/cvp-stack-svg'
import cvpRemoveWebpsFromDevMode from './custom-vite-plugins/cvp-remove-webps-from-dev-mode'

export default {
  base: './',
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
    minify: true,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    },
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  plugins: [
    cvpStackSvg({
      pathToIcons: 'src/icons/',
      output: 'public/img/sprite.svg',
    }),
    cvpRemoveWebpsFromDevMode(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg({ quality: 80 }),
        jpeg: imageminMozjpeg({ quality: 80 }),
        png: imageminPngquant({ quality: [0.8, 0.9] }),
      },
      makeWebp: {
        formatFilePath: (filepath) => `${filepath.slice(0, filepath.lastIndexOf('.'))}.webp`,
        skipIfLargerThan: false,
        plugins: {
          jpg: imageminWebp({ quality: 80 }),
          jpeg: imageminWebp({ quality: 80 }),
          png: imageminWebp({ quality: 80 }),
        },
      },
      exclude: [/favicons/],
    }),
  ]
}
