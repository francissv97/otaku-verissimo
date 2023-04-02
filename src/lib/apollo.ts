import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    typePolicies: {
      
      Page: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
      Media: {
        fields: {
          title: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            },
          },
        },
        keyFields: ["id"],
      },
      Staff: {
        fields: {
          image: {
            merge: true,
          },
          name: {
            merge: true,
          },
          characters: {
            merge: true,
          },
        },
        keyFields: ["id"],
      },
      Character: {
        fields: {
          image: {
            merge: true,
          },
        },
      },
    },
  }),
});
