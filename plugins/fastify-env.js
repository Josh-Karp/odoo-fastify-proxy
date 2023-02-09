"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/env"), {
    schema: {
      type: "object",
      required: ["ODOO_DB", "ODOO_USERNAME", "ODOO_PASSWORD", "ODOO_URL"],
      properties: {
        ODOO_DB: { type: "string" },
        ODOO_USERNAME: { type: "string" },
        ODOO_PASSWORD: { type: "string" },
        ODOO_URL: { type: "string" },
      },
    },
  });
});
