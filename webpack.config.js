const path= require('path');
const Dotenv=require('dotenv-webpack');

module.exports={
  mode: 'development',
  entry: './src/app.js',
  plugins: [
    new Dotenv()
  ],
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
