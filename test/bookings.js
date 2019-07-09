import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';
import QueryBuilder from '../src/db/QueryBuilder';

chai.use(chaiHttp);

const base = '/api/v1/';
const user = {
  first_name: 'Jeffery',
  last_name: 'Way',
  email: 'user@blog.com',
  password: '123456',
};
const admin = {
  first_name: 'Admin',
  last_name: 'Way',
  email: 'admin@blog.com',
  password: '123456',
};

let userToken;
let adminToken;
describe('Test booking route', () => {
  before((done) => {
    QueryBuilder.truncate('users');
    QueryBuilder.truncate('trips');
    QueryBuilder.truncate('bookings');
    chai.request(app)
      .post(`${base}auth/signup`)
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        expect(res.status).to.equal(201);
      });
    chai.request(app)
      .post(`${base}auth/signup`)
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        expect(res.status).to.equal(201);
        QueryBuilder.update('users', { is_admin: true }, { email: admin.email });
        done();
      });
  });
  describe('Test view all bookings', () => {
    describe('Unauthenticated users can not view bookings', () => {
      it('should respond with status 401 and error message for token absent', (done) => {
        chai.request(app)
          .get(`${base}bookings`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
      it('should respond with status 401 and error message for invalid token', (done) => {
        chai.request(app)
          .get(`${base}bookings`)
          .set('Authorization', 'ThisIsAnInvalidToken')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
    describe('Authenticated users can view bookings', () => {
      it('should respond with status 200 and all bookings data', (done) => {
        chai.request(app)
          .get(`${base}bookings`)
          .set('Authorization', userToken)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.data).to.have.property('bookings');
            done();
          });
      });
    });
  });
});
