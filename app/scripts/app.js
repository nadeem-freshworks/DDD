var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  const contactData = await client.data.get('contact');
  const {
    contact: { name }
  } = contactData;

  textElement.innerHTML = `Ticket is created by ${name}`;
}


async function sendEmail(){
 
  const bodydata = {
    body: "email from fronetend"
  }
  const options = {
    context: {
      path: `/api/v2/tickets/5/reply`
    },
    body: JSON.stringify(bodydata)
  }
  await client.request.invokeTemplate("sendEmail", options)
  console.log("Automated reply has been sent");
}