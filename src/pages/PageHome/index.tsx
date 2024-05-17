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
        <HR style={{ marginBottom: 50 }} />

        {/* <PaginatedListDemo /> */}

        {/* https://www.codesdope.com/blog/article/add-impressive-reflection-effects-using-only-css/ 
        https://css-tricks.com/creating-realistic-reflections-with-css/
        This is cool and all, but it's very difficult to get the values to line up as you 
        resize the text.
        

        <div className='relative mt-[50px] flex justify-center'>
          <h1 className='text-5xl font-black leading-none text-[#409]'>
            Hello!
          </h1>
          <h1
            className='text-5xl font-black leading-none text-[#409]'
            style={{
              position: 'absolute',
              top: '48%',
              transform: 'scaleY(-0.5) translateX(16%) skew(-55deg)',

              WebkitMaskImage:
                'linear-gradient(transparent 15%, rgba(0,0,0,0.9) 100%)'
            }}
          >
            Hello!
          </h1>
        </div>
        */}

        {/* <section
          // bg-clip-padding'
          className='my-6'
          style={{
            borderRadius: 25,
            border: '1px solid black',

            // If you use boxShadow on the outer container, then
            // borderRadius: 'inherit' will work correctly without gap
            // on the inner container.
            // boxShadow: '0px 0px 0px 1px black',

            backgroundColor: '#fff'
          }}
        >
          <div
            className='h-[200px]'
            style={{
              position: 'relative',

              // Here the borderRadius would need to be that of the parent - the
              // width of the parent's border.
              borderRadius: 24,
              backgroundColor: 'var(--tw-lime-500)'
            }}
          ></div>
        </section> */}

        {/* <div
          // left-2/4 -translate-x-2/4
          className='fixed left-2/4 w-full max-w-[clamp(0px,_1000px,_calc(100vw_-_50px))] -translate-x-2/4 rounded border border-neutral-400 bg-white p-4'
          // style={{ maxWidth: 'clamp(0px, 1000px, calc(100vw - 50px))' }}
        >
          <h5 className='font-black text-blue-500'>MinMax Container:</h5>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            consectetur labore id ratione alias accusantium soluta facilis magni
            voluptates quos, quae, officia rem eos, suscipit sit laborum magnam
            voluptas assumenda beatae. Quo reiciendis excepturi tempora,
            incidunt eligendi animi vel assumenda illum nostrum. Mollitia
            maiores dolorum cum autem voluptatibus eius omnis temporibus harum
            quasi vel hic culpa, ratione numquam reprehenderit adipisci est
            tenetur illum porro similique! Ipsum necessitatibus vel at nam esse
            enim dignissimos, non quod illo. Aliquid praesentium ex animi fugit!
            Magni, minima. Incidunt, similique obcaecati nulla dolorum harum
            quia aliquid tempora qui esse culpa! Quos voluptatem tempora
            officiis ratione?
          </p>
        </div> */}

        {(() => {
          const winnersPercent = 75
          const losersPercent = 100 - winnersPercent
          return (
            <section className='mb-6 flex justify-center'>
              <div className='inline-flex h-[400px] items-end gap-4 rounded-xl border border-gray-400 bg-white px-4 pt-4 shadow-lg'>
                <div
                  className='h-full rounded-t border border-green-700 bg-green-500'
                  style={{ height: `${winnersPercent}%` }}
                >
                  <div className='p-2 text-center font-bold text-white'>
                    Winners ({winnersPercent}%)
                  </div>
                </div>
                <div
                  className='h-full rounded-t border-red-700 bg-red-500'
                  style={{ height: `${losersPercent}%` }}
                >
                  <div className='p-2 text-center font-bold text-white'>
                    Losers ({losersPercent}%)
                  </div>
                </div>
              </div>
            </section>
          )
        })()}

        {/* <article className='rounded-lg border border-gray-500 bg-white p-4 shadow-lg'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
            accusantium, molestiae et blanditiis dicta autem. Impedit voluptate
            officia excepturi reprehenderit! Quo veniam omnis pariatur
            exercitationem aut totam!{' '}
            <Anchor
              // disabled
              className='font-semibold text-pink-500 hover:text-pink-600'
              underline='hover'
              href='https://www.google.com/'
              onClick={() => {
                alert('Note: onClick disables the href.')
              }}
            >
              google.com
            </Anchor>{' '}
            Ipsam accusamus dolorem obcaecati perferendis animi autem doloremque
            nobis. Quas impedit incidunt perspiciatis, dolorem qui fugiat
            asperiores saepe eligendi temporibus, cum consectetur deleniti?
          </p>

          <Anchor
            // disabled
            className='btn-green btn-sm mx-auto table'
            underline='never'
            href='https://www.google.com'
          >
            google.com
          </Anchor>
        </article> */}

        {/*}
        <div className='mb-6 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-violet-800 bg-white p-4'>
          <span className='badge-red hover:badge-green'>Red Badge</span>
          <span className='badge-orange'>Orange Badge</span>
          <span className='badge-amber'>Amber Badge</span>
          <span className='badge-yellow'>Yellow Badge</span>
          <span className='badge-lime'>Lime Badge</span>
          <span className='badge-green'>Green Badge</span>
          <span className='badge-emerald'>Emerald Badge</span>
          <span className='badge-teal'>Teal Badge</span>
          <span className='badge-cyan'>Cyan Badge</span>
          <span className='badge-sky'>Sky Badge</span>
          <span className='badge-blue'>Blue Badge</span>
          <span className='badge-indigo'>Indigo Badge</span>
          <span className='badge-violet'>Violet Badge</span>
          <span className='badge-purple'>Purple Badge</span>
          <span className='badge-fuchsia'>Fuchsia Badge</span>
          <span className='badge-pink'>Pink Badge</span>
          <span className='badge-rose'>Rose Badge</span>
          <span className='badge-brown'>Brown Badge</span>

          <span className='badge-slate'>Slate Badge</span>
          <span className='badge-gray'>Gray Badge</span>
          <span className='badge-zinc'>Zinc Badge</span>
          <span className='badge-neutral'>Neutral Badge</span>
          <span className='badge-stone'>Stone Badge</span>
        </div> */}

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

        {/* <div className='alert-pink mb-6'>
          <div className='alert-heading'>Heading</div>

          <p className='mb-0 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus error veniam unde accusamus laborum minus deserunt
            nesciunt,{' '}
            <a href='#!' className='alert-link'>
              an example link
            </a>{' '}
            enim optio tempore repudiandae deleniti perferendis, nihil in
            accusantium labore eum quam eveniet neque. Quidem quo expedita alias
            suscipit blanditiis obcaecati cumque quos esse, reprehenderit ullam,
            soluta, ipsa dolorum accusamus animi mollitia sint voluptate minima
            aliquid iste magni. Obcaecati sed beatae facere itaque amet vero.
          </p>

          <button type='button' className='alert-btn-close'></button>
        </div> */}

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

        {/* <div className='flex items-center justify-center'>
          <ExpandableCard
            className='mx-auto max-w-[400px]'
            // setParentHeight={true}
            title='Framer Motion 🚀'
            style={{
              // Multiple box shadows don't seem to work well with the layout scaling.
              //# One way around this would be to hide the box-shadow entirely during the
              //# animation.
              boxShadow: '0px 0px 0px 1px #409',
              borderRadius: 8
            }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
              quae amet quia assumenda qui omnis facilis cupiditate mollitia
              inventore consequatur veniam autem vel illo natus sed...
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
              quae amet quia assumenda qui omnis facilis cupiditate mollitia
              inventore consequatur veniam autem vel illo natus sed...
            </p>
          </ExpandableCard>
        </div> */}

        {/* <ExpandableCard.Container className=''>
          <ExpandableCard
            className='mx-auto max-w-[400px]'
            setParentHeight={true}
            title='Framer Motion 🚀'
            style={{
              // Multiple box shadows don't seem to work well with the layout scaling.
              //# One way around this would be to hide the box-shadow entirely during the
              //# animation.
              boxShadow: '0px 0px 0px 1px #409',
              borderRadius: 8
            }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
              quae amet quia assumenda qui omnis facilis cupiditate mollitia
              inventore consequatur veniam autem vel illo natus sed...
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla,
              quae amet quia assumenda qui omnis facilis cupiditate mollitia
              inventore consequatur veniam autem vel illo natus sed...
            </p>
          </ExpandableCard>
        </ExpandableCard.Container> */}

        {/* Quasi Masonry */}

        {/* <section className='grid grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-3'>
          <ul className='space-y-6'>
            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              This was a pattern used on the official Tailwind page. It's a
              quasi-masonry grid. Quam rem aspernatur tempore eos error esse!
              Quis inventore nostrum saepe deleniti illum fugiat accusantium
              tempore adipisci aperiam vitae, ullam quo sunt voluptates,
              dolores, id laborum...
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur!
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur! Alias sint explicabo reprehenderit
              laboriosam nihil illum praesentium itaque molestias illo quo,
              dolor ullam maxime? Facilis distinctio ullam ipsum placeat
              repellat praesentium error odio atque ipsam! Earum suscipit magni
              nam nemo quisquam itaque nihil saepe, recusandae similique.
            </li>
          </ul>

          <ul className='space-y-6'>
            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur! Alias sint explicabo reprehenderit
              laboriosam nihil illum praesentium itaque molestias illo quo,
              dolor ullam maxime? Facilis distinctio ullam ipsum placeat
              repellat praesentium error odio atque ipsam!
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur! Alias sint explicabo reprehenderit
              laboriosam nihil illum praesentium itaque molestias illo quo,
              dolor ullam maxime?
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur!
            </li>
          </ul>

          <ul className='space-y-6'>
            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum.
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur!
            </li>

            <li className='rounded-lg border border-stone-300 bg-white p-4 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nihil magni velit itaque nam! Quam rem aspernatur tempore eos
              error esse! Quis inventore nostrum saepe deleniti illum fugiat
              accusantium tempore adipisci aperiam vitae, ullam quo sunt
              voluptates, dolores, id laborum. Debitis quis repudiandae cum,
              provident dolore saepe velit explicabo dolorum officiis mollitia
              rem laborum quaerat nesciunt iusto expedita sint error vero
              cupiditate consequatur! Alias sint explicabo reprehenderit
              laboriosam nihil illum praesentium itaque molestias illo quo,
              dolor ullam maxime? Facilis distinctio ullam ipsum placeat
              repellat praesentium error odio atque ipsam! Earum suscipit magni
              nam nemo quisquam itaque nihil saepe, recusandae similique.
            </li>
          </ul>
        </section> */}
      </div>
    </div>
  )
}

export default PageHome
