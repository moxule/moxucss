import { filterClass } from "../tools/filterClass.mjs";
import { compileClass } from "./compileClass.mjs";

export const getClass = (code='', config)=>{
    const {defineCss, defineScreens} = config
    const classRex = /class(Name)?="([\s\S]*?)"/g
    const classArr = code.match(classRex) || []
    const funcKeys = Object.keys(defineCss).join('|')
    const mediaKeys = Object.keys(defineScreens).join(':|')
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g')
    const classInfo = []

    classArr.forEach(attrClass =>{
        const rowClass = attrClass
        const funcClass = attrClass.match(cssRex) || []
        funcClass.forEach(item =>{
            const cssObj = compileClass(item, config)
            attrClass = attrClass.replace(item, cssObj.className)
            classInfo.push(cssObj)
        })
        code = code.replace(rowClass, attrClass)
    })
    return [code, filterClass(classInfo)]
}