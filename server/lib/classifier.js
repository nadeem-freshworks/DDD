const testData = require('./trainingData/testData');
const keyword_extractor = require("keyword-extractor");

function getClassification(emailBody) {
  const natural = require("natural");
  const classifier = new natural.BayesClassifier();

  for (let i = 0; i < testData.statusDocuments.length; i++) {
    classifier.addDocument(tokenize(testData.statusDocuments[i]), 'status');
  }
  for (let i = 0; i < testData.regularDocuments.length; i++) {
    classifier.addDocument(tokenize(testData.regularDocuments[i]), 'regular');
  }

  classifier.train();

  return classifier.classify(extractKeywords(emailBody));
}
function tokenize(input) {
  var stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\- ]+/g, '')
    .replace(stopwords, '')
    .replace('/ {2,}/', ' ')
    .split(' ');
}

function extractKeywords(sentence) {
  const extraction_result =
    keyword_extractor.extract(sentence, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false

    });
  return extraction_result;
}

exports = {
  getClassification
}
