import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';

chai.use(chaiHttp);

const base = '/api/v1/';
const user = {
  email: 'admin@blog.com',
  password: '123456',
};

describe('Test Login route', () => {
  describe('Test user cannot signin with invalid credentials', () => {
    describe('Test email field', () => {
      it('should respond with error for missing email field', (done) => {
        chai.request(app)
          .post(`${base}auth/signin`)
          .send({
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
          .post(`${base}auth/signin`)
          .send({
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
          .post(`${base}auth/signin`)
          .send({
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
          .post(`${base}auth/signin`)
          .send({
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
      it('should respond with error for unregistered email', (done) => {
        chai.request(app)
          .post(`${base}auth/signin`)
          .send({
            email: 'admin@app.com',
            password: '123456',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('Invalid credentials');
            done();
          });
      });
    });
    describe('Test password field', () => {
      it('should respond with error for missing password field', (done) => {
        chai.request(app)
          .post(`${base}auth/signin`)
          .send({
            email: 'admin@blog.com',
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
          .post(`${base}auth/signin`)
          .send({
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
      it('should respond with error for wrong password', (done) => {
        chai.request(app)
          .post(`${base}auth/signin`)
          .send({
            email: 'admin@blog.com',
            password: 'invalid',
          })
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('Invalid credentials');
            done();
          });
      });
    });
  });
  describe('Test user can signin with valid credentials', () => {
    it('should respond with status 201, token and user data', (done) => {
      chai.request(app)
        .post(`${base}auth/signin`)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.all.keys('token', 'user');
          expect(res.body.data.user).to.have.any.keys('id', 'email', 'first_name', 'last_name', 'is_admin');
          expect(res.body.data.user.email).to.equal(user.email);
          done();
        });
    });
  });
  describe('Catch error in signin controlller', () => {
    it('should respond with status 500 and error message', (done) => {
      chai.request(app)
        .post(`${base}auth/signin`)
        .send({
          email: 'admin@blog.com',
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
