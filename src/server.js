 'use strict';

  const fs = require('fs');
  const Hapi = require('@hapi/hapi');
  const Path = require('path');
  const fetch = require("node-fetch");
  

 const init = async () => {

    const server = Hapi.server({
        port: 7001,
        host: 'localhost'
    });
    
    await server.register(require('inert'));
    server.bind({knex : knex})

  const handleFileUpload = file => {
      return new Promise((resolve, reject) => {
          const filename = file.hapi.filename
          const data = file._data

          fs.writeFile(`./uploads/${filename}`, data, err => {
          if (err) {
              reject(err);
          }
          resolve({ message: "Upload successfully!" });
          });
      });
    };

  // Add file into a folder 
  server.route({
    method: "POST",
    path: "/upload",
    config: {
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: ['application/json', 'image/jpeg', 'multipart/form-data']
      }
    },
    handler: async (request, h) => {
      const { payload } = request;
      console.log(payload.myFile);
 
      const response = await handleFileUpload(payload.myFile);
      return response;
    }
  });
 
  //Show specefic file return as buffer to client side
  
  server.route({
    method: 'GET',
    path: '/upload/{name}',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['X-Data-Offset', 'X-Data-Limit']
        }
    },
    handler: function (request, h) {
      const name = request.params.name;
      console.log(name);
      return h.file(`uploads/${name}`);
  }

  });
      await server.start();
    console.log('Server running on %s', server.info.uri);
};
 
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})
 
init();
