import { Route, Routes } from 'react-router'
import { publicRoutes } from './routes'
import DefauldLayout from './component/layouts/DefauldLayout'
import { Fragment } from 'react/jsx-runtime'
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  const { setAuth } = useAuth();
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(`${apiUrl}/users`, { withCredentials: true })
      .then(response => {
        setAuth(response.data.user);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.isLayout ? DefauldLayout : Fragment
          const Page = route.component
          return <Route
            key={index}
            path={route.path}
            element={
              <>
                <Layout>
                  <Page />
                </Layout>
              </>
            }
          />
        })}
      </Routes>
    </>
  )
}

export default App
