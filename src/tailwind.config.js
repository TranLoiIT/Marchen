module.exports = {
     purge: {
         enabled: process.env.ENV === 'production',
         content: [
             'components/**/*.vue',
             'layouts/**/*.vue',
             'pages/**/*.vue',
             'plugins/**/*.js',
             'nuxt.config.js',
         ],
     },
     darkMode: false, // or 'media' or 'class'
     theme: {
          fontFamily: {
               display: ['Lato', 'sans-serif'],
               body: ['Lato', 'sans-serif'],
          },
          extend: {
               colors: {
                    bgHeaderBule: '#055DBC',
               },
               inset: {
                    //
               },
               boxShadow: {
                    //   inputShadow: '0px 3px 15px rgba(0, 0, 0, 0.07)',
               },
               borderRadius: {
                    main: '10px',
                    15: '15px',
                    '4xl': '30px',
               },
               borderWidth: {
                    0.5: '0.5px',
               },
               minWidth: {
                    tabWidth: '13.75%',
                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
               },
               maxWidth: {
                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
               },
               maxHeight: {
                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
               },
               minHeight: {
                    '1/4': '25%',
                    '1/2': '50%',
                    '3/4': '75%',
               },
               height: {
                    '38px': '38px',
                    '42px': '42px',
                    '49px': '49px',
                    '256px': '256px',
                    '356px': '356px',
                    '420px': '420px',
               },
               spacing: {
                    '5px': '5px',
                    '10px': '10px',
                    '14px': '14px',
                    '15px': '15px',
                    '18px': '18px',
                    '30px': '30px',
                    '35px': '35px',
                    '39px': '39px',
                    '87px': '87px',
                    '140px': '140px',
                    '1067px': '1067px',
                    '1/30': '3.33%',
                    '1/6': '16.66%',
                    '1/10': '10%',
                    '1/12': '8.33%',
               },
               width: {
                    '1/8': '12.5%',
                    '1/6': '16.77%',
                    '11/20': '55%',
                    '9/20': '45%',
                    '120px': '120px',
                    '180px': '180px',
               },
               outline: {
                    outlineMainColor: '2px solid #CD9AFF',
               },
               fontSize: {
                    '22px': '22px',
                    '25px': '25px',
               },
         },
          screens: {
               'tablet-600': '600px',
               'tablet-640': '640px',
               'tablet-768': '768px',
               'tablet-800': '800px',
               lg: '1024px',
               xl: '1280px',
               'desktop-xs': '1366px',
               'desktop-md': '1440px',
               'desktop-lg': '1600px',
               'desktop-xl': '1920px',
               'desktop-2xl': '2048px',
               'desktop-3xl': '2560px',
          },
     },
     variants: {
         margin: ['first', 'last', 'responsive'],
         padding: ['first', 'last', 'responsive'],
         extend: {},
     },
     plugins: [],
 };
 