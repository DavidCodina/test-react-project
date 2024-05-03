// Third-party imports
import { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

// Custom imports
import { Button, HR } from 'components'
import { useThemeContext } from 'contexts'

import { PostLoaderData } from './loader'
export * from './loader'

const backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23ddd6fe'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
const darkBackgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23083344'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`

/* ========================================================================
                                PagePost
======================================================================== */

function PagePost() {
  const { postId } = useParams()
  const { data: post, success } = useLoaderData() as PostLoaderData
  const [items, setItems] = useState<any>([])

  const { mode } = useThemeContext()

  /* ======================
        useEffect()
  ====================== */
  // Even though the React Router <Route /> errorElement prop,
  // makes it so this type of thing is no longer necessary, I
  // still prefer this approach, rather than replacing the
  // ENTIRE page with an error boundary component.

  useEffect(() => {
    if (!success) {
      toast.error('Unable to get post!')
    }
  }, [success])

  /* ======================
          return
  ====================== */

  const renderPost = () => {
    if (!post) {
      return null
    }

    return (
      <article
        className='mx-auto mb-6 rounded-lg border border-gray-500 bg-white p-3 text-sm'
        style={{ maxWidth: 800 }}
      >
        <h5 className='mb-6 font-bold text-blue-500'>{post.title}</h5>

        <p className='mb-0'>{post.body}</p>
      </article>
    )
  }

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
      {/* <Waves /> */}

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
            {postId ? `Post ${postId}` : 'Post'}
          </span>
          <span
            className='bg-gradient-to-r from-violet-700 to-sky-400 bg-clip-text text-transparent'
            style={{
              position: 'relative'
            }}
          >
            {postId ? `Post ${postId}` : 'Post'}
          </span>
        </h1>

        <HR style={{ marginBottom: 50 }} />

        {items.map(() => null)}

        {renderPost()}

        <article
          className='mx-auto mb-6 rounded-lg border border-gray-500 bg-white p-4 text-sm'
          style={{ maxWidth: 800 }}
        >
          <p>
            It's important to note that the <code>&#60;Route&#62;</code>'s'{' '}
            <code>ErrorElement</code> is not triggered <em>only</em> by an error
            thrown in the associated <code>loader</code> function. Rather, it's
            thrown whenever an error is caught.{' '}
            <strong>It's an error boundary</strong>. Thus, if we break the page
            here, it will also trigger the <code>ErrorElement</code>. This means
            that <code>errorElement</code> prop can be used with/without the{' '}
            <code>loader</code> prop.
          </p>

          <p>
            Fortunately, it's very easy to reset the boundary with either{' '}
            <code>navigate('/')</code> and/or <code>navigate(pathname)</code>
          </p>

          <Button
            className='btn-red btn-sm mx-auto block font-bold'
            onClick={() => {
              setItems(undefined)
            }}
            style={{ cursor: 'pointer', display: 'block', margin: '0 auto' }}
          >
            Break The Page!
          </Button>
        </article>
      </div>
    </div>
  )
}

export default PagePost
