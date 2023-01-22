import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          {/*Acumin Pro bold*/}
          <link rel="stylesheet" href="https://use.typekit.net/azn1mni.css" />
          <script
            src="https://script.tapfiliate.com/tapfiliate.js"
            type="text/javascript"
            async
          ></script>


          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              _affirm_config = {
                public_api_key:  "EGWAS9OC554RO3IF",
              script:"https://cdn1-sandbox.affirm.com/js/v2/affirm.js"
   };
              (function(m,g,n,d,a,e,h,c){var b=m[n]||{ },k=document.createElement(e),p=document.getElementsByTagName(e)[0],l=function(a,b,c){return function(){a[b]._.push([c, arguments])}};b[d]=l(b,d,"set");var f=b[d];b[a]={ };b[a]._=[];f._=[];b._=[];b[a][h]=l(b,a,h);b[c]=function(){b._.push([h, arguments])};a=0;for(c="set add save post open empty reset on off trigger ready setProduct".split(" ");a<c.length;a++)f[c[a]]=l(b,d,c[a]);a=0;for(c=["get","token","url","items"];a<c.length;a++)f[c[a]]=function(){ };k.async=
  !0;k.src=g[e];p.parentNode.insertBefore(k,p);delete g[e];f(g);m[n]=b})(window,_affirm_config,"affirm","checkout","ui","script","ready","jsReady");
              `,
            }}
          />
    
        </Head>
        <body className="loading">
          <Main />
          <NextScript />


        </body>
      </Html>
    );
  }
}

export default MyDocument;
