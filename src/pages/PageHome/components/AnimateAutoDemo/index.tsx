// Third-party imports
import { ComponentProps, Fragment, useState, useEffect } from 'react'

// Custom imports
import { Button } from 'components'

interface ICollapse extends ComponentProps<'div'> {
  duration?: number
  show: boolean
}

/* ========================================================================
                              SimpleCollapse
======================================================================== */
// https://www.youtube.com/watch?v=B_n4YONte5A
// https://keithjgrant.com/posts/2023/04/transitioning-to-height-auto/#:~:text=For%20this%20approach%2C%20wrap%20the,max%2Dheight%20work%20inside%20flexbox.
// At it's core this solution is all CSS.
// However, we don't actually want the content container to remain overflow:hidden in it's open state.
// Why? Because then we couldn't apply shadows, or ever use anything that would otherwise pop out
// of the container like a dropdown, etc. Thus, a useEffect() has been added to conditionally
// add/remove this.

//# I think the Keith Grant article also has a flexbox version...

const SimpleCollapse = ({
  children,
  className = '',
  duration = 300,
  show = false,
  style = {},
  ...otherProps
}: ICollapse) => {
  const [contentStyle, setContentStyle] = useState(() => {
    if (show) {
      return {}
    }
    return {
      overflow: 'hidden'
    }
  })

  /* ======================
         useEffect()
  ====================== */

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setContentStyle({})
      }, duration)
      return
    }
    setContentStyle({ overflow: 'hidden' })
  }, [duration, show])

  /* ======================
          return
  ====================== */

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'grid',
        transition: `grid-template-rows ${duration}ms linear`,
        gridTemplateRows: show ? '1fr' : '0fr'
      }}
      {...otherProps}
    >
      <div style={contentStyle}>{children}</div>
    </div>
  )
}

/* ========================================================================
                              AnimateAutoDemo
======================================================================== */

export const AnimateAutoDemo = () => {
  const [show, setShow] = useState(false)

  return (
    <Fragment>
      <Button
        className='btn-blue btn-sm mx-auto mb-4 block'
        //! color={show ? 'rose' : 'green'}
        onClick={() => {
          setShow((v) => !v)
        }}
      >
        {show ? 'Hide Content' : 'Show Content'}
      </Button>

      <SimpleCollapse
        className='mx-auto max-w-[600px]'
        duration={500}
        show={show}
        style={{}}
      >
        <div
          // The Collapse removes overlow:hidden after transitioning.
          // However, if you want to ensure that the shadow is shown even when
          // transitioning, then you can add margins.
          className={`
            mx-1
            mb-1
            rounded-lg 
            border bg-white
            p-2 px-4
            dark:border-[var(--tw-dark-primary-color)]
            dark:bg-[var(--tw-dark-bg-color)]
            ${show ? 'py-4' : 'py-1'}
            shadow-[0px_2px_3px_rgba(0,_0,_0,_0.15)]
          `}
          style={{
            transition: 'padding 500ms linear'
          }}
        >
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            similique facilis fugiat inventore quam dicta reprehenderit
            doloremque magni eligendi commodi, aut aliquid eos sit dolor earum
            distinctio iusto porro. Veritatis et ex explicabo similique corrupti
            voluptatibus qui, debitis consequatur natus reiciendis corporis
            magnam eos iusto ratione voluptatem deleniti sint. Deleniti
            cupiditate dolor, optio distinctio laudantium ipsum nulla molestiae
            deserunt omnis, nemo debitis, labore sint? Minima beatae, temporibus
            unde voluptatum omnis necessitatibus odio similique culpa officiis
            nostrum nam quasi nobis itaque ea possimus impedit quaerat magnam
            dignissimos velit corporis cumque, hic quas! Voluptas ducimus amet
            sunt vel non consectetur perferendis vitae!
          </p>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            similique facilis fugiat inventore quam dicta reprehenderit
            doloremque magni eligendi commodi, aut aliquid eos sit dolor earum
            distinctio iusto porro. Veritatis et ex explicabo similique corrupti
            voluptatibus qui, debitis consequatur natus reiciendis corporis
            magnam eos iusto ratione voluptatem deleniti sint. Deleniti
            cupiditate dolor, optio distinctio laudantium ipsum nulla molestiae
            deserunt omnis, nemo debitis, labore sint?
          </p>
        </div>
      </SimpleCollapse>
    </Fragment>
  )
}
