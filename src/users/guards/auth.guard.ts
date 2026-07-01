import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayloadType } from "../jwt-payload.type";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        if (token && type === "Bearer") {
            try {
                const payload: JwtPayloadType = await this.jwtService.verifyAsync(token, { secret: this.configService.get("MY_SECRET_KEY") });
                (request as any).userPayload = payload;
                return true;
            } catch {
                return false;
            }
        }
        return false;
    }
}