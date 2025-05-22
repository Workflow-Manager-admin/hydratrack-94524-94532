#!/bin/bash
cd /home/kavia/workspace/code-generation/hydratrack-94524-94532/main_container_for_hydratrack
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

