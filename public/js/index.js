var chinese = ["忍","耐","是","一","种","美","德","。"];
var pinyin = ["Rěn", "nài ", "shì ", "yì", "zhǒng ", "měi", "dé", "."];
var englishTrans = 'Patience is a virtue.';
var instructions = 'Welcome to the PinyinType prototype. To use this app, you must enable <a id="input-link" href="https://chinese.yabla.com/type-chinese-characters.php?" target="_blank">pinyin keyboard input</a> on your operating system. After this, click anywhere in the browser window and start typing. You can toggle the pinyin on and off, off if you really want a challenge!';

var tonelessPinyin = ["rennai", "shi", "yizhong", "meide"];
var charsPerPhrase = [2, 1, 1, 2, 1, 2, 1, 1];
var pending = 1;
$('#userText').attr('maxLength', chinese.length);

function createDefaultSentences(){
  this.createChineseSentence();
  this.createPinyinSentence();
  this.createEnglishSentence();
  // this.createInstructions();
}

function createChineseSentence(){
  document.getElementById("chinese-sentence").innerHTML = null;
  for (var i = 0, len = chinese.length; i < len; i++) {
    $('<span>' + chinese[i] + '</span>').appendTo('#chinese-sentence');
  }
}

function createPinyinSentence(){
  document.getElementById("pinyin-sentence").innerHTML = null;
  for (var i = 0, len = pinyin.length; i < len; i++) {
    $('<span>' + pinyin[i] + '</span>').appendTo('#pinyin-sentence');
  }
}

function createEnglishSentence(){
  document.getElementById("english-sentence").innerHTML = englishTrans;
}

function createInstructions(){
  document.getElementById("instructions").innerHTML = instructions;
}

function colorCharByClass(parent_id, position, correctness){
  $(parent_id + " span:nth-child(" + (position + 1) + ")" ).addClass(correctness);
}

function inputCorrect(i){
  self.colorCharByClass("#chinese-sentence", i, "correct");
  self.colorCharByClass("#pinyin-sentence", i, "correct");

}
function inputIncorrect(i){
  self.colorCharByClass("#chinese-sentence", i, "incorrect");
  self.colorCharByClass("#pinyin-sentence", i, "incorrect");
}

function trackPending(){
  for (var i = 1; i <= charsPerPhrase[pending - 1]; i++){
    self.colorCharByClass("#chinese-sentence", pending - 2 + i, "pending");
    self.colorCharByClass("#pinyin-sentence", pending - 2 + i, "pending");
  }
}

function compareSentence(){
  pending = 1;
  var user_input = document.getElementById("userText");
  user_chars = user_input.value;
  self.createDefaultSentences();
  for (var i = 0; i < user_chars.length; i++) {
    if (chinese[i] == user_chars[i]) {
      self.inputCorrect(i);
      pending = i + 2;
    } else {
      self.inputIncorrect(i);
      pending = i + 1;
    }
  }
}

$("#userText").focus().on('blur', function() {
    $(this).focus();
});

$(document).on("click", function()
  {
    $("#userText").focus();
  })

function handleClick(cb) {
  $("#pinyin-sentence").toggle("show",0);
}

window.onscroll = function () {
        window.scrollTo(0,0);
    }
$('body').css('overflow-x', 'hidden');



$(document).ready(function (){
  createDefaultSentences();
  bootbox.alert(instructions)
  $('a.button-toggle').on('click', function() {
      $("#pinyin-sentence").toggle("show",0);
      $("#userText").focus();
  });
  $("body").addClass("noscroll");
  $("#userText").focus();
})
