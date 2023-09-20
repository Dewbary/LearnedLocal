import { type NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/Home/HomePage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Learned Local - Fun Things To Do in Utah</title>
        <link rel="icon" href="../public/favicon.ico" />
        <meta
          name="description"
          content="Looking for fun date night ideas or things to do in Provo and Utah County? Come learn a new hobby from someone near you with Learned Local!"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="p:domain_verify"
          content="8bf5b0989b5c6f95babbbf49bcf00700"
        />
      </Head>

      <main>
        <HomePage />
      </main>
    </>
  );
};

export default Home;
