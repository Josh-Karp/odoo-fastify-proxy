"use strict";

const test = require("tap").test;
const extractUrlTokens = require("../helpers/extractUrlTokens");

test("should extract url tokens", (t) => {
  t.plan(2);

  t.deepEqual(extractUrlTokens("http://localhost:8080"), {
    protocol: "http",
    host: "localhost",
    port: "8080",
  });

  t.equal(extractUrlTokens("invalid_url"), null);
});
