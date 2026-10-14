#!/bin/bash
npm i
npm run build
npm --prefix ./dist run prod:install
npm --prefix ./dist run prod