import React, { Suspense } from 'react'

type LazyLoadingProps = {
  children: React.ReactNode;
}

export const LazyLoadingContainer = ({ children }: LazyLoadingProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
  )
}
