// const cc_emails = ['siva.venkatachalam@freshworks.com', 'nirmal.kumar@freshworks.com'];
const cc_emails = [];

const statusExternalTextToId = {
  "Under Review": 0,
  "Approve": 1,
  "Reject": 2,
  "Waiting on Developer": 3,
  "Skip": 4
}
const statusIdToExternalText = {
  0: "Under Review",
  1: "Approve",
  2: "Reject",
  3: "Waiting on Developer",
  4: "Skip"
}

const overAllStatus = {
  0:'Yet to start',
  2: 'Open',
  3: 'Pending',
  4: 'Resolved',
  5: 'Closed',
  6: 'Waiting on Customer',
  7: 'Waiting on Third Party',
  8: 'Under Review',
  9: 'Ready to Publish',
  10: 'Waiting on developer',
  11: 'Rejected',
  12: 'Security Testing'
}
exports = {
  cc_emails,
  overAllStatus,
  statusIdToExternalText,
  statusExternalTextToId
}