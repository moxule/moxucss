export const edge = (newArg = {})=>{
    //边框
    const borderHandle = (val)=>{
        const trbl = {t:'-top',r:"-right",b:'-bottom',l:'-left'}
        const values = (typeof val == 'string') && val.split(' ')
        const bdCss = ['box-sizing:border-box']

        // 多值
        if(Array.isArray(val)){
            const newbd = val.map(item => borderHandle(item)).flat()
            return [...new Set(newbd)]
        }
        // 单一值
        if(/[trbl]+/.test(values[values.length-1])){
            values.splice(-1).join().split('').filter(i=>i).forEach((key)=>{
                bdCss.push(`border${trbl[key]}:${values.join(' ')}`) 
            })
        }else {
            bdCss.push(`border:${val}`)
        }
        return bdCss
    }
    // 阴影
    const shadowHandle = (val)=>{
        if(Array.isArray(val)){
            val = val.join()
        }
        return `box-shadow:${val}`
    }

    const temp = {
        0: borderHandle,
        1: shadowHandle,
        2: (v)=>`outline:${v}`
    }

    return Object.keys(newArg).map((key)=>{
        return temp[key]( newArg[key] )
    }).flat()

}