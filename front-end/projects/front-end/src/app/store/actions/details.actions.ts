import { Action } from "@ngrx/store";
import { Asset } from "projects/front-end/src/app/models/models";

export enum DetailsActionTypes {
    Show = '[Details] Show',
    ShowSuccess = '[Details] Show Success',
    ShowFailure = '[Details] Show Failure',
    Create = '[Details] Create',
    CreateSuccess = '[Details] Create Success',
    CreateFailure = '[Details] Create Failure',
    Modify = '[Details] Modify',
    ModifySuccess = '[Details] Modify Success',
    ModifyFailure = '[Details] Modify Failure'
}

export class Show implements Action {
    public readonly type = DetailsActionTypes.Show;
    constructor(public payload: Asset) { }
}

export class ShowSuccess implements Action {
    public readonly type = DetailsActionTypes.ShowSuccess;
    constructor(public payload: Asset) { }
}

export class ShowFailure implements Action {
    public readonly type = DetailsActionTypes.ShowFailure;
    constructor(public payload: any) { }
}

export class Create implements Action {
    public readonly type = DetailsActionTypes.Create;
    constructor(public payload: Asset) { }
}

export class CreateSuccess implements Action {
    public readonly type = DetailsActionTypes.CreateSuccess;
    constructor(public payload: Asset) { }
}

export class CreateFailure implements Action {
    public readonly type = DetailsActionTypes.CreateFailure;
    constructor(public payload: any) { }
}

export class Modify implements Action {
    public readonly type = DetailsActionTypes.Modify;
    constructor(public payload: Asset) { }
}

export class ModifySuccess implements Action {
    public readonly type = DetailsActionTypes.ModifySuccess;
    constructor(public payload: Asset) { }
}

export class ModifyFailure implements Action {
    public readonly type = DetailsActionTypes.ModifyFailure;
    constructor(public payload: any) { }
}

export type DetailsActions =
    Show |
    ShowSuccess |
    ShowFailure |
    Create |
    CreateSuccess |
    CreateFailure |
    Modify |
    ModifySuccess |
    ModifyFailure;
