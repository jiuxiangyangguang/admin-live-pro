// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

const services = [
  'api-server',
  'user-manage-server',
  'shopping-server',
  'live-server',
  'upload-server',
]
services.forEach((service) => {
  const child = exec(`nest start ${service} --watch`)

  child.stdout.on('data', (data) => {
    console.log(`${service} stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.error(`${service} stderr: ${data}`)
  })

  child.on('close', (code) => {
    console.log(`${service} child process exited with code ${code}`)
  })
})
