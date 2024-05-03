// Third-party imports
import { useNavigate } from 'react-router-dom'

// Custom imports
import { useTitle } from 'hooks'
import { Button, HR, Title } from 'components'

/* ========================================================================
                              PageUnauthorized
======================================================================== */

const PageUnauthorized = () => {
  useTitle('Not Authorized')
  const navigate = useNavigate()

  /* ======================
        renderContent
  ====================== */

  const renderContent = () => {
    return (
      <div className='mx-auto w-full flex-1 p-6 2xl:container'>
        <Title
          color='#FF355E'
          style={{
            textAlign: 'center'
          }}
        >
          Not Authorized
        </Title>

        <div className='mb-8 flex justify-center gap-4'>
          <Button
            onClick={() => {
              navigate('/', {
                replace: true
              })
            }}
            style={{ position: 'absolute', top: 15, left: 15 }}
            className='btn-red btn-sm'
          >
            Go Home
          </Button>
        </div>

        <HR color='#FF355E' style={{ marginBottom: 50 }} />

        <div className='mx-auto' style={{ width: '40%' }}>
          <svg
            style={{
              margin: '0 auto',
              width: '100%',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))'
            }}
            viewBox='0 0 512 512'
            fill='#FF355E'
          >
            <path
              d='M296.606,364.393l-29.999-30c-5.857-5.858-15.355-5.858-21.213,0l-30,30C205.985,373.801,212.646,390,226,390H286
              C299.304,390,306.05,373.836,296.606,364.393z'
            />

            <path
              d='M165.999,179.997c-41.355,0-75.001,33.645-75.001,75.001c0,41.355,33.645,75.001,75.001,75.001S241,296.354,241,254.997
              C241,213.642,207.354,179.997,165.999,179.997z M165.999,300.198c-24.813,0-45.2-20.387-45.2-45.2s20.387-45.2,45.2-45.2
              s45.2,20.387,45.2,45.2S190.812,300.198,165.999,300.198z'
            />

            <path
              d='M346.001,179.997c-41.355,0-75.001,33.645-75.001,75.001c0,41.355,33.645,75.001,75.001,75.001
              c41.355,0,75.001-33.645,75.001-75.001S387.356,179.997,346.001,179.997z M346.001,300.198c-24.813,0-45.2-20.387-45.2-45.2
              s20.387-45.2,45.2-45.2s45.201,20.387,45.201,45.2S370.814,300.198,346.001,300.198z'
            />

            <path
              d='M476.108,270.988c15.607-74.732-7.02-151.096-61.007-205.086v-0.001C372.602,23.404,316.099,0,256,0
              C195.901,0,139.398,23.404,96.898,65.902c-53.869,53.87-76.716,130.182-61.007,205.091c-6.143,17.917-6.485,37.065-0.951,55.682
              c9.404,31.617,35.56,54.97,68.461,61.251c3.795,1.08,4.018,0.017,11.46,1.242c2.047,0.337,4.001,0.621,6.139,0.763L121,447.954
              c0,18.193,10.705,34.432,27.272,41.369c24.699,10.343,63.434,22.671,107.706,22.675c0.008,0,0.015,0.001,0.023,0.001
              c0.008,0,0.016-0.001,0.023-0.001c44.269-0.004,83.006-12.333,107.709-22.676c16.565-6.938,27.269-23.176,27.269-41.367v-58.095
              c2.077-0.139,4.014-0.403,6.046-0.714c7.929-1.213,8.245-0.09,12.239-1.437c32.914-6.607,58.868-30.138,68.004-61.833
              C482.584,307.52,482.162,288.646,476.108,270.988z M448.465,317.568c-6.117,21.222-23.856,36.907-46.311,40.962
              c-12.258,0.374-10.552,2.829-23.167,0.267c-9.289-1.887-17.985,5.224-17.985,14.7v74.458c0,6.066-3.477,11.442-8.856,13.696
              c-5.484,2.296-12.864,4.862-21.343,7.605v-32.457c0-8.284-6.516-14.8-14.8-14.8c-8.284,0-15,6.716-15,15v40.324
              c-9.389,1.89-19.669,3.176-30.2,3.93V436.8c0-8.284-6.516-14.8-14.8-14.8c-8.284,0-15,6.716-15,15v44.453
              c-10.531-0.753-20.811-2.44-30.2-4.329V436.8c0-8.284-6.516-14.8-14.8-14.8s-15,6.716-15,15v32.457
              c-8.478-2.743-15.658-5.509-21.141-7.805c-5.382-2.254-9.059-7.83-9.059-13.897l0.002-74.45c0-9.462-8.482-16.39-17.784-14.501
              c-13.377,2.716-10.435,0.035-23.659-0.285c-21.986-4.08-39.448-19.506-45.661-40.396c-4.049-13.621-3.459-27.605,1.707-40.441
              c1.144-2.843,1.39-5.968,0.705-8.954c-15.458-67.379,5.15-134.755,52.005-181.612C154.945,50.284,203.914,29.8,256,29.8
              s101.055,20.483,137.887,57.314c47.708,47.711,67.151,115.603,52.006,181.611c-0.685,2.987-0.439,6.112,0.705,8.954
              C451.693,290.339,452.338,304.132,448.465,317.568z'
            />
          </svg>
        </div>
      </div>
    )
  }

  /* ======================
          return
  ====================== */

  return renderContent()
}

export default PageUnauthorized
