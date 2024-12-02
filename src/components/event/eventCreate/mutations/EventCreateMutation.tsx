import { graphql } from "react-relay";
import { ROOT_ID, SelectorStoreUpdater } from "relay-runtime";

import { connectionUpdater } from "../../../../relay";

export const EventCreate = graphql`
  mutation EventCreateMutation($input: EventCreateInput!) {
    EventCreate(input: $input) {
      event {
        id
        name
        start
        end
        allDay
      }
      error
      success
    }
  }
`;

export const updater: SelectorStoreUpdater = (store) => {
  const newEdge = store.getRootField("EventCreate").getLinkedRecord("event");

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    //connectionName: 'Feed_posts',
    edge: newEdge,
    before: true,
  });
};
