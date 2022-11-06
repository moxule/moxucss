import { writeFileSync, readFileSync } from 'fs';

const box = (newArg = {})=>{

    const bdrHandle = (val="")=>{
        const trbl = {t:0,r:0,b:0,l:0};
        const values = val.split(' ');
        const bdr = `border-radius:$`;
        if (/[trbl]+/.test(values[values.length-1])) {
            values.splice(-1).join().split('').filter(i=>i)
            .forEach((key,ind)=>(trbl[key] = (values[ind] || values[0])));
            val = Object.values(trbl).join(' ');
        }
        return bdr.replace('$', val)
    };

    const temp = {
        0: v=>`width:${v}`,
        1: v=>`height:${v}`,
        2: v=>`background:${v}`,
        3: v=> bdrHandle(v)
    };

    return Object.keys(newArg).map(i => temp[i](newArg[i]))

};

const font = (newArg={}, rawArg={})=>{
    // css-font="[字体大小,颜色,加粗,行高,文本对齐]"
    const fw = {n:'normal',b:'bold',l:'lighter', bo:'bolder'};
    const temp = {
        0: (v) => `font-size:${v}`,
        1: (v) => `color:${v}`,
        2: (v) => `font-weight:${ fw[v] || rawArg[2] }`, 
        3: (v) => `line-height:${v}`,
    };

    return Object.keys(newArg).map(item => temp[item](newArg[item]) ).flat()

};

const mp = (newArg = {}) => {

    const mpHandle = (val="", mp)=>{
        const trbl = {t:'-top',r:"-right",b:'-bottom',l:'-left'};
        const values = val.split(' ');
        const mpArr = [];

        if (mp == 'padding') {
            mpArr.push('box-sizing:border-box');
        }

        if(/[trbl]+/.test(values[values.length-1])){
            values.splice(-1).join().split('').filter(i=>i).forEach((key,ind)=>{
                const mpval = `${mp + trbl[key]}:${values[ind] || values[0]}`;
                mpArr.push(mpval);
            });
        }else {
            mpArr.push(`${mp}:${val}`);
        }

        return mpArr
    };

    const temp = {
        0: (v)=> mpHandle(v, 'margin'),
        1: (v)=> mpHandle(v, 'padding')
    };

    return Object.keys(newArg).map(key=> temp[key](newArg[key]) ).flat()   

};

const layer = (newArg = {}, rawArg={})=>{

    const psHandle = (key="")=>{
        const val = {r:'relative',a:'absolute',f:'fixed',s:'static'};
        return `position:${ val[key] || key}`
    };

    const trbl = (val="")=>{
        const $trbl = {t:'top',r:"right",b:'bottom',l:'left'};
        const values = val.split(' ');
        if (/[trbl]+/.test(values[values.length-1])) {
            return values.splice(-1).join().split('').filter(i=>i).map((key,ind)=>{
                return $trbl[key] +':'+ (values[ind] || values[0])
            })
        }
        
        if(values.length == 1){
            return Object.values($trbl).map(i=>`${i}:${val}`)
        }
        if(values.length == 4){
            return Object.values($trbl).map((item,ind)=>`${item}:${values[ind]}`)
        }

        return Object.values($trbl).map((item, ind)=>{
            return ind < values.length ? `${item}:${values[ind]}` : null
        }).filter(i=>i)
        
    };

    const index = (val="")=>{
        return `z-index:${rawArg[2]}`
    };

    const temp = {
        0: psHandle,
        1: trbl,
        2: index
    };

    return Object.keys(newArg).map(i => temp[i](newArg[i]) ).flat()

};

const show = (newArg={})=>{
    const temp = {
        display:['block','none','flex','grid','inline','inline-block'],
        overflow:['hidden','visible','scroll','auto'],
        'box-sizing':['border-box','content-box']
    };

    const css = Object.values(newArg).map(item=>{
        // 特殊处理
        if (/-[xy]$/.test(item)) {
            const [value, xy] = item.split('-');
            return `overflow-${xy}:${value}`
        }
        // 整体处理
        for (const key in temp) {
           if (temp[key].includes(item)) return `${key}:${item}`
        }
        // 空值
        return ''
    });

    return css
};

