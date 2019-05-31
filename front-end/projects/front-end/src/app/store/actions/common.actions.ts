import { Action } from "@ngrx/store";

export enum CommonActionTypes {
    Busy = '[Common] Busy',
    Error = '[Common] Error'
}

export class Busy implements Action {
    public readonly type = CommonActionTypes.Busy;
    constructor(public payload: boolean) {}
}

export class Error implements Action {
    public readonly type = CommonActionTypes.Error;
    constructor(public payload: any) {}
}

export type CommonActions =
    Busy |
    Error;
