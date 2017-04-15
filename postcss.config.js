module.exports = {
  plugins: [
    // (process.env.NODE_ENV === 'production' && require('css-mqpacker')()),
    // require('autoprefixer')({browsers: ['last 2 versions', '> 5%']})
    // require('postcss-sassy-mixins')(),
    require('rucksack-css')({ autoprefixer: true })
  ]
}