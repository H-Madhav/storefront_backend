
import app from '../../src/server';
const supertest =  require('supertest');
const request = supertest(app);


describe('GET /', () => {
  it('response status is 200', async () => {
      const response = await request.get('/')
      expect(response.status).toBe(200)
  })
})

