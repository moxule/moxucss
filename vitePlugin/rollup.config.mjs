export default {
    input: "./index.mjs",
    output:[
        {
            file:"./dist/index.js",
            format:"cjs",
        },
        {
            file:"./dist/index.mjs",
            format:"es",
        }
    ]
}