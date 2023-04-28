module.exports = (sequelize, dataTypes) => {

    const alias = 'Actor';

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        first_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER.UNSIGNED
        }
    };

    const config = {
        underscored : true
    };

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = function(models) {
        Actor.belongsToMany(models.Movie, {
            as : 'movies',
            through : 'actor_movie',
            foreignKey : 'actor_id',
            otherKey : 'movie_id',
            timestamps : false
        });

        Actor.belongsTo(models.Movie, {
            as : 'favorite_movie',
            foreignKey : 'favorite_movie_id'
        })
    }

    return Actor;
}