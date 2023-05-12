import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Room } from './pages';
import { PagesRoutes } from './constants';
import { AppLayout, AppThemeProvider } from './components';
import { SocketProvider } from './components/SocketContext/SocketContext';
import { ToastContextProvider } from './UI/Toast/ToastContext';

const App = () => {
  return (
    <AppThemeProvider>
      <SocketProvider>
        <AppLayout>
          <ToastContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path={PagesRoutes.Home} element={<Home />} />
                <Route path={`${PagesRoutes.Room}/:id`} element={<Room />} />
              </Routes>
            </BrowserRouter>
          </ToastContextProvider>
        </AppLayout>
      </SocketProvider>
    </AppThemeProvider>
  );
};

export default App;
