import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayloadType } from "../jwt-payload.type";
import { Reflector } from "@nestjs/core";
import { UserType } from "../user-role.enum";

@Injectable()
export class AuthRolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) return false;

        const request: Request = context.switchToHttp().getRequest();
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        if (token && type === "Bearer") {
            try {
                const payload: JwtPayloadType = await this.jwtService.verifyAsync(token, { secret: this.configService.get("MY_SECRET_KEY") });
                (request as any).userPayload = payload;

                if (requiredRoles.includes(payload.userType as UserType) === true) {
                    return true;
                }

            } catch {
                throw new UnauthorizedException("Access denied, invalid token");
            }



        }
        return false;
    }
}