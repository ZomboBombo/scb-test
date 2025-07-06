/**
 * Custom Vite-plugin: `CVP-Remove-Webps-From-Dev-Mode`
 * ~~~
 *
 * Custom plugin for the «Vite»:
 * used to remove WebP-images config from HTML
 * during `dev-mode`.
 * ~~~
 *
 * © Copyright: Sergey Novikov. 2025.
 *
*/

export default function cvpRemoveWebpsFromDevMode() {
  return {
    name: 'cvp-remove-webps-from-dev-mode',
    enforce: 'pre',
    transformIndexHtml(html, ctx) {
      return ctx.server
        ? html.replace(/<source\s+[^>]*type=["']image\/webp["'][^>]*>/g, '')
        : html
    },
  }
}
