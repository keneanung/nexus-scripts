const config = require('../../webpack.config');

test('reuses the React runtime provided by Nexus', () => {
  expect(config.externals).toEqual({
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOM',
  });
});
