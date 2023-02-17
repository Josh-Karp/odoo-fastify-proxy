"use strict";

const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

class Client {
  constructor({ db, ...options}) {
    this.options = options || {};
    this.objectId = new ObjectId();
    this.db = db
  }

  read = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "read",
      args: [params.ids],
      kwargs: {
        fields: params.fields,
        context: this.options?.context,
      },
    });
  };

  write = (model, id, params) => {
    if (id) {
      return this.#request("/web/dataset/call_kw", {
        model: model,
        method: "write",
        args: [[id], params],
        kwargs: {
          context: this.options?.context,
        },
      });
    }
  };

  create = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "create",
      args: [params],
      kwargs: {
        context: this.options?.context,
      },
    });
  };

  delete = (model, id) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "unlink",
      args: [[id]],
      kwargs: {
        context: this.options?.context,
      },
    });
  };

  search = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "search",
      args: [params.domain],
      kwargs: {
        context: this.options?.context,
        limit: params.limit,
      },
    });
  };

  search_read = (model, params) => {
    return this.#request("/web/dataset/call_kw", {
      model: model,
      method: "search_read",
      args: [],
      kwargs: {
        context: this.options?.context,
        domain: params.domain,
        offset: params.offset,
        limit: params.limit,
        order: params.order,
        fields: params.fields,
      },
    });
  };

  search_by_id = (model, id, params) => {
    const constructed_params = {
      domain: [["id", "=", id]],
      limit: 1,
      ...params,
    };
    return this.search_read(model, constructed_params);
  };

  rpc_call = (endpoint, params) => {
    return this.#request(endpoint, params);
  };

  #request = async (path, params) => {
    params = params || {};

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Openerp-Session-Id": this.options.sessionId,
        Accept: "application/json",
      },
      data: JSON.stringify({
        jsonrpc: "2.0",
        id: new Date().getUTCMilliseconds(),
        method: "rpc_call",
        params: params,
      }),
      withCredentials: false,
      baseURL: this.options.baseURL,
      url: path || "/",
    };

    try {
      const response = await axios(options);

      if (response.data.error) {
        console.error(err);
        return Promise.reject(response.data.error);
      }

      return response.data.result;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };
}

class ObjectId {
  constructor() {
    this.id = uuidv4();
  }

  getTimestamp() {
    const timestamp = parseInt(this.id.substr(0, 8), 16);
    return new Date(timestamp * 1000);
  }

  valueOf() {
    return this.id;
  }
}

module.exports = Client;
