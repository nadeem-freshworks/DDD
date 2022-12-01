const { split, Syntax } =require("sentence-splitter") ;

let sentences = split(`There it is! I found it.
Hello World. My name is Jonas.`);
let fiteredSentences= []
sentences.forEach((data)=>{
  if(data.type ===  Syntax.Sentence ){
    fiteredSentences.push(data.raw)
  }
})
console.log(fiteredSentences);
// console.log(JSON.stringify(sentences, null, 4));