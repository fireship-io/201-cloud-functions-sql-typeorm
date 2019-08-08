import { ConnectionOptions, Connection, createConnection, getConnection } from "typeorm";
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

export const prod = process.env.NODE_ENV === 'production';


export const config: ConnectionOptions = {
    name: 'fun',
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'development',
    synchronize: true,
    logging: false,
    entities: [
       'lib/entity/**/*.js'
    ],

    // Production Mode
    ...(prod && {
        database: 'production',
        logging: false,
        // synchronize: false,
        extra: {
            socketPath: '/cloudsql/fireship-lessons:us-central1:quick-test' // change this value
        },
    })
 }

//  createConnection(config).then()

export const connect = async () => {

    let connection: Connection;

    try {
        connection = getConnection(config.name)
        console.log(connection)
    } catch(err) {
        connection = await createConnection(config);
    }

    return connection;


}