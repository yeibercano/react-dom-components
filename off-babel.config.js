const isTest = String(process.env.NODE_ENV) === 'test';
console.log('babel.config', isTest)


module.exports = api => {
  api.cache(false);
  
  const presets = [
      ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
      '@babel/preset-react',
  ];
  
  const plugins = [
    "@babel/plugin-transform-modules-commonjs"
  ]
  
  return {
    presets,
    plugins,
  }
}
