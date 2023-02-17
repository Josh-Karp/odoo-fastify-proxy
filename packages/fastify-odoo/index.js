"use strict";

const fp = require("fastify-plugin");
const Odoo = require("../node-odoo");
const extractUrlTokens = require("./helpers/extractUrlTokens");

async function fastifyOdoo(fastify, options) {
  options = Object.assign(
    {
      serverSelectionTimeoutMS: 7500,
    },
    options
  );
  const { forceClose = false, db, username, password, url, ...opts } = options;

  const requiredProps = ["db", "username", "password", "url"];
  requiredProps.forEach((prop) => {
    if (!options[prop]) {
      throw new Error(`"${prop}" parameter is mandatory`);
    }
  });

  const { host, port, protocol } = extractUrlTokens(url);
  const client = await new Odoo({
    db,
    username,
    password,
    host,
    port,
    protocol,
  }).connect();

  decorateInstance(fastify, client, {
    forceClose,
    // database: db,
    name: opts?.name,
  });
}

function decorateInstance(fastify, client, options) {
  const forceClose = options.forceClose;
  const name = options.name;

  // TODO: Add onClose hook to force close connection

  if (name) {
    if (!fastify.odoo) {
      fastify.decorate("odoo", { [name]: client });
      return
    }
    if (fastify.odoo[name]) {
      throw Error("Connection name already registered: " + name);
    } else {
      fastify.odoo[name] = client;
      return
    }
  }

  if (fastify.odoo) {
    throw Error(
      "Fastify-odoo has already registered. Please use a named instance for multiple connections"
    );
  } else {
    fastify.decorate("odoo", { client });
  }
}

module.exports = fp(fastifyOdoo, {
  fastify: "4.x",
  name: "@fastify/odoo",
});
module.exports.default = fastifyOdoo;
module.exports.fastifyOdoo = fastifyOdoo;

module.exports.odoo = require("../node-odoo");
