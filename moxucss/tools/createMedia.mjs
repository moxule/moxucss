// 生成media
export const createMedia = (screen = {})=>{
    const newScreen = {}
    Object.keys(screen).forEach(key => {
        const media = `@media screen and (min-width:${screen[key]}){$}`
        newScreen[key] = media
    })
    return newScreen
}