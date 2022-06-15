const request = require('supertest');
const app = require('../../app');
const { User } = require('../../app/models');
const { NotFoundError } = require('../../app/errors');
const bcrypt = require('bcryptjs');

const loginEmail = 'ayangde@binar.co.id';
const emailNotRegistered = 'bayangdu@binar.co.id';
const password = '123456';
const wrongPassword = '345678';
const passwordBcrypt = bcrypt.hashSync(password, 10);

describe('User', () => {

    it('Login user', () => {
        return request(app)
            .post('/v1/auth/login')
            .set('Accept', 'application/json')
            .send({
                email: 'ayangde@binar.co.id',
                password: '123456',
            })
            .expect(200);
    });
    it('Login user where email is wrong', async () => request(app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({
            email: 'ayangde@binar.co.id',
            password: '345678',
        })
        .then((res) => {
            expect(res.statusCode).toBe(401);
            expect(res.body.error.details.message).toEqual(
                'Password is wrong',
            );
        }));

    it('Email is not registered', async () => request(app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({
            email: emailNotRegistered,
            password,
        })
        .then((res) => {
            expect(res.statusCode).toBe(404);
            expect(res.body.error.details.email).toEqual(
                emailNotRegistered.toLowerCase(),
            );
        }));

    it('should response with 500 as status code (Internal Server Error) which means user must be input email and password', async () => request(app)
        .post('/v1/auth/login')
        .set('Accept', 'application/json')
        .send({
            email: loginEmail,
        })
        .then((res) => {
            expect(res.statusCode).toBe(500);
            expect(res.body.error.message).toEqual('Illegal arguments: undefined, string');
        }));
});

