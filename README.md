
This project is a Api Application, and was wrote in Node.js (javascript)

///

The javascript libraries used were:


Express (to wrote the server);

express-session ( express module to session);

Helmet (to html security headers, for example, Content-Security-Policy, but it's only the basic protections guaranteeds by same library for default);

Cors (to define the uniques origins enabled to access the server, no one custom config, just the default);

Sequelize (to handle the database, with the dialect "Sqlite", and futher we could use others relational databases: MySQL, PostgreSQL, MariaDB and etc);

ioredis (to session storage, for be more fast and simple, which relational databases).

///

Also the Node library used were:

crypto (to cryptography of session datas).

///

The api simulate a item manage system, with authentication to security of data protected. Moreover, don't has a html page, it's only url requests.
