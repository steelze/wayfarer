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

const booking = {
  seat_number: 1,
  trip_id: 1,
};

let user_token;

describe('Test booking route', () => {
  before(async () => {
    await QueryBuilder.truncate('buses');
    await QueryBuilder.truncate('users');
    await QueryBuilder.truncate('trips');
    await QueryBuilder.truncate('bookings');
    await chai.request(app)
      .post(`${base}auth/signup`)
      .send(user)
      .then((res) => {
        user_token = res.body.data.token;
        expect(res.status).to.equal(201);
      });
    await QueryBuilder.insert('trips', {
      bus_id: 1, origin: 'Ikorodu', destination: 'Maryland', trip_date: '2019-06-27', fare: 123,
    });
    await QueryBuilder.insert('buses', {
      number_plate: 'XAS454YR',
      manufacturer: 'Toyota',
      model: 'Camry',
      year: 2015,
      capacity: 6,
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
          .set('Authorization', 'Bearer ThisIsAnInvalidToken')
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
          .set('Authorization', `Bearer ${user_token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            done();
          });
      });
    });
  });
  describe('Create bookings', () => {
    describe('Authenticated users can book a seat', () => {
      it('should respond with status 201 and booking data', (done) => {
        chai.request(app)
          .post(`${base}bookings`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(booking)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('status', 'success');
            done();
          });
      });
      it('should respond with status 201 and booking data with no seat_number passed', (done) => {
        chai.request(app)
          .post(`${base}bookings`)
          .set('Authorization', `Bearer ${user_token}`)
          .send({
            trip_id: 1,
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('status', 'success');
            done();
          });
      });
    });
    describe('Authenticated users cannot book an already booked seat', () => {
      it('should respond with status 422 and booking data', (done) => {
        chai.request(app)
          .post(`${base}bookings`)
          .set('Authorization', `Bearer ${user_token}`)
          .send(booking)
          .end((err, res) => {
            expect(res.status).to.equal(422);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
    describe('Authenticated users cannot book for a non existing trip', () => {
      it('should respond with status 404', (done) => {
        chai.request(app)
          .post(`${base}bookings`)
          .set('Authorization', `Bearer ${user_token}`)
          .send({
            seat_number: 1,
            trip_id: 1000009,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
  });
  describe('Authenticated users can delete their booking', () => {
    it('should respond with status 200', (done) => {
      chai.request(app)
        .delete(`${base}bookings/1`)
        .set('Authorization', `Bearer ${user_token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status', 'success');
          expect(res.body.data).to.have.property('message');
          done();
        });
    });
  });
});
