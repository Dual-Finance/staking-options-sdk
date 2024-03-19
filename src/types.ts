import { StakingOptions } from './stakingOptions';

export type State = Awaited<ReturnType<StakingOptions['getState']>>;
