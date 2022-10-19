
export const handleValue = (item='', config={} )=>{

    const { defineUnit, defineVar } = config

    // 变量值处理
    if (/^\$/.test(item)) {
        const [key] = Object.keys(defineVar).filter(i=>item.indexOf(i) >= 0)  
        const value = key && defineVar[key].split(/\n/).join('')
        item = value ? item.replace(key, value) : '$'
    }

    // 空值处理
    if (/^[\$]$/.test(item) || item.length == 0) return null

    // 多值处理
    if (/_/g.test(item)){
        return item.split('_').map(i=>handleValue(i,config))
    }

    // 颜色值处理
    if (/^#[\da-f]{1,6}-?\d?$/.test(item)) {
        // 使用透明度 16进制转rgba
        if (/-/.test(item)) {
            const rex16 = /^#([0-9a-f]+)-([0-9])$/g
            const [val, op] = item.replace(rex16, '$1-$2').split('-')
            const rgb = [0,0,0].map((t,i)=>{
                if(val.length == 1) return parseInt(val+val, 16)
                if(val.length == 2) return parseInt(val, 16)
                if(val.length == 3) return parseInt(val[i]+val[i], 16)
                if(val.length == 6) return parseInt(val[i*2]+val[i*2+1], 16)
            })
            return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.${op})`
        }
        // 普通16进制
        if(item.length == 4) return item
        return '#' + item.replace('#','').repeat(6).slice(0,6)
    }

    // 数值加单位
    if (/^[0-9]+$/g.test(item)) return defineUnit(Number(item))

    // 多参数处理
    if (/\//g.test(item)){
        return item.split('/').map(i=>handleValue(i,config)).join(' ')
    }

    // 负数值处理
    if(/^-\d+/.test(item)){
        return '-' + handleValue(item.slice(1), config)
    }

    return item
}