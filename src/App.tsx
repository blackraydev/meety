import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Room } from './pages';
import { PagesRoutes } from './constants';
import { AppLayout, AppThemeProvider } from './components';
import { SocketProvider } from './components/SocketContext/SocketContext';

const App = () => {
  return (
    <AppThemeProvider>
      <SocketProvider>
        <AppLayout>
          <BrowserRouter>
            <Routes>
              <Route path={PagesRoutes.Home} element={<Home />} />
              <Route path={`${PagesRoutes.Room}/:id`} element={<Room />} />
            </Routes>
          </BrowserRouter>
        </AppLayout>
      </SocketProvider>
    </AppThemeProvider>
  );
};

export default App;
