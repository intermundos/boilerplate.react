import  { fork }   from      'redux-saga/effects'
import  test   from      './testSaga'

export default function* rootSaga() {
  yield [
    fork(test)
  ]
}
