import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsEnum } from 'class-validator'

export class CreateRequestTestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'テスト名',
    example: 'test',
    required: true,
    type: String,
  })
  name: string

  @IsEmail()
  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@example.com',
    required: true,
    type: String,
  })
  email: string

  @IsString()
  @ApiProperty({
    description: 'テスト説明',
    example: 'test',
    required: false,
    type: String,
  })
  description?: string
}

export class CreateTestResponseDto {
  @Expose()
  @IsNumber()
  @ApiProperty({
    description: 'ID',
    example: 1,
    required: true,
    type: Number,
  })
  id: number

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'メッセージ',
    example: 'test',
    required: true,
    type: String,
  })
  name: string

  @Expose()
  @IsEmail()
  @ApiProperty({
    description: 'メールアドレス',
    example: 'test@example.com',
    required: true,
    type: String,
  })
  email: string

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'テスト説明',
    example: 'test',
    required: false,
    type: String,
  })
  description?: string
}

export class GetTestResponseDto extends CreateTestResponseDto {}

export enum CsvFormatType {
  A_TYPE = 'A_TYPE',
}
export class DownloadCsvRequestDto {
  @IsEnum(CsvFormatType)
  @ApiProperty({
    description: 'CSVフォーマットタイプ',
    example: CsvFormatType.A_TYPE,
    required: true,
    type: String,
  })
  formatType: CsvFormatType
}

export class SendAsyncMessageRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'メッセージ',
    example: 'test',
    required: true,
    type: String,
  })
  message: string
}

export class SendAsyncMessageResponseDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'ID',
    example: 'success',
    required: true,
    type: String,
  })
  id: string
}

export class GetAsyncStatusResponseDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'ステータス',
    example: 'success',
    required: true,
    type: String,
  })
  status: string
}
