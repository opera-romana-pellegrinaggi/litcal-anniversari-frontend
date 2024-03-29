import React, { Suspense } from 'react'
import * as ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import './index.css'
import App from './App'
import i18n from './i18n'
//import reportWebVitals from './reportWebVitals'

//const baseUrl = process.env.NODE_ENV === 'production' ? '/anniversariFrontend' : '/';
const baseUrl = process.env.PUBLIC_URL;
console.log('baseUrl = ' + baseUrl);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
