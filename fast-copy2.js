const fsPromises = require('fs/promises')

const aCpy = async (src, dest) => { // src/test, dest/test
  try {
    await fsPromises.copyFile(src, dest)
  } catch (e) {
    if (e.code === 'EISDIR') {
      fsPromises.mkdir(dest)
      src = src + '/'
      dest = dest + '/'
      const files = await fsPromises.readdir(src)
      try {
        const promises = files.map((file) => aCpy(src + file, dest + file))
        const result = await Promise.allSettled(promises)
        console.log(result)
        for (const [i, res] of result.entries()) {
          if (res.status === 'fulfilled') {
            console.log(`${files[i]} copy done`)
          } else {
            console.log(`${files[i]} copy fail`)
          }
        }
      } catch (e) {
        console.error(e.message)
      }
    } else {
      console.log(`cpy: ${e.message}`)
    }
  }
}

const main = async () => {
  // check src and dest are directory
  let src = 'src'
  let dest = 'dest'
  try {
    src = src + '/'
    dest = dest + '/'
    const files = await fsPromises.readdir(src)
    try {
      const promises = files.map((file) => aCpy(src + file, dest + file)) // src/test, dest/test
      const result = await Promise.allSettled(promises)
      console.log(result)
      for (const [i, res] of result.entries()) {
        if (res.status === 'fulfilled') {
          console.log(`${files[i]} copy done`)
        } else {
          console.log(`${files[i]} copy fail`)
        }
      }
    } catch (e) {
      console.error(e.message)
    }
  } catch (e) {
    console.error(e.message)
  }
}

main()