const edge = (newArg = {})=>{
    //边框
    const borderHandle = (val)=>{
        const trbl = {t:'-top',r:"-right",b:'-bottom',l:'-left'};
        const values = (typeof val == 'string') && val.split(' ');
        const bdCss = ['box-sizing:border-box'];

        // 多值
        if(Array.isArray(val)){
            const newbd = val.map(item => borderHandle(item)).flat();
            return [...new Set(newbd)]
        }
        // 单一值
        if(/[trbl]+/.test(values[values.length-1])){
            values.splice(-1).join().split('').filter(i=>i).forEach((key)=>{
                bdCss.push(`border${trbl[key]}:${values.join(' ')}`); 
            });
        }else {
            bdCss.push(`border:${val}`);
        }
        return bdCss
    };
    // 阴影
    const shadowHandle = (val)=>{
        if(Array.isArray(val)){
            val = val.join();
        }
        return `box-shadow:${val}`
    };

    const temp = {
        0: borderHandle,
        1: shadowHandle,
        2: (v)=>`outline:${v}`
    };

    return Object.keys(newArg).map((key)=>{
        return temp[key]( newArg[key] )
    }).flat()

};

const flex = (newArg = {}, rawArg = {})=>{
    const flexHandle = (val="")=>{
        const flexValue = { s: 'flex-start', e: 'flex-end', c: 'center', d: 'stretch', 
        b: 'baseline', 1: 'space-between', 3: 'space-evenly', 4: 'space-around' };

        const [d, j, a, s] = [...val.replace('-','')];
        const flexCss = ['display:flex','flex-wrap:wrap'];

        if(d == 'y') flexCss.push("flex-direction:column");
        flexCss.push(`align-${s?'content':'items'}:${flexValue[a]}`);
        flexCss.push(`justify-content:${flexValue[j]}`);
        return flexCss
    };

    const flexItem = (index)=>{
        const anew = newArg[index].split(' ');
        const arow = rawArg[index].split('/').slice(0,2).join(' '); 
        if (anew.length < 3) {
            return `flex:${ arow }`
        }else {
            return `flex:${ arow +' '+ anew[2] }`
        }
    };

    const self = (val="")=>{
        const selfValue = { s: 'flex-start', e: 'flex-end', c: 'center', d: 'stretch', b: 'baseline'};
        const key = val.replace(/self-(.*?)/,'$1');
        return `align-self:${ selfValue[key] || key }`
    };

    const order = (val="")=>{
        const key = val.replace(/order-(\d)/,'$1');
        return `order:${key}`
    };

    const wrap = ['nowrap','wrap','wrap-reverse'];
    const direction = ['row','row-reverse','column','column-reverse'];

    return Object.values(newArg).map((val,index)=>{
        if(/^[xy][secdb134]+-?s?$/.test(val)) return flexHandle(val)
        if(/self-(.*?)/.test(val)) return self(val)
        if(/order-(\d)/.test(val)) return order(val)
        if(/^(\d|auto|none)/.test(val)) return flexItem(index)
        if(wrap.includes(val)) return `flex-wrap:${val}`
        if(direction.includes(val)) return `flex-direction:${val}`
        return ''
    }).flat()

};

const text = (newArg = {})=>{
    const ta = { l: 'left', r: 'right', c: 'center', j: 'justify' };
    const tt = ['capitalize','uppercase','lowercase'];
    const clip = ['ellipsis','clip'];
    const space = ['normal','pre','nowrap','pre-wrap','pre-line'];

    const clipFunc = (val="")=>{
        const css = ['overflow:hidden','white-space:nowrap'];
        css.push(`text-overflow:${val}`);
        return css
    };

    const indent = (val="")=>{
        if(/-/.test(val)) return `text-indent:${val.replace(/indent-(.*)/,'$1')}em`
        return 'text-indent:2em'
    };

    return Object.values(newArg).map((val)=>{
        if (Object.keys(ta).includes(val)) return `text-align:${ta[val]}`
        if (Object.values(ta).includes(val)) return `text-align:${val}`
        if (tt.includes(val)) return `text-transform:${val}`
        if (space.includes(val)) return `white-space:${val}`
        if (clip.includes(val)) return clipFunc(val)
        if (/indent/.test(val)) return indent(val)
        if (val == 'word') return 'word-wrap:break-word'
        if (val == 'break') return 'word-break:break-all'
        return ''
    }).flat()
};

const css3 = {
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
};

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
};

/**
 * 
 * @ obj1 = 旧对象
 * @ obj2 = 新对象
 * @ 返回 合并对象
 */
const mergeConfig = (obj1={}, obj2={})=>{
    const config = {};
    for (const key in obj1) {
       if (Object.prototype.toString.call(obj1[key]) === "[object Object]") {
            config[key] = obj2[key] 
                ? { ...obj1[key], ...obj2[key]}
                : { ...obj1[key] };

       }else if (Array.isArray(obj1[key])) {
            config[key] = obj2[key] 
                ?  [...obj1[key], ...obj2[key]]
                :  [...obj1[key]]; 

       }else {
            config[key] = obj2[key] ? obj2[key] : obj1[key];
       }
    }
    return config
};

