'use strict'
/*
  使用http从qq音乐拉取音乐信息
 */
const http = require('http');
const https = require('https');
const iconv = require('iconv-lite');
const { URL } = require('url');

class Crawler {
  constructor () {
    this.musicList = null;
    this.urlConfig = {
      'song_list': 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      'song_search': 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
    }
  }
  // 获取热歌歌曲列表
  initTotalList () {
    return new Promise(resolve => {
      const start = 0;
      const num = 10;
      const url = this.urlConfig.song_list + '?topid=26&song_begin=' + start + '&song_num=' + num;
      console.log(url);
      https.get(url, res => {
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk) });
        res.on('end', () => {
          let Data = iconv.decode(Buffer.concat(chunks), 'utf8');
          Data = Data.split('\n');
          // Data.pop();
          Data = Data.join('').replace(/^\w*\((.*?)\)$/, '$1');
          // 非严格模式不能用JSON.parse
          const parsedData = eval('(' + Data + ')');
          this.musicList = parsedData;
          resolve();
        });
      })
    })
  }
  // 获取新歌歌曲列表
  initNewList () {
    return new Promise(resolve => {
      const start = 0;
      const num = 10;
      const url = this.urlConfig.song_list + '?topid=27&song_begin=' + start + '&song_num=' + num;
      console.log(url);
      https.get(url, res => {
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk); });
        res.on('end', () => {
          let Data = iconv.decode(Buffer.concat(chunks), 'utf8');
          Data = Data.split('\n');
          // Data.pop();
          Data = Data.join('').replace(/^\w*\((.*?)\)$/, '$1');
          // 非严格模式不能用JSON.parse
          const parsedData = eval('(' + Data + ')');
          this.musicList = parsedData;
          resolve();
        });
      })
    })
  }
  // 搜索音乐
  searchMusic () {
    return new Promise(resolve => {
      const p = 1;
      const num = 10;
      const name = '周杰伦';
      const url = this.urlConfig.song_search + '?p=' + p + '&w=' + name + '&n=' + num;
      const options = new URL(url);
      console.log(url, options);
      https.get(options, res => {
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk); });
        res.on('end', () => {
          let Data = iconv.decode(Buffer.concat(chunks), 'utf8');
          Data = Data.split('\n');
          // Data.pop();
          Data = Data.join('').replace(/^\w*\((.*?)\)$/, '$1');
          // 非严格模式不能用JSON.parse
          const parsedData = eval('(' + Data + ')');
          this.musicList = parsedData;
          resolve();
        });
      });
    })
  }
}

module.exports = Crawler;
