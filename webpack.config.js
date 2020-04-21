import webpackConfigDev from './webpack.config.dev';
import webpackConfigProd from './webpack.config.prod';

export const isDev = process.env.NODE_ENV !== 'production';

export default isDev ? webpackConfigDev : webpackConfigProd;