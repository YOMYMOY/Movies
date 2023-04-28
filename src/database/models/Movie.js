module.exports = (sequelize, dataTypes) => {

    /* class Movie extends Model {
        static associate(models) {
            Movie.hasOne(models.Genre, {
                as : 'genre'
            })
        }
    } */

    

    const alias = "Movie";

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
            defaultValue : "0"
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type : dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
    };

    const config = {
        tableName : "movies", //
        timestamps : true, //si no existen hay que colocarle false, ya que el default es true
        underscored : true, //cuando las columnas están escritas con guión bajo
        paranoid : true
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = function(models) {
        Movie.belongsTo(models.Genre, {
            as : 'genre',
            foreignKey : 'genre_id'
        });

        Movie.belongsToMany(models.Actor, {
            as : 'actors',
            through : 'actor_movie',
            foreignKey : 'movie_id',
            otherKey : 'actor_id',
            timestamps : false
        });

        Movie.hasMany(models.Actor, {
            as : 'favorite_actor',
            foreignKey : 'favorite_movie_id'
        })
    }

    return Movie;
}  