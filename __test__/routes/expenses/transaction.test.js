/* global describe, it */

const chai = require('chai')
const sinon = require('sinon');
const spies = require('chai-spies');

const db = require('../../../db');
const transaction = require('../../../routes/expenses/transaction');

chai.use(spies);
const expect = chai.expect;

describe('transaction', () => {
  let resMock = {};

  beforeEach(() => {
    resMock = {
      send: chai.spy(),
    };
  });

  it('is a function', () => {
    expect(transaction).to.be.a('function');
  });

  it('queries the right place ont the db (spending)', async () => {
    const spy_spendings = chai.spy();
    const spy_investment = chai.spy();
    const stub_spendings = sinon.stub(db.spendings, 'create').callsFake(spy_spendings);
    const stub_investment = sinon.stub(db.investment, 'create').callsFake(spy_investment);

    await transaction(
      { body: { type: 'Spending' }},
      resMock
    );

    expect(spy_spendings).to.have.been.called.once;
    expect(spy_investment).to.not.have.been.called;
    expect(resMock.send).to.have.been.called.once;

    stub_spendings.restore();
    stub_investment.restore();
  });

  it('queries the right place ont the db (Investment)', async () => {
    const spy_spendings = chai.spy();
    const spy_investment = chai.spy();
    const stub_spendings = sinon.stub(db.spendings, 'create').callsFake(spy_spendings);
    const stub_investment = sinon.stub(db.investment, 'create').callsFake(spy_investment);

    await transaction(
      { body: { type: 'Investment' }},
      resMock
    );

    expect(spy_spendings).to.not.have.been.called;
    expect(spy_investment).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;

    stub_spendings.restore();
    stub_investment.restore();
  });

  // it('response is still sent if errors are thrown', async () => {
  //   const error = new Error();
  //   const callback = chai.spy(() => { throw error; });
  //   const stub = sinon.stub(db.transaction, 'findAll').callsFake(callback);

  //   await transaction(
  //     { body: { user: 'foo' }},
  //     resMock
  //   );

  //   expect(callback).to.have.been.called.once;
  //   expect(resMock.send).to.have.been.called.once;
  //   expect(resMock.send).to.have.been.called.with(error);

  //   stub.restore();
  // });

});