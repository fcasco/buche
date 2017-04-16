=====
Buche
=====

Permite enviar peticiones a servicios y notificar cuando no responden adecuadamente.

Hay tres componentes:

    1. Servidor con API para acceder a los datos.

    2. Sitio web para administrar los recursos y ver su estado.

    3. Proceso que verifica el estado de los recursos


Configuración
-------------

La configuración esta en el archivo `buche_config.js`.

Se deben configurar los datos de conexión con MongoDB.


Servidor de API
---------------

Los datos de los recursos y su estado estan almacenados en una base de datos MongoDB.

Para poder acceder a estos datos se debe iniciar el servidor que expone la API::

  % node api_server.js

Este servidor escucha peticiones en `localhost:42024`


Esquema de datos
----------------

Recursos
````````

Los recursos son entidades que responden a peticiones de red y deben ser monitoreados.

Ejemplo::

    [
        {
            "_id": "58dfc56f02885b2aeb30fcf9",
            "name": "4097",
            "host": "54.173.171.58",
            "port": 4097,
            "send": "PING",
            "expect": "PONG",
            "email": "4096@grr.la",
            "checkInterval": 1,
            "lastStatus": "n",
            "lastResponseTime": 0.42,
            "lastCheck": "2017-04-01T15:21:19.009Z",
            "createdAt": "2017-04-01T15:21:19.009Z",
            "updatedAt": "2017-04-01T15:21:19.009Z"
        }
    ]


Los status posibles son::


    {
        "n": "new",
        "w": "waiting",
        "o": "ok",
        "f": "fail"
    }
