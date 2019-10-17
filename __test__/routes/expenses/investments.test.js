/* global describe, it */

const chai = require('chai')
const sinon = require('sinon');
const spies = require('chai-spies');

const db = require('../../../db');
const investments = require('../../../routes/expenses/investments');

chai.use(spies);
const expect = chai.expect;

describe('investments', () => {
  let resMock = {};

  beforeEach(() => {
    resMock = {
      send: chai.spy(),
    };
  });

  it('is a function', () => {
    expect(investments).to.be.a('function');
  });

  it('calls create with the right parameters', async () => {
    const result = ['bar'];
    const callback = chai.spy(() => result);
    const stub = sinon.stub(db.investment, 'findAll').callsFake(callback);

    await investments(
      { body: { user: 'foo' }},
      resMock
    );

    expect(callback).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;

    stub.restore();
  });

  it('response is still sent if errors are thrown', async () => {
    const error = new Error();
    const callback = chai.spy(() => { throw error; });
    const stub = sinon.stub(db.investment, 'findAll').callsFake(callback);

    await investments(
      { body: { user: 'foo' }},
      resMock
    );

    expect(callback).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.with(error);

    stub.restore();
  });

});