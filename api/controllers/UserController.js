/*jslint node:true */

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

module.exports = {

    //POST - Create new user
    create: function (req, res, next) {
//        var params = req.params.all();
        var params = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        };

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
    },

    //PUT - Update a user
    update: function (req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.update(id, criteria, function (err, user) {

            if(user.length === 0) return res.notFound();

            if (err) return next(err);

            res.json(user);

        });
    },

    //DELETE  - Delete a user
    destroy: function (req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.findOne(id, function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            User.destroy(id, function (err) {

                if (err) return next (err);

                return res.json(result);
            });

        });
    }

};

