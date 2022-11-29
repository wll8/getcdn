const getcdn = require(`./index.js`)

getcdn({
  list: [
    `vue@2.4.4`,
    `zepto@1.2.0`,
    `mockm`,
    `@wll8/express-ws@1.0.3`,
  ],
  dirSave: `./npm`,
  tgzDir: `./tgz`,
})
