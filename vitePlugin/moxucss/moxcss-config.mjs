import { box } from './css/box.mjs'
import { font } from "./css/font.mjs";
import { mp } from "./css/mp.mjs";
import { layer } from "./css/layer.mjs";
import { show } from "./css/show.mjs";
import { edge } from "./css/edge.mjs";
import { flex } from "./css/flex.mjs";
import { text } from "./css/text.mjs";
import { css3 } from "./css/css3.mjs";

 const config = {
    defineUnit: num => num + 'px',
    outputPath: '',
    definePrefix: 'css-',
    defineScreens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
    },
    defineVar:{
        $in: 'inherit',
    },
    defineCss: {
        box, font, flex, mp, layer, show, edge, text,...css3
    }
}

export default config