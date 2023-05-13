import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Room } from './pages';
import { PagesRoutes } from './constants';
import { AppLayout, AppThemeProvider } from './components';
import { SocketProvider } from './components/SocketContext/SocketContext';
import { ToastContextProvider } from './UI/Toast/ToastContext';

const App = () => {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <SocketProvider>
          <AppLayout>
            <ToastContextProvider>
              <Routes>
                <Route path={PagesRoutes.Home} element={<Home />} />
                <Route path={`${PagesRoutes.Room}/:id`} element={<Room />} />
              </Routes>
            </ToastContextProvider>
          </AppLayout>
        </SocketProvider>
      </AppThemeProvider>
    </BrowserRouter>
  );
};

export default App;
