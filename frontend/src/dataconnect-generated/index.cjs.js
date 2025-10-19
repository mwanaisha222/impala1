const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'frontend',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createJobOpeningRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJobOpening', inputVars);
}
createJobOpeningRef.operationName = 'CreateJobOpening';
exports.createJobOpeningRef = createJobOpeningRef;

exports.createJobOpening = function createJobOpening(dcOrVars, vars) {
  return executeMutation(createJobOpeningRef(dcOrVars, vars));
};

const getJobOpeningsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJobOpenings');
}
getJobOpeningsRef.operationName = 'GetJobOpenings';
exports.getJobOpeningsRef = getJobOpeningsRef;

exports.getJobOpenings = function getJobOpenings(dc) {
  return executeQuery(getJobOpeningsRef(dc));
};

const subscribeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'Subscribe', inputVars);
}
subscribeRef.operationName = 'Subscribe';
exports.subscribeRef = subscribeRef;

exports.subscribe = function subscribe(dcOrVars, vars) {
  return executeMutation(subscribeRef(dcOrVars, vars));
};

const getArticlesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArticles');
}
getArticlesRef.operationName = 'GetArticles';
exports.getArticlesRef = getArticlesRef;

exports.getArticles = function getArticles(dc) {
  return executeQuery(getArticlesRef(dc));
};
