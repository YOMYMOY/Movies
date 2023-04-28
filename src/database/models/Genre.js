module.exports = (sequelize, dataTypes) => {

    /* class Genre extends Model {
        static associate(models) {
            Genre.hasMany(models.Movie, {
                as : 'movies',
                foreignKey : 'genreId',
                onDelete : 'cascade'
            })
        }
    } */

    

    const alias = "Genre";

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        active : {
            type : dataTypes.BOOLEAN,
            defaultValue : "1"
        }
    }

    const config = {
        tableName : "genres", //
        timestamps : true, //si no existen hay que colocarle false, ya que el default es true
        underscored : true //cuando las columnas están escritas con guión bajo
    }

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function(models) {
        Genre.hasMany(models.Movie, {
            as : 'movies',
            foreignKey : 'genre_id',
        })
    }

    return Genre;
}