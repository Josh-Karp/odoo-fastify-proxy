"use strict";

const axios = require("axios");
const OdooClient = require("./client");

class Odoo {
  constructor(db, username, password, host, port, protocol) {
    this.db = db;
    this.username = username;
    this.password = password;
    this.baseURL = `${protocol}://${host}:${port}`;
  }

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

      return new OdooClient({
        baseURL: this.baseURL,
        sessionId: OdooSessionId,
      });
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };
}

module.exports = Odoo;
