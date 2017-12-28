const { run } = require('runjs'),
    BABEL_OPTS = 'src/ --out-dir lib/',
    BIN = './node_modules/.bin',
    WEBPACK_OPTS = '--debug --output-pathinfo --colors'



function hello(name = 'Mysterious') {
  console.log(`Hello ${name}!`)
}

function makedir(directory) {
  run(`mkdir ${directory}`)
}

async function build () {
  await run(`npm run ${BIN}/webpack ${WEBPACK_OPTS}`, {async: true})
      .then((data) => {
        console.log('After webpack run')
      })
      .catch( (error) => {
          console.log("Error Occured", error)
      })
  console.log('All build processing done!')
}

function install() {
    run('npm install')
}

async function testasyncawait () {
  await run('dir', {async: true}).then((data) => {
    console.log('DATA', data)
  })
  console.log('After AWAIT message')
}

module.exports = {
  build,
  hello,
  install,
  makedir,
  testasyncawait
}
