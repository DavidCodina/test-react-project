import { Fragment } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router, RouterFallback } from './router'

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
//# feature-4:

//# Review pre-push hook!

//# Create a pre-merge-commit hooks that works similar to pre-commit.

//# ❓ Implement use-context-selector on AppContext and maybe also ThemeContext.

//# Add React Image Preview (I think latest is in Next eCommerce), React Skeleton, withUnmounter, etc.

//# Add JSON Placeholder Fake API or Mirage https://miragejs.com

//# Add Switch, InputPhone, & React Date Picker (and/or ShadCDN).

// Review: https://www.youtube.com/watch?v=kvOp1jffVKE

function App() {
  return (
    <Fragment>
      <RouterProvider router={router} fallbackElement={<RouterFallback />} />
    </Fragment>
  )
}

export default App
