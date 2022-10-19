export const box = (newArg = {})=>{

    const bdrHandle = (val="")=>{
        const trbl = {t:0,r:0,b:0,l:0}
        const values = val.split(' ')
        const bdr = `border-radius:$`
        if (/[trbl]+/.test(values[values.length-1])) {
            values.splice(-1).join().split('').filter(i=>i)
            .forEach((key,ind)=>(trbl[key] = (values[ind] || values[0])))
            val = Object.values(trbl).join(' ')
        }
        return bdr.replace('$', val)
    }

    const temp = {
        0: v=>`width:${v}`,
        1: v=>`height:${v}`,
        2: v=>`background:${v}`,
        3: v=> bdrHandle(v)
    }

    return Object.keys(newArg).map(i => temp[i](newArg[i]))

}