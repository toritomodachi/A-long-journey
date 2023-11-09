// 명령어 파일: 안녕.js

module.exports = {
    name: '안녕',
    description: '봇이 인사하는 명령어',
    execute(message, args) {
      message.channel.send('안녕하세요!');
    },
  };
  