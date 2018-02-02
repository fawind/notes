all: install

install:
	(cd app && npm install) && gradle -p ./service build

test:
	gradle -p ./service check

runService:
	gradle -p ./service appengineRun

runApp:
	(cd app && npm start)

build: test
	(cd app && npm run dist) && gradle -p ./service build

deploy: build
	gradle -p ./service appengineDeploy

