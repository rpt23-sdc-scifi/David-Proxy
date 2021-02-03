import http from 'k6/http';

import { Rate } from 'k6/metrics';

import { sleep } from 'k6';

let errorRate = new Rate ('errorRate');

export let options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '15s', target: 10 },
    { duration: '15s', target: 20 },
    { duration: '15s', target: 30 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0 }, 
  ],
  ext: {
    projectID: 3524262,
    name: "Proxy",
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
  
}

export default function () {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  let max = 1000;
  let min = 1;
  let randomId = getRandomInt(min, max);
  let res = http.get(`http://18.191.184.153:8000/songdata/${randomId}`);
  
  errorRate.add(res.status != 200);

  sleep(1);
}