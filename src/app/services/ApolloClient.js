import { BASE_URL } from 'react-native-dotenv'
import { createApolloFetch } from 'apollo-fetch';

const uri = `${BASE_URL}/graphql`;

export function applyApolloMiddleware(credential) {
    client.use((response, next) => {
        const { options } = response;

        if (!options.headers) {
            options.headers = {};
        }
        options.headers['X-User-Email'] = credential.email;
        options.headers['X-User-Token'] = credential.authentication_token;
        next();
    });
}

export const client = createApolloFetch({ uri });
