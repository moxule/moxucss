export const filterClass = (values = [])=>{
    const logo = {}, newarr = []
    values.forEach( item => {
        if(!(item.className in logo)) newarr.push(item)
        logo[item.className] = true
    })
    return newarr
}