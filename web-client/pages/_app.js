import '../styles/globals.css'
import Layout from '../Layout/Layout'

function PcControllerApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default PcControllerApp
