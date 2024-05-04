import { extendTailwindMerge } from 'tailwind-merge'

import { basePlugin } from './tw-plugins/basePlugin'
import { colorVarsPlugin } from './tw-plugins/colorVarsPlugin'

import { accordionPlugin } from './tw-plugins/accordionPlugin'
import { alertPlugin } from './tw-plugins/alertPlugin'
import { badgePlugin } from './tw-plugins/badgePlugin'
import { breadcrumbPlugin } from './tw-plugins/breadcrumbPlugin'
import { buttonPlugin } from './tw-plugins/buttonPlugin'
import { dropdownPlugin } from './tw-plugins/dropdownPlugin'
import { formPlugin } from './tw-plugins/formPlugin'
import { listGroupPlugin } from './tw-plugins/listGroupPlugin'
import { modalPlugin } from './tw-plugins/modalPlugin'
import { offCanvasPlugin } from './tw-plugins/offCanvasPlugin'
import { paginationPlugin } from './tw-plugins/paginationPlugin'
import { placeholderPlugin } from './tw-plugins/placeholderPlugin'
import { popoverPlugin } from './tw-plugins/popoverPlugin'
import { readMorePlugin } from './tw-plugins/readMorePlugin'
import { scrollAreaPlugin } from './tw-plugins/scrollAreaPlugin'
import { spinnerPlugin } from './tw-plugins/spinnerPlugin'
import { tablePlugin } from './tw-plugins/tablePlugin'
import { tabsPlugin } from './tw-plugins/tabsPlugin'
import { tooltipPlugin } from './tw-plugins/tooltipPlugin'

///////////////////////////////////////////////////////////////////////////
//
// Gotcha: Switching to a .ts extension breaks the above import annotation.
// The above annotation give us autocomplete when typing inside the config
// You can also use CONTROL + Space to manually trigger it.
// If you use a .ts extenstion, then manually implement typings as
// follows: https://flaming.codes/posts/typescript-for-tailwind-css-config
//
//   import type { Config } from 'tailwindcss'
//   const config = { ... } satisfies Config
//
//# Update: It may not be the .ts extension. I've also noticed that the
//# typings break if import statements come AFTER the annotation.
//
// Note: August 15, 2023 : I switched from require to import, so
// colors.ts would work in component files. Everything still
// seems to work fine now.
//
///////////////////////////////////////////////////////////////////////////
/** @type {import('tailwindcss').Config} */

