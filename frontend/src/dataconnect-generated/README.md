# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetJobOpenings*](#getjobopenings)
  - [*GetArticles*](#getarticles)
- [**Mutations**](#mutations)
  - [*CreateJobOpening*](#createjobopening)
  - [*Subscribe*](#subscribe)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetJobOpenings
You can execute the `GetJobOpenings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getJobOpenings(): QueryPromise<GetJobOpeningsData, undefined>;

interface GetJobOpeningsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetJobOpeningsData, undefined>;
}
export const getJobOpeningsRef: GetJobOpeningsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getJobOpenings(dc: DataConnect): QueryPromise<GetJobOpeningsData, undefined>;

interface GetJobOpeningsRef {
  ...
  (dc: DataConnect): QueryRef<GetJobOpeningsData, undefined>;
}
export const getJobOpeningsRef: GetJobOpeningsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getJobOpeningsRef:
```typescript
const name = getJobOpeningsRef.operationName;
console.log(name);
```

### Variables
The `GetJobOpenings` query has no variables.
### Return Type
Recall that executing the `GetJobOpenings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetJobOpeningsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetJobOpenings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getJobOpenings } from '@dataconnect/generated';


// Call the `getJobOpenings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getJobOpenings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getJobOpenings(dataConnect);

console.log(data.jobOpenings);

// Or, you can use the `Promise` API.
getJobOpenings().then((response) => {
  const data = response.data;
  console.log(data.jobOpenings);
});
```

### Using `GetJobOpenings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getJobOpeningsRef } from '@dataconnect/generated';


// Call the `getJobOpeningsRef()` function to get a reference to the query.
const ref = getJobOpeningsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getJobOpeningsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.jobOpenings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpenings);
});
```

## GetArticles
You can execute the `GetArticles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getArticles(): QueryPromise<GetArticlesData, undefined>;

interface GetArticlesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetArticlesData, undefined>;
}
export const getArticlesRef: GetArticlesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getArticles(dc: DataConnect): QueryPromise<GetArticlesData, undefined>;

interface GetArticlesRef {
  ...
  (dc: DataConnect): QueryRef<GetArticlesData, undefined>;
}
export const getArticlesRef: GetArticlesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getArticlesRef:
```typescript
const name = getArticlesRef.operationName;
console.log(name);
```

### Variables
The `GetArticles` query has no variables.
### Return Type
Recall that executing the `GetArticles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetArticlesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetArticles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getArticles } from '@dataconnect/generated';


// Call the `getArticles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getArticles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getArticles(dataConnect);

console.log(data.articles);

// Or, you can use the `Promise` API.
getArticles().then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

### Using `GetArticles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getArticlesRef } from '@dataconnect/generated';


// Call the `getArticlesRef()` function to get a reference to the query.
const ref = getArticlesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getArticlesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.articles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateJobOpening
You can execute the `CreateJobOpening` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createJobOpening(vars: CreateJobOpeningVariables): MutationPromise<CreateJobOpeningData, CreateJobOpeningVariables>;

interface CreateJobOpeningRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateJobOpeningVariables): MutationRef<CreateJobOpeningData, CreateJobOpeningVariables>;
}
export const createJobOpeningRef: CreateJobOpeningRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createJobOpening(dc: DataConnect, vars: CreateJobOpeningVariables): MutationPromise<CreateJobOpeningData, CreateJobOpeningVariables>;

interface CreateJobOpeningRef {
  ...
  (dc: DataConnect, vars: CreateJobOpeningVariables): MutationRef<CreateJobOpeningData, CreateJobOpeningVariables>;
}
export const createJobOpeningRef: CreateJobOpeningRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createJobOpeningRef:
```typescript
const name = createJobOpeningRef.operationName;
console.log(name);
```