const filterClass = (values = [])=>{
    const logo = {}, newarr = [];
    values.forEach( item => {
        if(!(item.className in logo)) newarr.push(item);
        logo[item.className] = true;
    });
    return newarr
};

const createHash = (str = '') => {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; 
    }
    return hash.toString(16).slice(1)
};

/**
 * @输入：compileClass("box(1,1,#f)", moxucssConfig)
 * @输出：{func:"box",args,className,media,isPri}
 */
const compileClass = (className="", config)=>{
    const {defineCss, definePrefix, defineScreens} = config;
    const funcKeys = Object.keys(defineCss).join('|');
    const mediaKeys = Object.keys(defineScreens).join(':|');
    // const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g')
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})\\(([\\s\\S]*)\\)(!)?`, 'g');
    let classObj = {};

    if (cssRex.test(className)) {
        const newItem = className.replace(/[\s'"]/g, '');
        const newClassName = `${definePrefix}${createHash(newItem)}`;
        newItem.replace(cssRex, ($0,$1,$2,$3,$4)=>{
            classObj = {
                media: $1 && $1.replace(':',''), 
                func: $2, 
                args: $3, 
                isPri: !!$4,
                className:newClassName
            };
        }); 
        return classObj
    }
    return null
};

const getClass = (code='', config)=>{
    const {defineCss, defineScreens} = config;
    const classRex = /class(Name)?="([\s\S]*?)"/g;
    const classArr = code.match(classRex) || [];
    const funcKeys = Object.keys(defineCss).join('|');
    const mediaKeys = Object.keys(defineScreens).join(':|');
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g');
    const classInfo = [];

    classArr.forEach(attrClass =>{
        const rowClass = attrClass;
        const funcClass = attrClass.match(cssRex) || [];
        funcClass.forEach(item =>{
            const cssObj = compileClass(item, config);
            attrClass = attrClass.replace(item, cssObj.className);
            classInfo.push(cssObj);
        });
        code = code.replace(rowClass, attrClass);
    });
    return [code, filterClass(classInfo)]
};

// 对象转数组 大写转小写加横杠
const cssObjToArr = (value={})=>{
    const cssArr = Object.keys(value).map(key =>{
        const newKey = key.replace(/([A-Z])/g, (row, rep)=>{
            return row.replace(rep, `-${rep.toLowerCase()}`)
        });
        return `${newKey}:${value[key]}`
    });
    return cssArr
};

// 有moxucss类名
const handleMoxucss = (moxuArr = [], config = {}, isPri=false)=>{
    let cssData = moxuArr.map(i => isPri ? i.replace('!','') : i)
        .map(item => compileClass(item, config));
    return createClass(cssData, config, true).split(';')
};


const handleCss = (value, item, config={})=>{
    const {media, className, isPri} = item;
    const data = [];

    // value is object
    if(Object.prototype.toString.call(value) === "[object Object]"){
        const {moxucss, select, ...remainCss} = value;
        const moxucssData = handleMoxucss(moxucss,config,isPri);
        const cssArr = [...cssObjToArr(remainCss), moxucssData].flat();

       // 没有选择器
       data.push({isPri, media, className, cssArr});

        // 有选择器
        if (select !== undefined) {
            Object.keys(select).forEach((item)=>{
                const {moxucss, priority, ...remainAttr} = select[item];
                const moxucssData = handleMoxucss(moxucss,config);
                const key = item.replace('&', className);
                const isPri = !!(priority);          
                const css = [...cssObjToArr(remainAttr), moxucssData].flat();
                data.push({isPri, media, className:key, cssArr:css, isSelect:true});
            });
        }
    }

    // value is array
    if (Array.isArray(value)) {
        data.push({isPri, media, className, cssArr: value});
    }

    return data  //{isPri:true,media, className:'', cssArr:[]}

};

// 生成media
const createMedia = (screen = {})=>{
    const newScreen = {};
    Object.keys(screen).forEach(key => {
        const media = `@media screen and (min-width:${screen[key]}){$}`;
        newScreen[key] = media;
    });
    return newScreen
};

const addPriority = (value=[], priority=false)=>{
    return value.filter(i=>i).map(item => {
        const pri = priority ? ' !important;' : ';';
        return item + pri
    }).join('')
};

const mergeCss = (css = [], flag = false, {defineScreens})=>{
    const media = createMedia(defineScreens);
    return css.map(item =>{
        if(item.cssArr.length == 0) return ''
        if (flag) {
            const css = addPriority(item.cssArr, item.isPri);
            return item.isSelect ? '' : css
        } else {
            const css = `.${item.className}{${ addPriority(item.cssArr, item.isPri) }}`;
            return item.media ? media[item.media].replace('$',css) : css
        }
    }).join('')
};

const handleValue = (item='', config={} )=>{

    const { defineUnit, defineVar } = config;

    // 变量值处理
    if (/^\$/.test(item)) {
        const [key] = Object.keys(defineVar).filter(i=>item.indexOf(i) >= 0);  
        const value = key && defineVar[key].split(/\n/).join('');
        item = value ? item.replace(key, value) : '$';
    }

    // 空值处理
    if (/^[\$]$/.test(item) || item.length == 0) return null

    // 多值处理
    if (/_/g.test(item)){
        return item.split('_').map(i=>handleValue(i,config))
    }

    // 颜色值处理
    if (/^#[\da-f]{1,6}-?\d?$/.test(item)) {
        // 使用透明度 16进制转rgba
        if (/-/.test(item)) {
            const rex16 = /^#([0-9a-f]+)-([0-9])$/g;
            const [val, op] = item.replace(rex16, '$1-$2').split('-');
            const rgb = [0,0,0].map((t,i)=>{
                if(val.length == 1) return parseInt(val+val, 16)
                if(val.length == 2) return parseInt(val, 16)
                if(val.length == 3) return parseInt(val[i]+val[i], 16)
                if(val.length == 6) return parseInt(val[i*2]+val[i*2+1], 16)
            });
            return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},.${op})`
        }
        // 普通16进制
        if(item.length == 4) return item
        return '#' + item.replace('#','').repeat(6).slice(0,6)
    }

    // 数值加单位
    if (/^[0-9]+$/g.test(item)) return defineUnit(Number(item))

    // 多参数处理
    if (/\//g.test(item)){
        return item.split('/').map(i=>handleValue(i,config)).join(' ')
    }

    // 负数值处理
    if(/^-\d+/.test(item)){
        return '-' + handleValue(item.slice(1), config)
    }

    return item
};

