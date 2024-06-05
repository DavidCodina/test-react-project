import { useEffect, useState } from 'react'
import { Button } from 'components'
import { sleep } from 'utils'

const getUser = async (id: number) => {
  await sleep(3000)
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const json = await res.json()
    return {
      data: json,
      message: 'Success.',
      success: true
    }
  } catch (err) {
    return {
      data: null,
      message: 'Request failed.',
      success: false
    }
  }
}

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// This example is based off of the React docs:
// https://react.dev/reference/react/useEffect#fetching-data-with-effects
//
// It's also discussed in a Theo video around 12:45:
// https://www.youtube.com/watch?v=xIflplz925Y
// However, the point of that video is that doing this kind of thing,
// even when done correctly, is way too verbose, and using Tanstack
// Query is a much better approach. The other implication is that
// Tanstack Query also solves for the race condition problem.
//
// I actually don't often use this pattern because I don't normally have
// dpendencies like this that change so quickly. That said, it's a good
// idea to do it like this.
//
///////////////////////////////////////////////////////////////////////////
export const SafeUseEffectDemo = () => {
  const [id, setId] = useState<number>(1)
  const [data, setData] = useState<any>(null)
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('pending')

  /* ======================
         useEffect
  ====================== */

  useEffect(() => {
    let ignore = false
    setData(null)
    setStatus('pending')

    getUser(id)
      .then((result) => {
        if (!ignore) {
          if (result.success === true) {
            setData(result.data)
            setStatus('success')
          }
        } else {
          console.log(`ignore was true for user id: ${id}`)
        }

        return result
      })
      .catch((_err) => {
        setStatus('error')
      })

    ///////////////////////////////////////////////////////////////////////////
    //
    // Suppose an async call to get user 1 is made.
    // Each useEffect execution has its own ignore variable set to false initially.
    // Then we click the button below to get user 2.
    // This will trigger the cleanup function to run, which sets ignore to true.
    //
    // The important thing to note is that the ignore value is being set to true
    // specifically for the PREVIOUS execution. In other words, we're saying,
    // "Set ignore to true for the execution that was getting user 1."
    // This works because we're utilizing closures.
    //
    // Thus even if the result for user 1 comes in after the result for user 2,
    // we've already told the useEffect to ignore that result, (i.e., don't set it in state).
    //
    // By using the ignore variable and the cleanup function, the component ensures that only
    // the user data corresponding to the most recent userId state is rendered,
    // avoiding race conditions where outdated data might be displayed.
    //
    ///////////////////////////////////////////////////////////////////////////

    return () => {
      console.log('Cleanup function called.')
      ignore = true
    }
  }, [id])

  /* ======================
        renderData()
  ====================== */

  const renderData = () => {
    if (status === 'error') {
      return (
        <div className='mx-auto my-6 text-center text-3xl font-black text-red-500'>
          Error: Unable to get data.
        </div>
      )
    }

    if (status === 'pending') {
      return (
        <div className='mx-auto my-6 text-center text-3xl font-black text-blue-500'>
          Loading...
        </div>
      )
    }

    if (status === 'success' && typeof data === 'object') {
      return (
        <pre className='terminal mx-auto mb-4 max-w-4xl overflow-x-scroll rounded-xl bg-gray-800 p-2 text-xs text-green-500'>
          {JSON.stringify(data, undefined, 2)}
        </pre>
      )
    }

    return null
  }

  /* ======================
          return
  ====================== */

  return (
    <>
      <Button
        className='btn-blue btn-sm mx-auto mb-6 flex'
        onClick={() => setId((v) => v + 1)}
      >
        User ID: {id}
      </Button>

      {renderData()}
    </>
  )
}
