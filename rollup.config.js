import {nodeResolve} from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import {uglify} from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import path from 'path';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import {config} from 'dotenv';
const {NODE_ENV}= process.env;
const isProd = NODE_ENV === 'production';
// 根据环境获取不同env
const getEnv = (isProd)=>{
  if (isProd) {
    config({path: '.env.production'});
  } else {
    const {error}= config({path: '.env.local'});
    if (error) {
      config({path: '.env'});
    }
  }
};
getEnv(isProd);

export default () => {
  const {BASE_URL}=process.env;
  const prefix =isProd?'dist':'test';
  // 这个插件是有执行顺序的
  const plugins = [
    injectProcessEnv({
      BASE_URL,
      IS_DEV: !isProd,
    }),
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ];
  // 根据环境调整插件
  if (isProd) {
    plugins.push(...[uglify()]);
  } else {
    plugins.push(...[livereload(),
      serve({
        port: 9090,
        contentBase: '', // 表示起的服务是在根目录下
        openPage: '/public/index.html', // 打开的是哪个文件
        open: true, // 默认打开浏览器
      }),
    ]);
  }
  return {
    input: 'src/main.ts',
    output: {
      file: path.resolve(__dirname, `${prefix}/bundle.js`),
      // global: 弄个全局变量来接收
      // cjs: module.exports
      // esm: export default
      // iife: ()()
      // umd: 兼容 amd + commonjs 不支持es6导入
      format: 'iife',
      sourcemap: false, // ts中的sourcemap也得变为true
    },
    plugins,
  };
};
