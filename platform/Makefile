NODE_BIN=./node_modules/.bin
MOCHA=$(NODE_BIN)/mocha
export NODE_ENV=test

test:
	@$(MOCHA)  -R spec --recursive

test-cov:
	@$(MOCHA) -r blanket -R html-cov --recursive > report/coverage.html

test-all: test test-cov

.PHONY: test