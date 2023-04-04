import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="bumblebee">
      <Head>
        {/* Creates the "google" namespace that can be accessed globally throughout the 
        app to connect to Google Maps */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyADwy1g0J4OGXrZbcmvbTIkwVCPfrDPE78&libraries=places`}
          async
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