const splitFuncArg = (value="", config="")=>{
    const newVal = {}, rowVal = {};
   value.replace(/(\(.*?\))/g, (n,$1)=>$1.replace(/,/g,'//'))
    .split(',')
    .map(item=>item.replace(/\/\//g, ','))
    .forEach((item, index)=>{     
        if (/:/.test(item)) {
            const [key, val] = item.split(':');
            const value =  handleValue(val, config);
            if(value == null) return
            newVal[key] = value;
            rowVal[key] = item;
        }else {
            const value = handleValue(item, config);
            if (value == null) return
            newVal[index] = value;
            rowVal[index] = item;
        }
    });
    return { newVal, rowVal }
};

const createClass = (classData=[], config = {}, flag = false)=>{
    const { defineCss } = config;
    const css = classData.map(item => {
        const {newVal, rowVal} = splitFuncArg(item.args, config);
        const cssData = defineCss[item.func](newVal, rowVal, config);
        const cssMergeData = handleCss(cssData, item, config);
        const css = mergeCss(cssMergeData, flag, config);
        return css
    });
    return css.join('')
};

const defineMoxu = (code="", config={})=>{
    const rexStr = `(moxu-\\w+)="([\\s\\S]*?)"`;
    const moxuRex = new RegExp(rexStr, 'g');
    const moxuData = code.match(moxuRex) || [];

    // 剔除函数类的空格换行
    const splitNull = (val='')=>{
        const rex = /([\(\[\{][\s\S]*?[\)\]\}])/g;
        return val.replace(rex, $0=>$0.split(/\s/g).join('')).trim().split(/\s/g)
    };

    // 字符串转对象
    const strToObj = (val="")=>{
        const obj = {};
        if(!val) return {}
        val.replace(/\{(.*?)\}/, '$1').split(',').forEach(item=>{
            const [key, value] = item.split(':');
            obj[key] = value;
        });
        return obj
    };

    // 分离moxucss和css
    const splitMoxuAndCss = (val= [])=>{
        return val.reduce((pre,item)=>{
            (/\{/.test(item)) 
                ? pre['css'] = item
                : pre['classArr'].push(item);
            return pre
        },{css:'', classArr:[]})
    };

    // 获取默认值
    const getDef = (str="", obj={})=>{
        const rex = /@(\d)(\[.*?\])?/g;
        if(!str) return ''
        return str.replace(rex,(n,$1,$2)=>{
            $2 = $2 && $2.replace(/[\[\]]/g, '');
            return (obj[$1] || $2)
        })
    };

    moxuData.forEach(moxu =>{
        const [key, value] = moxu.replace(moxuRex,'$1//$2').split('//');
        const {css, classArr} = splitMoxuAndCss(splitNull(value));
       
        const funcClass = (val,raw)=>{
            const cssData = strToObj(getDef(css,val));
            const moxucss = classArr.map(item=>getDef(item,raw));
            return {...cssData, moxucss}
        };
        config.defineCss[key] = funcClass;
        code = code.replace(moxu, '');
    });
    return [code, config]
};

const defineSelect = (code="", config={})=>{
        // 剔除函数类的空格换行
        const splitNull = (val='')=>{
            const rex = /([\(\[\{][\s\S]*?[\)\]\}])/g;
            return val.replace(rex, $0=>$0.split(/\s/g).join('')).trim().split(/\s/g)
        };

        // 分割选择器
        const splitSel = (val="", attrName='')=>{
            const selRex = /(.*?)\[(.*?)\]/g;
            const selArr = val.split('&').filter(i=>i).map(item => {
                const [sel, value] = item.replace(selRex, '$1//$2').split('//');
                const select = attrName + sel.replace('/', ' ');
                const moxucss = splitNull(value);
                return {sel: select, moxucss}
            });
            return selArr
        };

        // 处理moxucss类名
        const clMoxu = (moxuArr = [], config = {})=>{
            const cssData = moxuArr.map(item => compileClass(item, config));
            return createClass(cssData, config, true)
        };
    
        const rexStr = `css-select="([\\s\\S]*?)"`;
        const selectRex = new RegExp(rexStr, 'g');
        const selData = code.match(selectRex) || [];
        const cssData = [];

        selData.forEach(sel => {
            const attrName = 'data-' + createHash(sel);
            const value = sel.replace(selectRex, '$1').trim();
            const selArr = splitSel(value, `[${attrName}]`);
            const css = selArr.map(({sel,moxucss}) => (`${sel}{${clMoxu(moxucss,config)}}`));
            cssData.push(...css);
            code = code.replace(sel, attrName);
        });

        return [code, cssData.join('')]
};

const globalMatch = (code='', config)=>{
    const {defineCss, defineScreens} = config;
    const funcKeys = Object.keys(defineCss).filter(i=>/moxu-/.test(i)).join('|');
    const mediaKeys = Object.keys(defineScreens).join(':|');
    const cssRex = new RegExp(`(${mediaKeys})?(${funcKeys})(\\([\\s\\S]*?\\)!?)`, 'g');
    const classArr = code.match(cssRex) || [];
    if(funcKeys.length == 0) return [code, '']
    const classData = classArr.map(className =>{
      const classObj = compileClass(className,config);
      code = code.replace(className, classObj.className);
      return classObj
    });

    const css = createClass(classData, config);

    return [code, css]
};

function moxucss(code = '', newConfig = {}) {
    const $config = mergeConfig(config, newConfig);
    const [html0, moxConfig] = defineMoxu(code, $config);
    const [html1, classInfo] = getClass(html0, moxConfig);
    const [html2, selCss] = defineSelect(html1, moxConfig);
    const [html3, glbalCss] = globalMatch(html2, moxConfig);
    const classCss = createClass(classInfo, moxConfig);
    const css = classCss + selCss + glbalCss;
    return {code: html3, css}
}

function vitePluginMoxucss (config = {}) {

    return {
		name: 'vite-plugin-moxucss',
		enforce: 'pre',
		config(ov,env){
			if (env.command !== 'build' && config.outputPath) {
				writeFileSync(config.outputPath, '');
			}
		},
		transform(text, id){
			const suffixArr = ['vue', 'jsx', 'tsx'];
			const suffix = id.slice(id.lastIndexOf('.') + 1);
			const path = config.outputPath;
			if (!suffixArr.includes(suffix) || !path) return text
			const {code, css} = moxucss(text, config);
			if (css.length > 0) {
				const logo = id.slice(id.lastIndexOf('/src') + 1);
				const rex = new RegExp(`\/\\*${logo}\\*\/([\\s\\S]*)\/\\*${logo}\\*\/`, 'g');
				const cssFile = readFileSync(path).toString().replace(rex, '');
				const writeData = cssFile + `/*${logo}*/${css}/*${logo}*/`;
				writeFileSync(path, writeData);
			}
			return code
		}
    };
  }

export { vitePluginMoxucss as default };
