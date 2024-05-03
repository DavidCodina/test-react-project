// Third-party imports
import axios from 'axios'

/* ======================
      getPost() 
====================== */

export const getPost = async (postId?: string) => {
  try {
    // await import('utils')
    //   .then(async (module) => {
    //     module.log('Sleeping for three seconds...')
    //     await module.sleep(3000)
    //     return
    //   })
    //   .catch((err) => err)

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    )

    return {
      data: res.data,
      success: true,
      message: 'Request success!',
      status: res?.request?.status || 200
    }
  } catch (err: any) {
    //# Update this to use the utility function...
    return {
      data: null,
      success: false,
      message: 'Request failed!',
      status: err?.request?.status || 500
    }
  }
}
