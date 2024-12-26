/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
    firstName: string,
    lastName: string,
    photoUrl: string,
    emailId: string,
    [key:string]:any,
}