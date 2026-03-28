import { LazyLoadingContainer } from "./LazyLoadingContainer"


export const withLazy = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => (
    <LazyLoadingContainer>
      <WrappedComponent {...props} />
    </LazyLoadingContainer>
  )
}