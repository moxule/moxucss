export const mp = (newArg = {}) => {

    const mpHandle = (val="", mp)=>{
        const trbl = {t:'-top',r:"-right",b:'-bottom',l:'-left'}
        const values = val.split(' ')
        const mpArr = []

        if (mp == 'padding') {
            mpArr.push('box-sizing:border-box')
        }

        if(/[trbl]+/.test(values[values.length-1])){
            values.splice(-1).join().split('').filter(i=>i).forEach((key,ind)=>{
                const mpval = `${mp + trbl[key]}:${values[ind] || values[0]}`
                mpArr.push(mpval)
            })
        }else{
            mpArr.push(`${mp}:${val}`)
        }

        return mpArr
    }

    const temp = {
        0: (v)=> mpHandle(v, 'margin'),
        1: (v)=> mpHandle(v, 'padding')
    }

    return Object.keys(newArg).map(key=> temp[key](newArg[key]) ).flat()   

}