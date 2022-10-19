export const defineMoxu = (code="", config={})=>{
    const rexStr = `(moxu-\\w+)="([\\s\\S]*?)"`
    const moxuRex = new RegExp(rexStr, 'g')
    const moxuData = code.match(moxuRex) || []

    // 剔除函数类的空格换行
    const splitNull = (val='')=>{
        const rex = /([\(\[\{][\s\S]*?[\)\]\}])/g
        return val.replace(rex, $0=>$0.split(/\s/g).join('')).trim().split(/\s/g)
    }

    // 字符串转对象
    const strToObj = (val="")=>{
        const obj = {}
        if(!val) return {}
        val.replace(/\{(.*?)\}/, '$1').split(',').forEach(item=>{
            const [key, value] = item.split(':')
            obj[key] = value
        })
        return obj
    }

    // 分离moxucss和css
    const splitMoxuAndCss = (val= [])=>{
        return val.reduce((pre,item)=>{
            (/\{/.test(item)) 
                ? pre['css'] = item
                : pre['classArr'].push(item)
            return pre
        },{css:'', classArr:[]})
    }

    // 获取默认值
    const getDef = (str="", obj={})=>{
        const rex = /@(\d)(\[.*?\])?/g
        if(!str) return ''
        return str.replace(rex,(n,$1,$2)=>{
            $2 = $2 && $2.replace(/[\[\]]/g, '')
            return (obj[$1] || $2)
        })
    }

    moxuData.forEach(moxu =>{
        const [key, value] = moxu.replace(moxuRex,'$1//$2').split('//')
        const {css, classArr} = splitMoxuAndCss(splitNull(value))
       
        const funcClass = (val,raw)=>{
            const cssData = strToObj(getDef(css,val))
            const moxucss = classArr.map(item=>getDef(item,raw))
            return {...cssData, moxucss}
        }
        config.defineCss[key] = funcClass
        code = code.replace(moxu, '')
    })
    return [code, config]
}
