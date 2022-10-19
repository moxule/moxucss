import { createHash } from "../tools/createHash.mjs";
/**
 * @输入：compileClass("box(1,1,#f)", moxucssConfig)
 * @输出：{func:"box",args,className,media,isPri}
 */
export const compileClass = (className="", config)=>{
    const {defineCss, definePrefix, defineScreens} = config
    const funcKeys = Object.keys(defineCss).join('|')
    const mediaKeys = Object.keys(defineScreens).join(':|')
    // const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g')
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})\\(([\\s\\S]*)\\)(!)?`, 'g')
    let classObj = {}

    if (cssRex.test(className)) {
        const newItem = className.replace(/[\s'"]/g, '')
        const newClassName = `${definePrefix}${createHash(newItem)}`
        newItem.replace(cssRex, ($0,$1,$2,$3,$4)=>{
            classObj = {
                media: $1 && $1.replace(':',''), 
                func: $2, 
                args: $3, 
                isPri: !!$4,
                className:newClassName
            }
        }) 
        return classObj
    }
    return null
}