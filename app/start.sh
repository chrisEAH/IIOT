#!/bin/bash

set -e

if [ "$ENV" = "UNIT" ]
    then
    echo "running Unit Test"
else
    echo "running Production"
    ng serve --host 0.0.0.0
fi