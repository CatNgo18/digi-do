import { afterEach, assert, beforeEach, describe, expect, test, it } from "vitest";
import { makeServer } from "../src/mirage";

let server;

beforeEach(() => {
    server = makeServer({environment: 'test'});
});

afterEach(() => {
    server.shutdown();
});

describe('group', () => {
    it('should', () => {
        expect(1).toBeTruthy();
    })
})

// https://www.robinwieruch.de/vitest-react-testing-library/
// https://miragejs.com/quickstarts/react/test-a-component-with-react-testing-library/