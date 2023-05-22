import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContextProvider } from './UI/Toast/ToastContext';
import { AppLayout, AppThemeProvider, SocketProvider } from './components';
import { Home, Room } from './pages';
import { PagesRoutes } from './constants';

const queryClient = new QueryClient();

const App = () => {
  // TODO: Implement Authorization
  // const renderAuthRoutes = () => {
  //   return (
  //     <>
  //       <Route path={PagesRoutes.Dashboard} element={<Dashboard />} />
  //       <Route path={PagesRoutes.Auth} element={<Auth />} />
  //       <Route path={PagesRoutes.Register} element={<Register />} />
  //     </>
  //   );
  // };

  return (
    <BrowserRouter>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </AppThemeProvider>
    </BrowserRouter>
  );
};

export default App;
