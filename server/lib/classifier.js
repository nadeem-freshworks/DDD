
function getClassification(emailBody){
  const natural = require("natural");
  const classifier = new natural.BayesClassifier();
  var statusDocuments = [ `app review process`, `approval`,`App Review Status Request`,
      `app review team`, `Code Review` , `Content review`, `QA review`,
      `review process`, `Application blocked under review state`,
        `still in the review process`,
      `review the submission`, `under review`, `app will be reviewed`,`review comments`,
      `reject the app in the code review`,`submit the app and get it reviewed`,
      `app review exchanges`, `address the app review feedback`, `app resubmitted`,
      `app has been approved`,`review is done`, `Wait for app review`,
      `App Review process is stuck in testing`,`app is stuck in draft`,`reviewed and validated`,
      `app state changed under review`, `review hasnt cleared`, `code review changes`,
      `resubmit app for review`,`published for review`,`in review`
    ];
    
    var regularDocuments = [
      `Any update on the same`,`Thanks in advance`,`regards`,`Thank you for reaching out`,
      `Best regards`,`I hope this email finds you well`, `Thank you for your response`,
    ];

    for (let i = 0; i < statusDocuments.length; i++) {
      classifier.addDocument(tokenize(statusDocuments[i]), 'status');
    } 
    for (let i = 0; i < regularDocuments.length; i++) {
      classifier.addDocument(tokenize(regularDocuments[i]), 'regular');
    }
    
    classifier.train();
  return classifier.classify(tokenize(emailBody));
}
function tokenize(input) {
  var stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\- ]+/g, '')
    .replace(stopwords, '')
    .replace('/ {2,}/', ' ')
    .split(' ');
}

exports = {
  getClassification
}
