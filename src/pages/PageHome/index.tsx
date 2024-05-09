import { useTitle } from 'hooks'
import { HR, Waves } from 'components'
import { useThemeContext } from 'contexts'
import { twMerge } from 'tailwind.config'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ======================
  tailwind-merge demo
====================== */

///////////////////////////////////////////////////////////////////////////
//
// https://www.youtube.com/@Simonswissdev/videos
//
// Suppose that we have a custom BTN component which internally uses:
//
//   className='rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 active:bg-emerald-600'
//
// However, in one specific instance of BTN, we need it to have .rounded-full (pill) instead
// of .rounded-lg. Essentially, you want to override the default styles.
// One solution would be to use a custom mergeClasses() function.
//
//   const mergeClasses = (...classes: string[]) => {
//     return classes.filter(Boolean).join(' ')
//   }
//
//   const BTN = ({ children, className = '', ...otherProps }: any) => {
//     return (
//       <button
//         className={mergeClasses(
//           'rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 active:bg-emerald-600',
//           className
//         )}
//         {...otherProps}
//       >
//         {children}
//       </button>
//     )
//   }
//
// This seems like it works, but there's a hidden gotcha. If we look at the rendered HTML in the DOM,
// we see that it has both .rounded-lg AND .rounded-full. In this case, it worked because .rounded-full
// has precedence over .rounded-lg (i.e., comes later in cascase) . However, if the situation were reversed and we wanted to overwite
// .rounded-full with .rounded-lg it wouldn't work. Basically, the two classes are conflicting and
// our mergeClasses function is not smart enough to replace one with the other.
//
// <button class="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 active:bg-emerald-600 rounded-full">
//   Click Me
// </button>
//
// Incidentally, the same thing would happen if we were using clsx. The big difference
// with tailwind-merge is that tailwind-merge will merge the classes without style
// conflicts. In other words it will determine when there are conflicting classes, and
// always favor the one that was passed last, while the other will be removed.
//
// Note: this will not work on non-tailwind classes. However, it DOES support arbitrary values.
// And arbitrary values support CSS Custom Properties, so in theory you could do something like:
//
//   <BTN className='rounded-full bg-[var(--xx-red)]'>Click Me</BTN>
//
// This is super cool because even though you can't overwrite with non-tailwind classes, you
// can overwrite with your app's CSS :root variables.
//
///////////////////////////////////////////////////////////////////////////

const _BTN = ({ children, className = '', ...otherProps }: any) => {
  return (
    <button
      className={twMerge(
        'rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-500 active:bg-emerald-600',
        className // It's important that this is passed last because the latter overwrites conflicts with the former.
      )}
      {...otherProps}
    >
      {children}
    </button>
  )
}

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Home')
  const { mode } = useThemeContext()

  /* ======================
          return
  ====================== */

  return (
    <div
      className={`
      mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      <Waves />

      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative', marginBottom: 24 }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textShadow:
                '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
              width: '100%',
              height: '100%'
            }}
          >
            Home
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Home
          </span>
        </h1>
        {/* <Title
          as='h1'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
          // className='dark:text-red-500'
          // color='red'
        >
          Home
        </Title> */}
        <HR style={{ marginBottom: 50 }} />\
        {/* 
        <Alert color='blue'>
          <Alert.Body>
            <div className='text-center'>
              VITE_SECRET: {import.meta.env.VITE_SECRET}
            </div>

            <div className='text-center'>MODE: {import.meta.env.MODE}</div>

            <div className='text-center'>
              DEV: {import.meta.env.DEV ? 'true' : 'false'}
            </div>

            <div className='text-center'>
              PROD: {import.meta.env.PROD ? 'true' : 'false'}
            </div>
          </Alert.Body>
        </Alert>
        */}
        {/* 
        <div className='flex items-center justify-center gap-2'>
          <div className='mb-2 flex justify-center'>
            <TWCounter />
          </div>

          <div className='mb-2 flex justify-center'>
            <SassCounter />
          </div>

          <div className='mb-2 flex justify-center'>
            <SCCounter />
          </div>

          <div className='mb-2 flex justify-center'>
            <SCBox />
          </div>
        </div>
        */}
      </div>
    </div>
  )
}

export default PageHome
