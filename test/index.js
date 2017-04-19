/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import generate from '../src'
import meta from './meta'

describe('redux-sutro', () => {
  it('should be a function', () => {
    should.exist(generate)
    generate.should.be.a.function
  })

  it('should load example meta', () => {
    const actions = generate(meta)
    console.log(actions.user.car)
  })
})
