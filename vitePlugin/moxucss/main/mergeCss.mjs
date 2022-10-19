import { createMedia } from "../tools/createMedia.mjs";

const addPriority = (value=[], priority=false)=>{
    return value.filter(i=>i).map(item => {
        const pri = priority ? ' !important;' : ';'
        return item + pri
    }).join('')
}

export const mergeCss = (css = [], flag = false, {defineScreens})=>{
    const media = createMedia(defineScreens)
    return css.map(item =>{
        if(item.cssArr.length == 0) return ''
        if (flag) {
            const css = addPriority(item.cssArr, item.isPri)
            return item.isSelect ? '' : css
        } else {
            const css = `.${item.className}{${ addPriority(item.cssArr, item.isPri) }}`
            return item.media ? media[item.media].replace('$',css) : css
        }
    }).join('')
}
