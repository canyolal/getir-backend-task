const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Checking Responses', () => {
  test('Happy Test #1', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 7,
      maxCount: 10
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        expect(response.body.records.length).toBe(2)
      })

  },20000)

  test('Happy Test #2', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 1,
      maxCount: 5
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('success')
        expect(response.body.records.length).toBe(1)
        expect(response.body.records[0].key).toBe('HFrLrkmu')
      })

  },20000)

  test('Happy Test #3', async () => {

    const newQuery = {
      startDate: "2009-01-01",
      endDate: "2010-01-01",
      minCount: 1,
      maxCount: 500
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response=> {
        console.log(response.body)
        expect(response.body.code).toBe(0)
        expect(response.body.msg).toBe('no match')
        expect(response.body.records.length).toBe(0)
      })

  },20000)
})

describe('Interface Requirements', () => {
  test('invalid date at start', async () => {

    const newQuery = {
      startDate: "2016-01/01",
      endDate: "2020-01-01",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('invalid month at end', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-13-01",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('invalid day at end', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-56",
      minCount: 10,
      maxCount: 35
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('minCount < 0', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: -1,
      maxCount: 35
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('minCount more than maxCount', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 40,
      maxCount: 35
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('maxCount < 0', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      minCount: 40,
      maxCount: -2
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('missing minCount field', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      endDate: "2020-01-01",
      maxCount: 200
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('missing endDate field', async () => {

    const newQuery = {
      startDate: "2016-01-01",
      minCount: 40,
      maxCount: 500
    }
    await api
      .post('/postEndpoint')
      .send(newQuery)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})