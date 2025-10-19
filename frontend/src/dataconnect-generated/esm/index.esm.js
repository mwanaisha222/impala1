import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'frontend',
  location: 'us-east4'
};

export const createJobOpeningRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateJobOpening', inputVars);
}
createJobOpeningRef.operationName = 'CreateJobOpening';

export function createJobOpening(dcOrVars, vars) {
  return executeMutation(createJobOpeningRef(dcOrVars, vars));
}

export const getJobOpeningsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetJobOpenings');
}
getJobOpeningsRef.operationName = 'GetJobOpenings';

export function getJobOpenings(dc) {
  return executeQuery(getJobOpeningsRef(dc));
}

export const subscribeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'Subscribe', inputVars);
}
subscribeRef.operationName = 'Subscribe';

export function subscribe(dcOrVars, vars) {
  return executeMutation(subscribeRef(dcOrVars, vars));
}

export const getArticlesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetArticles');
}
getArticlesRef.operationName = 'GetArticles';

export function getArticles(dc) {
  return executeQuery(getArticlesRef(dc));
}

