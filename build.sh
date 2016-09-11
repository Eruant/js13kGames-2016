#!/usr/bin/env bash

MOD=./node_modules/.bin

case $1 in
  build)
    rm -f archive.zip
    rm -rf test
    mkdir -p temp
    $MOD/jade < src/index.jade > temp/index.html
    $MOD/rollup -c
    cp src/*.png temp
    zip -rj archive temp/*
    ./checkSize.js
    ;;
  watch)
    $MOD/nodemon -e jade --ignore temp -x "$MOD/jade < src/index.jade > temp/index.html" & \
      $MOD/nodemon -e js --ignore temp -x "$MOD/rollup -c && ./checkSize.js"
    ;;
  *)
    echo "usage: build [build|watch]"
esac
