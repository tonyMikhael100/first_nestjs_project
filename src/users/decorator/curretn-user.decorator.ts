

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";

export const CurrentUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const payload: JwtPayload = (request as any).userPayload;
        return payload;
    }
);

