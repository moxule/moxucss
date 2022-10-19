export const font = (newArg={}, rawArg={})=>{
    // css-font="[字体大小,颜色,加粗,行高,文本对齐]"
    const fw = {n:'normal',b:'bold',l:'lighter', bo:'bolder'}
    const temp = {
        0: (v) => `font-size:${v}`,
        1: (v) => `color:${v}`,
        2: (v) => `font-weight:${ fw[v] || rawArg[2] }`, 
        3: (v) => `line-height:${v}`,
    }

    return Object.keys(newArg).map(item => temp[item](newArg[item]) ).flat()

}