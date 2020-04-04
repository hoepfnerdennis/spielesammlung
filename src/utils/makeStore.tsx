import React, {
  createContext,
  useReducer,
  useContext,
  Reducer,
  FunctionComponent,
  Dispatch,
  PropsWithChildren,
} from 'react';

export default function makeStore<V, A>(
  reducer: Reducer<V, A>,
  defaultValue: V
): [FunctionComponent, () => V, () => Dispatch<A>] {
  const StoreContext = createContext<V>(defaultValue);
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const DispatchContext = createContext((action: A) => {
    // default
  });

  const Provider: FunctionComponent<PropsWithChildren<{ value?: V }>> = ({
    children,
    value = defaultValue,
  }) => {
    const [state, dispatch] = useReducer(reducer, value);
    return (
      <StoreContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StoreContext.Provider>
    );
  };

  const useDispatch = (): Dispatch<A> => {
    return useContext(DispatchContext);
  };

  const useStore = (): V => {
    return useContext(StoreContext);
  };

  return [Provider, useStore, useDispatch];
}
