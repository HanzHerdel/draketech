
/**
 * FUNCTIONS
 */

/**
 * getCache
 * @client => The client of redis cache database
 * @key => The name of the document to search in redis
 * @transform => If it's true, return a JSON
 * @transform => If it's true, return a JSON
 * description
 *    - Get the value of key. If the key does not exist the special value nil is returned. An error is returned if the
 *    - value stored at key is not a string, because GET only handles string values.
 * return:
 *    - Promise with the value of key, or null when key does not exist.
 */
 export function getCache(client, key, transform = null) {
    return new Promise(resolve => {
      client.get(key, (err, data) => {
        if (err) throw err;
        //if match found, return the value
        if (data == null) return resolve(null);
        if (transform) return resolve(JSON.parse(data));
        return resolve(data);
      });
    });
  }
  /**
   * getCacheJSON
   * @client => The client of redis cache database
   * @key => The name of the document to search in redis
   * description
   *    - Get the value of key. If the key does not exist the special value nil is returned. An error is returned if the
   *    - value stored at key is not a string, because GET only handles string values.
   * return:
   *    - Promise with the value of key, or null when key does not exist.
   */
   export function getCacheJSON(client, key) {
    return getCache(client, key, true);
  }
  
  /**
   * setCache
   * @client => The client of redis cache database
   * @key => The name of the document to save in redis
   * @value => The value of the document to save in redis, only accept string
   * @duration =>  Set the specified expire time, in seconds. Default 0. It don't have duration
   * @cb =>  Callback Function to run after the redis completion process
   * description
   *    - Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type.
   *    - Any previous time to live associated with the key is discarded on successful SET operation.
   */
   export function setCache(client, key, value, duration = 0, db = null, cb = () => {}) {
    if (duration) return client.setex(key, duration, value, cb);
    else return client.set(key, value, cb);
  }
  
  /**
   * setCacheJSON
   * @client => The client of redis cache database
   * @key => The name of the document to save in redis
   * @value => The value of the document to save in redis, it use JSON.stringify()
   * @duration =>  Set the specified expire time, in seconds. Default 0. It don't have duration
   * @cb =>  Callback Function to run after the redis completion process
   * description
   *    - Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type.
   *    - Any previous time to live associated with the key is discarded on successful SET operation.
   */
   export function setCacheJSON(client, key, value, duration = 0, cb = () => {}) {
    return setCache(client, key, JSON.stringify(value), duration, cb);
  }
  
  /**
   * deleteCache
   * @client => The client of redis cache database
   * @key => The name of the document to save in redis
   * @cb =>  Callback Function to run after the redis completion process
   * description
   *    - Removes the specified keys. A key is ignored if it does not exist.
   */
   export function deleteCache(client, key,  cb = () => {}) {
    return client.del(key, cb);
  }
  
  /**
   * deleteCacheDB
   * @client => The client of redis cache database
   * @cb =>  Callback Function to run after the redis completion process
   * description
   *    - Delete the collection from redis db, if the collection isn't exists,
   *    - this don't nothing
   */
   export function deleteCacheDB(client, cb = () => {}) {
    return client.flushall(cb)
  }
  

  