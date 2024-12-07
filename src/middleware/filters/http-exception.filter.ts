import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorMessage: string = 'Validation failed') {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const exceptionResponse = exception.getResponse() as any

    response.status(HttpStatus.OK).json({
      message: this.errorMessage,
      cause: exceptionResponse.message,
    })
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    response.status(status).json({
      message: exception.message,
    })
  }
}

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter extends NotFoundExceptionFilter {}
