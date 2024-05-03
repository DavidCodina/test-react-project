import { Meta, StoryObj } from '@storybook/react'
import { userEvent /* , waitFor */, within, expect, fn } from '@storybook/test'

import { TWCounter } from './index'

/* ======================
          meta
====================== */

const meta /* : Meta<typeof TWCounter> */ = {
  title: 'Components/TWCounter',
  component: TWCounter,

  args: {
    onClick: fn() // Use `fn` to spy on the onSubmit arg
  },
  argTypes: { onClick: { action: 'clicked' } },
  parameters: {
    componentSubtitle: 'An amazing TWCounter component!',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
    // docs: {  description: { component: `<div><p>...</p></div>` }},
  }
} satisfies Meta<typeof TWCounter>

export default meta

/* ======================
        Story
====================== */

type Story = StoryObj<typeof meta>

/* ======================
        Stories
====================== */

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// See https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
// to learn more about using the canvasElement to query the DOM

/** The default example... */
export const Default: Story = {
  args: {}
}

export const ClickTest: Story = {
  args: {},
  play: async ({ /* args, */ canvasElement, step }) => {
    // The step function can be used to create labeled groups of interactions.

    // canvas is similar to the use of screen in nomral vitest/jest testing.
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    ///////////////////////////////////////////////////////////////////////////
    //
    // There's an important detail that's different when using the Storybook wrapper:
    // method invocations must be await-ed. It allows you to step back and forth through
    // your interactions using the debugger. In other words, while it wouldn't normally
    // be necessary to wait the following explectations, doing so allows you to move
    // backward/forward using the play controls in the UI.
    //
    //   await expect(button).toBeInTheDocument()
    //   await expect(button).toHaveTextContent('Count: 0')
    //
    // While not technically necessary, we can also use the step method to group
    // logic. This is kind of like test() because it allows you to name the test.
    //
    ///////////////////////////////////////////////////////////////////////////

    await step('should be in document.', async () => {
      // However, in cases like this where there's one single line, we wouldn't need
      // to await it. That said, it's still a good practice when working with storbyook
      // interaction testing.
      await expect(button).toBeInTheDocument()
    })

    await step('should be correct text content.', async () => {
      await expect(button).toHaveTextContent('Count: 0')
    })

    await step(
      "should update button text to 'Count: 1' when clicked.",
      async () => {
        const user = userEvent.setup()
        await user.click(button)
        await expect(button).toHaveTextContent('Count: 1')
      }
    )
  }
}
