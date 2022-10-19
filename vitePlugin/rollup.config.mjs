export default {
    input: "./index.mjs",
    output:[
        {
            file:"./dist/index.cjs.js",
            format:"cjs",
        },
        {
            file:"./dist/index.es.js",
            format:"es",
        }
    ]
}