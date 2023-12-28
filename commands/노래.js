const { YTSearcher } = require('ytsearcher');
const ytdl = require('ytdl-core');
const config = require('../config.json');

const searcher = new YTSearcher(config.yttoken);
let queues = new Map();

function setQueue(guildId, queue) {
  queues.set(guildId, queue);
}

function getQueue(guildId) {
  return queues.get(guildId);
}

module.exports = {
  name: '노래',
  description: '노래를 검색하고 재생합니다.',
  execute: async (message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send('음성 채널에 참가해주세요.');
    }

    const serverQueue = getQueue(message.guild.id) || {};

    const songInfo = await searcher.search(args.join(' '), { type: 'video' });
    const song = {
      title: songInfo.first.title,
      url: songInfo.first.url,
    };

    if (!serverQueue.connection) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      setQueue(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.error(err);
        queues.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title}이(가) 대기열에 추가되었습니다!`);
    }
  },
};

function play(guild, song) {
  const serverQueue = getQueue(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queues.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`현재 재생 중: **${song.title}**`);
}
