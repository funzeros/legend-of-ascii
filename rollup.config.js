import {nodeResolve} from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import path from 'path';

/**
 * @param {string}  type dev/prod
 * @return {object}
 */
export default (type) => {
  type = type.toLocaleLowerCase();
  const isDev = type === 'dev';
  // const isProd = type === 'prod';
  const prefix = {'dev': 'test', 'prod': 'dist'}[type];
  return {
    input: 'src/index.ts',
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
    plugins: [
      // 这个插件是有执行顺序的
      nodeResolve({
        extensions: ['.js', '.ts'],
      }),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      ...(isDev ?
        [
          serve({
            port: 9090,
            contentBase: '', // 表示起的服务是在根目录下
            openPage: '/public/index.html', // 打开的是哪个文件
            open: true, // 默认打开浏览器
          }),
        ] :
        []),
    ],
  };
};
