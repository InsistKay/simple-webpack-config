const path=require('path')
const glob=require('glob')
const webpack=require('webpack')
const htmlWebpackPlugin=require('html-webpack-plugin')
const PurifyCSSPlugin = require("purifycss-webpack");
module.exports={
    entry:{
        index:'./src/js/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader','postcss-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader','postcss-loader']
            },
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10000
                    }
                }
            },
            {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            template: path.resolve(__dirname,'src/index.html')
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            }),
            new webpack.ProvidePlugin({
                $:"jquery"
            })
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8081',
        compress:true
    }
}