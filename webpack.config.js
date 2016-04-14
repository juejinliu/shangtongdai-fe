/**
 * Created by malin on 15/4/27.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var WebpackDynamicHash = require('webpack-dynamic-hash');
module.exports = {
    entry: {
        'lib': './js/lib/lib',
        'std-app': './js/std-app',
        'std-init': './js/std-init'
    },
    output: {
        //为什么使用 css 目录为根目录呢，
        // 因为图片时从css载入的less中写的css相对路径
        // 如果与下面生成的路径名不同则取不到图片
        path: './build/css',
        filename: '../js/[name].js?[chunkhash]'

    },

    context: __dirname + '/src',
    module: {
        loaders: [
            //{test: /\.js$/, loader: 'jsx-loader?harmony'}, // loaders can take parameters as a querystring
            //{test: /\.jsx$/, loaders: ['jsx?harmony']},
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|src\/js\/lib)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    plugins: ['transform-runtime', 'transform-object-assign'],
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {test: /\.png$/, loader: 'url-loader?limit=8192&name=../[path][name].[ext]?[hash]'},
            {test: /\.jpg$/, loader: 'file-loader?&name=../[path][name].[ext]?[hash]'},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js', 'jsx', '.json', 'cjsx', '.coffee', 'css', 'less']
    },

    plugins: [
        new ExtractTextPlugin('/[name].css?[contenthash]'),
        new webpack.optimize.CommonsChunkPlugin({     //两个入口文件公共的文件将被提出来，生成commons
                name: 'commons',
                filename: '../js/commons.js?[chunkhash]',
                chunks: ['std-app', 'lib']
            }
        ),
        new WebpackMd5Hash(),
        new WebpackDynamicHash(__dirname, ['std'])
    ]
    //plugins: [
    //    new ExtractTextPlugin('/[name].css'),
    //    new webpack.optimize.UglifyJsPlugin({
    //        compress: {
    //            warnings: false
    //        },
    //        sourceMap: true
    //    })
    //]
};