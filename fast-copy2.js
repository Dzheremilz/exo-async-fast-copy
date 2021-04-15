const fsPromises = require('fs/promises')

const main = async () => {
  // check src and dest are directory
  let src = 'src/'
  let dest = 'dest/'
  try {
    const files = await fsPromises.readdir(src)
    try {
      const promises = files.map((file) => fsPromises.copyFile(src + file, dest + file))
      const result = await Promise.allSettled(promises)
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