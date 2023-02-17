"use strict";

const t = require("tap");
const { test } = t;
const Fastify = require("fastify");
const fastifyOdoo = require("..");
const Odoo = require("../../node-odoo");

const ODOO_DB = "localhost";
const ODOO_USERNAME = "admin";
const ODOO_PASSWORD = "admin";
const ODOO_URL = "http://localhost:8069";
const ODOO_MODEL = "res.partner";
const CLIENT_NAME = "client_name";

const ODOO_CONFIG = {
  db: ODOO_DB,
  username: ODOO_USERNAME,
  password: ODOO_PASSWORD,
  url: ODOO_URL,
};

test("export of odoo", (t) => {
  t.plan(1);
  t.same(typeof fastifyOdoo.odoo, "function");
});

test("register odoo plugin with no name", (t) => {
  t.plan(5 + 2);
  register(t, ODOO_CONFIG, function (err, fastify) {
    t.error(err);
    t.ok(fastify.odoo);
    t.ok(fastify.odoo.client);
    t.ok(fastify.odoo.client.objectId);
    t.ok(fastify.odoo.client.db);

    testClient(t, fastify.odoo.client);
  });
});

test("register odoo plugin with name", (t) => {
  t.plan(5 + 2);
  register(t, { name: CLIENT_NAME, ...ODOO_CONFIG }, function (err, fastify) {
    t.error(err);
    t.ok(fastify.odoo);
    t.ok(fastify.odoo[CLIENT_NAME]);
    t.ok(fastify.odoo[CLIENT_NAME].objectId);
    t.ok(fastify.odoo[CLIENT_NAME].db);

    testClient(t, fastify.odoo[CLIENT_NAME]);
  });
});

test("double register without name", (t) => {
  t.plan(2);

  const fastify = Fastify();
  t.teardown(() => fastify.close());

  fastify
    .register(fastifyOdoo, ODOO_CONFIG)
    .register(fastifyOdoo, ODOO_CONFIG)
    .ready((err) => {
      t.ok(err);
      t.equal(err.message, "Fastify-odoo has already registered. Please use a named instance for multiple connections");
    });
});

test("double register with the same name", (t) => {
  t.plan(2);

  const fastify = Fastify();
  t.teardown(() => fastify.close());

  fastify
    .register(fastifyOdoo, { ...ODOO_CONFIG, name: CLIENT_NAME })
    .register(fastifyOdoo, { ...ODOO_CONFIG, name: CLIENT_NAME })
    .ready((err) => {
      t.ok(err);
      t.equal(
        err.message,
        "Connection name already registered: " + CLIENT_NAME
      );
    });
});

test('double register with different name', t => {
  t.plan(8 + 2 + 2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  fastify
    .register(fastifyOdoo, { ...ODOO_CONFIG, name: 'client1' })
    .register(fastifyOdoo, { ...ODOO_CONFIG, name: 'client2' })
    .ready(err => {
      t.error(err)
      t.ok(fastify.odoo)

      t.ok(fastify.odoo.client1)
      t.ok(fastify.odoo.client1.objectId)
      t.ok(fastify.odoo.client1.db)

      t.ok(fastify.odoo.client2)
      t.ok(fastify.odoo.client2.objectId)
      t.ok(fastify.odoo.client2.db)

      testClient(t, fastify.odoo.client1)
      testClient(t, fastify.odoo.client2)
    })
})

test("immutable options", (t) => {
  t.plan(2);

  const given = ODOO_CONFIG;
  register(t, given, function (err, fastify) {
    t.error(err);
    t.same(given, {
      url: ODOO_URL,
      username: ODOO_USERNAME,
      password: ODOO_PASSWORD,
      db: ODOO_DB,
    });
  });
});

test("empty configuration", (t) => {
  t.plan(2);
  register(t, {}, function (err, fastify) {
    t.ok(err);
    t.equal(
      err.message,
      '"db" parameter is mandatory'
    );
  });
});

test("connection refused", (t) => {
  t.plan(2);

  const fastify = Fastify();
  t.teardown(() => fastify.close());

  fastify
    .register(fastifyOdoo, { ...ODOO_CONFIG, url: "http://127.0.0.1:9999" })
    .ready((err) => {
      t.ok(err);
      t.equal(err.message, "connect ECONNREFUSED 127.0.0.1:9999");
    });
});

function register(t, options, callback) {
  const fastify = Fastify();
  t.teardown(() => fastify.close());

  fastify
    .register(fastifyOdoo, options)
    .then(() => {
      callback(null, fastify);
    })
    .catch((err) => {
      callback(err, fastify);
    });
}

async function testClient(t, client) {
  const params = {
    fields: ["name", "email", "city", "street", "type", "user_ids"],
  };
  const partner = await client.search_by_id(ODOO_MODEL, 3, params);
  t.ok(partner);
  t.same(partner[0], {
    city: "Scranton",
    user_ids: [2],
    street: "215 Vine St",
    type: "contact",
    name: "Mitchell Admin",
    id: 3,
    email: "admin@yourcompany.example.com",
  });
}
