// At it's simplest, the access control return a yes or no value depending on the users session

import { ListAccessArgs } from "../types";

export function isSignedIn({ session }: ListAccessArgs) {
    return !!session;
}