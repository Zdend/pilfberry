import webpack from 'webpack';
import webpackFactory from './webpack.config';

export const webpackConfig = webpackFactory({
    dev: true,
    watch: true
});

export const webpackRunner = () => webpack(webpackConfig);