
export const spinnerStyle = `
    <style>
    body {
        margin: 0; padding: 0;
    }
    .spinner {
        width: 40px;
        height: 40px;
        margin: 40vh auto;
        background-color: #fff;

        border-radius: 100%;  
        -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
        animation: sk-scaleout 1.0s infinite ease-in-out;
    }

    @-webkit-keyframes sk-scaleout {
        0% { -webkit-transform: scale(0); }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }

    @keyframes sk-scaleout {
        0% { 
            -webkit-transform: scale(0);
            transform: scale(0);
        } 100% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
            opacity: 0;
        }
    }
    .spinner-overlay {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: #510949;
    }
    </style>
`;

export const styleDefinitions = `
    <noscript id="deferred-styles">
        <link rel="stylesheet" type="text/css" href="/static/vendor.css" />
        <link rel="stylesheet" type="text/css" href="/static/app.css" />
    </noscript>
    <script>
      var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById('deferred-styles');
        var replacement = document.createElement('div');
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
    </script>
`;

export const scriptDefinitionsDev = `
    <script src="/static/app.js"></script>
`;

export const scriptDefinitionsProd = `
    <script src="/static/vendor.js"></script>
    <script src="/static/app.js"></script>
`;
export const googleTagManagerScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NNLJW2P');</script>
    <!-- End Google Tag Manager -->
`;
export const googleTagManagerNoScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNLJW2P"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
`;

export const minifierOptions = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    html5: true,
    includeAutoGeneratedTags: true,
    keepClosingSlash: true,
    minifyCSS: true,
    minifyJS: true,
    preserveLineBreaks: true,
    preventAttributesEscaping: true,
    processConditionalComments: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeTagWhitespace: true,
    sortAttributes: true,
    sortClassName: true,
    trimCustomFragments: true,
    useShortDoctype: true
};

export const faviconDefinitions = `
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/static/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/static/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/static/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/static/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/static/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/static/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/static/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/static/favicon/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="/static/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="/static/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/static/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/static/favicon/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/static/favicon/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="/static/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="/static/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="/static/favicon/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="/static/favicon/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="/static/favicon/mstile-310x310.png" />
`;