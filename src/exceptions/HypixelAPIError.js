class HypixelAPIError extends Error {
  constructor(message = null) {
    super(message)
    if (Error.captureStackTrace) Error.captureStackTrace(this, HypixelAPIError)
    this.name = 'HypixelAPIError'
    this.message = message
    this.date = new Date()
  }
}

module.exports = HypixelAPIError
