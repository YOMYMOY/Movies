const db = require('../database/models');
const {Op} = require('sequelize');

module.exports = {
    list : (req,res) => {
        db.Actor.findAll()
            .then(actors => {
                return res.render('actorsList', {
                    actors
                });
            })
            .catch(error => console.log(error));
    },
    detail : (req,res) => {
        db.Actor.findByPk(req.params.id, {include : ['favorite_movie']})
        .then(actor => {
            return res.render('actorsDetail', {
                actor
            })
        })
        .catch(error => console.log(error));
    },
    valued : (req,res) => {
        db.Actor.findAll({
            where : {
                rating : {
                    [Op.gte] : 7
                }                
            },
            order : [
                ["rating","DESC"]
            ],
            limit : 7
        })
        .then(actors => {
            return res.render('valuedActors', {
                actors
            })
        })
        .catch(error => console.log(error));
    },
    add : (req,res) => {
        db.Movie.findAll()
            .then(movies => {
                return res.render('actorsAdd', {movies})
            })
            .catch(error => console.log(error));
    },
    create : (req,res) => {
        db.Actor.create({
            ...req.body,
        })
        .then(newActor => {
            return res.redirect('/actors/detail/' + newActor.id)
        })
        .catch(error => console.log(error));
    },
    edit : (req,res) => {
        let movies = db.Movie.findAll()
        let actor = db.Actor.findByPk(req.params.id, {include : ['favorite_movie']})

        Promise.all([actor, movies])
            .then(([actor, movies]) => {
                return res.render('actorsEdit', {
                    actor,
                    movies
                })
            })
            .catch(error => console.log(error))
        
    },
    update : (req,res) => {
        db.Actor.update({
            ...req.body,
        },
        {
            where : {
                id : req.params.id
            }
        })
        .then(updatedActor => {
            return res.redirect('/actors/detail/' + req.params.id)
        })
        .catch(error => console.log(error));
    },
    delete : (req,res) => {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                return res.render('actorsDelete', {
                    actor
                })
            })
            .catch(error => console.log(error));
    },
    destroy : (req,res) => {
        db.Actor.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            return res.redirect('/actors')
        })
        .catch(error => console.log(error));
    }
}