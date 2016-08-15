import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/app.js',
  plugins: [
    babel(),
    uglify()
  ],
  dest: 'temp/x.js',
  moduleName: 'x',
  format: 'cjs'
}
