 #!/usr/bin/env bash

echo "Compiling TypeScript code..."
cd message-lambda
tsc
cd ..

echo "Packaging code... S3 bucket is ${S3_BUCKET}"
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket "${S3_BUCKET}"

echo "Deploying stack ${STACK_NAME}..."
sam deploy \
    --template-file packaged.yaml \
    --stack-name "${STACK_NAME}" \
    --capabilities CAPABILITY_IAM