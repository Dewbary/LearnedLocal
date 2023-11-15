import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <div data-theme="light">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-P4NKHQ58');
        `,
            }}
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
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P4NKHQ58"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </body>
      </div>
    </Html>
  );
}
