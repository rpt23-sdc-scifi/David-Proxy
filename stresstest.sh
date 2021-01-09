#!/bin/bash
# run-test.sh
k6 run k6_script.js
if [ $? -ne 0 ]; then
  currentDate=`date +"%D %T"`
  mail -s "🚨 Failed performance test on proxy" dkc.ushift@mail.com <<< "${currentDate} - My performance test"
  exit 1
fi