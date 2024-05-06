// Third-party imports
import axios from 'axios'

/* ======================
      getPosts() 
====================== */
////////////////////////////////////////////////////////////////////////////////
//
// https://www.youtube.com/watch?v=L2kzUg6IzxM at 5:45
// The postsLoader function can be registered on our route definition. Usage:
//
//   <Route path='/posts' element={<PagePosts />} loader={pagePostsLoader} />
//
// React Router will now call this function whenever we navigate to this route.
// Then to access the data we use the useLoaderData() hook.
//
// Note: If you want to utilize errorElement={<ErrorElement />} in the <Route />
// Then create a API function that DOES NOT catch the error.
//
//   export const getPosts = async () => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
//     return { data: res.data, success: true, message: 'Request success!', status: res?.request?.status || 200 }
//   }
//
// The gotcha here is that we have to make sure we understand under what circumstances
// our API is going to send us back an error. If there are any circumstances in which
// we could get back a 200, but no data then that would be bad.
// See this Net Ninja video for examples of manually throwing an error:
// https://www.youtube.com/watch?v=n0Rvia8w7p0&list=PL4cUxeGkcC9iVKmtNuCeIswnQ97in2GGf&index=8
//
// That said, in the PagePosts component, I'm catching the error and handling it there.
//
///////////////////////////////////////////////////////////////////////////

export const getPosts = async () => {
  try {
    // await sleep(3000)

    const res = await axios.get(
      //'https://jsonplaceholder.typicode.com/posts?_limit=10'
      'https://jsonplaceholder.typicode.com/posts'
    )

    // Simulate slow API
    // await import('utils')
    //   .then(async (module) => {
    //     module.log('Sleeping for three seconds.')
    //     await module.sleep(3000)
    //     return
    //   })
    //   .catch((err) => err)

    return {
      data: res.data,
      success: true,
      message: 'Request success.'
    }
  } catch (err) {
    return {
      data: null,
      message: 'Request failed.',
      success: false
    }
  }
}
