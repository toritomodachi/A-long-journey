// 명령어 파일: 게임.js

module.exports = {
    name: '게임',
    description: '심심한 사람들을 위한 스로우 다이스 게임',
    execute(message, args) {
        if (message.author.bot) return;

        if (message.content === '!주사위') {
          const result = Math.floor(Math.random() * 6) + 1;
          message.reply(`주사위 결과: ${result}`);
          if (result === 6) {
            message.channel.send('축하합니다! 6이 나와 보상을 받습니다.');
          } else {
            message.channel.send('아쉽게도 6이 나오지 않았습니다.');
          }
        }
    },
  };
  