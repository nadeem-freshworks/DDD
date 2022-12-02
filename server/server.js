
const utils = require('./lib/utils');
const classifier = require('./lib/classifier');


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

  const body_text = data.conversation.body_text;
  return classifier.getClassification(body_text)
  
}


async function sendAutomatedEmail(data) {
  await utils.sendEmail(data);

}

