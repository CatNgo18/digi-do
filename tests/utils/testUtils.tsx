// https://redux.js.org/usage/writing-tests
import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'

import { setupStore } from '../../src/state/store'
import type { AppStore, RootState } from '../../src/state/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

interface ExtendedRenderResult extends RenderResult {
  store: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ExtendedRenderResult {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}