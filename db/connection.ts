import {Sequelize} from 'sequelize';

const db = new Sequelize('hibee','root','',{
    host : 'localhost',
    dialect : 'mysql',
    logging : false
});

export default db;