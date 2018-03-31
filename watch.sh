#!/bin/bash

while :
do
  echo "Waiting..."
  echo
  inotifywait --event modify --recursive src/
  if [ $? -ne 0 ]; then
    exit 1
  fi
  echo
  echo "Modified!"
  echo
  make
  echo
  echo "Make end"
done
