export const text = (newArg = {})=>{
    const ta = { l: 'left', r: 'right', c: 'center', j: 'justify' }
    const tt = ['capitalize','uppercase','lowercase']
    const clip = ['ellipsis','clip']
    const space = ['normal','pre','nowrap','pre-wrap','pre-line']

    const clipFunc = (val="")=>{
        const css = ['overflow:hidden','white-space:nowrap']
        css.push(`text-overflow:${val}`)
        return css
    }

    const indent = (val="")=>{
        if(/-/.test(val)) return `text-indent:${val.replace(/indent-(.*)/,'$1')}em`
        return 'text-indent:2em'
    }

    return Object.values(newArg).map((val)=>{
        if (Object.keys(ta).includes(val)) return `text-align:${ta[val]}`
        if (Object.values(ta).includes(val)) return `text-align:${val}`
        if (tt.includes(val)) return `text-transform:${val}`
        if (space.includes(val)) return `white-space:${val}`
        if (clip.includes(val)) return clipFunc(val)
        if (/indent/.test(val)) return indent(val)
        if (val == 'word') return 'word-wrap:break-word'
        if (val == 'break') return 'word-break:break-all'
        return ''
    }).flat()
}