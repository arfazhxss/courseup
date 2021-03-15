import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { RestfulProvider } from 'restful-react';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

Sentry.init({
  dsn: 'https://08218d366eab4945abe3e09054bc5cce@o551348.ingest.sentry.io/5674718',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider base={process.env.NODE_ENV === 'production' ? '/api' : 'https://clockwork.vikelabs.dev/api'}>
      <App />
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
