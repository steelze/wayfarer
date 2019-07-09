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
  email: 'admin2@blog.com',
  password: '123456',
};

describe('Test Signup route', () => {
  before(() => QueryBuilder.truncate('users'));
  describe('Test user cannot signup with invalid credentials', () => {
    describe('Test first name field', () => {
      it('should respond with error for missing first name field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            last_name: 'Way',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'first_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for empty first name field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: '',
            last_name: 'Way',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'first_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for first name field with white spaces', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: '                                                                       ',
            last_name: 'Way',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'first_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
    });
    describe('Test last name field', () => {
      it('should respond with error for missing last name field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'last_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for empty last name field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: '',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'last_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for last name field with white spaces', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: '                                                                       ',
            email: 'admin2@blog.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'last_name');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
    });
    describe('Test email field', () => {
      it('should respond with error for missing email field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: 'Jeff',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'email');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for empty email field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: 'Jeff',
            email: '',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'email');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for email field with white spaces', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: 'Jeff',
            email: '                           ',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'email');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for invalid email', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: 'Jeff',
            email: 'admin@.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'email');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      describe('Test email does not exist in database', () => {
        beforeEach((done) => {
          chai.request(app)
            .post(`${base}auth/signup`)
            .send({
              first_name: 'Way',
              last_name: 'Jeff',
              email: 'admin@blog.com',
              password: '123456',
            })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              done();
            });
        });
        it('should respond with error for duplicate email', (done) => {
          chai.request(app)
            .post(`${base}auth/signup`)
            .send({
              first_name: 'Way',
              last_name: 'Jeff',
              email: 'admin@blog.com',
              password: '123456',
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'email');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
    });
    describe('Test password field', () => {
      it('should respond with error for missing password field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: 'Jeff',
            email: 'admin2@blog.com',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'password');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
      it('should respond with error for empty password field', (done) => {
        chai.request(app)
          .post(`${base}auth/signup`)
          .send({
            first_name: 'Way',
            last_name: '',
            email: 'admin2@blog.com',
            password: '',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            const data = JSON.parse(res.body.error);
            const error = data.find(key => key.field === 'password');
            expect(data).to.be.an('array');
            expect(error).to.be.an('object');
            done();
          });
      });
    });
  });
  describe('Test user can signup with valid credentials', () => {
    it('should respond with status 201, token and user data', (done) => {
      chai.request(app)
        .post(`${base}auth/signup`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.all.keys('token', 'user');
          expect(res.body.data.user).to.have.any.keys('id', 'email', 'first_name', 'last_name', 'is_admin', 'password');
          expect(res.body.data.user.email).to.equal(user.email);
          expect(res.body.data.user.first_name).to.equal(user.first_name);
          expect(res.body.data.user.last_name).to.equal(user.last_name);
          done();
        });
    });
    afterEach(() => QueryBuilder.truncate('users'));
  });
  describe('Catch error in register control', () => {
    it('should respond with status 500 and error message', (done) => {
      chai.request(app)
        .post(`${base}auth/signup`)
        .send({
          first_name: 'Jeffery',
          last_name: 'Way',
          email: 'user@app.com',
          password: 123456,
        })
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.have.property('status', 'error');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});
