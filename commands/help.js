// 명령어 파일: 도움말.js

module.exports = {
    name: '도움말',
    description: '사용 가능한 명령어 목록을 보여주는 명령어',
    execute(message, args) {
      // 사용 가능한 명령어 목록을 만들어 보내는 코드
      const commandList = "사용 가능한 명령어:\n- !안녕\n- !도움말";
      message.channel.send(commandList);
    },
  };
  