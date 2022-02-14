import { AuthStateInterface } from "src/app/auth/types/authState";
import { FeedStateInterface } from "src/app/feed/types/FeedStateInterface";

export interface AppStateInterface {
    auth:   AuthStateInterface,
    feed: FeedStateInterface
}