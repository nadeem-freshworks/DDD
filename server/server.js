// const axios = require('axios');
const utils = require('./lib/utils');


// const natural = require('natural');
// const classifier = new natural.BayesClassifier();
// const { regularDocuments, statusDocuments} = require('./trainigData/testData')


exports = {
  onConversationCreateHandler: async function (args) {
    console.log("on conversatoion Create handler")

    await onConversationHandler(args)
  },
  onConversationUpdateHandler: async function (args) {
    console.log("on conversatoion Update handler")

    await onConversationHandler(args)

  }
};

async function onConversationHandler(args){
  console.log("on conversatoion handler start")

  const data = args['data'];
  

  if (shouldWeSendMail(data)) {
    console.log("trigger a email ")
    await sendAutomatedEmail(data)
  }

  console.log("on conversatoion handler end")
}

function shouldWeSendMail(data) {
  if (data.actor.type === 'agent' || data.actor.org_agent_id !==null || data.actor.helpdesk_agent  )
    return false;
  

  return true;
}


async function sendAutomatedEmail(data) {
  utils.logEmails(data);
  await utils.sendEmail(data);

}

