import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Teams.model';
import { getAllTeams, oneTeam } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endpoint /teams', () => {
  beforeEach(sinon.restore);
  describe('testing /teams route with get', () => {
    it('returns status 200 to getAll function', async () => {
      sinon.stub(Team, 'findAll').resolves(getAllTeams as Team[]);

      const response = await chai.request(app).post('/teams').send(getAllTeams);

      expect(response.status).to.be.equal(200);
    });
    it('returns status 200 to getTeamsById function', async () => {
        sinon.stub(Team, 'findByPk').resolves(oneTeam as Team);
  
        const response = await chai.request(app).post('/teams/1').send(oneTeam);
  
        expect(response.status).to.be.equal(200);
      });
  })
});