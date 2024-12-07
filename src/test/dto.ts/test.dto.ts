import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator'

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
