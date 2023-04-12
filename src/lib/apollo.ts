import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        merge: true,
      },
      Media: {
        fields: {
          title: {
            merge: true,
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
          name: {
            merge: true,
          },
        },
      },
    },
  }),
});
