import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Room } from './pages';
import { PagesRoutes } from './constants';
import { AppLayout, AppThemeProvider } from './components';

const App = () => {
  return (
    <AppThemeProvider>
      <AppLayout>
        <BrowserRouter>
          <Routes>
            <Route path={PagesRoutes.Home} element={<Home />} />
            <Route path={`${PagesRoutes.Room}/:id`} element={<Room />} />
          </Routes>
        </BrowserRouter>
      </AppLayout>
    </AppThemeProvider>
  );
};

export default App;
