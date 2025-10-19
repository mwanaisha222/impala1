import { CreateJobOpeningData, CreateJobOpeningVariables, GetJobOpeningsData, SubscribeData, SubscribeVariables, GetArticlesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateJobOpening(options?: useDataConnectMutationOptions<CreateJobOpeningData, FirebaseError, CreateJobOpeningVariables>): UseDataConnectMutationResult<CreateJobOpeningData, CreateJobOpeningVariables>;
export function useCreateJobOpening(dc: DataConnect, options?: useDataConnectMutationOptions<CreateJobOpeningData, FirebaseError, CreateJobOpeningVariables>): UseDataConnectMutationResult<CreateJobOpeningData, CreateJobOpeningVariables>;

export function useGetJobOpenings(options?: useDataConnectQueryOptions<GetJobOpeningsData>): UseDataConnectQueryResult<GetJobOpeningsData, undefined>;
export function useGetJobOpenings(dc: DataConnect, options?: useDataConnectQueryOptions<GetJobOpeningsData>): UseDataConnectQueryResult<GetJobOpeningsData, undefined>;

export function useSubscribe(options?: useDataConnectMutationOptions<SubscribeData, FirebaseError, SubscribeVariables>): UseDataConnectMutationResult<SubscribeData, SubscribeVariables>;
export function useSubscribe(dc: DataConnect, options?: useDataConnectMutationOptions<SubscribeData, FirebaseError, SubscribeVariables>): UseDataConnectMutationResult<SubscribeData, SubscribeVariables>;

export function useGetArticles(options?: useDataConnectQueryOptions<GetArticlesData>): UseDataConnectQueryResult<GetArticlesData, undefined>;
export function useGetArticles(dc: DataConnect, options?: useDataConnectQueryOptions<GetArticlesData>): UseDataConnectQueryResult<GetArticlesData, undefined>;
