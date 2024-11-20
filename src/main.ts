import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'fs'
import { dump } from 'js-yaml'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const isDevelopment = process.env.NODE_ENV !== 'production'

  if (isDevelopment) {
    // Swaggerの設定
    const config = new DocumentBuilder()
      .setTitle('アプリケーション名')
      .setDescription('APIの説明文')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('APIタグ')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    // Swagger UIの設定
    SwaggerModule.setup('api-docs', app, document)

    // YAMLファイルとしてAPI仕様書を出力
    const yamlString = dump(document, { skipInvalid: true })
    writeFileSync('./swagger.yaml', yamlString, 'utf8')
  }
  await app.listen(process.env.PORT ?? 8888)
}
bootstrap()
