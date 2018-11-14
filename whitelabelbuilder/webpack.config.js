const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    // mode: NODE_ENV,
    entry: {
        app: './components/App.jsx',
        index: './index.jsx',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',
        publicPath: '/static/build/',
        library: '[name]',
    },

    watch: NODE_ENV === 'development',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader?presets[]=react&presets[]=env&presets[]=stage-1',

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },

    devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({ filename: './webpack-stats.json'}),
    ],
};

// if (NODE_ENV !== 'development') {
//     module.exports.plugins.push(
//         new config.optimization.minimize({
//             compress: {
//                 warnings: false,
//                 drop_console: true,
//             },
//         })
//     );
// }
