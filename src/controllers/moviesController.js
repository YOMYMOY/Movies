const db = require('../database/models')

module.exports = {
    list : (req,res) => {

        db.Movie.findAll({
            include : ['genre']
        })
            .then(movies => {
                return res.render('moviesList', {
                    movies
                });
            })
            .catch(error => console.log(error))  
    },
    detail : (req,res) => {
        db.Movie.findByPk(req.params.id, {
            include : ['genre', 'actors']
        })
        .then(movie => {
            return res.render('moviesDetail', {
                movie
            });
        })
        .catch(error => console.log(error))
    },
    recomended : (req,res) => {
        db.Movie.findAll({
            where : {
                rating: {
                    [db.Sequelize.Op.gte] : 7
                }
            },
            order : [
                ["rating","DESC"], ["awards", "DESC"]
            ],
            limit : 5
        })
        .then(movies => {
            return res.render('recommendedMovies', {
                movies
            })
        })
        .catch(error => console.log(error));
    },
    new : (req,res) => {
        db.Movie.findAll({
            order : [
                ["release_date", "DESC"]
            ],
            limit : 5
        })
        .then(movies => {
            return res.render('newestMovies', {
                movies
            })
        })
        .catch(error => console.log(error));
    },
    add : (req,res) => {
        db.Genre.findAll()
            .then(genres => {
                return res.render('moviesAdd', {genres})
            })
            .catch(error => console.log(error));
    },
    create : (req,res) => {
        const {title, awards, release_date, length, rating} = req.body

        db.Movie.create({
            ...req.body,
            title : title.trim()
        })
        .then(newMovie => {
            return res.redirect('/movies/detail/' + newMovie.id);
        })
        .catch(error => console.log(error));
    },
    edit : (req,res) => {
        const genres = db.Genre.findAll()
        const movie = db.Movie.findByPk(req.params.id, {include : ['genre']})

        Promise.all([genres, movie])
            .then(([genres, movie]) => {
                return res.render('moviesEdit', {
                    Movie : {
                        ...movie.dataValues,
                        release_date : movie.release_date.toISOString().split('T')[0]
                    },                    
                    genres
                })
            })
            .catch(error => console.log(error))
        
    },
    update : (req,res) => {
        db.Movie.update(
            {
                ...req.body,
                title : req.body.title.trim()
            },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(result => {
            return res.redirect('/movies/detail/' + req.params.id);
        })
        .catch(error => console.log(error));
    },
    delete : (req,res) => {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                return res.render('moviesDelete', {
                    Movie
                })
            })
            .catch(error => console.log(error));
    },
    destroy : (req,res) => {
        db.Movie.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            console.log(result);
            return res.redirect('/movies')
        })
        .catch(error => console.log(error));
    },
    recover : (req,res) => {
        return res.render('moviesRestore')
    },
    restore : (req,res) => {
        db.Movie.restore({
            where : {
                id : req.body.id
            }
        })
        .then(movie => {
            return res.redirect('/movies/detail/' + req.body.id)
        })
        .catch(error => console.log(error))
    }
}