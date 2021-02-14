const register = require('esbuild-register/dist/node');
register.register({
  format: 'cjs',
  define: {
    __NODE__: JSON.stringify(true),
  },
});
require('../src/index').run();
