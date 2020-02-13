import { queryHelpers } from '@testing-library/react';

export const queryByAriaBusy = queryHelpers.queryByAttribute.bind(
    null,
    'aria-busy'
)
export const queryAllByAriaBusy = queryHelpers.queryAllByAttribute.bind(
    null,
    'aria-busy'
)
