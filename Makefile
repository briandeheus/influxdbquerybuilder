.PHONY: test
test:
	./node_modules/mocha/bin/mocha test/index.js -R spec -b