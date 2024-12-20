#!/bin/sh

# LocalStackのエンドポイントを指定
ENDPOINT_URL="http://localstack:4566"

# キューの作成
aws --endpoint-url=$ENDPOINT_URL sqs create-queue --queue-name my-queue
aws --endpoint-url=$ENDPOINT_URL sqs create-queue --queue-name my-dlq  # デッドレターキューが必要な場合

# キューの属性設定（必要に応じて）
# aws --endpoint-url=$ENDPOINT_URL sqs set-queue-attributes --queue-url http://localhost:4566/000000000000/my-queue --attributes file://queue-attributes.json

echo "SQS queues have been initialized"
