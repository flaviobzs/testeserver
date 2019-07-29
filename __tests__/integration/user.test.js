import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import truncate from '../util/truncate';
// import User from '../../src/app/models/User';
// ao inves de importar o usuario, será importado o gerador de dados
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    // const user = await User.create({
    //   name: 'FlavioBS',
    //   email: 'flaviobs_@hotmail.com',
    //   password: '123456',
    // });

    const user = await factory.create('User', {
      // permanecer com a senha pois aqui está sendo comparadas
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    // criar objeto com os atributos
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);
    // .send({
    //   name: 'FlavioBS',
    //   email: 'flaviobs_@hotmail.com',
    //   password: '123456',
    // });
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);
    // .send({
    //   name: 'FlavioBS',
    //   email: 'flaviobs_@hotmail.com',
    //   password: '123456',
    // });

    const response = await request(app)
      .post('/users')
      .send(user);
    // .send({
    //   name: 'FlavioBS',
    //   email: 'flaviobs_@hotmail.com',
    //   password: '123456',
    // });

    expect(response.status).toBe(400);
  });
});
