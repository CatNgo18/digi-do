import { afterEach, assert, beforeEach, describe, expect, test } from "vitest";
import App from "../App";
import { makeServer } from "../mirage";

let server;
const USER_ID = 1;

beforeEach(() => {
    server = makeServer({environment: 'test'});
});

afterEach(() => {
    server.shutdown();
});

describe('/api/user', () => {
    describe('GET /api/user/:userId', () => {
        test('user exists', async () => {
            // const user = server.create("user", {
            //     /* @ts-ignore */
            //     name: "Test",
            // });

            // let response = await fetch(`/api/users/${user.id}`);
            // assert.equal(response.status, 200);

            // assert.deepEqual(response.json().user, user);

            // server.create("user", {id: 1, name: "Test"});

            // const { getByTestId } = render

        });

        test('user does not exist', async () => {
            // let response = await fetch(`/api/users/1`);

            // assert.equal(response.status, 404);
        });
    })
})

// https://www.robinwieruch.de/vitest-react-testing-library/
// https://miragejs.com/quickstarts/react/test-a-component-with-react-testing-library/