import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      task: Model,
    },

    seeds(server) {
      server.create('task', { id: 1, title: 'Купить продукты', priority: 'high', isDone: false });
      server.create('task', { id: 2, title: 'Сделать ДЗ', priority: 'normal', isDone: false });
      server.create('task', { id: 3, title: 'Позвонить маме', priority: 'low', isDone: true });
    },

    routes() {
      this.urlPrefix = 'http://localhost:8000'; // Явно указываем адрес сервера
      this.namespace = '';

      this.get('/tasks', (schema) => {
        return schema.all('task');
      });

    
      this.post('/tasks', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let tasks = schema.all('task');
        let nextId = tasks.length + 1;
        return schema.create('task', { ...attrs, id: nextId, isDone: false });
      });

  
      this.post('/tasks/:id/complete', (schema, request) => {
        let id = request.params.id;
        let task = schema.find('task', id);
        if (task) {
          task.update({ isDone: true });
          return new Response(200, {}, {});
        }
        return new Response(404, {}, { error: 'Task not found' });
      });

     
      this.options('/tasks', () => {
        return new Response(200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
      });
    },
  });

  return server;
}