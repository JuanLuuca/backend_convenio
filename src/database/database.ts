import { Dialect, Sequelize } from "sequelize";

const database = new Sequelize(
      process.env.DB_SCHEMA as string,
      process.env.DB_USER as string,
      process.env.DB_PASSWD as string,
    {
      dialect: 'mssql' as Dialect,  
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10),
      dialectOptions: {
        options: {
          encrypt: true,
          trustServerCertificate: true, // Apenas se você estiver usando um certificado autoassinado
          ssl: {
            rejectUnauthorized: false // Desativa a verificação do ServerName
          }
        }
      }
    }
);

console.log(database)

export default database;