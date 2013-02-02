#!/bin/bash

# minifies masonry.js
# requires nodejs & uglifyjs

IN=masonry.js
OUT=masonry.min.js

# minify with Uglify JS
# then, add newline characters after `*/`, but not last newline character
uglifyjs $IN \
  | awk '{ORS=""; gsub(/\*\//,"*/\n"); if (NR!=1) print "\n"; print;}' > $OUT
echo "Minified" $IN "as" $OUT
