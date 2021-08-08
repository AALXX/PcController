import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from "../Layout/Layout"

function PcControllerPanelApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />

    </Layout>
  )
}

export default PcControllerPanelApp
