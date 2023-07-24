import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="bumblebee">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap"
          rel="stylesheet"
        />
        {/* Creates the "google" namespace that can be accessed globally throughout the 
        app to connect to Google Maps */}
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyADwy1g0J4OGXrZbcmvbTIkwVCPfrDPE78&libraries=places`}
          async
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3574769,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
