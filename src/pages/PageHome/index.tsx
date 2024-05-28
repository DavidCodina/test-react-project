import { useTitle } from 'hooks'
import { HR, Waves, Ribbon, Page, Container } from 'components'

/* ========================================================================
                                PageHome
======================================================================== */

const PageHome = () => {
  useTitle('Home')

  /* ======================
          return
  ====================== */

  return (
    <Page>
      <Waves />

      <Container>
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

        <HR style={{ marginBottom: 50 }} />

        <div
          style={{
            margin: '0 auto',
            height: 200,
            position: 'relative',
            width: 300,
            backgroundColor: '#fff',
            border: '1px solid #333',
            borderRadius: 5
          }}
        >
          <Ribbon>Demo</Ribbon>
        </div>

        {/* <Alert className='alert-blue mx-auto mb-12 max-w-2xl flex-col'>
          <div className='text-center'>
            <strong> VITE_SECRET:</strong> {import.meta.env.VITE_SECRET}
          </div>

          <div className='text-center'>
            <strong>MODE:</strong> {import.meta.env.MODE}
          </div>

          <div className='text-center'>
            <strong> DEV:</strong> {import.meta.env.DEV ? 'true' : 'false'}
          </div>

          <div className='text-center'>
            <strong>PROD:</strong> {import.meta.env.PROD ? 'true' : 'false'}
          </div>
        </Alert> */}
      </Container>
    </Page>
  )
}

export default PageHome
