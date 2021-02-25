const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");

module.exports = () => withCss({
    trailingSlash: true,
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    ...withLess(
        withSass({
            lessLoaderOptions: {
                javascriptEnabled: true,
            },
        })
    ),
})
