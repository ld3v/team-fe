"use client"

import './globals.css'
import { useEffect } from 'react';
import { Nunito } from 'next/font/google'

import AntdRegistry from '@/lib/AntdRegistry'
import { TWrapperComponent } from '@/common/interfaces/component'
import { getAppStatus } from '@/actions'

const nunito = Nunito({ subsets: ['vietnamese'] })

const RootLayout = ({
  children,
}: TWrapperComponent) => {
  const init = async () => {
    await getAppStatus();
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <html lang="en">
      <body className={"tw-bg-gray-200 dark:tw-bg-neutral-900 " + nunito.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html >
  )
}

export default RootLayout;
