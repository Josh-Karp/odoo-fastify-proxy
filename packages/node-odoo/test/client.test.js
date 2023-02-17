const t = require("tap");
const { test, beforeEach } = t;
const Odoo = require("..");
const axios = require("axios");

const ODOO_DB = "localhost";
const ODOO_USERNAME = "admin";
const ODOO_PASSWORD = "admin";
const ODOO_PORT = "8069";
const ODOO_HOST = "localhost";
const ODOO_PROTOCOL = "http";
const ODOO_MODEL = "res.partner";

const ODOO_CONFIG = {
  host: ODOO_HOST,
  protocol: ODOO_PROTOCOL,
  db: ODOO_DB,
  username: ODOO_USERNAME,
  password: ODOO_PASSWORD,
  port: ODOO_PORT,
};

beforeEach(async (t) => {
  t.context.connection = await new Odoo(ODOO_CONFIG).connect();
});

// TODO: Add disconnect functionality
// t.afterEach(t => {
//   t.context.connection.disconnect()
// })

test("should search and read single partner", async (t) => {
  const client = t.context.connection;
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
  t.end();
});

test("should return empty partner list", async (t) => {
  const client = t.context.connection;
  const empty_partner = await client.search_by_id(ODOO_MODEL, 999999);
  t.ok(empty_partner);
  t.same(empty_partner, []);
  t.end();
});

test("should search and read partners", async (t) => {
  const client = t.context.connection;
  const params = {
    domain: [["active", "=", "true"]],
    fields: ["name", "email", "user_ids"],
    order: "name ASC",
    limit: 3,
    offset: 0,
  };
  const partner = await client.search_read(ODOO_MODEL, params);
  t.ok(partner);
  t.same(partner, [
    {
      user_ids: [],
      name: "Addison Olson",
      id: 35,
      email: "addison.olson28@example.com",
    },
    {
      user_ids: [],
      name: "Azure Interior",
      id: 14,
      email: "azure.Interior24@example.com",
    },
    {
      user_ids: [],
      name: "Billy Fox",
      id: 21,
      email: "billy.fox45@example.com",
    },
  ]);
  t.end();
});

test("should search partners", async (t) => {
  const client = t.context.connection;
  const params = {
    domain: [["is_company", "=", true]],
    limit: 2,
  };
  const ids = await client.search(ODOO_MODEL, params);
  t.ok(ids);
  t.same(ids, [14, 10]);
  t.end();
});

t.only("should create, update and delete partner", async (t) => {
  let partner_id;
  test("should create partner", async (t) => {
    const client = t.context.connection;
    partner_id = await client.create(ODOO_MODEL, {
      name: "unit_test",
      email: "unit_test@unit_test.com",
    });
    t.ok(partner_id);
    t.end();
  });

  test("should update partner", async (t) => {
    const client = t.context.connection;
    const updated = await client.write(ODOO_MODEL, partner_id, {
      name: "unit_test_updated",
      email: "unit_test@unit_test.com",
    });
    t.ok(updated);
    const params = {
      fields: ["name", "email", "city", "street", "type", "user_ids"],
    };
    const partner = await client.search_by_id(ODOO_MODEL, partner_id, params);
    t.ok(partner);
    t.same(partner[0], {
      city: false,
      user_ids: [],
      street: false,
      type: "contact",
      name: "unit_test_updated",
      id: partner_id,
      email: "unit_test@unit_test.com",
    });
    t.end();
  });

  test("should delete partner", async (t) => {
    const client = t.context.connection;
    const deleted = await client.delete(ODOO_MODEL, partner_id);
    t.ok(deleted);
  });
});

test("should read partners", async (t) => {
  const client = t.context.connection;
  const params = {
    ids: [1, 2, 3],
    fields: ["name"],
  };
  const partners = await client.read(ODOO_MODEL, params);
  t.ok(partners);
  t.same(partners, [
    { name: "YourCompany", id: 1 },
    { name: "System", id: 2 },
    { name: "Mitchell Admin", id: 3 },
  ]);
  t.end();
});

test("generic rpc call", async (t) => {
  const client = t.context.connection;
  const params = {
    model: "res.lang",
    method: "search",
    args: [[["code", "=", "en_US"]]],
    kwargs: {
      limit: 1,
    },
  };
  const response = await client.rpc_call("/web/dataset/call_kw", params);
  t.ok(response);
  t.same(response, [1]);
  t.end();
});
