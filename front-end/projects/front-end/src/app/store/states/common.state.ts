export interface CommonState {
    readonly busy: boolean;
    readonly message: string;
}

const initialCommonState: CommonState = {
    busy: false,
    message: ''
}

export function getInitialCommonState(): CommonState {
    return initialCommonState;
}
