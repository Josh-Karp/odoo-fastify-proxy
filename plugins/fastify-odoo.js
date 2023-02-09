"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("../packages/fastify-odoo"), {
    forceClose: true,
    db: fastify.config.ODOO_DB,
    username: fastify.config.ODOO_USERNAME,
    password: fastify.config.ODOO_PASSWORD,
    url: fastify.config.ODOO_URL,
  });
});
