type Callback = (message: string) => string

export const fireCallback = (message: string, callback: Callback) => {
  return callback?.(message)
}
