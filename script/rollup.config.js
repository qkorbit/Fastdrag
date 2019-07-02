import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { uglify } from 'rollup-plugin-uglify'

const libName = 'Fastdrag'
let isProd = process.env.NODE_ENV === 'production'
let extraPlugins = isProd ? [uglify(), filesize()] : [filesize()]

export default {
  input: './src/index.ts',
  plugins: [
    // https://github.com/ezolenko/rollup-plugin-typescript2/
    typescript({
      verbosity: 2,
      clean: true,
      typescript: require('typescript') // local typescript
    }),
    resolve(),
    commonjs(),
    ...extraPlugins
  ],
  watch: {
    exclude: './node_modules/**'
  },
  output: [
    {
      format: 'umd',
      banner: `/** ${libName} - (c) Orbit 2019 - MIT Licensed */`,
      name: libName,
      sourcemap: !isProd,
      file: `./dist/${libName.toLowerCase()}.${isProd ? 'min.' : ''}js`
    }
  ]
}
