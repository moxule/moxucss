# Moxucss
传统的css命名困难，原子类解决了命名困难，但是要记忆的类命名变多了，moxucss只有八个类名，解决你不想记忆类名的烦恼，而且简单易学，你会调用函数你就会moxucss，一切css问题都可以在html中解决，解决你调试css的烦恼，让你有更多时间摸鱼。

moxucss内置的八个函数类都是根据css的功能进行整合的，对应着八个概念，盒子box()，felx布局flex()，字体font()，边距mp()，图层layer()，显示模式show()，边缘edge()，文本text()。

moxucss的css不是通过预设的css类名来实现的，而是通过正则匹配实时生成。

moxucss还有着变量，主题完全可以通过定义变量来实现。
moxucss可以自定义函数类，当moxucss已有的类名不满足你的需求时，你可以定义你的函数类来解决问题，只要你够闲，你完全可以手撸一套原子类。


 + [Moxucss8个函数类](#nzhsl)
 + [过渡/变换/动画](#css3) 看看就得了，仅供参考，网上有更优秀的动画框架
 + [传参语法](#ccyf) 函数类的使用这个很重要
 + [媒体查询](#mtcx)
 + [定义行内函数类](#hnhsl) 行内函数类是唯一全局生效的，其他函数类只能在class=“”生效
 + [选择器](#xzq)
 + [配置文件](#pzwj) 全局定义函数类和变量在这里
 + [moxucss vite插件地址](https://www.npmjs.com/package/vite-plugin-moxucss) 


## <span id="nzhsl">安装使用</span>
安装：
```shell 
npm i moxucss -D
```
使用：
```js
import { moxucss } from 'moxucss'
const [code, css] = moxucss(code, config)
// moxucss只是个css生成器，要在项目使用的请下载插件
// 传入的code是你使用了moxucss语法的html代码，config是配置
// 生成的code是被moxucss生成的类名给替换的html代码，css就是生成的css
// 目前只写了vite的插件，需要其他插件的可以用moxucss进行开发

```

## <span id="nzhsl">Moxucss 内置函数类</span>

+ box(宽度，高度，背景，圆角)
  - [位置语法](#wzyf) [跨位语法](#kwcc) [颜色语法](#ysyf)
  ```html
    <div class="box(100,100,#0)"></div>
    <div class="box(100,100,#0,50%)"></div>
    <div class="box(100,100,#0,20/20/tr)"></div>
  ```

+ flex(flexbox，flexItem，flex-direction，align-self，order，flex-wrap)
    - 可无序传参
    - [flex轴语法](#flex)
  ```html
    <!-- flex轴的参数语法点上面的连接看 -->
    <!-- flex布局在moxucss中，默认换行 -->
    <!-- 上下左右居中 -->
    <div class="flex(xcc)"></div>
    <!-- 多个侧轴上下左右居中 -->
    <div class="flex(xcc-s)"></div>

    <!-- flex：1 1 10px 或 none/auto -->
    <div class="flex(1/1/10px)"></div>
    <div class="flex(auto)"></div>
    <!-- 占1份的同时,控制子元素上下左右居中 -->
    <div class="flex(1,xcc)"></div>

    <!-- flex-direction:row-reverse css怎么写这就怎么传-->
    <div class="flex(row-reverse)"></div>

    <!-- { s:'flex-start', e:'flex-end', c:'center', d:'stretch', b: 'baseline'} -->
    <!--上面的对象，key就是简写，value就是全写 -->
    <!-- align-self:center -->
    <div class="flex(self-c)"></div>
    <div class="flex(self-center)"></div>

    <!-- order:1 横杠接数值就行 -->
    <div class="flex(order-1)"></div>

    <!-- flex-wrap：nowrap css怎么写这就怎么传 -->
    <div class="flex(nowrap)"></div>
  ```

+ font(字体大小，颜色，加粗，行高)
  - 有序传参
  - [颜色语法](#ysyf) [跨位语法](#kwcc)
  ```html
    <!-- 这个看标题就知道怎么传，下面只写特例 -->
    <!--加粗可传参数首字母或数值-->
    <div class="font(20,#f00,b,20)"></div>
    <div class="font(20,#f00,700,20)"></div>
    <!-- 因为是有序传参，跨越多个位置传参语法 -->
    <!-- line-height:20px -->
    <div class="font(3:20px)"></div>
  ```

+ mp(外边距，内边距)
  - 有序传参
  - [位置语法](#wzyf)
  ```html
    <!--参数用/隔开-->
    <!--margin: 20px-->
    <div class="mp(20)"></div>
    <!--margin: 20px 30px-->
    <div class="mp(20/30)"></div>
    <!--margin: 20px 30px 40px-->
    <div class="mp(20/30/40)"></div>
    <!--margin: 20px 30px 40px 50px-->
    <div class="mp(20/30/40/50)"></div>

    <!--trbl四个参数，对应上右下左-->
    <!--margin-top: 20px-->
    <div class="mp(20/t)"></div>
    <!--margin-top: 20px;margin-left: 30px-->
    <div class="mp(20/30/tl)"></div>
    
    <!--trbl参数要和值一一对应，如下属性改变了-->
    <!--margin-left: 20px;margin-top: 30px-->
    <div class="mp(20/30/lt)"></div>

    <!--padding 同上-->
    <!-- moxucss中padding默认带box-sizing：border-box -->
    <!-- 需要修改可用 show(content-box) 函数类修改 -->

    <!--padding-left: 20px;padding-top: 30px-->
    <div class="mp($,20/30/lt)"></div>
    <!--$代表空值，可以不传，但`,`要写，因为mp()是有序传参-->
    <div class="mp(,20/30/lt)"></div>
  ```

+ layer(定位类型，位置，z-index)
  - 有序传参
  - [位置语法](#wzyf) [跨位语法](#kwcc)
  ```html
    <!--定位类型可以写首字母，可以写完整-->
    <!--位置传参：如果跟参数trbl的，值要和trbl对应-->
    <div class="layer(a,20/40/tl,999)"></div>
    <div class="layer(absolute,20/40/tl,999)"></div>

    <!--只传一个值的，上右下左都等同这个值-->
    <!--top:0,right:0,bottom:0,left:0-->
    <div class="layer(a,0,999)"></div>

    <!-- z-index 数值正常写就行 -->
    <div class="layer(a,0,9999999)"></div>

  ```

+ edge(边框，阴影，轮廓)
    - 有序传参
    - 多值一般用变量解决，不然会很长
    - [颜色语法](#ysyf)
  ```html
    <!-- 边框 -->
    <!-- moxucss中border默认带box-sizing：border-box -->
    <!-- 需要修改可用 show(content-box) 函数类修改 -->
    <!-- 四个方向的边框 -->
    <div class="edge(10/solid/#0)"></div>
    <!-- 上边框 -->
    <div class="edge(10/solid/#0/t)"></div>
    <!-- 多位置边框,值要用`_`隔开 -->
    <div class="edge(10/solid/#0/t_10/solid/#0/b)"></div>

    <!-- 阴影 box-shadow: h-shadow v-shadow blur spread color inset;-->
    <!-- 一个阴影 -->
    <div class="edge($, 0/10/10/10/#f00)"></div>
    <!-- 多个阴影 -->
    <div class="edge($, 0/10/10/10/#f00_0/10/10/10/#f00)"></div>

    <!-- 轮廓 -->
    <div class="edge(,,#233/dotted/thick)"></div>
    <!-- 跨位语法 程序员的世界应该从0开始-->
    <div class="edge(2:#233/dotted/thick)"></div>

    <!-- 使用变量, 只是举例，moxucss并没有内置这些变量 -->
    <div class="edge($bk,$yy,$lk)"></div>

  ```

+ show(display,overflow,box-sizing)
    - 无序传参
  ```html
    <!-- 
        display:['block','none','flex','grid','inline','inline-block']
        overflow:['hidden','visible','scroll','auto']
        box-sizing:['border-box','content-box'] 
    -->
    <div class="show(block)"></div>
    <div class="show(border-box, block)"></div>
    <div class="show(scroll, border-box, block)"></div>

    <!-- overflow的值可以加xy来控制裁剪方向 -->
    <div class="show(hidden-x)"></div>
    <div class="show(scroll-y)"></div>
  ```

+ text(文本对齐，文本裁剪，文本换行，首行缩进)
    - 无序传参
  ```html
    <!-- 
     text-align:{ l: 'left', r: 'right', c: 'center', j: 'justify' }
     text-transform:['capitalize','uppercase','lowercase']
     单行文本裁剪:['ellipsis','clip']
     white-space:['normal','pre','nowrap','pre-wrap','pre-line']
     -->
     <!-- 文本右对齐，可全写或简写 -->
    <div class="text(r)"></div>
    <div class="text(right)"></div>

    <!-- 英文文本全部大写 -->
    <div class="text(uppercase)"></div>

    <!-- 单行文本裁剪,显示省略号 -->
    <div class="text(ellipsis)"></div>

    <!-- 文本不换行 -->
    <div class="text(nowrap)"></div>
    <!-- 单词换行 -->
    <div class="text(word)"></div>
    <!-- 字母强制换行 -->
    <div class="text(break)"></div>

    <!-- 文本首行缩进,默认2em，不可更改单位 -->
    <div class="text(indent)"></div>
    <!-- 首行缩进4em,你喜欢跟多少就跟多少，但是不要加单位 -->
    <div class="text(indent-4)"></div>

  ```


## <span id="css3">过渡/变换/动画</span>
```js
// 直接代码都给你放出来了，动画没有实现
// transform多个使用会被覆盖的，可自定义函数类来实现更复杂的场景
//transition改名move，在行内使用没提示，命名尽可能短，不然打错字找半天
export const css3 = {
    translate(val={}){
        return [`transform:translate(${val[0] || 0},${val[1] || 0})`]
    },
    scale(val,raw={}){
        return [`transform:scale(${raw[0] || 1},${raw[1] || raw[0]})`]
    },
    rotate(val={}){
        return [`transform:rotate(${val[0] || 0})`]
    },
    skew(val={}){
        return [`transform:skew(${val[0] || 0},${val[1] || 0})`]
    },
    // move(all, 0.5s) 或 move(width/height, 0.5s)
    move(val={}){
        return [`transition:${Object.values(val).join(' ')}`]
    }
}
```

## <span id="ccyf">传参语法</span>

+ <span id="szdw">数值和单位</span>
  ```html
    <!-- mocucss默认单位是px,可在配置文件配置默认单位 -->
    <!-- 单位配置是个函数，设定好单位比例后，你可以做到px转vw等单位 -->

    <!-- 不带单位，那就用默认单位 -->
    <div class="box(100,100)"></div>
    <!-- 带单位，不做处理 -->
    <div class="box(100px,100vh)"></div>

  ```

+ <span id="yxj">优先级</span>
  ```html
    <!-- 类名后跟上`!`即可 -->
    <div class="box(100px,100vh,#088)! "></div>

  ```

+ <span id="blsy">变量使用</span>
  ```html
    <!-- 配置对象中定义的变量 , 一定要$开头-->
    <div class="box(100,100,$bgc) "></div>

  ```

+ 有序传参和<span id="kwcc">跨位传参</span>
  ```html
    <!-- 参数全部传 -->
    <div class="box(100,100,#f00,50%)"></div>

    <!-- 加了空格也没事，但不建议 -->
    <div class="box(100, 100, #f00, 50%)"></div>

    <!-- 空值用$符占位,如下不要高度 -->
    <div class="box(100,$,#f00,50%)"></div>
    <!-- 或者$也不要，如下宽高都不要-->
    <div class="box(,,#f00,50%)"></div>

    <!-- 有时前面3个参数都不要，可以用跨位语法 -->
    <!-- 标记从0开始 -->
    <div class="box(3:50%)"></div>
  ```

+ <span id="ysyf">颜色语法</span>
  ```html
    <!-- moxucss默认是只支持16进制的颜色值的，
    要用rgb等颜色，可以用变量解决，直接写在class中会出错 -->

    <!-- #f = #ffffff -->
    <div class="box(2:#f)"></div>
    <!-- #f1 = #f1f1f1 -->
    <div class="box(2:#f1)"></div>
    <!-- #f00 = #ff0000 -->
    <div class="box(2:#f)"></div>
    <!-- #ffffff = #ffffff -->
    <div class="box(2:#ffffff)"></div>
    <!-- 有透明度的，如下就是降低50%透明度 -->
    <div class="box(2:#f-5)"></div>

    <!-- 使用变量来用其他颜色值 -->
    <!-- { $red:rgba(255,0,0,1)} -->
    <div class="box(2:$red)"></div>

  ```

+ <span id="wzyf">位置语法</span>
  ```html
    <!-- 位置语法适用对象：圆角，内外边距，定位 -->
    <!-- 想象圆角顺时针旋转45度，就和top,right,bottom,left对上了 -->
    <!-- top,right,bottom,left的简写就是t,r,b,l -->

    <!-- 一个值，上右下左全部生效 -->
    <div class="box(3:50%)"></div>
    <div class="mp(10)"></div>
    <div class="layer(10)"></div>

    <!-- 有方位值的，指定位置生效 -->
    <div class="box(3:50%/t)"></div>
    <div class="mp(10/t)"></div>
    <div class="layer(r,10/t)"></div>

    <!-- 方位值顺序会影响数值 -->
    <!-- 这样是margin-top:10,margin-left:20 -->
    <div class="mp(10/20/tl)"></div>
    <!-- 换一下方位值顺序，这样就是margin-left:10，margin-top:20-->
    <div class="mp(10/20/lt)"></div>

  ```

  + <span id="flex">flex</span>
   ```html
     <!-- { s: 'flex-start', e: 'flex-end', c: 'center', d: 'stretch', 
    b: 'baseline', 1: 'space-between', 3: 'space-evenly', 4: 'space-around' } -->

    <!--参数x: 第1位：xy是主轴方向 -->
    <!--参数c: 第2位：主轴排列方式 -->
    <!--参数c: 第3位：侧轴排列方式 -->
    <div class="flex(xcc)"></div>
    <div class="flex(ycc)"></div>

    <!-- 多侧轴加`-s`即可 -->
    <div class="flex(xcc-s)"></div> 
    <div class="flex(ycc-s)"></div> 

    <!-- 其他简写相信你能看懂，134的简写也是有理由的 -->
    <!-- 如下的结构，你用简写1(两端对齐)，就只有1条间隙 -->
    <!-- 如下的结构，你用简写3(等分对齐)，就会有3条间隙 -->
    <!-- 如下的结构，你用简写4(不知道什么对齐)，就会有4条间隙 -->
    <div class="box(200,200,#886) flex(x1c)">
      <div class="box(50,50,#f00)"></div>
      <div class="box(50,50,#0f0)"></div>
    </div>

   ```

## <span id="mtcx">媒体查询</span>
  ```html
  <!-- moxucss内置了6个断点，直接抄了tailwindcss的，哈哈，需要自定义的可以去配置对象配置 -->
  <!-- 
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px', -->

  <!-- 使用就是下面那样,在类名前加上即可 -->
    <div class="sm:box(50,50,#0f0)"></div>
    <div class="md:box(50,50,#0f0)"></div>
    <div class="lg:box(50,50,#0f0)"></div>
  ```

## <span id="hnhsl">行内定义函数类</span>
```html
  <!-- 行内函数类应该遵循就近原则，比如父定子用，自定自用 -->
  <!-- 行内函数类的存在是为了利用重复的类名，减少重复的类名 -->
  <!-- [moxu-标记]的格式命名，可以用数字，就近原则可以不考虑标记可读性 -->

  场景1：基本格式,行内函数类是唯一能全局生效的
  <!-- moxucss只会识别在class里出现的函数类，如下你要传递类名给hoverClass -->
  <!-- 写box()这样是传递过去也是无效的，用行内函数类包一层即可，写成moxu-001() -->
  <!-- 这样做是考虑到你在js里出现同名的函数，然后被误替换掉 -->
  <div class="moxu-001()"
      moxu-001="box(100,100,#0) font(30,#f)"
      hoverClass="moxu-001()"
  ></div>

  场景2：有时大部分参数一样，改变的只是少部分，可以利用传参解决
  <!-- @0就是你传进来的第一个参数，以此类推 -->
  <!-- 比如在vue中进行类名切换 -->
    <div class="moxu-001(#f00,#fff)"
      moxu-001="box(100,100,@0) font(30,@1)"
      :class="{'moxu-001(#666,#f)': true}"
  ></div>

  场景3：有时用到moxucss类名没有包含的属性，比如伪元素的content
  <!-- 下面用到了选择器，不懂可以参考选择器的用法 -->
    <div class="box(100,100,#000)"
      moxu-001="box(50,50,@0) show(block) {content:''} "
      css-select="&:after[moxu-001(#f00)]"
  ></div>

  场景4： 都是函数类了，当然有默认值了
    <!-- 用法：@0[变量值] ， css内也可以用-->
    <!-- 在css内可能会有一定的问题，比如z-index:999px,会被加上单位 -->
    <!-- 解决办法：奇葩语法传值时不要传999， 传999.0就行 -->
    <div class="moxu-001()"
      moxu-001="box(100, 100, @0[#f00]) {color:@1[#fff]}"
      :class="{'moxu-001(#666,#f)': true}"
  ></div>


```


## <span id="xzq">选择器</span>
```html
  <!-- 语法：通过css-select属性来定义，css有的选择器都能用 -->
  <!-- "&"代表父元素，"[]"内写moxucss的类名 -->

  场景1：hover改变背景颜色和字体颜色
  <!-- 多个类名用空格隔开，太长可以用行内函数类解决 -->
    <div class="box(50,20,#f00)"
      css-select="&:hover[box(2:#666) font(1:#f)]"
    ></div>

  场景2： 用伪元素
  <!-- 要用到行内函数类来解决moxucss没有的元素 -->
    <div class="box(100,100,#f00)"
      moxu-001="box(50,50,#0) show(block) {content:''}"
      css-select="&:after[moxu-001()]"
    ></div>
  
  场景3：选下一级的元素
  <!-- 用"/"分割下一级，以此类推，可以用空格但不建议 -->
  <div class="box(50,20,#f00)"
      css-select="&:hover/p[font(20,#fff)]"
  >
      <p>moxucss</p>
  </div>

  场景4：多个选择器使用，画个爱心吧
  <!-- $in是moxucss内置的一个变量，作用是继承父元素的值 -->
  <div
		class="box(100,100,#f00) mp(60) rotate(45deg) layer(r)"
		moxu-002="box($in,$in,$in,50%) layer(a,@0/@1/tl) show(block) {content:''}"
		css-select="
			&:hover[box(200,200,#088)!]
			&:after[moxu-002(-50%,0)] 
			&:before[moxu-002(0,-50%)]"
	></div>

```


## <span id="pzwj">配置文件</span>
```js
 export default {
  // 定义默认单位
    defineUnit: num => num + 'px',
    // 这样就可以720px的设计图转vw了
    // defineUnit: num => num*(720/100) + 'vw',

    //这两项是插件里才用到
    outputPath: path.join(__dirname, './'), //生成css的位置
    inputFile: ['vue','jsx','tsx']  // 默认识别的文件，需要其他的可自行添加

  // 定义前缀，生成css类名时会加上
    definePrefix: 'css-',

  // 定义断点
    defineScreens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
    },
  // 定义变量 一定要$开头
    defineVar:{
      $red: '#f00'
    },

  // 如果moxucss的8个类名不满足你的需求，可以自定义
    defineCss: {
      //例子： 定义一个生成正方形的函数类
        // 调用 <div class="square(100,#666)"></div>
        square(val, raw, config){
          // val: 经过处理的参数对象 {0:100px,1:#666}
          // raw: 原始的参数对象 {0:100,1:#666}
          // config: 配置文件对象
          // 原始对象的存在是因为像z-index这样的值会被加上单位
          // 所以就可以通过原始对象来拿没处理过的值

          // 返回的css数组记得不要带`;`号
          return [`width:${val[0]}`,
          `height:${val[0]}`,
          `background-color:${val[1]}`]
        },

      // 返回的数据不止是数组，对象能做到更多
      // 再定义一个生成正方形的函数类，但是我要hover变色
      // 调用 <div class="hoverSquare(100,#666)">moxucss</div>
      hoverSquare(val){
        return {
          width: val[0],
          height: val[0],
          backgroundColor: val[1],
          select:{
            // &代表父元素，和scss类似，你可以用上你喜欢的选择器
            ['&:hover']:{
              priority：true, //控制选择器是否加优先级
              backgroundColor: '#f00',
              moxucss: ['font(40,#f,b)','flex(xcc)']
            }
          },
          //还可以用moxucss自带的类名
          moxucss: ['font(20,#f,b)','flex(xcc)']
        }
      }

    }
}

```