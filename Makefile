default: install build package

install:
	npm install

test:
	npm test

build:
	npm run build

clean:
	rm -rf ./dist
	rm -f ./handler.zip
	rm -f ./packaged.yaml

package:
	echo "package src and modules into zipped handler..."
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
		--capabilities CAPABILITY_IAM