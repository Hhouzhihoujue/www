const withPlugins = require("next-compose-plugins");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");

module.exports = withPlugins([
	[css, {
		cssModules: false,
	}],
	[sass, {
		cssModules: true,
		cssLoaderOptions: {
			importLoaders: 1,
			camelCase: true,
			localIdentName: "[local]___[hash:base64:5]",
		},
		sassLoaderOptions: {
			javascriptEnabled: true,
		}
	}],
	{
		distDir: "dist",
		pageExtensions: ["jsx", "js"]
	}
]);