"use strict";

const axios = require("axios");

class OdooClient {
  constructor(options) {
    this.options = options;
  }

  read = (model, params) => {
    return this._request("/web/dataset/call_kw", {
      model: model,
      method: "read",
      args: [params.ids],
      kwargs: {
        fields: params.fields,
      },
    });
  };

  write = (model, id, params) => {
    if (id) {
      return this._request("/web/dataset/call_kw", {
        model: model,
        method: "write",
        args: [[id], params],
        kwargs: {
          context: this.opts.context,
        },
      });
    }
  };

  create = (model, params) => {
    return this._request("/web/dataset/call_kw", {
      model: model,
      method: "create",
      args: [params],
      kwargs: {
        context: this.opts.context,
      },
    });
  };

  delete = (model, id) => {
    return this._request("/web/dataset/call_kw", {
      model: model,
      method: "unlink",
      args: [[id]],
      kwargs: {
        context: this.options.context,
      },
    });
  };

  search = (model, params) => {
    return this._request("/web/dataset/call_kw", {
      model: model,
      method: "search",
      args: [params.domain],
      kwargs: {
        context: this.options.context,
      },
    });
  };

  search_read = (model, params) => {
    return this._request("/web/dataset/call_kw", {
      model: model,
      method: "search_read",
      args: [],
      kwargs: {
        context: this.options.context,
        domain: params.domain,
        offset: params.offset,
        limit: params.limit,
        order: params.order,
        fields: params.fields,
      },
    });
  };

  search_by_id = (model, id) => {
    const params = { domain: [["id", "=", id]], limit: 1 };
    return this.search_read(model, params);
  };

  call = (endpoint, params) => {
    return this._request(endpoint, params);
  };

  _request = async (path, params) => {
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
        method: "call",
        params: params,
      }),
      withCredentials: false,
      baseURL: this.options.baseURL,
      url: path || "/",
    };

    try {
      const response = await axios(options);

      if (response.data.error) {
        this.context = response.data.error.data;
        return Promise.reject(response.data.error);
      }

      return response.data.result;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };
}

module.exports = OdooClient;
