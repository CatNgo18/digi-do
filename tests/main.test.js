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

// https://www.youtube.com/watch?v=8Xwq35cPwYg&t=1275s