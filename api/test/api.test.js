const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄'], done);
  });
});


describe('Endpoint /api/v1/movies', () => {
  it('should respond with 200 when called with GET request', (done) => {
    request(app)
      .get('/api/v1/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return a list of movies when called with GET', (done) => {
    const expected = [
      {
        id: 1,
        name: 'Pulp Fiction',
      },
      {
        id: 2,
        name: 'Iron Man',
      },
      {
        id: 3,
        name: 'Skyfall',
      },
    ];
    request(app)
      .get('/api/v1/movies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return the movies when called with GET id', (done) => {
    const expected = {
      id: 2,
      name: 'Iron Man',
    };
    request(app)
      .get('/api/v1/movies/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected, done);
  });

  it('should return 404 if nothing was found with the id', (done) => {
    request(app)
      .get('/api/v1/movies/20')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' }, done);
  });

  it('should return 201 when new movie was added', async () => {
    await request(app)
      .post('/api/v1/movies/')
      .set('Accept', 'application/json')
      .send({ id: 4, name: 'Spiderman' })
      .expect('Content-Type', /json/)
      .expect(201, { message: 'Created' });
    // Check that it was actually added as well
    const expected = {
      id: 4,
      name: 'Spiderman',
    };
    await request(app)
      .get('/api/v1/movies/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });

  it('should return 200 when movie was updated', async () => {
    await request(app)
      .patch('/api/v1/movies/3')
      .set('Accept', 'application/json')
      .send({ name: 'Casino Royale' })
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Updated' });
    // Check that it was actually added as well
    const expected = {
      id: 3,
      name: 'Casino Royale',
    };
    await request(app)
      .get('/api/v1/movies/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expected);
  });

  it('should return 200 when movie was deleted', async () => {
    await request(app)
      .delete('/api/v1/movies/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Deleted' });
    await request(app)
      .get('/api/v1/movies/4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Not found' });
  });

});





