import { type NextPage } from "next";
import Head from "next/head";
import HomePage from "./Home/HomePage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Learned Local</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePage />
      </main>
    </>
  );
};

export default Home;
