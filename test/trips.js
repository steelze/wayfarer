import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';

chai.use(chaiHttp);

const base = '/api/v1/';
const user = {
  email: 'user@blog.com',
  password: '123456',
};
const admin = {
  email: 'admin@blog.com',
  password: '123456',
};

let userToken;
let adminToken;
describe('Test Trip route', () => {
  before((done) => {
    chai.request(app)
      .post(`${base}auth/signin`)
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res.status).to.equal(201);
      });
    chai.request(app)
      .post(`${base}auth/signin`)
      .send(user)
      .end((err, res) => {
        adminToken = res.body.data.token;
        expect(res.status).to.equal(201);
        done();
      });
  });
  describe('View all trips', () => {
    describe('Unauthenticated users can not view trips', () => {
      it('should respond with status 401 and error message for token absent', (done) => {
        chai.request(app)
          .get(`${base}trips`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
      it('should respond with status 401 and error message for invalid token', (done) => {
        chai.request(app)
          .get(`${base}trips`)
          .set('Authorization', 'ThisIsAnInvalidToken')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
    describe('Authenticated users can view trips', () => {
      it('should respond with status 200 and all trips data', (done) => {
        chai.request(app)
          .get(`${base}trips`)
          .set('Authorization', userToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.data).to.have.property('trips');
            done();
          });
      });
    });
  });
});
