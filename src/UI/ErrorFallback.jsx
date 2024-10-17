import React from 'react'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div className='flex w-full h-screen items-center justify-center text-[var(--color-primary)] text-4xl font-medium flex-col gap-2'>
<p>Something went wrong 😢</p>
<p className='text-lg'>{error.message}</p>
<button onClick={resetErrorBoundary} className='mt-4 bg-[var(--bg-secondary)] text-xl px-4 py-1 text-[var(--color-light)] rounded-sm'>Try again</button>
    </div>
  )
}

export default ErrorFallback