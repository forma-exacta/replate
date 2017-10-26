import Duck from './Duck'

describe('Duck', () => {

  it('exposes domainName', () => {
    expect((new Duck('testduck', [])).domainName).not.toBeNull()
  })

  it('exposes actionTypes', () => {
    expect((new Duck('testduck', [])).actionTypes).not.toBeNull()
  })

  it('exposes actions', () => {
    expect((new Duck('testduck', [])).actions).not.toBeNull()
  })

  it('exposes reducer', () => {
    expect((new Duck('testduck', [])).reducer).not.toBeNull()
  })

  it('adds actions', () => {
    const duck = new Duck('testduck')

    duck.addAction('bla', (arg) => {return {payload: arg}})

    expect(duck.actionTypes.bla).toEqual('TESTDUCK:BLA')
    expect(duck.actions.bla('testarg')).toEqual({
      type: duck.actionTypes.bla,
      payload: 'testarg'
    })

  })
})
