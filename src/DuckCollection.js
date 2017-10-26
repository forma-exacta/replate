import Duck from './Duck'
import {crudPartials} from './makeActionTypes'
import {makeCRUDActionCreators} from './makeActionCreators'
import {makeCRUDReducers} from './makeReducers'

export default class DuckCollection extends Duck {

  constructor(domainName) {
    super(domainName, crudPartials)
    this.setActions(makeCRUDActionCreators(domainName), {addActionType: true})
    this.setReducers(makeCRUDReducers(domainName), {addAction: false})
  }

}
