import Layout from "../components/Layout";
import "../styles/globals.css";

//  Component: 렌더링하길 원하는 페이지, _app.js는 Component 렌더링
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
