const router = require('koa-router')();
const Crawler = require('../crawler.js');
const Crawl = new Crawler();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello World!'
  })
})

router.get('/hotmusic', async (ctx, next) => {
  const params = ctx.query;
  await  crawl.initTotalList(params);
  ctx.body = {
    data: crawl.musicList
  }
})

router.get('/newmusic', async (ctx, next) => {
  const params = ctx.query;
  await  crawl.initNewList(params);
  ctx.body = {
    data: crawl.musicList
  }
})

router.get('/searchmusic', async (ctx, next) => {
  const params = ctx.query;
  await  crawl.searchMusic(params);
  ctx.body = {
    data: crawl.musicList
  }
})

module.exports = router
