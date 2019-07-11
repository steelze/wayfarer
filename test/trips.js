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

const trip = {
  bus_id: 1,
  origin: 'Ikorodu',
  destination: 'Maryland',
  trip_date: '2019-06-27',
  fare: 123,
};

let user_token;
let admin_token;
let trip_id;

describe('Test Trip route', () => {
  before(async () => {
    await QueryBuilder.truncate('users');
    await QueryBuilder.truncate('trips');
    await chai.request(app)
      .post(`${base}auth/signup`)
      .send(user)
      .then((res) => {
        user_token = res.body.data.token;
        expect(res.status).to.equal(201);
      });
    await chai.request(app)
      .post(`${base}auth/signup`)
      .send(admin)
      .then((res) => {
        admin_token = res.body.data.token;
        expect(res.status).to.equal(201);
      });
    await QueryBuilder.update('users', { is_admin: true }, { email: admin.email });
  });
  describe('Test view all trips', () => {
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
          .set('Authorization', user_token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.data).to.have.property('trips');
            done();
          });
      });
    });
  });
  describe('Test trips can be created', () => {
    describe('Users can not create trip', () => {
      it('should respond with status 403 and error message', (done) => {
        chai.request(app)
          .post(`${base}trips`)
          .set('Authorization', user_token)
          .send(trip)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
    describe('Admin cannot create trip data with invalid credentials', () => {
      describe('Test bus id field', () => {
        it('should respond with error for missing bus id field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'bus_id');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for empty bus id field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: '',
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'bus_id');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
      describe('Test destination field', () => {
        it('should respond with error for missing destination field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 4,
              origin: 'Ikorodu',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'destination');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for empty destination field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 3,
              origin: 'Ikorodu',
              destination: '',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'destination');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
      describe('Test trip date field', () => {
        it('should respond with error for missing trip date field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 1,
              origin: 'Ikorodu',
              destination: 'Maryland',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'trip_date');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for empty trip date field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 6,
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'trip_date');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for invalid trip date field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 6,
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: 'HelloWorld',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'trip_date');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
      describe('Test fare field', () => {
        it('should respond with error for missing fare field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 1,
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '2019-03-16',
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'fare');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for empty fare field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 6,
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '2019-08-16',
              fare: '',
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'fare');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for invalid fare field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 6,
              origin: 'Ikorodu',
              destination: 'Maryland',
              trip_date: '2019-07-08',
              fare: '99YDa',
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'fare');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
      describe('Test origin field', () => {
        it('should respond with error for missing origin field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 4,
              destination: 'Maryland',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'origin');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
        it('should respond with error for empty origin field', (done) => {
          chai.request(app)
            .post(`${base}trips`)
            .set('Authorization', admin_token)
            .send({
              bus_id: 9,
              origin: '',
              destination: 'Maryland',
              trip_date: '2019-06-27',
              fare: 123,
            })
            .end((err, res) => {
              expect(res.status).to.equal(422);
              expect(res.body).to.have.property('status', 'error');
              expect(res.body).to.have.property('error');
              const data = JSON.parse(res.body.error);
              const error = data.find(key => key.field === 'origin');
              expect(data).to.be.an('array');
              expect(error).to.be.an('object');
              done();
            });
        });
      });
    });
    describe('Admin can create trip', () => {
      it('should respond with status 201 and trip data', (done) => {
        chai.request(app)
          .post(`${base}trips`)
          .set('Authorization', admin_token)
          .send(trip)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.data).to.have.property('trip');
            trip_id = res.body.data.trip.id;
            done();
          });
      });
    });
    describe('Admin can cancel trip', () => {
      it('should respond with status 200', (done) => {
        chai.request(app)
          .patch(`${base}trips/${trip_id}`)
          .set('Authorization', admin_token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('status', 'success');
            expect(res.body.data).to.have.property('message');
            done();
          });
      });
    });
    describe('User cannot cancel trip', () => {
      it('should respond with status 403', (done) => {
        chai.request(app)
          .patch(`${base}trips/${trip_id}`)
          .set('Authorization', user_token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.have.property('status', 'error');
            expect(res.body).to.have.property('error');
            done();
          });
      });
    });
    describe('User cannot search for trip', () => {
      it('should respond with status 200', (done) => {
        chai.request(app)
          .get(`${base}trips/search`)
          .query({ origin: trip.origin, destination: trip.destination })
          .set('Authorization', user_token)
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
