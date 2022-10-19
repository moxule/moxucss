import { filterClass } from "../tools/filterClass.mjs";
import { compileClass } from "./compileClass.mjs";
import { createClass } from "./createClass.mjs";

export const globalMatch = (code='', config)=>{
    const {defineCss, defineScreens} = config
    const funcKeys = Object.keys(defineCss).filter(i=>/moxu-/.test(i)).join('|')
    const mediaKeys = Object.keys(defineScreens).join(':|')
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g')
    const classArr = code.match(cssRex) || []
    if(funcKeys.length == 0) return [code, '']
    const classData = classArr.map(className =>{
      const classObj = compileClass(className,config)
      code = code.replace(className, classObj.className)
      return classObj
    })

    const css = createClass(classData, config)

    return [code, css]
}