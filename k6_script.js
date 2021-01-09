import http from 'k6/http';

import { check, sleep } from 'k6';

export let options = {
  thresholds : {
    'http_req_duration':  ['p(99) < 1000']
    //    'http_req_duration': [{threshold: 'p(90) < 2000', abortOnFail: true, delayAbortEval: '5s' }]

      
  },
  stages: [
    { duration: '60s', target: 1 },
    // { duration: '10s', target: 10 },
    // { duration: '10s', target: 100 },
    // { duration: '15s', target: 500 },
    // { duration: '15s', target: 1000 },
    
  ],
//   //maximum requests per second
//   rps: 100

//virtual user start
//   startVUs: 1
};
export default function () {
  let max = 9999999;
  let min = 0;
  let randomId = Math.random() * (max - min) + min;
  let res = http.get(`http://localhost:8000/song/${randomId}`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}