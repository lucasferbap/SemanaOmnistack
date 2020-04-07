// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true
    },

    staging: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'semana_omnistack'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'us-cdbr-iron-east-01.cleardb.net',
            user: 'bb4a89a9d1f3d7',
            password: '2361c8c9',
            database: 'heroku_704c13c42b2c413'
        }
    }

};