import { all, fork } from "redux-saga/effects";
import appSaga from "./app/appSaga";
import adminSaga from "./admin/adminSaga";

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(adminSaga)
  ]);
}
