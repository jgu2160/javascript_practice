function createSentence(){
  var chinese = ["忍","耐","是","一","种","美","德","。"]
  var pinyin = "Rěnnài shì yì zhǒng měidé."
  var tonelessPinyin = "rennai shi yizhong meide."
  var englishTrans = "Patience is a virtue."
  document.getElementById("chinese").innerHTML = chinese.join("");
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
