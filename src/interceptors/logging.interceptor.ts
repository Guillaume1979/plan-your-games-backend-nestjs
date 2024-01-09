import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;
    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (data) => {
          Logger.verbose(
            `${method.toUpperCase()} ${statusCode} ${originalUrl} ${this.calculateTimeElapsed(now)} ${JSON.stringify(params)} ${JSON.stringify(
              query,
            )} ${JSON.stringify(body)} : ${JSON.stringify(data)}`,
          );
        },
        error: (err) => {
          Logger.error(
            `${method.toUpperCase()} ${err.status} ${originalUrl} ${this.calculateTimeElapsed(now)} ${JSON.stringify(params)} ${JSON.stringify(
              query,
            )} ${JSON.stringify(body)} : ${JSON.stringify(err.message)}`,
          );
        },
      }),
    );
  }

  private calculateTimeElapsed(beginTime: number): string {
    return ` - Elapsed time - ${Date.now() - beginTime}ms - `;
  }
}
