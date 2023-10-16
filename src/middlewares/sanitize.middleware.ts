import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    sanitizeRequest(req.body);
    next();
  }
}

function sanitizeRequest(data: any) {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);

  for (const key in data) {
    if (typeof data[key] === 'string') {
      data[key] = purify.sanitize(data[key]);
    } else if (typeof data[key] === 'object') {
      sanitizeRequest(data[key]);
    }
  }
}
