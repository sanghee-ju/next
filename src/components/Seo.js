import Head from "next/head";

export default function Seo({ title }) {
  const fullTitle = `${title} | Next Movies`;
  return (
    <Head>
      {/* Head에 의해 위 문장을 title에 넣으면 에러 발생 */}
      <title>{fullTitle}</title>
    </Head>
  );
}
