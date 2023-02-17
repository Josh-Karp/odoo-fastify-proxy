"use strict";

const axios = require("axios");
const Client = require("./client");
const validateKeys = require("./helpers/validateConfig");

class Odoo {
  constructor(config) {
    this.#validate(config);
    this.config = config || {};
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.host = config.host;
    this.port = config.port || undefined;
    this.protocol = config.protocol || "http";
    this.baseURL = config.port
      ? `${config.protocol}://${config.host}:${config.port}`
      : `${config.protocol}://${config.host}`;
  }

  #validate = (config) => {
    try {
      validateKeys(config);
    } catch (err) {
      throw err;
    }
  };

  connect = async () => {
    let body = JSON.stringify({
      params: {
        db: this.db,
        login: this.username,
        password: this.password,
      },
    });

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Content-Length": body.length,
      },
      data: body,
      withCredentials: false,
      baseURL: this.baseURL,
      url: "/web/session/authenticate",
    };

    try {
      const response = await axios(options);

      if (response.data.error) {
        return Promise.reject(response.data.error);
      }

      const OdooSessionId = response.headers["set-cookie"][0]
        .split(";")[0]
        .split("=")[1];

      return new Client({
        db: this.db,
        baseURL: this.baseURL,
        sessionId: OdooSessionId,
      });
    } catch (err) {
      return Promise.reject({ message: err.message });
    }
  };
}

module.exports = Odoo;