### Variables
The `CreateJobOpening` mutation requires an argument of type `CreateJobOpeningVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateJobOpening` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateJobOpeningData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateJobOpeningData {
  jobOpening_insert: JobOpening_Key;
}
```
### Using `CreateJobOpening`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createJobOpening, CreateJobOpeningVariables } from '@dataconnect/generated';

// The `CreateJobOpening` mutation requires an argument of type `CreateJobOpeningVariables`:
const createJobOpeningVars: CreateJobOpeningVariables = {
  deadline: ..., 
  description: ..., 
  location: ..., // optional
  postedAt: ..., 
  requirements: ..., // optional
  responsibilities: ..., // optional
  salaryRange: ..., // optional
  title: ..., 
};

// Call the `createJobOpening()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createJobOpening(createJobOpeningVars);
// Variables can be defined inline as well.
const { data } = await createJobOpening({ deadline: ..., description: ..., location: ..., postedAt: ..., requirements: ..., responsibilities: ..., salaryRange: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createJobOpening(dataConnect, createJobOpeningVars);

console.log(data.jobOpening_insert);

// Or, you can use the `Promise` API.
createJobOpening(createJobOpeningVars).then((response) => {
  const data = response.data;
  console.log(data.jobOpening_insert);
});
```

### Using `CreateJobOpening`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createJobOpeningRef, CreateJobOpeningVariables } from '@dataconnect/generated';

// The `CreateJobOpening` mutation requires an argument of type `CreateJobOpeningVariables`:
const createJobOpeningVars: CreateJobOpeningVariables = {
  deadline: ..., 
  description: ..., 
  location: ..., // optional
  postedAt: ..., 
  requirements: ..., // optional
  responsibilities: ..., // optional
  salaryRange: ..., // optional
  title: ..., 
};

// Call the `createJobOpeningRef()` function to get a reference to the mutation.
const ref = createJobOpeningRef(createJobOpeningVars);
// Variables can be defined inline as well.
const ref = createJobOpeningRef({ deadline: ..., description: ..., location: ..., postedAt: ..., requirements: ..., responsibilities: ..., salaryRange: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createJobOpeningRef(dataConnect, createJobOpeningVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.jobOpening_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.jobOpening_insert);
});
```

## Subscribe
You can execute the `Subscribe` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
subscribe(vars: SubscribeVariables): MutationPromise<SubscribeData, SubscribeVariables>;

interface SubscribeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubscribeVariables): MutationRef<SubscribeData, SubscribeVariables>;
}
export const subscribeRef: SubscribeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
subscribe(dc: DataConnect, vars: SubscribeVariables): MutationPromise<SubscribeData, SubscribeVariables>;

interface SubscribeRef {
  ...
  (dc: DataConnect, vars: SubscribeVariables): MutationRef<SubscribeData, SubscribeVariables>;
}
export const subscribeRef: SubscribeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the subscribeRef:
```typescript
const name = subscribeRef.operationName;
console.log(name);
```

### Variables
The `Subscribe` mutation requires an argument of type `SubscribeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubscribeVariables {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  subscribedAt: TimestampString;
}
```
### Return Type
Recall that executing the `Subscribe` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubscribeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubscribeData {
  subscriptionType_insert: SubscriptionType_Key;
}
```
### Using `Subscribe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, subscribe, SubscribeVariables } from '@dataconnect/generated';

// The `Subscribe` mutation requires an argument of type `SubscribeVariables`:
const subscribeVars: SubscribeVariables = {
  email: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  subscribedAt: ..., 
};

// Call the `subscribe()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await subscribe(subscribeVars);
// Variables can be defined inline as well.
const { data } = await subscribe({ email: ..., firstName: ..., lastName: ..., subscribedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await subscribe(dataConnect, subscribeVars);

console.log(data.subscriptionType_insert);

// Or, you can use the `Promise` API.
subscribe(subscribeVars).then((response) => {
  const data = response.data;
  console.log(data.subscriptionType_insert);
});
```

### Using `Subscribe`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, subscribeRef, SubscribeVariables } from '@dataconnect/generated';

// The `Subscribe` mutation requires an argument of type `SubscribeVariables`:
const subscribeVars: SubscribeVariables = {
  email: ..., 
  firstName: ..., // optional
  lastName: ..., // optional
  subscribedAt: ..., 
};

// Call the `subscribeRef()` function to get a reference to the mutation.
const ref = subscribeRef(subscribeVars);
// Variables can be defined inline as well.
const ref = subscribeRef({ email: ..., firstName: ..., lastName: ..., subscribedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = subscribeRef(dataConnect, subscribeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.subscriptionType_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.subscriptionType_insert);
});
```

