import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Basic } from './examples/Basic';

const App: React.FC = () => {
  return <Basic />;
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

root.render(<App />);
