export const layer = (newArg = {}, rawArg={})=>{

    const psHandle = (key="")=>{
        const val = {r:'relative',a:'absolute',f:'fixed',s:'static'}
        return `position:${ val[key] || key}`
    }

    const trbl = (val="")=>{
        const $trbl = {t:'top',r:"right",b:'bottom',l:'left'}
        const values = val.split(' ')
        if (/[trbl]+/.test(values[values.length-1])) {
            return values.splice(-1).join().split('').filter(i=>i).map((key,ind)=>{
                return $trbl[key] +':'+ (values[ind] || values[0])
            })
        }
        
        if(values.length == 1){
            return Object.values($trbl).map(i=>`${i}:${val}`)
        }
        if(values.length == 4){
            return Object.values($trbl).map((item,ind)=>`${item}:${values[ind]}`)
        }

        return Object.values($trbl).map((item, ind)=>{
            return ind < values.length ? `${item}:${values[ind]}` : null
        }).filter(i=>i)
        
    }

    const index = (val="")=>{
        return `z-index:${rawArg[2]}`
    }

    const temp = {
        0: psHandle,
        1: trbl,
        2: index
    }

    return Object.keys(newArg).map(i => temp[i](newArg[i]) ).flat()

}