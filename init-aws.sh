#!/bin/sh

# LocalStackのエンドポイントを指定
ENDPOINT_URL="http://localstack:4566"

# キューの作成
aws --endpoint-url=$ENDPOINT_URL sqs create-queue --queue-name my-queue
aws --endpoint-url=$ENDPOINT_URL sqs create-queue --queue-name my-dlq

echo "SQS queues have been initialized"
