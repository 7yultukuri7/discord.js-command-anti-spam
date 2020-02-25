//----
//   const prefix = "...(ここじゃないよ...)"; <== prefix 変えといて
// const commandcount = [...(ここじゃないよ...)] <== 調整しといて
//----
const commandruncache = [
  {
    userid: "123456789012345678",
    count: 300
  },
  {
    userid: "901234567890123456",
    count: 480
  }
];
const commandcount = [
  {
    defultcountplus: 100,
    removecount: 80,
    warncount: 400,
    stopcount: 600,
    maxcount: 1000, //number or null
    removetime: 5000, //5秒
    warnmessage: ":warning: コマンドの連投をしないでください。"
  }
];
setInterval(function() {
  for (var i = 0; i < commandruncache.length; i++) {
    commandruncache[i].count =
      commandruncache[i].count - commandcount[0].removecount;
    if (commandruncache[i].count < 0) {
      commandruncache.splice(i, 1);
    }
  }
//--------------------------------------------------
//  console.log(JSON.stringify(commandruncache));
//--------------------------------------------------
}, commandcount[0].removetime);



client.on("message", async message => {
//-----
//---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--
//-----
 
//BOTやDMを無視するやつ
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  
  
  //command
  const prefix = "test!";
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

//-----
//---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--
//-----
  
  if (command) {
    for (var i = 0; i < commandruncache.length; i++) {
      if (commandruncache[i].userid == message.author.id) {
        //commandruncacheにuseridあった場合
        if (commandcount[0].maxcount === null) {
          //maxcountがnull
          commandruncache[i].count =
            commandruncache[i].count + commandcount[0].defultcountplus;
          if (commandcount[0].stopcount < commandruncache[i].count) {
            //stopcount
            //...反応しない
            return;
          } else if (commandcount[0].warncount < commandruncache[i].count) {
            //warncount
            message.channel.send(commandcount[0].warnmessage);
          }
        } else if (commandruncache[i].count < commandcount[0].maxcount) {
          //maxcountがnumber
          commandruncache[i].count =
            commandruncache[i].count + commandcount[0].defultcountplus;
          if (commandcount[0].stopcount < commandruncache[i].count) {
            //stopcount
            //...反応しない
            return;
          } else if (commandcount[0].warncount < commandruncache[i].count) {
            //warncount
            message.channel.send(commandcount[0].warnmessage);
          }
        } else {
          //maxcountの上限を超えた場合
          //...反応しない
          return;
        }
      } else if (i + 1 == commandruncache.length) {
        //commandruncacheにuseridない場合データを追加
        console.log(commandruncache);
        commandruncache.push({
          userid: message.author.id,
          count: commandcount[0].defultcountplus
        });
      }
    }
  }
  function commandrunprogram(i) {
    commandruncache[i].count =
      commandruncache[i].count + commandcount[0].defultcountplus;
    if (commandcount[0].stopcount > commandruncache[i].count) {
      //stopcount
      //...反応しない
      return;
    } else if (commandcount[0].warncount > commandruncache[i].count) {
      //warncount
      message.channel.send(commandcount[0].warnmessage);
    }
  }
  
//-----
//---ここから下にプログラムしないと、連投をされたときに反応してしまいます。--
//普通にいつもどうりでOK!(たぶん。。。)
    if (command == "help") {
    message.channel.send("OK!");
  }
});
