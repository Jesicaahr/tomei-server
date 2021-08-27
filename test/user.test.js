const app = require('../app')
const request = require('supertest')
const { User } = require('../models')
const { queryInterface } = require('../models/index.js').sequelize
const { encryptPassword } = require('../helpers/bcrypt')

afterAll((done)=> {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(()=> {
        done()
    })
    .catch(err=> {
        done(err)
    })
})

beforeAll((done)=> {
    queryInterface.bulkInsert('Users', [
        {   
            name: 'Jesica',
            email: 'jesica@email.com',
            password: encryptPassword('qwerty'),
            imageUrl: 'avatar/1630060832312.JPG',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
    .then(()=> {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('User Router', () => {
    describe('POST/users/signup', () => {
        describe('user success signup', () => {
            test('should return status 201 and  object with id,name,email,avatar', (done) => {
                request(app)
                .post('/users/signup')
                .field('name', 'Aprilia')
                .field('email', 'Aprilia@email.com')
                .field('password', encryptPassword('qwerty'))
                .attach('avatar', './public/avatest/avatars.png')
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else {
                        expect(res.status).toBe(201);
                        expect(res.body.result).toHaveProperty('id', expect.any(Number));
                        expect(res.body.result).toHaveProperty('name', 'Aprilia');
                        expect(res.body.result).toHaveProperty('email', 'Aprilia@email.com');
                        expect(res.body.result).toHaveProperty('avatar', expect.any(String));
                        expect(res.body.result).not.toHaveProperty('password');
                        return done()
                    }
                })
            })
        })
        describe('error signup', () => {
            test('should return error with status 400 because email already exists', (done) => {
                const errors = [{ message: 'Email already exist' }]  

                request(app)
                .post('/users/signup')
                .field('name', 'Aprilia')
                .field('email', 'jesica@email.com')
                .field('password', encryptPassword('qwerty'))
                .attach('avatar', './public/avatest/avatars.png')
                .end((err, res) => {
                    if(err){
                        return done(err)
                    } else{
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing name', (done) => {
                const errors = [{ message: 'Please input your name' }] 

                request(app)
                .post('/users/signup')
                .field('email', 'Aprilia1@email.com')
                .field('password', encryptPassword('qwerty'))
                .attach('avatar', './public/avatest/avatars.png')
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else {
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing email', (done) => {
                const errors = [{ message: 'Please input your email' }] 

                request(app)
                .post('/users/signup')
                .field('name', 'Aprilia')
                .field('password', encryptPassword('qwerty'))
                .attach('avatar', './public/avatest/avatars.png')
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else {
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing password', (done) => {
                const errors = [{ message: 'Please input your password' }] 

                request(app)
                .post('/users/signup')
                .field('name', 'Aprilia')
                .field('email', 'Aprilia3@email.com')
                .attach('avatar', './public/avatest/avatars.png')
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else {
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
            test('should return error with status 400 because missing avatar', (done) => {
                const errors = [{ message: 'Please upload your avatar' }] 

                request(app)
                .post('/users/signup')
                .field('name', 'Aprilia')
                .field('email', 'Aprilia4@email.com')
                .field('password', encryptPassword('qwerty'))
                .end((err, res) => {
                    if(err){
                        return done(err)
                    }
                    else {
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('errors', errors);
                        return done()
                    }
                })
            })
        })
    })
})