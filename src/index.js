import dva from 'dva';
import createLoading from 'dva-loading';
import createLogger from 'dva-logger';
import moment from 'moment';
import router from './router';
import createHistory from 'history/createHashHistory';

moment.locale('week-setting', {
  week: {
    dow: 1 // Monday is the first day of the week.
  }
});
const app = dva({
  /** @todo define history */
  history: createHistory(),
  onError() {}
});
const envStr = '-dev';
app.use(createLoading());
/*
*如果调用api的前缀需要加-dev则加载答应日志功能
*/
if (envStr === '-dev') {
  app.use(createLogger());
}

app.router(router);

app.start('#root');
