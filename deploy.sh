 #!/usr/bin/env bash

echo "Compiling TypeScript code..."
cd message-lambda
tsc
cd ..

echo "Zipping lambda..."
zip -r build message-lambda/dist

echo "Uploading build artifact to S3..."
aws s3 --region ap-southeast-2 cp build.zip s3://"${S3_BUCKET}"

echo "Packaging code... S3 bucket is ${S3_BUCKET}"
aws cloudformation package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket "${S3_BUCKET}"

echo "Deploying stack ${STACK_NAME}..."
sam deploy \
    --template-file packaged.yaml \
    --stack-name "${STACK_NAME}" \
    --capabilities CAPABILITY_IAM