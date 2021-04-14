const fsPromises = require('fs/promises')

const main = async () => {
  // check src and dest are directory
  let src = 'src/'
  let dest = 'dest/'
  let array = []
  try {
    const files = await fsPromises.readdir(src)
    try {
      // for of async ? for await of sync
      for (const file of files) {
        // if file copy, if directory create one, call the fct to copy files again ? recursively
        array.push(fsPromises.copyFile(src + file, dest + file))
      }
      const result = await Promise.allSettled(array)
    } catch (e) {
      console.log(e.message)
    }
  } catch (e) {
    console.error(e.message)
  }
}

main()