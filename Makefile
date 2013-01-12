build:
	@component install
	@component build -s Masonry -o dist -n masonry

minify:
	@uglifyjs dist/masonry.js -m -c hoist_vars=true -o dist/masonry.min.js

gzip: minify
	@gzip -c -9 dist/masonry.min.js > dist/masonry.min.js.gz
	@gzip -c -9 masonry.min.js > masonry.min.js.gz

clean:
	@rm -rf build components