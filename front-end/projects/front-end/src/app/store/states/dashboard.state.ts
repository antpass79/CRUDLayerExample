import { Asset } from "projects/front-end/src/app/models/models";

export interface DashboardState {
    readonly assets: Asset[];
    readonly message: string;
}

const initialDashboardState: DashboardState = {
    assets: [],
    message: ''    
}

export function getInitialDashboardState(): DashboardState {
    return initialDashboardState;
}
