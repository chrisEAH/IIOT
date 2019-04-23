#!/bin/bash

set -e

if [ "$ENV" = "PROD" ]
    then
    echo "running Production"
    ng serve --host 0.0.0.0
else
    echo "finish BUILD"
fi