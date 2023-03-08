const CONSTANTS = require('./constants')
function isArray(data) {
  return Array.isArray(data) && data.length;
}

function getCCEmails(data) {
  let cc_emails = data.conversation.cc_emails;
  let to_emails = data.conversation.to_emails;

  cc_emails = isArray(cc_emails) ? cc_emails : [cc_emails];
  to_emails = isArray(to_emails) ? to_emails : [to_emails];

  cc_emails = CONSTANTS.cc_emails.concat(...cc_emails, ...to_emails);
  return cc_emails;
}
function logEmails(data) {
  console.log("emails which might be helpful ")
  console.log("to_emails", data.conversation.to_emails, "cc_emails", data.conversation.cc_emails, "from_emails", data.conversation.from_email, "support_emaisl", data.conversation.support_email)

}

function getEmailBody(ticketDetails) {
  let body  = `<p>This is an auto generate email<br>
  Thanks for reaching out to us over email, while we are working on resolving and an agent respond back to you; here is the current status of the app -<br><br>`
  
  console.log(ticketDetails.id)
  const custom_fields = ticketDetails.custom_fields || {};
  const overAllstatus = CONSTANTS.overAllStatus[ticketDetails.status || 0];
  const codeReviewStatus = custom_fields.cf_code_review_status || 'Yet to start';
  const qaReviewStatus = custom_fields.cf_qa_review_status || 'Yet to start';
  const contentReviewStatus = custom_fields.cf_content_review_status || 'Yet to start';
  const securityReviewStatus = custom_fields.cf_security_review_status || 'Yet to start';
 const status= `Overall Status - ${overAllstatus }<br>
  Code Review Status - ${codeReviewStatus}<br>
  Content Review Status - ${ contentReviewStatus}<br>
  QA Review Status - ${qaReviewStatus}<br>
  Security Review Status - ${securityReviewStatus}<p>`
  

  return body+status;
}
async function getTicketDetails(ticketId) {

  const options = {
    context: {
      path: `/api/v2/tickets/${ticketId}`
    }
  }
  const data = await $request.invokeTemplate("getTicketDetails", options)
  return JSON.parse(data.response);

}

async function sendEmail(data) {
  const cc_emails = getCCEmails(data)
  const ticketId = data.conversation.ticket_id;
  const ticketDetails = await getTicketDetails(ticketId);
  const bodydata = {
    body: getEmailBody(ticketDetails),
    cc_emails
  }
  const options = {
    context: {
      path: `/api/v2/tickets/${ticketId}/reply`
    },
    body: JSON.stringify(bodydata)
  }
  await $request.invokeTemplate("sendEmail", options)
  console.log("Automated reply has been sent");

}

exports = {
  isArray,
  getCCEmails,
  logEmails,
  getEmailBody,
  getTicketDetails,
  sendEmail
}