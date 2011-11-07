#!/bin/bash

# minifies masonry.js
# requires nodejs & uglifyjs

JS=masonry.js
JS_MIN=masonry.min.js
TMP=$JS_MIN.tmp

uglifyjs $JS > $TMP
echo ';' >> $TMP
sed 's/\*\//&§/g; y/§/\n/;' $TMP > $JS_MIN
rm $TMP
echo "Minified" $JS "as" $JS_MIN
