default: install build validate

validate:
	sam validate

install:
	npm install

test:
	export DYNAMODB_TABLE=TestTable
	docker-compose up -d
	npm test
	docker-compose down

build:
	npm run build

clean:
	rm -rf ./dist
	rm -f ./handler.zip
	rm -f ./packaged.yaml
	rm -rf ./node_modules

package:
	echo "package src and modules into zipped handler..."
	rm -rf node_modules
	npm install --production
	cp -R node_modules dist && cd dist && zip -r -q ../handler.zip .

	echo "package cloudformation template..."
	aws cloudformation package \
		--template-file template.yaml \
		--output-template-file packaged.yaml \
		--s3-bucket "${S3_BUCKET}" \
		--s3-prefix sam

deploy:
	echo "deploy stack ${STACK_NAME}..."
	sam deploy \
		--template-file packaged.yaml \
		--stack-name "${STACK_NAME}" \
		--capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

deploy-stack: clean install build validate package deploy
