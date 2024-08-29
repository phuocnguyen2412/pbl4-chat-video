import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

import envServer from "../configs/env";
const JWT_SECRET_ACCESS_TOKEN = envServer.JWT_SECRET_ACCESS_TOKEN || "";
const JWT_SECRET_REFRESH_TOKEN = envServer.JWT_SECRET_REFRESH_TOKEN || "";
const generateToken = (
    data: object,
    secretKey: Secret,
    timeExp: string | number
): string => {
    try {
        return jwt.sign({ data }, secretKey, {
            expiresIn: timeExp,
            algorithm: "HS256", // Thay thế "SHA256" bằng "HS256" hoặc thuật toán hợp lệ khác
        });
    } catch (error: any) {
        throw error;
    }
};

const verifyToken = (token: string, secretKey: Secret) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error: any) {
        throw error;
    }
};

export const generateAccessToken = (data: object) =>
    generateToken(data, JWT_SECRET_ACCESS_TOKEN, "5s");

export const generateRefreshToken = (data: object) =>
    generateToken(data, JWT_SECRET_REFRESH_TOKEN, "14 days");

export const verifyAccessToken = (token: string) =>
    verifyToken(token, JWT_SECRET_ACCESS_TOKEN);
export const verifyRefreshToken = (token: string) =>
    verifyToken(token, JWT_SECRET_REFRESH_TOKEN);
