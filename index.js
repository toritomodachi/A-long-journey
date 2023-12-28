const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const prefix = '!!!';

const queue = new Map();  // queue를 직접 정의

client.commands = new Discord.Collection();

// 명령어 파일을 로드
fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
});

client.on('ready', () => {
  console.log(`봇이 ${client.user.tag}로 로그인했습니다.`);
});

client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      command.execute(message, args, queue);  // queue를 직접 전달
    } catch (error) {
      console.error(error);
      message.reply('명령어를 실행하는 중 오류가 발생했습니다.');
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (!oldState.channelID && newState.channelID) {
    // 유저가 음성 채널에 참가했을 때
    handleQueue(oldState.guild.id);
  }
});

function handleQueue(guildId) {
  const serverQueue = queue.get(guildId);

  if (serverQueue && serverQueue.playing) {
    play(guildId, serverQueue.songs[0], queue);
  }
}

client.login(config.token);
