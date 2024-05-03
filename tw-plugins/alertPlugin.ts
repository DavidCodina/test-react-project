import plugin from 'tailwindcss/plugin'
// import { lightenDarkenColor } from './utils/lightenDarkenColor'

/* ========================================================================
                              alertPlugin
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Usage:
//
// <div className='alert-blue'>
//   <div className='alert-heading'>Heading</div>

//   <p className='mb-0 text-sm'>
//     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Necessitatibus error veniam unde accusamus laborum minus deserunt
//     nesciunt, <a href='#!' className='alert-link'>an example link</a>{' '}
//     enim optio tempore repudiandae deleniti perferendis, nihil in
//     accusantium labore eum quam eveniet neque. Quidem quo expedita alias
//     suscipit blanditiis obcaecati cumque quos esse, reprehenderit ullam,
//     soluta, ipsa dolorum accusamus animi mollitia sint voluptate minima
//     aliquid iste magni. Obcaecati sed beatae facere itaque amet vero.
//   </p>
//   <button type='button' className='alert-btn-close'></button>
// </div>
//
// I think that the alertPlugin is so basic that it doesn't warrant actually
// creating an <Alert /> component on top of it.
//
///////////////////////////////////////////////////////////////////////////

export const alertPlugin = plugin(function (pluginApi) {
  // Here we can create a plugin using addBase, addComponents, or addUtilities.
  const { addComponents, theme } = pluginApi

  const colors = theme('colors')
  type Colors = typeof colors

  function createAlertClasses(colors: Colors) {
    if (!colors) {
      return
    }

    return Object.keys(colors).reduce((alertClasses, colorKey) => {
      const value = colors[colorKey]

      if (typeof value !== 'object') {
        return alertClasses
      }

      const defaultStyles = {
        [`.alert-${colorKey}`]: {
          backgroundColor: theme(`colors.${colorKey}.50`),
          border: `1px solid ${theme(`colors.${colorKey}.500`)}`,
          borderRadius: '0.5em', // Initially used `${theme('borderRadius.lg')}`, but em is is better because it scales.
          // boxShadow: `0 2px 2px theme('colors.${colorKey}.500/35%')`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          color: theme(`colors.${colorKey}.700`),

          fontSize: theme('fontSize.base'),
          padding: '1em', // Initially used `${theme('spacing.4')}`, but em is more fluid.
          position: 'relative',
          display: 'flex',
          gap: '1em',
          '&:before': {
            content: "''",
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            borderLeft: `5px solid ${theme(`colors.${colorKey}.500`)}`,
            borderTopLeftRadius: 'inherit',
            borderBottomLeftRadius: 'inherit'
          }
        }
      }

      const newAlertClass = defaultStyles

      return { ...alertClasses, ...newAlertClass }
    }, {})
  }

  const alertClasses = createAlertClasses(colors)

  // Will log to terminal not browser: console.log(badgeClasses)
  // Because this is being added as a comonent, we can still overwrite it with utility classes.
  addComponents({
    '.alert-heading': {
      fontWeight: theme('fontWeight.bold')
    },

    ///////////////////////////////////////////////////////////////////////////
    //
    // Initially, I did this inside of createAlertClasses():
    //
    //   [`.alert-${colorKey} .alert-link`]: { ... }
    //
    // That's bad because the specificity of the selector will
    // conflict with Tailwind utility classes.
    //
    ///////////////////////////////////////////////////////////////////////////
    '.alert-link': {
      color: 'inherit',
      fontWeight: theme('fontWeight.semibold'),
      '&:focus': {
        outline: 'none'
      },
      '&:focus-visible': {
        borderRadius: theme('borderRadius.DEFAULT'),
        outline: '1.5px solid currentColor'
      },
      '&:hover': {
        color: 'inherit'
      }
    },

    // Rather than using .btn-close a custom close icons was made.
    // .btn-close relies on a data url to create the X, which means it
    // can't really be colored easily. This version uses borders which means
    // it will be colored according to the currentColor.
    '.alert-btn-close': {
      background: 'transparent',
      borderRadius: theme('borderRadius.DEFAULT'),
      width: '24px',
      height: '24px',
      position: 'absolute',
      top: '5px',
      right: '5px',
      opacity: '0.65',
      '&:hover': {
        opacity: '1'
      },
      '&:focus-visible': {
        outline: '1.5px solid currentColor',
        opacity: '1'
      },

      '&:after': {
        content: "''",
        height: '100%',
        top: '0px',
        left: '50%',
        borderLeft: '4px solid currentColor',
        borderRadius: '10px',
        position: 'absolute',
        transform: 'translateX(-50%) rotate(45deg)'
      },
      '&:before': {
        content: "''",
        height: '100%',
        borderLeft: '4px solid currentColor',
        borderRadius: '10px',
        position: 'absolute',
        transform: 'translateX(-50%) rotate(-45deg)',
        top: '0px',
        left: '50%'
      }
    },

    ...alertClasses
  })
})
