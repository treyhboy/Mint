/* global describe, it */

const chai = require('chai')
const sinon = require('sinon');
const spies = require('chai-spies');

const db = require('../../../db');
const insertReminder = require('../../../routes/expenses/insertReminder');

chai.use(spies);
const expect = chai.expect;

describe('insertReminder', () => {
  let resMock = {};

  beforeEach(() => {
    resMock = {
      send: chai.spy(),
    };
  });

  it('is a function', () => {
    expect(insertReminder).to.be.a('function');
  });

  it('calls create with the right parameters', async () => {
    const callback = chai.spy(() => Promise.resolve(true));
    const stub = sinon.stub(db.reminder, 'create').callsFake(callback);

    await insertReminder(
      { body: { user: 'foo', det: 'bar', amt: 1, dat: 'today' }},
      resMock
    );

    expect(callback).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;

    stub.restore();
  });

  it('response is still sent if errors are thrown', async () => {
    const error = new Error();
    const callback = chai.spy(() => { throw error; });
    const stub = sinon.stub(db.reminder, 'create').callsFake(callback);

    await insertReminder(
      { body: { user: 'foo', det: 'bar', amt: 1, dat: 'today' }},
      resMock
    );

    expect(callback).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.once;
    expect(resMock.send).to.have.been.called.with(error);

    stub.restore();
  });

});