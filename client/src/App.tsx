import { Route, Routes } from 'react-router'
import { publicRoutes } from './routes'
import DefauldLayout from './component/layouts/DefauldLayout'
import { Fragment } from 'react/jsx-runtime'
function App() {
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
                  <Page/>
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