const config = {
  // important: true,
  darkMode: 'class', // https://www.youtube.com/watch?v=oMOe_32M6ss
  // corePlugins: { preflight: false },

  //! In v4, this may no longer be necessary.
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // For this demo, I switched to Bootstrap breakpoints: https://getbootstrap.com/docs/5.3/layout/breakpoints/#available-breakpoints
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },

    ///////////////////////////////////////////////////////////////////////////
    //
    // https://tailwindcss.com/docs/customizing-colors
    // Why am I doing it in extend.colors? For some of the color names
    // it's not really necessary.
    //
    //   https://tailwindcss.com/docs/customizing-colors#adding-additional-colors
    //   If you’d like to add a brand new color to the default palette, add it in
    //   the theme.extend.colors section of your configuration file.
    //
    // Not sure, but it's also possible that not using extend will ultimately reset
    // ALL colors such, and we definitely don't want that. In other words theme.colors: {}
    // might result in NO colors except those explicitly defined.
    //
    // A good idea for extending colors would be to mod the default colors as needed, but
    // possibly also add primary, secondary, success, etc.
    //
    ///////////////////////////////////////////////////////////////////////////

    extend: {
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1.5' }]
      },

      colors: {
        // This is a Tailwind color generator tool: https://www.tints.dev/
        // https://www.simeongriggs.dev/using-the-tailwind-css-palette-generator-and-api

        // Lighter than the default (less of a mustard color).
        yellow: {
          50: '#FFFBE5',
          100: '#FFF7CC',
          200: '#FFF099',
          300: '#FFE866',
          400: '#FFE033',
          500: '#FFD700',
          600: '#CCAD00',
          700: '#998200',
          800: '#665700',
          900: '#332B00',
          950: '#191600'
        },

        olive: {
          50: '#F9FCE4',
          100: '#F3F9CD',
          200: '#E7F39B',
          300: '#DCED68',
          400: '#D0E736',
          500: '#B5CC18',
          600: '#91A413',
          700: '#6D7B0F',
          800: '#48520A',
          900: '#242905',
          950: '#101202'
        },

        green: {
          50: '#EAFAEA',
          100: '#D6F5D6',
          200: '#ADEBAD',
          300: '#84E184',
          400: '#5BD75B',
          500: '#32CD32',
          600: '#28A428',
          700: '#1E7B1E',
          800: '#145214',
          900: '#0A290A',
          950: '#051505'
        },

        // Very bright!
        pink: {
          50: '#FFE5F3',
          100: '#FFD1EA',
          200: '#FFA3D4',
          300: '#FF70BC',
          400: '#FF42A7',
          500: '#FF1493',
          600: '#DB0075',
          700: '#A30057',
          800: '#70003C',
          900: '#38001E',
          950: '#19000E'
        },

        brown: {
          50: '#F7EEE9',
          100: '#EFE0D6',
          200: '#E0C2AE',
          300: '#D0A385',
          400: '#C1855D',
          500: '#A5673F',
          600: '#855433',
          700: '#643F26',
          800: '#422A19',
          900: '#21150D',
          950: '#0F0906'
        },

        light: 'rgb(248, 249, 250)',
        // Bootstrap uses  #212529 / rgb(33, 37, 41). However,
        // I prefer to go just a little lighter with charcoal.
        dark: '#333'
      },

      fontFamily: {
        sans: [
          ///////////////////////////////////////////////////////////////////////////
          //
          // Poppins was added. Everything else is in the sans array is the default.
          // The reason Poppins was added to sans is because sans is the default font:
          //
          //   https://tailwindcss.com/docs/font-family
          //   For convenience, Preflight sets the font family on the html element to match your
          //   configured sans font, so one way to change the default font for your project is to
          //   customize the sans key in your fontFamily configuration. See URL above for other
          //   approaches.
          //
          // The serif: [], and mono: [] are still implicitly applied.
          //
          ///////////////////////////////////////////////////////////////////////////
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
        // The serif and mono will stil be implied if ommitted.
        // serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        // mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
      }

      ///////////////////////////////////////////////////////////////////////////
      //
      // Note: you can do this sort of thing:
      //
      // boxShadow: ({ theme }) => {
      //   return {
      //     'focus-green': `0 0 0 0.25rem ${theme('colors.green.500 / 50%')}`,
      //     ...
      //   }
      // }
      //
      // But there's actually an easier way. The theme() function can actually exist
      // inside of a string WITHOUT template literals:
      //
      // boxShadow: {
      //   'focus-green': "0 0 0 0.25rem theme('colors.green.500/50%')",
      // }
      //
      // Of course, we can still make this even better by doing programmatically.
      // In that case, we would probably need to use the function syntax instead.
      // See here for other box-shadow ideas: https://manuarora.in/boxshadows
      //
      ///////////////////////////////////////////////////////////////////////////
    }
  },

  safelist: [],

  plugins: [
    colorVarsPlugin,
    basePlugin,
    badgePlugin,
    buttonPlugin,
    alertPlugin,
    listGroupPlugin,
    spinnerPlugin,
    tabsPlugin,
    tablePlugin,
    modalPlugin,
    tooltipPlugin,
    popoverPlugin,
    dropdownPlugin,
    scrollAreaPlugin,
    accordionPlugin,
    formPlugin,
    readMorePlugin,
    placeholderPlugin,
    offCanvasPlugin,
    paginationPlugin,
    breadcrumbPlugin
  ]
}

export default config

/* ======================
        twMerge()
====================== */
///////////////////////////////////////////////////////////////////////////
//
// https://github.com/epicweb-dev/epic-stack/issues/301
// https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/api-reference.md#extendtailwindmerge
//
// It looks like twMerge does not read your tailwind config so you have to manually
// configure it whenever you have custom classes (like 'text-xxs' or possibly also olive color, etc).
// It's not immediately clear where to find the classGroups keys, but you can view DefaultClassGroupIds here:
// https://github.com/dcastil/tailwind-merge/blob/main/src/lib/types.ts
//
// Thus far, I have not experienced any issues with custom colors (e.g., 'olive', 'brown'), or custom shadows.
// However, if that occurs, the solution would be to add them to the mapping here.
//
// Iniitially, the issue I experience was when I tried using 'text-xxs', it ended up dropping 'text-white'.
// This likely occurred becuase twMerge() got confuses because it thought 'text-white' conflicted with 'text-xxs'.
// However, in the case of color variants like 'bg-*-*', 'text-*-*', 'border-*-*', it may be less ambiguous such
// that tailwind-merge is able to discern if/when there is a conflict more accurately. That's just a guess...
//
// There's actually a lot of nuance and depth to how tailwind-merge works.
// For further reading on how it checks for conflicts see here:
//
//   - https://github.com/dcastil/tailwind-merge/discussions/278
//   - https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/configuration.md#theme
//
///////////////////////////////////////////////////////////////////////////

export const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': Object.keys(config.theme.extend.fontSize).map(
      (key) => `text-${key}`
    )
  }
})
