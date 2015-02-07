var chinese = ["忍","耐","是","一","种","美","德","。"]
var pinyin = "Rěnnài shì yì zhǒng měidé."
var englishTrans = "Patience is a virtue."

function createInitialSentence(){
  this.defaultChineseSentence();
  this.defaultPinyinSentence();
  this.defaultEnglishSentence();
  $("#english").addClass("incorrect");
  $( "#chinese-sentence span:nth-child(4)" ).addClass("correct");
}

function defaultChineseSentence(){
  document.getElementById("chinese-sentence").innerHTML = null;
  for (var i = 0, len = chinese.length; i < len; i++) {
    $('<span id="' + i +'">' + chinese[i] + '</span>', {'class':'chinese-char'}).appendTo('#chinese-sentence');
  }
}

function defaultPinyinSentence(){
  document.getElementById("pinyin").innerHTML = pinyin;
}

function defaultEnglishSentence(){
  document.getElementById("english").innerHTML = englishTrans;
}

function defaultTonelessPinyinSentence(){
  var tonelessPinyin = "rennai shi yizhong meide."
}

function compareSentence(){

}

//$("#input_field").keyup(function(){
  //if($(this).val().length == 1)
    //$('#form :submit').click();
//})

$(document).ready(function (){
  createInitialSentence();
})
