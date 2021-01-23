import http from 'k6/http';

import { Rate } from 'k6/metrics';

import { sleep } from 'k6';

let errorRate = new Rate ('errorRate');

export let options = {
  stages: [
    { duration: '2m', target: 100 }, 
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 500 }, 
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, 
  ],
}
export default function () {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  let max = 10000;
  let min = 1;
  let randomId = getRandomInt(min, max);
  let res = http.get(`http://localhost:3005/songdata/${randomId}`);
  
  errorRate.add(res.status != 200);

  sleep(1);
}