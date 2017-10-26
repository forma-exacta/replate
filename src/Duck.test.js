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

  it('exposes reducers', () => {
    expect((new Duck('testduck', [])).reducer).not.toBeNull()
  })

  it('exposes reducer', () => {
    expect((new Duck('testduck', [])).reducer).not.toBeNull()
  })

  it('adds actions', () => {
    const duck = new Duck('testduck')

    duck.addAction('bla', (arg) => {return {payload: arg}})

    expect(duck.actions.bla('testarg')).toEqual({
      type: duck.actionTypes.bla,
      payload: 'testarg'
    })

  })

  it('adds actionTypes with actions', () => {
    const duck = new Duck('testduck')

    duck.addAction('bla', (arg) => {return {payload: arg}})

    expect(duck.actionTypes.bla).toEqual('TESTDUCK:BLA')

  })

  it('addAction obeys options', () => {
    const duck = new Duck('testduck')

    duck.addAction('bla', (arg) => {return {payload: arg}}, {addActionType: false})

    expect(duck.actionTypes.bla).not.toBeDefined()
  })

  it('adds reducers', () => {
    const duck = new Duck('testduck')

    duck.addReducer('blaReducer', (state, action) => {return {}})

    expect(duck.reducers.blaReducer(undefined, {type: 'TESTDUCK:BLA_REDUCER'})).toEqual({})

  })

  it('adds action with reducer', () => {
    const duck = new Duck('testduck')

    duck.addReducer('bla', (state, action) => {return {}})

    expect(duck.actions.bla()).toEqual({
      type: duck.actionTypes.bla
    })

    duck.addReducer('bla2', (state, action) => {return {}})

    expect(duck.actions.bla2('testarg')).toEqual({
      type: duck.actionTypes.bla2,
      payload: 'testarg'
    })

  })

  it('adds actionTypes with reducer', () => {
    const duck = new Duck('testduck')

    duck.addReducer('bla', (state, action) => {return {}})

    expect(duck.actionTypes.bla).toEqual('TESTDUCK:BLA')

  })

  it('addReducer obeys options', () => {
    const duck = new Duck('testduck')

    duck.addReducer('bla', (state, action) => {return {}}, {addAction: false})

    expect(duck.actions.bla).not.toBeDefined()
    expect(duck.actionTypes.bla).not.toBeDefined()

    duck.addReducer('bla2', (state, action) => {
      return {}
    }, {initialState: 'this is the initial state'})

    expect(duck.reducers.bla2(undefined, {})).toEqual('this is the initial state')
  })

})
