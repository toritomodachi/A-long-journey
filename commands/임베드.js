// 명령어 파일: 임베드테스트.js
const prefix = '!!!';
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()

module.exports = {
    name: '임베드',
    description: '예쁘게 디자인 가능한 임베드',
    execute(message, args) {
        if (message.author.bot) return;

  if (message.content.startsWith(prefix + '임베드')) {
    
    embed.setColor('#0099ff') // 임베드 색상 설정
      .setTitle('제목')
      .setURL('https://example.com') // 제목 클릭 시 연결되는 링크
      .setDescription('이것은 임베드 메시지입니다.')
      .setThumbnail('https://example.com/thumbnail.png') // 썸네일 이미지
      .addField('필드 1', '값 1', true) // 필드 추가 (세 번째 인수는 인라인 여부)
      .addField('필드 2', '값 2', true)
      .setImage('https://example.com/image.png') // 이미지 추가
      .setTimestamp() // 현재 시간을 표시
      .setFooter('Footer 텍스트', 'https://example.com/footer.png'); // 바닥글 및 아이콘 설정

      message.channel.send(embed);// 임베드를 메시지로 전송
  }
    },
  };
  