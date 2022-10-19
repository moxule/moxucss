
/**
 * 
 * @ obj1 = 旧对象
 * @ obj2 = 新对象
 * @ 返回 合并对象
 */
export const mergeConfig = (obj1={}, obj2={})=>{
    const config = {}
    for (const key in obj1) {
       if (Object.prototype.toString.call(obj1[key]) === "[object Object]") {
            config[key] = obj2[key] 
                ? { ...obj1[key], ...obj2[key]}
                : { ...obj1[key] }

       }else if (Array.isArray(obj1[key])) {
            config[key] = obj2[key] 
                ?  [...obj1[key], ...obj2[key]]
                :  [...obj1[key]] 

       }else {
            config[key] = obj2[key] ? obj2[key] : obj1[key]
       }
    }
    return config
}