import React from 'react';
import { render } from 'react-dom';

// Initialize jera-design-ui
import 'jera-design-ui/dist/init'
import 'jera-design-ui/style/layouts.sass'
import 'jera-design-ui/style/components.sass'
import './assets/scss/style.scss'
import './translations/i18n'
import './assets/scss/custom.scss'
// import './assets/js/custom.js'


// For async/await
import 'regenerator-runtime/runtime';

import { App } from './App';

render(<App />, document.getElementById('root'));
