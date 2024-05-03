/* ========================================================================
                                FontIcon        
======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// For icons and their names go here:   https://fonts.google.com/icons
// For docs on the system go here:      https://developers.google.com/fonts/docs/material_symbols
// For info on font-variation-settings: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
// For info on ligatures:               https://fonts.google.com/knowledge/glossary/ligature
//
// The  new Material Symbols usse a typographic feature called ligatures,
// which allows rendering of an icon glyph simply by using its textual name.
//
// To get all icons do this in index.html:
//
// <link
//   href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
//   rel="stylesheet"
// />
//
// Usage:
//
//   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
//     est, amet architecto sunt enim alias quia aliquam consequuntur{' '}
//     <FontIcon weight={900} fill className='text-rose-500'>
//       star
//     </FontIcon>{' '}
//     repellat temporibus ipsa tenetur sint soluta deserunt cum temporevoluptatibus!
//   </p>
//
///////////////////////////////////////////////////////////////////////////

export const FontIcon = ({
  children,
  className = '',
  style = {},
  weight = 400,
  fill = false,
  size,
  color
}: any) => {
  const fontVariationSettings = `'FILL' ${
    fill ? 1 : 0
  }, 'wght' ${weight}, 'GRAD' 0, 'opsz' 48`

  if (size) {
    style.fontSize = size
  }

  if (color) {
    style.color = color
  }

  /* ======================
          return
  ====================== */
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
      style={{
        ///////////////////////////////////////////////////////////////////////////
        //
        // By default .material-symbols-outlined sets:
        //
        //   font-size: 24px;
        //   line-height: 1;
        //
        // We don't actually want to hardcode fontSize: 'inherit' here
        // because then the className won't be able to override it.
        //
        // The default style works quite well when the parent has:
        //
        //  font-size: 24px;
        //  line-height: 1.5;
        //
        // This is a common norm for paragraphs (e.g., Bootstrap styles, etc).
        // That said, it probably makes more sense to set the default font-size to
        //
        //   font-size: 1.5em;
        //
        // This way if you have a fluid font, it will scale accordingly.
        // The best place to do this is in the tailwind.config.js. If you
        // did it in main.css, then we'd run into the same issue that it
        // could potentially block Tailwind styling.
        //
        // We also don't want to set verticalAlign here, but I prefer it to default to
        // middle, so that should also be set in tailwind.config.js
        //
        ///////////////////////////////////////////////////////////////////////////

        ...style,
        fontVariationSettings: fontVariationSettings
      }}
    >
      {children}
    </span>
  )
}
