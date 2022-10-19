
export const show = (newArg={})=>{
    const temp = {
        display:['block','none','flex','grid','inline','inline-block'],
        overflow:['hidden','visible','scroll','auto'],
        'box-sizing':['border-box','content-box']
    }

    const css = Object.values(newArg).map(item=>{
        // 特殊处理
        if (/-[xy]$/.test(item)) {
            const [value, xy] = item.split('-')
            return `overflow-${xy}:${value}`
        }
        // 整体处理
        for (const key in temp) {
           if (temp[key].includes(item)) return `${key}:${item}`
        }
        // 空值
        return ''
    })

    return css
}