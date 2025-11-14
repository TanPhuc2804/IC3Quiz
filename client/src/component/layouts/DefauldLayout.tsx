
import Header from './partials/Header'
import Footer from './partials/Footer'

function DefauldLayout({children}: React.PropsWithChildren<{}>) {
  return (
    <div>
        <Header/>
        <div>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default DefauldLayout