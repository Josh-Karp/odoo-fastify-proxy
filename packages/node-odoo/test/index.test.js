"use strict";

const t = require("tap");
const { test } = t;
const Odoo = require("..");

const ODOO_DB = "unit_test";
const ODOO_USERNAME = "admin";
const ODOO_PASSWORD = "admin";
const ODOO_PORT = "8069";
const ODOO_HOST = "localhost";
const ODOO_PROTOCOL = "http";

const ODOO_CONFIG = {
  host: ODOO_HOST,
  protocol: ODOO_PROTOCOL,
  db: ODOO_DB,
  username: ODOO_USERNAME,
  password: ODOO_PASSWORD,
  port: ODOO_PORT,
};

test("should create odoo immutable connector instance", (t) => {
  const { db, username, password, host, port, protocol, baseURL } = new Odoo(
    ODOO_CONFIG
  );
  t.same(ODOO_CONFIG, {
    db: ODOO_DB,
    username: ODOO_USERNAME,
    password: ODOO_PASSWORD,
    host: ODOO_HOST,
    protocol: ODOO_PROTOCOL,
    port: ODOO_PORT,
  });
  t.equal(baseURL, `${ODOO_PROTOCOL}://${ODOO_HOST}:${ODOO_PORT}`);
  t.end();
});

test("should establish odoo connection", async (t) => {
  const client = await new Odoo(ODOO_CONFIG).connect();
  t.ok(client);
  t.ok(client.write);
  t.ok(client.create);
  t.ok(client.delete);
  t.ok(client.search);
  t.ok(client.search_read);
  t.ok(client.search_by_id);
  t.ok(client.rpc_call);
  t.ok(client.options);
  t.ok(client.objectId);
  t.end();
});

// test("should error", async (t) => {
//   const given = {
//     protocol: ODOO_PROTOCOL,
//     host: "incorrect-host",
//   };
//   const client = await new Odoo(given).connect();
//   console.log(client)
//   t.ok(client);
//   t.equal(client.message, "connect ECONNREFUSED 127.0.0.1:9999");
// });
