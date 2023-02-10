"use strict";

const isEmpty = require("lodash/isEmpty");

module.exports = async function (fastify, opts) {
  fastify.post("/auth/login", {
    schema: {
      summary: "Authenticate a user",
      description:
        "Authenticate a user and return a JWT token containing the User ID, Session ID, Session expiry and Name",
      tags: ["Auth", "Login"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            description: "User's email address",
          },
          password: {
            type: "string",
            description: "User's password",
          },
        },
      },
      response: {
        200: {
          description: "Login successful",
          type: "object",
          properties: {
            token: { type: "string", description: "JWT session token" },
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
    preHandler: async (request, reply) => {
      const { email, password } = request.body;
      if (isEmpty(email)) {
        reply.code(404).send({
          code: "EMPTY_PROPERTY",
          message: `The email property cannot be empty!`,
        });
        return null;
      }
      if (isEmpty(password)) {
        reply.code(404).send({
          code: "EMPTY_PROPERTY",
          message: `The password property cannot be empty!`,
        });
        return null;
      }
    },
    handler: async (request, reply) => {
      const { email, password } = request.body;
      console.log(email, password);
      return { token: "12345" };
    },
  });

  fastify.post("/auth/signup", {
    schema: {
      summary: "Create a new user",
      description: "Create a new user without a session",
      tags: ["Auth", "Signup", "Create"],
      body: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
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
        },
      },
      response: {
        200: {
          description: "Signup successful",
          type: "object",
          properties: {
            token: { type: "string", description: "JWT session token" },
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
    preHandler: async (request, reply) => {
      const { email, password } = request.body;
      // TODO: Loop over properties & validate
      if (isEmpty(email)) {
        reply.code(404).send({
          code: "EMPTY_PROPERTY",
          message: `The email property cannot be empty!`,
        });
        return null;
      }
      if (isEmpty(password)) {
        reply.code(404).send({
          code: "EMPTY_PROPERTY",
          message: `The password property cannot be empty!`,
        });
        return null;
      }
    },
    handler: async (request, reply) => {
      const { email, password } = request.body;
      return { token: "12345" };
    },
  });

  fastify.post("/auth/logout", {
    schema: {
      summary: "Logout a user",
      description: "Logout the current user & dispose session",
      tags: ["Auth"],
      headers: {
        type: "object",
        properties: {
          "X-AccessToken": {
            type: "string",
            description: "JWT session token",
          },
        },
        required: ["X-AccessToken"],
      },
      response: {
        200: {
          description: "Logout successful",
          type: "boolean",
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
    // preHandler: async (request, reply) => {
    //   const token = request.headers["X-AccessToken"];
    //   if (isEmpty(token)) {
    //     reply.code(404).send({
    //       code: "EMPTY_PROPERTY",
    //       message: `The JWT token cannot be empty!`,
    //     });
    //     return null;
    //   }
    // },
    handler: async (request, reply) => {
      const token = request.headers["X-AccessToken"];
      return true;
    },
  });

  fastify.get("/auth/session_info", {
    schema: {
      headers: {
        type: "object",
        properties: {
          "X-AccessToken": {
            type: "string",
            description: "JWT session token",
          },
        },
        required: ["X-AccessToken"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            partner_id: { type: "integer", description: "Related Contact ID" },
            username: { type: "string", description: "Username" },
            uid: { type: "integer", description: " User ID" },
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
      return { partner_id: "1", username: "Tester", uid: "1" };
    },
  });

  fastify.post("/auth/reset_password", {
    schema: {
      summary: "Reset password",
      description: "Reset a user password",
      tags: ["Auth", "Password", "Reset"],
      body: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            description: "User's email address",
          },
        },
        required: ["email"],
      },
      response: {
        200: {
          description: "Reset successful",
          type: "boolean",
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
    preHandler: async (request, reply) => {
      const { email } = request.body;
      if (isEmpty(email)) {
        reply.code(404).send({
          code: "EMPTY_PROPERTY",
          message: `The email property cannot be empty!`,
        });
        return null;
      }
    },
    handler: async (request, reply) => {
      const { email } = request.body;
      console.log(email);
      return true;
    },
  });
};
