import { Route, Routes } from 'react-router'
import { privateRoutes, publicRoutes } from './routes'
import DefauldLayout from './component/layouts/DefauldLayout'
import { Fragment } from 'react/jsx-runtime'
import { useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  const { setAuth, user } = useAuth();
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(`${apiUrl}/users`, { withCredentials: true })
      .then(response => {
        setAuth(response.data.user);
      })
      .catch(error => {
        setAuth(null);
      });
  }, []);

  return (
    <>
      <Routes>
        {(
          user?.role === "user" || user === null
            ? publicRoutes.map((route, index) => {
              const Layout = route.isLayout ? DefauldLayout : Fragment
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })
            :
            privateRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Page />
                  }
                >
                  {route.children && route.children.map((child, index) => {
                    const ChildPage = child.page
                    return (
                      <Route
                        key={index}
                        path={`${route.path}/${child.path}`}
                        element={
                          <ChildPage />
                        }
                      />
                    )
                  })}
                </Route>
              )
            })
        )}
      </Routes>
    </>
  )
}

export default App
