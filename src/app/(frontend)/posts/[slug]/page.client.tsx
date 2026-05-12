'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')

    return () => {
      setHeaderTheme(null)
    }
  }, [setHeaderTheme])

  return null
}

export default PageClient
