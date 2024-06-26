const allowedOrigins = [
  'https://localhost:5000',
  'https://gsoinvsystemnodejs.onrender.com'
]

const corsOptions = {
  origin: (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null,true)
    } else {
      callback(new Error('Not allwed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

module.exports = corsOptions