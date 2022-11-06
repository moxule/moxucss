import { readFileSync, writeFileSync } from 'fs'
import { moxucss } from '../moxucss/index.mjs'

export default function vitePluginMoxucss (config = {}) {

    return {
		name: 'vite-plugin-moxucss',
		enforce: 'pre',
		config(ov,env){
			if (env.command !== 'build' && config.outputPath) {
				writeFileSync(config.outputPath, '')
			}
		},
		transform(text, id){
			const suffixArr = ['vue', 'jsx', 'tsx']
			const suffix = id.slice(id.lastIndexOf('.') + 1)
			const path = config.outputPath
			if (!suffixArr.includes(suffix) || !path) return text
			const {code, css} = moxucss(text, config)
			if (css.length > 0) {
				const logo = id.slice(id.lastIndexOf('/src') + 1)
				const rex = new RegExp(`\/\\*${logo}\\*\/([\\s\\S]*)\/\\*${logo}\\*\/`, 'g')
				const cssFile = readFileSync(path).toString().replace(rex, '')
				const writeData = cssFile + `/*${logo}*/${css}/*${logo}*/`
				writeFileSync(path, writeData)
			}
			return code
		}
    };
  }

