//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.PASSWORD + "@" + process.env.CLUSTER + ".mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, database) {
    const db = database.db('todolistDB');
    const items = db.collection('items');
    const lists = db.collection('lists');
    const item1 = {
        name: "Buy Food"
    };

    const item2 = {
        name: "Cook Food"
    };

    const item3 = {
        name: "Eat Food"
    };

    const defaultItems = [item1, item2, item3];

    app.get("/", function(req, res) {

        items.find({}).toArray(function(err, result) {

            if (result == null) {
                items.insertMany(defaultItems, function(err) {
                    if (err) {
                        consolo.log(err);
                    } else {
                        console.log("Successfully saved default items!");
                    }
                });
                res.redirect("/");
            } else {
                const day = date.getDate();
                res.render("list", { listTitle: day, newListItems: result });
            }
        });
    });

    app.post("/", function(req, res) {

        const itemName = req.body.newItem;
        const listName = req.body.list;

        const newItem = {
            name: itemName
        };
        if (!isNaN(Date.parse(listName))) {
            items.insertOne(newItem);
            res.redirect("/");
        } else {
            lists.findOne({ name: listName }, function(err, result) {
                if (!err) {
                    lists.updateOne({ name: listName }, { $push: { items: newItem } });
                    res.redirect("/" + listName);
                }
            });
        }
    });

    app.post('/delete', function(req, res) {
        const itemName = req.body.checkbox;
        const listName = req.body.listName;
        if (!isNaN(Date.parse(listName))) {
            items.deleteOne({ "name": itemName }, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Document has been deleted!");
                    res.redirect("/");
                }
            });
        } else {
            lists.findOneAndUpdate({ name: listName }, { $pull: { items: { name: itemName } } }, function(err, result) {
                if (!err) {
                    res.redirect("/" + listName);
                }
            });
        }
    });

    app.get("/:customePage", function(req, res) {
        const customePage = _.capitalize(req.params.customePage);

        lists.findOne({ name: customePage }, function(err, result) {
            if (!err) {
                if (result) {
                    res.render("list", { listTitle: result.name, newListItems: result.items });
                } else {
                    const list = {
                        name: customePage,
                        items: defaultItems
                    };
                    lists.insertOne(list);
                    res.redirect("/" + customePage);
                }
            }
        });
    });
});

app.get("/about", function(req, res) {
    res.render("about");
});

let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server has started successfully");
});