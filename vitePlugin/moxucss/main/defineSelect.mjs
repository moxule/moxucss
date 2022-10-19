import { createHash } from "../tools/createHash.mjs";
import { compileClass } from "./compileClass.mjs";
import { createClass } from "./createClass.mjs";

export const defineSelect = (code="", config={})=>{
        // 剔除函数类的空格换行
        const splitNull = (val='')=>{
            const rex = /([\(\[\{][\s\S]*?[\)\]\}])/g
            return val.replace(rex, $0=>$0.split(/\s/g).join('')).trim().split(/\s/g)
        }

        // 分割选择器
        const splitSel = (val="", attrName='')=>{
            const selRex = /(.*?)\[(.*?)\]/g
            const selArr = val.split('&').filter(i=>i).map(item => {
                const [sel, value] = item.replace(selRex, '$1//$2').split('//')
                const select = attrName + sel.replace('/', ' ')
                const moxucss = splitNull(value)
                return {sel: select, moxucss}
            })
            return selArr
        }

        // 处理moxucss类名
        const clMoxu = (moxuArr = [], config = {})=>{
            const cssData = moxuArr.map(item => compileClass(item, config))
            return createClass(cssData, config, true)
        }
    
        const rexStr = `css-select="([\\s\\S]*?)"`
        const selectRex = new RegExp(rexStr, 'g')
        const selData = code.match(selectRex) || []
        const cssData = []

        selData.forEach(sel => {
            const attrName = 'data-' + createHash(sel)
            const value = sel.replace(selectRex, '$1').trim()
            const selArr = splitSel(value, `[${attrName}]`)
            const css = selArr.map(({sel,moxucss}) => (`${sel}{${clMoxu(moxucss,config)}}`))
            cssData.push(...css)
            code = code.replace(sel, attrName)
        })

        return [code, cssData.join('')]
}
