const { Router } = require("express");
var checkAccessWithKey = require("../../checkAccess.js");
const { getSuggestions } = require("./intret.controller.js");
const route = Router();


route.get("/get-suggestions/:_id/:gender",  getSuggestions); 

module.exports = route;