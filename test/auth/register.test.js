const request = require('supertest');
const app = require('../../app');
const { NotFoundError } = require('../../app/errors');
const { User } = require('../../app/models');


describe('User', () => {
    var user;
    afterAll(async () => {
        user = await User.destroy({
            where: {
                email: 'andeta@binar.co.id',
            },
        });
    });
    it('Register user', () => {
        return request(app)
            .post('/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                name: 'andeta',
                email: 'andeta@binar.co.id',
                password: 'andeta',
            })
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual({
                    accessToken: expect.any(String),
                });
            });
    });
    it('Register user with already taken email', () => {
        return request(app)
            .post('/v1/auth/register')
            .set('Accept', 'application/json')
            .send({
                name: 'opa',
                email: 'andeta@binar.co.id',
                password: 'opa',
            })
            .then((res) => {
                expect(res.statusCode).toBe(422);
                expect.objectContaining({
                    error: {
                        name: expect.any(String),
                        message: expect.any(String),
                        details: {
                            email: expect.any(String),
                        },
                    },
                });
            });
    });
    it('Response with 500 as status code which means nothing is send', () => {
        return request(app)
            .post('/v1/auth/register')
            .set('Accept', 'application/json')
            .send({})
            .then((res) => {
                expect(res.statusCode).toBe(500);
                expect.objectContaining({
                    error: {
                        name: expect.any(String),
                        message: expect.any(String),
                        details: null,
                    },
                });
            });
    });
});
