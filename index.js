const Discord = require('discord.js');	// discord.js 라이브러리 호출
const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
  ]});	// Client 객체 생성

// discord 봇이 실행될 때 딱 한 번 실행할 코드를 적는 부분
client.once('ready', () => {
	console.log('Ready!');
});

// 봇과 서버를 연결해주는 부분
client.login('ㅁ');

// 디스코드 서버에 작성되는 모든 메시지를 수신하는 리스너
client.on('message', message => {
	console.log(message.content);
});