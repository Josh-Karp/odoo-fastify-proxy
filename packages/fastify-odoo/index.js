"use strict";

const fp = require("fastify-plugin");
const OdooClient = require("../node-odoo");
const extractUrlTokens = require("./helpers/extractUrlTokens");

async function fastifyOdoo(fastify, options) {
  options = Object.assign(
    {
      serverSelectionTimeoutMS: 7500,
    },
    options
  );
  const { forceClose, db, username, password, url, ...opts } = options;

  if (!url) {
    throw Error("`url` parameter is mandatory if no client is provided");
  }

  const { host, port, protocol } = extractUrlTokens(url);
  const odooConnector = new OdooClient(db, username, password, host, port, protocol);
  const client = await odooConnector.connect();

  decorateInstance(fastify, client, {
    forceClose,
    db: db,
  });
}

function decorateInstance(fastify, client, options) {
  const forceClose = options.forceClose;
  const db = options.db;
  const name = options.name;

  // TODO: Add a unique object ID to each Odoo client instance
  const odoo = {
    client,
    // ObjectId,
  };

  if (name) {
    if (!fastify.odoo) {
      fastify.decorate("odoo", odoo);
    }
    if (fastify.odoo[name]) {
      throw Error("Connection name already registered: " + name);
    }

    fastify.odoo[name] = odoo;
  } else {
    if (fastify.odoo) {
      throw Error("fastify-odoo has already registered");
    }
  }

  // if (dbName) {
  //   odoo.db = client.db(dbName);
  // }

  if (!fastify.odoo) {
    fastify.decorate("odoo", odoo);
  }
}

module.exports = fp(fastifyOdoo, {
  fastify: "4.x",
  name: "@fastify/odoo",
});
module.exports.default = fastifyOdoo;
module.exports.fastifyOdoo = fastifyOdoo;
