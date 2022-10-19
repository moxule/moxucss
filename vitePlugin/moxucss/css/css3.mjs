export const css3 = {
    translate(val={}){
        return [`transform:translate(${val[0] || 0},${val[1] || 0})`]
    },
    scale(val,row={}){
        return [`transform:scale(${row[0] || 1},${row[1] || row[0] || 1})`]
    },
    rotate(val={}){
        return [`transform:rotate(${val[0] || 0})`]
    },
    skew(val={}){
        return [`transform:skew(${val[0] || 0},${val[1] || 0})`]
    },
    move(val={}){
        return [`transition:${Object.values(val).join(' ')}`]
    }
}