export const flex = (newArg = {}, rawArg = {})=>{
    const flexHandle = (val="")=>{
        const flexValue = { s: 'flex-start', e: 'flex-end', c: 'center', d: 'stretch', 
        b: 'baseline', 1: 'space-between', 3: 'space-evenly', 4: 'space-around' }

        const [d, j, a, s] = [...val.replace('-','')]
        const flexCss = ['display:flex','flex-wrap:wrap']

        if(d == 'y') flexCss.push("flex-direction:column")
        flexCss.push(`align-${s?'content':'items'}:${flexValue[a]}`)
        flexCss.push(`justify-content:${flexValue[j]}`)
        return flexCss
    }

    const flexItem = (index)=>{
        const anew = newArg[index].split(' ')
        const arow = rawArg[index].split('/').slice(0,2).join(' ') 
        if (anew.length < 3) {
            return `flex:${ arow }`
        }else {
            return `flex:${ arow +' '+ anew[2] }`
        }
    }

    const self = (val="")=>{
        const selfValue = { s: 'flex-start', e: 'flex-end', c: 'center', d: 'stretch', b: 'baseline'}
        const key = val.replace(/self-(.*?)/,'$1')
        return `align-self:${ selfValue[key] || key }`
    }

    const order = (val="")=>{
        const key = val.replace(/order-(\d)/,'$1')
        return `order:${key}`
    }

    const wrap = ['nowrap','wrap','wrap-reverse']
    const direction = ['row','row-reverse','column','column-reverse']

    return Object.values(newArg).map((val,index)=>{
        if(/^[xy][secdb134]+-?s?$/.test(val)) return flexHandle(val)
        if(/self-(.*?)/.test(val)) return self(val)
        if(/order-(\d)/.test(val)) return order(val)
        if(/^(\d|auto|none)/.test(val)) return flexItem(index)
        if(wrap.includes(val)) return `flex-wrap:${val}`
        if(direction.includes(val)) return `flex-direction:${val}`
        return ''
    }).flat()

}