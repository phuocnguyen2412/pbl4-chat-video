"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addFriendRequest_1 = __importDefault(require("./addFriendRequest"));
const getFriendRequest_1 = __importDefault(require("./getFriendRequest"));
const getMe_1 = __importDefault(require("./getMe"));
const updateFriendRequest_1 = __importDefault(require("./updateFriendRequest"));
const userService = {
    getFriendRequests: getFriendRequest_1.default,
    getMe: getMe_1.default,
    sendAddFriendRequest: addFriendRequest_1.default,
    updateFriendRequest: updateFriendRequest_1.default,
};
exports.default = userService;
//# sourceMappingURL=user.service.js.map