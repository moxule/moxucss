import config from "./moxcss-config.mjs";
import { mergeConfig } from "./tools/deepMerge.mjs";
import { getClass } from './main/getClass.mjs'
import { createClass } from "./main/createClass.mjs";
import { defineMoxu } from "./main/defineMoxu.mjs";
import { defineSelect } from "./main/defineSelect.mjs";
import { globalMatch } from "./main/globalMatch.mjs";

export function moxucss(code = '', newConfig = {}) {
    const $config = mergeConfig(config, newConfig)
    const [html0, moxConfig] = defineMoxu(code, $config)
    const [html1, classInfo] = getClass(html0, moxConfig)
    const [html2, selCss] = defineSelect(html1, moxConfig)
    const [html3, glbalCss] = globalMatch(html2, moxConfig)
    const classCss = createClass(classInfo, moxConfig)
    const css = classCss + selCss + glbalCss
    return {code: html3, css}
}