/*jslint node:true */

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    //PUT - Create new user
    create: function (req, res, next) {
        var params = req.params.all();

        User.create(params, function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(201);
            res.json(user);
        });

    },

    //GET - Find users
    //TODO: Fix where clause, not working
    find: function (req, res, next) {
        var id = req.param('id'),
            idShortCut = isShortCut(id),
            where,
            options;
        if (idShortCut === true) {
            return next();
        }

        if (id) {
            User.findOne(id, function (err, user) {
                if (user === undefined) {
                    return res.notFound();
                }
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
        } else {
            where = req.param('where');
            if (_.isString(where)) {
                where = JSON.parse(where);
            }

            options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined
            };

            console.log("Options: ", options);

            User.find(options, function (err, user) {
                if (user === undefined) {
                    return res.notFound();
                }
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
        }

        function isShortCut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }
    }

};

