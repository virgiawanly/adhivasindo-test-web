/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

colors.zink = {
  50: '#EDEEF7',
  100: '#DBDDF0',
  200: '#B8BCE0',
  300: '#9097CF',
  400: '#6D75C0',
  500: '#4B55AF',
  600: '#3C448B',
  700: '#2B3164',
  800: '#1C2041',
  900: '#0E1020',
  950: '#080912',
};

module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/app/**/*.html',
    './node_modules/simplebar-angular/**/*',
    './node_modules/@ng-select/**/*',
    './node_modules/tailwindcss/**/*',
    './node_modules/@siemens/ngx-datatable/**/*',
    './node_modules/prismjs/**/*',
    './node_modules/ngx-lightbox/**/*',
    './node_modules/flatpickr/**/*',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    fontFamily: {
      public: ['Inter', 'Public Sans', 'sans-serif'],
      tourney: ['"Tourney", sans-serif'],
      remix: ['remixicon'],
    },
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        sm: '0.8125rem', //13px
        base: '0.875rem', //14px
        15: '0.9375rem', //15px
        16: '1rem', //16px
        'vertical-menu-item-font-size': '0.875rem',
      },
      colors: {
        body: colors.zink[950],
        'body-bg': colors.zinc[100],
        'body-bordered': colors.white,

        // Sidebar light
        'vertical-menu': colors.zink[950],
        'vertical-menu-border': colors.zink[800],
        'vertical-menu-item': colors.zink[200],
        'vertical-menu-item-hover': colors.zink[800],
        'vertical-menu-item-bg-hover': colors.white,
        'vertical-menu-item-active': colors.zink[400],
        'vertical-menu-item-bg-active': colors.white,
        'vertical-menu-sub-item': colors.zink[200],
        'vertical-menu-sub-item-hover': colors.zink[400],
        'vertical-menu-sub-item-active': colors.white,

        // Sidebar light
        // 'vertical-menu': colors.white,
        // 'vertical-menu-border': colors.zinc[200],
        // 'vertical-menu-item': colors.zinc[400],
        // 'vertical-menu-item-hover': colors.blue[700],
        // 'vertical-menu-item-bg-hover': colors.blue[50],
        // 'vertical-menu-item-active': colors.blue[700],
        // 'vertical-menu-item-bg-active': colors.blue[50],
        // 'vertical-menu-sub-item': colors.zinc[400],
        // 'vertical-menu-sub-item-hover': colors.blue[700],
        // 'vertical-menu-sub-item-active': colors.blue[700],

        // Sidebar dark
        'vertical-menu-dark': colors.zink[950],
        'vertical-menu-border-dark': colors.zink[800],
        'vertical-menu-item-dark': colors.zink[300],
        'vertical-menu-item-hover-dark': colors.zink[800],
        'vertical-menu-item-bg-hover-dark': colors.white,
        'vertical-menu-item-active-dark': colors.zink[400],
        'vertical-menu-item-bg-active-dark': colors.white,
        'vertical-menu-sub-item-dark': colors.zink[300],
        'vertical-menu-sub-item-hover-dark': colors.zink[400],
        'vertical-menu-sub-item-active-dark': colors.white,

        // Sidebar brand
        'vertical-menu-brand': colors.blue[950],
        'vertical-menu-border-brand': colors.blue[900],
        'vertical-menu-item-brand': colors.zink[300],
        'vertical-menu-item-hover-brand': colors.blue[100],
        'vertical-menu-item-bg-hover-brand': colors.blue[900],
        'vertical-menu-item-bg-hover-brand': colors.blue[900],
        'vertical-menu-item-active-brand': colors.blue[200],
        'vertical-menu-item-bg-active-brand': colors.blue[950],
        'vertical-menu-sub-item-brand': colors.blue[50],
        'vertical-menu-sub-item-hover-brand': colors.blue[100],
        'vertical-menu-sub-item-active-brand': colors.blue[200],

        // Sidebar modern
        'vertical-menu-to-modern': colors.blue[900],
        'vertical-menu-form-modern': colors.green[900],
        'vertical-menu-border-modern': colors.blue[900],
        'vertical-menu-item-modern': 'rgba(255, 255, 255, 0.60)',
        'vertical-menu-item-hover-modern': 'rgba(255, 255, 255)',
        'vertical-menu-item-bg-hover-modern': 'rgba(255, 255, 255, 0.06)',
        'vertical-menu-item-active-modern': colors.blue[50],
        'vertical-menu-item-bg-active-modern': 'rgba(255, 255, 255, 0.06)',
        'vertical-menu-sub-item-modern': 'rgba(255, 255, 255, 0.50)',
        'vertical-menu-sub-item-hover-modern': colors.white,
        'vertical-menu-sub-item-active-modern': colors.white,

        // Topbar
        topbar: colors.white,
        'topbar-border': colors.zink[200],
        'topbar-item': colors.zink[700],
        'topbar-item-hover': colors.zink[800],
        'topbar-item-bg-hover': colors.zink[100],

        'topbar-dark': colors.zink[900],
        'topbar-border-dark': colors.zink[700],
        'topbar-item-dark': colors.zink[400],
        'topbar-item-hover-dark': colors.zink[100],
        'topbar-item-bg-hover-dark': colors.zink[800],

        'topbar-brand': '#84172c',
        'topbar-border-brand': '#490812',
        'topbar-item-brand': colors.zink[100],
        'topbar-item-hover-brand': colors.white,
        'topbar-item-bg-hover-brand': colors.blue[800],
        'topbar-modern': colors.white,

        custom: {
          DEFAULT: '#045BBF',
          50: '#E1EFFE',
          100: '#C3DEFE',
          200: '#82BBFC',
          300: '#469BFB',
          400: '#0A7AFA',
          500: '#045BBF',
          600: '#034A9B',
          700: '#023773',
          800: '#02244B',
          900: '#011328',
          950: '#000A14',
        },
        red: {
          50: colors.red[50],
          100: colors.red[100],
          200: colors.red[200],
          300: colors.red[300],
          400: colors.red[400],
          500: colors.red[500], // Using Tailwind's color palette
          600: colors.red[600],
          700: colors.red[700],
          800: colors.red[800],
          900: colors.red[900],
          950: colors.red[950],
        },
        green: {
          50: '#EAFAF7',
          100: '#D2F4EE',
          200: '#A0E8DB',
          300: '#56D7BF',
          400: '#2DBDA3',
          500: '#249782', // Using Tailwind's color palette
          600: '#208875',
          700: '#1C7767',
          800: '#186355',
          900: '#11463C',
          950: '#0B2D27',
        },

        yellow: {
          50: colors.yellow[50],
          100: colors.yellow[100],
          200: colors.yellow[200],
          300: colors.yellow[300],
          400: colors.yellow[400],
          500: colors.yellow[500], // Using Tailwind's color palette
          600: colors.yellow[600],
          700: colors.yellow[700],
          800: colors.yellow[800],
          900: colors.yellow[900],
          950: colors.yellow[950],
        },

        orange: {
          50: colors.orange[50],
          100: colors.orange[100],
          200: colors.orange[200],
          300: colors.orange[300],
          400: colors.orange[400],
          500: colors.orange[500], // Using Tailwind's color palette
          600: colors.orange[600],
          700: colors.orange[700],
          800: colors.orange[800],
          900: colors.orange[900],
          950: colors.orange[950],
        },

        sky: {
          50: colors.sky[50],
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500], // Using Tailwind's color palette
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900],
          950: colors.sky[950],
        },

        purple: {
          50: colors.purple[50],
          100: colors.purple[100],
          200: colors.purple[200],
          300: colors.purple[300],
          400: colors.purple[400],
          500: colors.purple[500], // Using Tailwind's color palette
          600: colors.purple[600],
          700: colors.purple[700],
          800: colors.purple[800],
          900: colors.purple[900],
          950: colors.purple[950],
        },

        zink: {
          50: colors.zink[50],
          100: colors.zink[100],
          200: colors.zink[200], // Light
          300: colors.zink[300], // Soft light
          400: colors.zink[400], // Milder
          500: colors.zink[500], // Medium tone
          600: colors.zink[600], // Slightly darker
          700: colors.zink[700], // Dark
          800: colors.zink[800], // Darker
          900: colors.zink[900], // #2A2545 as the base 900
          950: colors.zink[950], // Deepest
        },
      },

      spacing: {
        header: '4.375rem', // 70px
        'vertical-menu': '16.25rem', // 260px
        'vertical-menu-md': '10.3125rem', // 165px
        'vertical-menu-sm': '4.375rem', // 70px
      },
      maxWidth: {
        boxed: '87.5rem', // 1400px
      },
      minHeight: {
        sm: '1650px', // 1650px
      },
      zIndex: {
        drawer: '1050',
      },
      backgroundImage: {
        'auth-pattern': "url('/assets/images/auth-bg.jpg')",
        'auth-pattern-dark': "url('/assets/images/auth-bg-dark.jpg')",
      },
      animation: {
        icons: 'iconsAnimation 50s',
        progress: 'progressAnimation 2s',
      },
      keyframes: {
        iconsAnimation: {
          to: { strokeDashoffset: '500' },
        },
        progressAnimation: {
          '0%': {
            width: '0',
          },
        },
      },
      aspectRatio: {
        '1/1': '1 / 1',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
      clipPath: {
        triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      },
    },
  },
  plugins: [
    require('./src/plugins/headings.js'),
    require('./src/plugins/buttons.js'),
    require('./src/plugins/forms.js'),
    require('./src/plugins/card.js'),
    require('./src/plugins/drawer.js'),

    // Third party libraries
    require('./src/plugins/flatpicker.js'),
    require('./src/plugins/simplebar.js'),
    require('./src/plugins/sweetalert2.js'),
    require('./src/plugins/tippy.js'),
    require('./src/plugins/toastify.js'),
    require('./src/plugins/choices.js'),
    require('./src/plugins/dropzone.js'),
    require('./src/plugins/colorpicker.js'),
    require('./src/plugins/ckeditor.js'),
    require('./src/plugins/datatable.js'),
    require('./src/plugins/apexcharts.js'),
    require('./src/plugins/maps.js'),
    require('./src/plugins/listjs.js'),
    require('./src/plugins/scroll-hint.js'),
    require('./src/plugins/multijs.js'),
    require('./src/plugins/fullcalendar.js'),
    require('./src/plugins/lightbox.js'),
    require('./src/plugins/prismjs.js'),
    require('./src/plugins/vanilla-calendar.js'),

    // App pages
    require('./src/plugins/apps.js'),
  ],
};
