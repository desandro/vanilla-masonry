build:
	@component install
	@component build -s Masonry -o dist -n masonry

clean:
	@rm -rf build components