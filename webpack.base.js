// common code of webpack goes here
module.exports = {
    module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react', // JSX -- Js
            'stage-0', // Some Async stuff
            ['env', { targets: {browsers: ['last 2 versions']}}]
          ]
        }
      }
    ]
  }
}
