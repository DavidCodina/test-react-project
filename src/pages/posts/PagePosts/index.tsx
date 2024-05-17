// Third-party imports
import {
  useEffect
  // Suspense
} from 'react'
import {
  useLoaderData,
  useNavigate
  // See Academind video at 35:30 : https://www.youtube.com/watch?v=L2kzUg6IzxM
  // Await
} from 'react-router-dom'
import { toast } from 'react-toastify'

// Custom imports
import { useThemeContext } from 'contexts'
import { Button, HR } from 'components'

import { PostsLoaderData } from './loader'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                              PagePosts                  
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// Pros of using the loader feature:
//
// 1. You don't have to manually initialize the data fetching within a useEffect().
//
// 2. You don't have to manage any loading state because the page component only
//    renders once the data is available.
//
// 3. You don't necessarily have to check for errors. Instead you can pass the
//    associated <Route /> component an errorElement, which will render in place
//    of the page when an API request errors (i.e., goes to the catch block).
//    That said, such an approach seems kind of heavy handed. More than likey,
//    we wouldn't want to replace our ENTIRE page.
//
///////////////////////////////////////////////////////////////////////////

function PagePosts() {
  const navigate = useNavigate()
  // What if we needed to make multiple API requests?
  // What if we wanted to cache data?

  const loaderData = useLoaderData() as PostsLoaderData
  const { data: posts, success } = loaderData
  const { mode } = useThemeContext()

  /* ======================
        useEffect()
  ====================== */
  // Even though the React Router <Route errorElement={<PostErrorElement />} /> prop
  // makes it so this type of thing is no longer necessary, I still prefer catching
  // errors in the API function, then using this approach, rather than replacing the
  // ENTIRE page with an error boundary component when an uncaught error occurs.

  useEffect(() => {
    // Don't do !success because you may be dealing with a pending Promise
    if (success === false) {
      toast.error('Unable to get posts!')
    }
  }, [success])

  /* ======================
        renderPosts()
  ====================== */

  const renderPosts = () => {
    if (!Array.isArray(posts) || posts.length === 0) {
      return null
    }

    return (
      <ul
        className='mx-auto overflow-hidden rounded-xl border border-gray-500'
        style={{ fontSize: 12, maxWidth: 600 }}
      >
        {posts.map((post: any) => {
          return (
            <li
              className='border-b border-gray-500 last:border-none'
              key={post.id}
              style={{ cursor: 'pointer' }}
            >
              <div
                className='bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
                onClick={() => {
                  navigate(`/posts/${post.id}`)
                }}
                //# Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events)
                onKeyDown={(_e) => {
                  // console.log(e)
                }}
                role='button'
                tabIndex={0}
              >
                {post.title}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  /* ======================
          return
  ====================== */

  if (!mode) {
    return null
  }

  return (
    <div
      className={`
      mx-auto flex w-full flex-1 flex-wrap`}
      style={{
        backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
      }}
    >
      <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
        <h1
          className='text-center text-5xl font-black'
          style={{ position: 'relative' }}
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
            Posts
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            Posts
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        <Button
          className='btn-green btn-sm mx-auto mb-6 block'
          onClick={() => navigate('/posts/create')}
        >
          Create A Post
        </Button>

        {renderPosts()}
      </div>
    </div>
  )
}

/* =============================================================================
                                PagePostsDeferred
============================================================================= */
////////////////////////////////////////////////////////////////////////////////
//
// For the defer example make sure that you are using a loader that implements defer().
//
//   export const loader = (async (/* { context, params, request } */) => {
//     await LazyPagePosts.preload().then((component: any) => { return component })
//     return defer({ getPostsResponse: getPosts() })
//   }) satisfies LoaderFunction
//
// Additionally, getPosts() should implement some kind of sleep() function to
// make it slow:
//
//   await import('utils').then(async (module) => {
//     module.log('Sleeping for three seconds.')
//     await module.sleep(3000)
//     return
//   }).catch((err) => err)
//
// With those two steps in place, PagePosts will render immediately, and show the local
// Suspense fallback.
//
// Note: It's not technically necessary to use defer() with Await/Suspense.
// We probably (?) can use defer(), but then also wait until our response is
// defined, but at that point it's probably better to just implement a standard
// useEffect implementation.
//
////////////////////////////////////////////////////////////////////////////////

// function PagePostsDeferred() {
//   const { mode } = useThemeContext()
//   const navigate = useNavigate()
//   // What if we needed to make multiple API requests?
//   // What if we wanted to cache data?
//   const loaderData: any = useLoaderData()

//   /* ======================
//         renderPosts()
//   ====================== */

//   const renderPosts = () => {
//     return (
//       <>
//         <Suspense
//           fallback={
//             <h3 className='text-center font-black text-pink-500'>Loading...</h3>
//           }
//         >
//           <Await resolve={loaderData?.result} /* errorElement={} */>
//             {(result) => {
//               const { data } = result

//               if (!Array.isArray(data) || data.length === 0) {
//                 return null
//               }

//               return (
//                 <ul
//                   className='mx-auto overflow-hidden rounded-xl border border-gray-500'
//                   style={{ fontSize: 12, maxWidth: 600 }}
//                 >
//                   {data &&
//                     data.map((post: any) => {
//                       return (
//                         <li
//                           className='border-b border-gray-500 last:border-none'
//                           key={post.id}
//                           style={{ cursor: 'pointer' }}
//                         >
//                           <div
//                             className='bg-white p-2 text-center text-sm font-black text-blue-500 hover:bg-stone-100'
//                             onClick={() => {
//                               navigate(`/posts/${post.id}`)
//                             }}
//                             //# Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events)
//                             onKeyDown={(_e) => {
//                               // console.log(e)
//                             }}
//                             role='button'
//                             tabIndex={0}
//                           >
//                             {post.title}
//                           </div>
//                         </li>
//                       )
//                     })}
//                 </ul>
//               )
//             }}
//           </Await>
//         </Suspense>
//       </>
//     )
//   }

//   /* ======================
//           return
//   ====================== */

//   return (
//     <div
//       className={`
//       mx-auto flex w-full flex-1 flex-wrap`}
//       style={{
//         backgroundImage: mode === 'dark' ? darkBackgroundImage : backgroundImage
//       }}
//     >
//       <div className='relative mx-auto w-full flex-1 p-6 2xl:container'>
//         <h1
//           className='text-center text-5xl font-black'
//           style={{ position: 'relative' }}
//         >
//           <span
//             style={{
//               position: 'absolute',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               textShadow:
//                 '0px 0px 1px rgba(0,0,0,1), 0px 0px 1px rgba(0,0,0,1)',
//               width: '100%',
//               height: '100%'
//             }}
//           >
//             Posts (Slow)
//           </span>
//           <span
//             className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
//             style={{
//               position: 'relative'
//             }}
//           >
//             Posts (Slow)
//           </span>
//         </h1>
//         <HR style={{ marginBottom: 50 }} />

//         <Button
//           className='btn-green btn-sm mx-auto mb-6 block'
//           onClick={() => navigate('/posts/create')}
//         >
//           Create A Post
//         </Button>

//         {renderPosts()}

//         <div>Testing 123...</div>
//       </div>
//     </div>
//   )
// }

export default PagePosts
