function createSentence(){
  var chinese = "忍耐是一种美德。"
  var pinyin = "Rěnnài shì yì zhǒng měidé."
  var tonelessPinyin = "rennai shi yizhong meide."
  var englishTrans = "Patience is a virtue."
  document.getElementById("chinese").innerHTML = chinese;
  document.getElementById("pinyin").innerHTML = pinyin;
}

function compareSentence(){

}

//$("#input_field").keyup(function(){
  //if($(this).val().length == 1)
    //$('#form :submit').click();
//})

$(document).ready(function (){
  createSentence();
})
