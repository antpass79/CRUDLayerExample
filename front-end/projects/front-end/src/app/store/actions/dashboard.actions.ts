import { Action } from "@ngrx/store";
import { Asset } from "projects/front-end/src/app/models/models";

export enum DashboardActionTypes {
    GetAll = '[Dashboard] GetAll',
    GetAllSuccess = '[Dashboard] GetAll Success',
    GetAllFailure = '[Dashboard] GetAll Failure',
    Delete = '[Dashboard] Delete',
    DeleteSuccess = '[Dashboard] Delete Success',
    DeleteFailure = '[Dashboard] Delete Failure'    
}

export class GetAll implements Action {
    public readonly type = DashboardActionTypes.GetAll;
}

export class GetAllSuccess implements Action {
    public readonly type = DashboardActionTypes.GetAllSuccess;
    constructor(public payload: Asset[]) {}
}

export class GetAllFailure implements Action {
    public readonly type = DashboardActionTypes.GetAllFailure;
    constructor(public payload: any) {}
}

export class Delete implements Action {
    public readonly type = DashboardActionTypes.Delete;
    constructor(public payload: Asset) {}
}

export class DeleteSuccess implements Action {
    public readonly type = DashboardActionTypes.DeleteSuccess;
    constructor(public payload: Asset) {}
}

export class DeleteFailure implements Action {
    public readonly type = DashboardActionTypes.DeleteFailure;
    constructor(public payload: any) {}
}

export type DashboardActions =
    GetAll |
    GetAllSuccess |
    GetAllFailure |
    Delete |
    DeleteSuccess |
    DeleteFailure;