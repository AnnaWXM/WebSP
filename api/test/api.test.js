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