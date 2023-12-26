module.exports = {
    name: '종류',
    description: '게임 종류와 설명',
    execute(message, args) {
      // 사용 가능한 명령어 목록을 만들어 보내는 코드
      const commandList = "사용 가능한 명령어:\n- !안녕\n- !도움말";
      message.channel.send(commandList);
    },
  };
  