import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.model'
import LoginService from '../database/services/Login.service';
import { oneUser, validUser, invalidUser, withoutEmail, rightRes } from './mocks/User.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endpoint /login', () => {
  beforeEach(sinon.restore);
  describe('testing /login route with post', () => {
    it('returns a message Incorrect email or password', async () => {
      sinon.stub(User, 'findOne').resolves(oneUser as User);

      const response = await chai.request(app).post('/login').send(invalidUser);

      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.deep.equal('Incorrect email or password');
    });
    it('Returns a message that is missing a field', async () => {
      const res = await chai.request(app).post('/login').send(withoutEmail);
      expect(res.status).to.be.equal(400);
      expect(res.body.message).to.be.deep.equal('All fields must be filled');
    });
    it('Returns a valid token', async () => {
      sinon.stub(User, 'findOne').resolves(oneUser as User);
      sinon.stub(jwt, 'sign').resolves(rightRes);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const res = await chai.request(app).post('/login').send(validUser);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('token');
    });
  })

  describe('testing /login/validate route with get', () => {
    it("Returns the user's role", async () => {
        const loginService = new LoginService();
        sinon.stub(User, 'findOne').resolves(oneUser as User);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(loginService, 'getRole').resolves({ role: 'admin' });
  
        const res = await chai.request(app).post('/login').send(validUser);
  
        const token = res.body.token;
        const validationToken = await chai.request(app).get('/login/validate').set('authorization', token);
  
        expect(validationToken.status).to.be.equal(200);
        expect(validationToken.body.role).to.be.equal('admin');
      });
    it('Returns a message when there is no authorization in the header', async () => {
      const validateResponse = await chai.request(app).get('/login/validate');

      expect(validateResponse.status).to.be.equal(401);
      expect(validateResponse.body.message).to.be.deep.equal('unauthenticated');
    });
  })
});