const path = require('path');

module.exports = {
	entry: './app/index.jsx',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/public/js'),
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
		],
	},
};
