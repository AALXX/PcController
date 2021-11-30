import NavBar from '../Components/NavBar/NavBar'
import Meta from '../Components/Meta/Meta'

const Layout = ({ children }) => {
    return (
        <>

            <Meta />
            <NavBar />
            <div>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout