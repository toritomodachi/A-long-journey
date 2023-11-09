const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const prefix = '!!!';

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

// client.user.setPresence({ status: 'invisible' })
//     .then(console.log('봇이 오프라인 상태로 설정되었습니다.'))
//     .catch(console.error);
});

client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('명령어를 실행하는 중 오류가 발생했습니다.');
    }
  }
});

client.login(config.token);
