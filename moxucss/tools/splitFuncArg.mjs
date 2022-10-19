import { handleValue } from "./handleValue.mjs";

export const splitFuncArg = (value="", config="")=>{
    const newVal = {}, rowVal = {}
   value.replace(/(\(.*?\))/g, (n,$1)=>$1.replace(/,/g,'//'))
    .split(',')
    .map(item=>item.replace(/\/\//g, ','))
    .forEach((item, index)=>{     
        if (/:/.test(item)) {
            const [key, val] = item.split(':')
            const value =  handleValue(val, config)
            if(value == null) return
            newVal[key] = value
            rowVal[key] = item
        }else{
            const value = handleValue(item, config)
            if (value == null) return
            newVal[index] = value
            rowVal[index] = item
        }
    })
    return { newVal, rowVal }
}

