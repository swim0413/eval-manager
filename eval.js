var realmaster = ["주인해시"]; //여러명 가능
var fakemaster = [];
var cmd = "S"; //봇 명령어앞 여러개 가능
var cmdl = cmd.length; //명령어 앞 길이
var wide = "\u200b".repeat(1000); //전체보기
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  var hash = new java.lang.String(imageDB.getProfileImage()).hashCode();
  var or = realmaster.includes(String(hash)) || fakemaster.includes(String(hash));
  if(msg == cmd+"hash"){ 
   replier.reply(hash);
  }
  if(msg.startsWith(cmd+"eval ")){
    if(or){
      try{
        replier.reply(eval(msg.substr(cmdl+5)));
      }catch(e){
        replier.reply("error\n"+wide+e);
      }
    }else{
      replier.reply(sender+"님은 관리자가 아닙니다");
    }
  }
  if(msg.startsWith(cmd+"관리자추가 ")){
    if(realmaster.includes(String(hash))){
      if(!fakemaster.includes(msg.substr(cmdl+6))){
        fakemaster.push(msg.substr(cmdl+6));
        replier.reply(msg.substr(cmdl+6)+"해쉬코드가 관리자에 추가되었습니다");
      }else{
      replier.reply(msg.substr(cmdl+6)+"해쉬는 이미 관리자입니다.");
      }
    }else{
      replier.reply(sender+"님은 관리자가 아니거나 가짜관리자이므로 추가 불가 입니다.");
    }
  }
  if(msg.startsWith(cmd+"관리자삭제 ")){
    if(or){
      if(fakemaster.includes(msg.substr(cmdl+6))){
        fakemaster.pop(msg.substr(cmdl+6));
        replier.reply(msg.substr(cmdl+6)+"해쉬가 관리자에서 삭제 되었습니다");
      }else{
        replier.reply(msg.substr(cmdl+6)+"의 해쉬는 관리자가 아닙니다.");
      }
    }else{
      replier.reply(sender+"님은 관리자가 아니므로 삭제불가입니다.");
    }
  }
  if(msg == cmd+"관리자전체삭제"){
    if(or){
      fakemaster.length = 0;
    }
  }
  if(msg == cmd+"관리자보기"){
    replier.reply("관리자목록\n"+wide+"<진짜 관리자>\n"+realmaster.join("\n")+"\n\n<가짜 관리자>\n"+fakemaster.join("\n"));
  }
}
