import { Fragment } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

///////////////////////////////////////////////////////////////////////////
//
// For styled-components css prop to work do this:
// https://styled-components.com/docs/tooling#babel-plugin
// npm install --save-dev babel-plugin-styled-components
// Then add this to a .babelrc: "plugins": ["babel-plugin-styled-components"]
// Then add this line once to App.tsx : import type {} from 'styled-components/cssprop'
//
// However, with Vite, you also need to: npm i vite-plugin-babel-macros
// and do this in vite.config.ts
//
//   import macrosPlugin from 'vite-plugin-babel-macros'
//
//   export default defineConfig({
//     plugins: [react(), macrosPlugin()]
//   })
//
// Finally, in any component that you want to implement the css={``} prop, do this:
// import 'styled-components/macro' // e.g., import styled from 'styled-components/macro'
//
// Update: That approach no longer works. Uninstall vite-plugin-babel-macros, and the implementation
// in vite.config.ts. Instead just do this: https://github.com/vitejs/vite/discussions/4098
//
//   react({
//     babel: {
//       plugins: ['styled-components'],
//       babelrc: false,
//       configFile: false
//     }
//   }),
//
// 'styled-components/macro' no longer exists, but we don't need it.
//
///////////////////////////////////////////////////////////////////////////
import type {} from 'styled-components/cssprop'

/* ========================================================================

======================================================================== */
//# ❓ Implement use-context-selector on AppContext and maybe also ThemeContext.
//# ❓ Move SimpleCollapse to components directory.

//# ❓ Test MSW implentation.
//# ❓ Build out the side navigation.
//# ❓ Vitest deep dive
//# ❓ PrivateRoutes: Note: I have since updated mern-stack-project, so use that as a model, what is here.

//# Add React Image Preview (I think latest is in Next eCommerce), React Skeleton, withUnmounter, etc.
//# Add Some Cypress
//# Add React Query.
//# Add JSON Placeholder Fake API or Mirage https://miragejs.com

//# Use this to create a new react-hook-form demo.
//# Storybook 7 deep dive

//# RTL deep dive
//# Add 1-2 storybook addons.
//# Add Switch, InputPhone, & React Date Picker (and/or ShadCDN).

//#  https://reactrouter.com/en/main/start/overview
// Validation error status: 422

// Review: https://www.youtube.com/watch?v=kvOp1jffVKE

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default App
