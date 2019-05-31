import { createFormStateReducerWithUpdate, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { getInitialDetailsState, DetailsState } from "../states/details.state";
import { DetailsActionTypes, DetailsActions } from "../actions/details.actions";
import { Asset } from '../../models/models';

// export const assetReducer = createFormStateReducerWithUpdate<AssetForm>({
//     assetForm: updateGroup<Asset>({
//         fileName: validate(required),
//         createdBy: validate(required),
//         mimeType: validate(required),
//         email: validate(required),
//         country: validate(required),
//         description: validate(required),
//     }),
// });

export const detailsReducer = (
    state = getInitialDetailsState(),
    action: DetailsActions
): DetailsState => {
    
    switch (action.type) {
        case DetailsActionTypes.CreateSuccess: {
            return {
                ...state, message: ''
            };
        }
        case DetailsActionTypes.CreateFailure: {
            return {
                ...state, message: 'Error during create'
            };
        }
        case DetailsActionTypes.ModifySuccess: {
            return {
                ...state, message: ''
            };
        }
        case DetailsActionTypes.ModifyFailure: {
            return {
                ...state, message: 'Error during modify'
            };
        }

        default:
            return state;
    }
}

// export const detailsReducer = {
//     asset: assetReducer
// }
