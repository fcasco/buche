export default function () {
    this.urlPrefix = 'http://localhost:42024';
    this.namespace = '/api';

    this.get('/resources', function () {
        return {
            "resources": [
                {
                    "type": "resources",
                    "_id": "111111111111111111111111",
                    "name": "8000",
                    "host": "54.173.171.58",
                    "port": 8000,
                    "email": "8000@grr.la",
                    "send": "PING",
                    "expect": "PONG",
                    "checkInterval": 1,
                    "lastStatus": "o",
                    "lastResponseTime": 0.22,
                    "lastCheck": "2017-04-01T15:21:19.009Z",
                    "created_at": "2017-04-01T15:21:19.009Z",
                    "updated_at": "2017-04-01T15:21:19.009Z"
                },
                {
                    "type": "resources",
                    "_id": "222222222222222222222222",
                    "name": "4097",
                    "host": "54.173.171.58",
                    "port": 4096,
                    "send": "PING",
                    "expect": "PONG",
                    "email": "4096@grr.la",
                    "checkInterval": 1,
                    "lastStatus": "n",
                    "lastResponseTime": 0.42,
                    "lastCheck": "2017-04-01T15:21:19.009Z",
                    "created_at": "2017-04-01T15:21:19.009Z",
                    "updated_at": "2017-04-01T15:21:19.009Z"
                },
                {
                    "type": "resources",
                    "_id": "333333333333333333333333",
                    "name": "8002",
                    "host": "54.173.171.58",
                    "port": 8002,
                    "send": "PING",
                    "expect": "PONG",
                    "email": "8002@grr.la",
                    "checkInterval": 1,
                    "lastStatus": "e",
                    "lastResponseTime": 0.42,
                    "lastCheck": "2017-04-01T15:21:19.009Z",
                    "created_at": "2017-04-01T15:21:19.009Z",
                    "updated_at": "2017-04-01T15:21:19.009Z"
                }
            ]
        };
    });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
