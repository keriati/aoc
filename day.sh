#!/bin/sh

year=$1;
day=$2;


if [ ! -d "$year" ];
then
  mkdir "$year"
fi

if [ ! -d "$year/__tests__" ];
then
  mkdir "$year/__tests__"
fi

touch "$year/day$day.ts";
touch "$year/day$day.txt";
touch "$year/__tests__/day$day.test.ts";

cat template.day.ts | sed s/'$day'/$day/g > $year/day$day.ts
cat template.test.ts | sed s/'$day'/$day/g | sed s/'$year'/$year/g > $year/__tests__/day$day.test.ts