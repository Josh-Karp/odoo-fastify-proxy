"use strict";

function validateKeys(obj) {
  const keys = [
    "db",
    "host",
    "username",
    "password",
    "host",
    "port",
    "protocol",
  ];
  keys.forEach((key) => {
    if (typeof obj[key] === "undefined") {
      throw new Error(`"${key}" parameter is mandatory`);
    }
  });
}

module.exports = validateKeys;
