import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../src/app';

chai.use(chaiHttp);


describe('Test Mocha And Chai', () => {
    describe('sayHello', () => {
        it('should say Hello World!', () => {
            const str = 'Hello World!';
            expect(str).to.equal('Hello World!');
        });
    });
    
    describe('sayHello', () => {
        it('should not say Hello World!', () => {
            const str = 'Hello!';
            expect(str).to.not.equal('Hello World!');
        });
    });

    describe('Other Sample Test', () => {
        it('should have property name with value Figo', () => {
            const car = {name:'Figo', Maker:'Ford'};
            car.should.have.property('name').equal('Figo');
        });
        it('Checking for null', () => {
            const car = null;
            should.not.exist(car);
        });
    });

    describe('Tets Request', () => {
        it('Home page', (done) => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('msg', 'Hello World');
                done();
            });
        });
    });
});