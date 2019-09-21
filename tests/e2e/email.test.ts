// import app, { server } from '../src/index';
import request from 'supertest';
import { Server } from 'http';
import { ErrorCode, Error as CustomError } from '../../src/error-handler';
import { ServiceResponseStatus } from '../../src/common/ServiceResponse';

jest.mock('dotenv', () => ({
  config: () => {
    Object.assign(process.env, {
      ENV: 'DEV',
      LOGGER_LEVEL: 'emerg',
      EMAIL_PROVIDER_1_ID: 'sendgrid',
      EMAIL_PROVIDER_1_TOKEN: 123
    });
  }
}));

let server: Server;

describe('GET /status/health', () => {
  it('responds with json and status OK', async () => {
    const app = require('../../src/index');
    server = app.server;

    await request(app.default)
      .get('/status/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('POST /email', () => {
  it('fails and returns validation errors with empty body', async () => {
    const app = require('../../src/index');
    server = app.server;

    const response = await request(app.default)
      .post('/email')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.status).toMatch(ServiceResponseStatus.ERROR);
    expect(response.body).toHaveProperty('errors');
    expect(
      response.body.errors.every(
        (error: CustomError) => error.code === ErrorCode.VALIDATION_ERROR
      )
    ).toBeTruthy();
  });

  it('sends email to sendgrid and receive error', async () => {
    const app = require('../../src/index');
    server = app.server;

    const response = await request(app.default)
      .post('/email')
      .send({
        to: 'fake@example.com',
        to_name: 'Ms. Fake',
        from: 'noreply@uber.com',
        from_name: 'Uber',
        subject: 'A Message from Uber',
        body: '<h1>Your Bill</h1><p>$10</p>'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.status).toMatch(ServiceResponseStatus.ERROR);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].code).toEqual(
      ErrorCode.EMAIL_PROVIDER_ERROR
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
  if (server) {
    server.close();
  }
});
