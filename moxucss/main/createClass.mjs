import { handleCss } from "./handleCss.mjs";
import { mergeCss } from "./mergeCss.mjs";
import { splitFuncArg } from "../tools/splitFuncArg.mjs";



export const createClass = (classData=[], config = {}, flag = false)=>{
    const { defineCss } = config
    const css = classData.map(item => {
        const {newVal, rowVal} = splitFuncArg(item.args, config)
        const cssData = defineCss[item.func](newVal, rowVal, config)
        const cssMergeData = handleCss(cssData, item, config)
        const css = mergeCss(cssMergeData, flag, config)
        return css
    })
    return css.join('')
}