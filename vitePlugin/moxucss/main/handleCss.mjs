import { compileClass } from "./compileClass.mjs";
import { createClass } from "./createClass.mjs";

// 对象转数组 大写转小写加横杠
const cssObjToArr = (value={})=>{
    const cssArr = Object.keys(value).map(key =>{
        const newKey = key.replace(/([A-Z])/g, (row, rep)=>{
            return row.replace(rep, `-${rep.toLowerCase()}`)
        })
        return `${newKey}:${value[key]}`
    })
    return cssArr
}

// 有moxucss类名
const handleMoxucss = (moxuArr = [], config = {}, isPri=false)=>{
    let cssData = moxuArr.map(i => isPri ? i.replace('!','') : i)
        .map(item => compileClass(item, config))
    return createClass(cssData, config, true).split(';')
}


export const handleCss = (value, item, config={})=>{
    const {media, className, isPri} = item
    const data = []

    // value is object
    if(Object.prototype.toString.call(value) === "[object Object]"){
        const {moxucss, select, ...remainCss} = value
        const moxucssData = handleMoxucss(moxucss,config,isPri)
        const cssArr = [...cssObjToArr(remainCss), moxucssData].flat()

       // 没有选择器
       data.push({isPri, media, className, cssArr})

        // 有选择器
        if (select !== undefined) {
            Object.keys(select).forEach((item)=>{
                const {moxucss, priority, ...remainAttr} = select[item]
                const moxucssData = handleMoxucss(moxucss,config)
                const key = item.replace('&', className)
                const isPri = !!(priority)          
                const css = [...cssObjToArr(remainAttr), moxucssData].flat()
                data.push({isPri, media, className:key, cssArr:css, isSelect:true})
            })
        }
    }

    // value is array
    if (Array.isArray(value)) {
        data.push({isPri, media, className, cssArr: value})
    }

    return data  //{isPri:true,media, className:'', cssArr:[]}

}
