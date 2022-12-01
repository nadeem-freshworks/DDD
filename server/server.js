// const axios = require('axios');
const natural = require('natural');
const classifier = new natural.BayesClassifier();
const { regularDocuments, statusDocuments} = require('./trainigData/testData')


exports = {
  onConversationHandler: function (args) {
    const data = args['data'];
    // console.log('convesation'+ data.conversation.body_text);
    // console.log( 'actor'+JSON.stringify(data.actor));

    const ticketId =  data.conversation.ticket_id;

    if (shouldWeSendMail) {
      console.log("trigger a email ")
      makeCall(ticketId)
    }
  }

};
function shouldWeSendMail(){
  if(data.actor.helpdesk_agent)
    return false;
  
}


async function makeCall(ticketId) {
  const data = {
    body: "We are working on this issue. Will keep you posted.1234"
  }
  const options ={
    context: {
      path: `/api/v2/tickets/${ticketId}/reply`
    },
    body :JSON.stringify(data)
  }
  $request.invokeTemplate("sendEmail", options)
    .then(
      function(data) {
        console.log(data);
      },
      function(error) {
        console.log(error);
      }
    );
  
  // smart();

}
// function smart(){


// classifier.addDocuments(regularDocuments, `regular`)
// classifier.addDocuments(statusDocuments, `status`)
// classifier.train()
 
// console.log(classifier.classify(`I heard the mexican restaurant is great!`)) // "positive"
// console.log(classifier.classify(`I don't want to eat there again.`)) // "negative"
// console.log(classifier.classify(`The torta is epicly bad.`)) // "negative"
// console.log(classifier.classify(`The torta is tasty.`)) // "positive"
 
// console.log(classifier.getClassifications(`Burritos are the meaning of life.`))
// }
