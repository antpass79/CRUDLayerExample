import { FormGroupState } from 'ngrx-forms';
import { Asset } from "../../models/models";

export interface DetailsState {
    readonly asset: Asset;
    readonly message: string;
}

// export interface AssetForm {
//     asset: Asset;
// }

const initialDetailsState: DetailsState = {
    asset: {
        id: '',
        fileName: '',
        createdBy: '',
        createdOn: new Date(),
        mimeType: '',
        email: '',
        country: '',
        description: ''
    },
    message: ''
}

export function getInitialDetailsState(): DetailsState {
    return initialDetailsState;
}
