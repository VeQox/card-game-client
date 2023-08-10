export interface User {
    id?: string,
    name: string,
}

export function isUser(parsed: any): parsed is User { 
    return typeof parsed.id !== "undefined" && 
           typeof parsed.id !== "string" ? false : 
           typeof parsed.name === "string";
}