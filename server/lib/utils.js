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
  let body = CONSTANTS.statusMessage;

  const custom_fields = ticketDetails.custom_fields || {};
  const overAllstatus = CONSTANTS.overAllStatus[custom_fields.status || 0];
  const codeReviewStatus = custom_fields.cf_code_review_status || 'Not Started';
  const qaReviewStatus = custom_fields.cf_qa_review_status || 'Not Started';
  const contentReviewStatus = custom_fields.cf_content_review_status || 'Not Started';
  const securityReviewStatus = custom_fields.cf_security_review_status || 'Not Started';

  body = body + `<table style="border: 1px solid black;width:40% "> <tr style="text-align:left"> <th style="width:80%">Category</th> <th>Status</th> </tr>`

  body = body + `<tr><td>Overall Status</td><td> ${overAllstatus}</td></tr>`
  body = body + `<tr><td>Code Review Status</td><td> ${codeReviewStatus}</td></tr>`
  body = body + `<tr><td>Content Review Status</td><td> ${contentReviewStatus}</td></tr>`
  body = body + `<tr><td>QA Review Status</td><td> ${qaReviewStatus}</td></tr>`
  body = body + `<tr><td>Security Review Status</td><td> ${securityReviewStatus}</td></tr></table><br>`
  body = body + `Thank you for your patience.<br><br>`


  return body;
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