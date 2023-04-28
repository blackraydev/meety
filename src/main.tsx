import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './lib/translations/i18n.ts';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<App />);
