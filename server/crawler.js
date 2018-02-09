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
    this.lrc = null;
    this.urlConfig = {
      'song_list': 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      'song_search': 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
      'song_lrc': 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
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
  // 搜索音乐歌词
  lrcMusic () {
    return new Promise(resolve => {
      const songmid = '000Md1wq0vnwzE';
      const url = this.urlConfig.song_lrc + '?songmid=' + songmid;
      const options = new URL(url);
      const  newOptions = {
        hostname: options.hostname,
        path: options.pathname + options.search,
        headers: {
          "referer": "https://y.qq.com/portal/player.html"
        }
      };
      console.log(url);
      https.get(newOptions, res => {
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk); });
        res.on('end', () => {
          console.log(chunks);
          let buf1 = Buffer.concat(chunks);
          let Data = iconv.decode(buf1, 'utf8');
          console.log('3',Data);
          Data = Data.split('\n');
          // Data.pop();
          Data = Data.join('').replace(/^\w*\((.*?)\)$/, '$1');
          // 非严格模式不能用JSON.parse
          const parsedData = eval('(' + Data + ')');
          //解析base64
          let buf2 = Buffer.from(parsedData.lyric, 'base64');
          parsedData.lyric = buf2.toString();
          this.lrc = parsedData;
          resolve();
        });
      });
    })
  }
  //测试
  test(){
    return new Promise(resolve => {
      const  newOptions = {
        hostname:'c.y.qq.com',
        path:'/lyric/fcgi-bin/fcg_query_lyric_new.fcg?songmid=000Md1wq0vnwzE',
        headers:{
          //'Accept':'*/*',
          //'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
          //'Accept-Language':'zh-CN,zh;q=0.8',
          //'Connection':'keep-alive',
          //'Cookie':'pgv_pvi=8325700608; RK=nmPjwTa6cL; tvfe_boss_uuid=b6d4ac2158487b18; eas_sid=Y1q4D964s5S5w3R999t8x6J0H2; ts_uid=2445916040; LW_uid=a1G5b0z2f6D7I365g5B2o9c6W3; pac_uid=1_1461476694; LW_sid=d1e5t0z9M058q8Z8y869t2X205; o_cookie=1170133296; pgv_pvid=7668421424; ptcz=a6eda41dd47939952f2c7ba1151440de7fefcc60058f3a96a723311b70d952bc; pgv_info=ssid=s5380782357; ts_refer=ADTAGmyqq; pgv_si=s483905536; player_exist=1; qqmusic_fromtag=66; yq_playdata=t_26_1; pt2gguin=o1461476694; uin=o1461476694; skey=@LcJX2wFRc; ptisp=cnc; yq_playschange=0; yq_index=0; yqq_stat=0; yplayer_open=1; ts_last=y.qq.com/portal/player.html',
          //'Host':'c.y.qq.com',
          'Referer':'https://y.qq.com/portal/player.html'

        }
      };
      console.log(newOptions);
      const req = https.get(newOptions, res => {
        console.log(res.statusCode);
        //console.log(res);
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk); });
        res.on('end', () => {
          let Data = iconv.decode(Buffer.concat(chunks), 'utf8');
          this.lrc = Data;
          resolve();
        });
      });
      console.log('req',req._headers);
      req.end();
    })
  }
}

module.exports = Crawler;
