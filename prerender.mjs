import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import { writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function prerender() {
  console.log('[prerender] Starting vite preview...')

  const server = spawn('npx', ['vite', 'preview', '--port', '3033'], {
    cwd: __dirname,
    shell: true,
    stdio: 'pipe',
    // Windows: нужно чтобы можно было убить дерево процессов
    detached: false,
  })

  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const msg = data.toString()
      if (msg.includes('localhost')) {
        console.log('[prerender] Server is up!')
        resolve()
      }
    })
    server.stderr.on('data', (data) => console.error(data.toString()))
  })

  await sleep(1000)

  console.log('[prerender] Launching Puppeteer...')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  try {
    await page.goto('http://localhost:3033', { waitUntil: 'domcontentloaded', timeout: 15000 })
    console.log('[prerender] Page loaded, waiting for Vue...')
    await sleep(4000)

    const html = await page.content()
    const outPath = path.join(__dirname, 'dist', 'index.html')
    writeFileSync(outPath, html, 'utf-8')
    console.log('[prerender] Done! Check dist/index.html')
  } finally {
    await browser.close()

    // На Windows shell:true создаёт дочерний cmd-процесс,
    // простой kill() его не убивает — нужно taskkill
    try {
      process.kill(server.pid, 'SIGTERM')
    } catch (_) {}

    // Гарантированно завершаем на Windows через taskkill
    const killer = spawn('taskkill', ['/pid', server.pid, '/T', '/F'], {
      shell: true,
      stdio: 'ignore',
    })
    await new Promise((resolve) => killer.on('close', resolve))

    console.log('[prerender] Server killed, exiting.')
    process.exit(0)
  }
}

prerender().catch(err => {
  console.error('[prerender] Error:', err)
  process.exit(1)
})
