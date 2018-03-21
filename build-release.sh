#!/bin/bash

ng build --prod --aot --output-hashing=none --sourcemaps --base-href ./ 
cp -r dist/* ../vms-release/