import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator'

export class CreateTestDto {
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
  @IsNumber()
  @ApiProperty({
    description: 'ID',
    example: 1,
    required: true,
    type: Number,
  })
  id: number

  @IsString()
  @ApiProperty({
    description: 'メッセージ',
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
}

export class GetTestResponseDto {
  @IsNumber()
  @ApiProperty({
    description: 'ID',
    example: 1,
    required: true,
    type: Number,
  })
  id: number

  @IsString()
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
