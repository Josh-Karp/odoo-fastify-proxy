"use strict";

const isEmpty = require("lodash/isEmpty");

module.exports = async function (fastify, opts) {
  fastify.post("/users/create", {
    schema: {
      summary: "Create a new user",
      description: "Create a new user",
      tags: ["User"],
      params: {
        type: "object",
        properties: {
          firstName: {
            type: "number",
            description: "a User id",
          },
          lastName: {
            type: "string",
            description: "User's last name",
          },
          email: {
            type: "string",
            description: "User's email address",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          // TODO: Implement a date type
          dob: {
            type: "string",
            description: "User's date of birth",
          },
        },
      },
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            id: {
              type: "number",
              format: "uuid",
            },
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
          },
        },
        "4xx": {
          description: "Bad request",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        "5xx": {
          description: "Server error",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      return request.params;
    },
  });

  fastify.get("/users/:id", {
    schema: {
      summary: "Get user's Data",
      description: "Returns a given user's data",
      tags: ["User"],
      params: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "User's id",
          },
        },
      },
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            id: {
              type: "number",
              format: "uuid",
            },
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
            },
          },
        },
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
    preHandler: async (request, reply) => {
      const { id } = request.params;
      if (id <= 0) {
        reply.code(404).send({
          code: "USER_NOT_FOUND",
          message: `The user #${id} not found!`,
        });
        return null;
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const user = await fastify.odoo.client.search_by_id("res.partner", id);

      if (isEmpty(user)) {
        reply.code(404).send({
          code: "USER_NOT_FOUND",
          message: `The user #${id} not found!`,
        });
        return null;
      }

      const [firstName, lastName] = user[0].name.split(" ");
      return {
        id: id,
        email: user[0].email,
        firstName: firstName,
        lastName: lastName,
      };
    },
  });
};
