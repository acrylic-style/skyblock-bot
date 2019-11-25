const fs = require('fs').promises
const FILE = `${__dirname}/../cache.json`

/**
 * Provides static cache methods.
 */
class Cache {
  async checkFile() {
    if (!fs.stat(FILE)) await fs.writeFile(FILE, '{}')
  }

  static async getCacheData() {
    await this.checkFile()
    return JSON.parse(await fs.readFile(FILE, 'utf-8'))
  }

  /**
   * Set cache data. It will override existing value if it already found.
   * @param {string} key
   * @param {any} value any value
   * @param {number} expiresAfter in milliseconds
   */
  static async setCache(key, value, expiresAfter) {
    const data = await Cache.getCacheData()
    data[key] = { value, expiresAfter: Date.now() + expiresAfter }
    return await fs.writeFile(FILE, JSON.stringify(data))
  }

  /**
   * Invalidates cache.
   * @param {string} key 
   */
  static async invalidateCache(key) {
    const data = await Cache.getCacheData()
    delete data[key]
    return await fs.writeFile(FILE, JSON.stringify(data))
  }

  /**
   * Get cache value.
   * To check if it exists, use Cache#exists(key).
   * @param {string} key 
   * @returns {Promise<any>} cache if found null otherwise
   */
  static async getCache(key) {
    const data = (await Cache.getCacheData())[key]
    if (data && data.expiresAfter < Date.now()) await Cache.invalidateCache(key)
    return data ? data.value : null
  }

  /**
   * Checks if key exists in the cache.
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  static async exists(key) {
    const data = (await Cache.getCacheData())[key]
    if (data && data.expiresAfter < Date.now()) await Cache.invalidateCache(key)
    return !!(await Cache.getCacheData())[key] // response: nO
  }

  /**
   * Deletes all cache even if their expire date hasn't elapsed yet.
   */
  static async clearCache() {
    return await fs.writeFile(FILE, '{}')
  }
}

module.exports = Cache
