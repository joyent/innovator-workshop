#!/bin/bash

curl -X POST -d '{"role": "serialize", "cmd": "write", "type": "temperature", "value": 42}' http://localhost:10000/act  --header "Content-Type:application/json" -s | sed -e 's/null/Success/g'
