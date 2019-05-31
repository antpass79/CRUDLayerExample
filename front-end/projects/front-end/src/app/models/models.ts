export interface Asset {
    id: any;
    fileName: string;
    createdBy: string;
    createdOn: Date;
    mimeType: string;
    email: string;
    country: string;
    description: string;
}

export enum DetailsActionType {
    create = 0,
    modify = 1,
    show = 2
}