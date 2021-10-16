/* global describe, it */

const chai = require('chai')
const sinon = require('sinon');
const spies = require('chai-spies');

const { Spendings } = require('../../../db');
const spendingOverview = require('../../../routes/expenses/spendingOverview');

chai.use(spies);
const expect = chai.expect;

describe('spendingOverview', () => {
  let resMock = {};

  beforeEach(() => {
    resMock = {
      send: chai.spy(),
    };
  });

  it('is a function', () => {
    expect(spendingOverview).to.be.a('function');
  });

  it('calls create with the right parameters', async () => {
    const result = ['bar'];
    const callback = chai.spy(() => result);
    const stub = sinon.stub(Spendings, 'findAll').callsFake(callback);

    await spendingOverview(
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
    const stub = sinon.stub(Spendings, 'findAll').callsFake(callback);

    await spendingOverview(
      { body: { user: 'foo' }},
      resMock
    );

    expect(callback).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.with(error);

    stub.restore();
  });

});