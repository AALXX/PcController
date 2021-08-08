
//Component Import
import NavBar from "../Components/NavBar/NavBar"

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>
                <main>{children}</main>
            </div>
        </>
    )
}

export default Layout;