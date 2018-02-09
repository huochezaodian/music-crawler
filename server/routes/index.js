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
  await  Crawl.initTotalList(params);
  ctx.body = {
    data: Crawl.musicList
  }
})

router.get('/newmusic', async (ctx, next) => {
  const params = ctx.query;
  await  Crawl.initNewList(params);
  ctx.body = {
    data: Crawl.musicList
  }
})

router.get('/searchmusic', async (ctx, next) => {
  const params = ctx.query;
  await  Crawl.searchMusic(params);
  ctx.body = {
    data: Crawl.musicList
  }
})

router.get('/lrcmusic', async (ctx, next) => {
  const params = ctx.query;
  await  Crawl.lrcMusic(params);
  ctx.body = {
    data: Crawl.lrc
  }
})

module.exports = router
