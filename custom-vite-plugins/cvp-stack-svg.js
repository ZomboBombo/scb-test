/**
 * Custom Vite-plugin: `CVP-Stack-SVG`
 * ~~~
 *
 * Custom plugin for the «Vite»:
 * used to create `stack` SVG-sprite from project icons.
 * ~~~
 *
 * © Copyright: Sergey Novikov. 2025.
 *
*/

import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import fastGlob from 'fast-glob'

/**
 * @function generateStackSvg()
 * @description Custom Vite-plugin to generate the `Stack-SVG-Sprite`.
 * ~~~
 *
 * @param {string} pathToIcons: Path to SVGs
 * @param {string} output: The output directory
 * @returns {Promise<void>}
*/
async function generateStackSvg({ pathToIcons, output }) {
  let files = await fastGlob(`${pathToIcons}*.svg`)

  if (!files.length) {
    throw `
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
      |
      | ❌ Wrong path to icons: ${pathToIcons}
      | Please, try to change the current path!
      |
      =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
    `
  }

  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg">\n<style> :root svg:not(:target) { display: none } </style>\n'

  for (const file of files) {
    const svgContent = await readFile(file, 'utf-8')
    const fileName = path.basename(file, '.svg')

    // Remove redundant XML-code and other attrs from <svg>
    const cleanedSvg = svgContent
      .replace(/<!DOCTYPE.*?>|(?:\s*(?:xml(?:ns)?(?::\w+)?|version|class|role|aria-[\w]+|width|height)=["'][^"']*["'])/g, '')
      .replace(/<svg/, `<svg id="${fileName}"`)

    spriteContent += `${cleanedSvg}`
  }

  spriteContent += '</svg>'

  await writeFile(output, spriteContent, 'utf-8')
}

export default function cvpStackSvg({ pathToIcons, output }) {
  return {
    name: 'cvp-stack-svg',
    buildStart: async () => {
      try {
        await generateStackSvg({ pathToIcons, output })
      } catch (catchedErr) {
        throw new Error(`
          =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
          ❌ Error occured inside 'cvp-stack-svg'.

          ${catchedErr}
          =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
        `)
      }

      console.log(`
        =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
        |
        | ✅ Stack-SVG-Sprite was successfully updated!
        | Generated file: ${output}
        |
        =--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=--=
      `)
    }
  }
}
