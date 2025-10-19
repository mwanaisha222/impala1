import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Application_Key {
  id: UUIDString;
  __typename?: 'Application_Key';
}

export interface Article_Key {
  id: UUIDString;
  __typename?: 'Article_Key';
}

export interface CompanyInfo_Key {
  id: UUIDString;
  __typename?: 'CompanyInfo_Key';
}

export interface CreateJobOpeningData {
  jobOpening_insert: JobOpening_Key;
}

export interface CreateJobOpeningVariables {
  deadline: TimestampString;
  description: string;
  location?: string | null;
  postedAt: TimestampString;
  requirements?: string | null;
  responsibilities?: string | null;
  salaryRange?: string | null;
  title: string;
}

export interface GetArticlesData {
  articles: ({
    id: UUIDString;
    title: string;
    content: string;
    author?: string | null;
    publishedAt: TimestampString;
    imageUrl?: string | null;
  } & Article_Key)[];
}

export interface GetJobOpeningsData {
  jobOpenings: ({
    id: UUIDString;
    title: string;
    description: string;
    postedAt: TimestampString;
    deadline: TimestampString;
    location?: string | null;
    salaryRange?: string | null;
  } & JobOpening_Key)[];
}

export interface JobOpening_Key {
  id: UUIDString;
  __typename?: 'JobOpening_Key';
}

export interface SubscribeData {
  subscriptionType_insert: SubscriptionType_Key;
}

export interface SubscribeVariables {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  subscribedAt: TimestampString;
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

interface CreateJobOpeningRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobOpeningVariables): MutationRef<CreateJobOpeningData, CreateJobOpeningVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateJobOpeningVariables): MutationRef<CreateJobOpeningData, CreateJobOpeningVariables>;
  operationName: string;
}
export const createJobOpeningRef: CreateJobOpeningRef;

export function createJobOpening(vars: CreateJobOpeningVariables): MutationPromise<CreateJobOpeningData, CreateJobOpeningVariables>;
export function createJobOpening(dc: DataConnect, vars: CreateJobOpeningVariables): MutationPromise<CreateJobOpeningData, CreateJobOpeningVariables>;

interface GetJobOpeningsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetJobOpeningsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetJobOpeningsData, undefined>;
  operationName: string;
}
export const getJobOpeningsRef: GetJobOpeningsRef;

export function getJobOpenings(): QueryPromise<GetJobOpeningsData, undefined>;
export function getJobOpenings(dc: DataConnect): QueryPromise<GetJobOpeningsData, undefined>;

interface SubscribeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubscribeVariables): MutationRef<SubscribeData, SubscribeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubscribeVariables): MutationRef<SubscribeData, SubscribeVariables>;
  operationName: string;
}
export const subscribeRef: SubscribeRef;

export function subscribe(vars: SubscribeVariables): MutationPromise<SubscribeData, SubscribeVariables>;
export function subscribe(dc: DataConnect, vars: SubscribeVariables): MutationPromise<SubscribeData, SubscribeVariables>;

interface GetArticlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetArticlesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetArticlesData, undefined>;
  operationName: string;
}
export const getArticlesRef: GetArticlesRef;

export function getArticles(): QueryPromise<GetArticlesData, undefined>;
export function getArticles(dc: DataConnect): QueryPromise<GetArticlesData, undefined>;

