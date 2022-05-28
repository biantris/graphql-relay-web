import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from 'relay-runtime';

import { fetchQuery } from './fetchQuery';

const fetchRelay: FetchFunction = async (params, variables) =>
  fetchQuery(params.text as string, variables);

export const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
})