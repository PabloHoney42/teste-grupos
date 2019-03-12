const express = require('express')
const next = require('next')
const path = require('path')
const url = require('url')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/apiRouter')
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`)
  });

} else {
  // Development mode. Only one CPU core

  const nextApp = next({ dir: '.', dev })
  const nextHandler = nextApp.getRequestHandler()

  nextApp.prepare()
    .then(() => {
      const server = express();

      if (!dev) {
        // Enforce SSL & HSTS in production
        server.use(function (req, res, next) {
          var proto = req.headers["x-forwarded-proto"];
          if (proto === "https") {
            res.set({
              'Strict-Transport-Security': 'max-age=31557600' // one-year
            });
            return next();
          }
          res.redirect("https://" + req.headers.host + req.url);
        });
      }

      server.use(logger(dev ? 'dev' : 'production'))
      server.use(express.json())
      server.use(express.urlencoded({ extended: false }))
      server.use(cookieParser())

      server.use('/', indexRouter)
      server.use('/api', apiRouter)

      // Static files
      // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
      server.use('/static', express.static(path.join(__dirname, 'static'), {
        maxAge: dev ? '0' : '365d'
      }))

      // Default catch-all renders Next server
      server.get('*', (req, res) => {
        // res.set({
        //   'Cache-Control': 'public, max-age=3600'
        // })
        const parsedUrl = url.parse(req.url, true)
        nextHandler(req, res, parsedUrl)
      });

      server.listen(port, (err) => {
        if (err) throw err
        console.log(`Listening on http://localhost:${port}`)
      });
    });
}
