'use client'

import LogoIcon from '@/components/Brand/LogoIcon'
import { useAuth } from '@/hooks/auth'
import { MaintainerOrganizationContext } from '@/providers/maintainerOrganization'
import { setLastVisitedOrg } from '@/utils/cookies'
import { organizationPageLink } from '@/utils/nav'
import { CloseOutlined, ShortTextOutlined } from '@mui/icons-material'
import { Repository } from '@polar-sh/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from 'polarkit/components/ui/atoms/button'
import { Tabs, TabsList, TabsTrigger } from 'polarkit/components/ui/atoms/tabs'
import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import MaintainerNavigation from '../Dashboard/DashboardNavigation'
import { DashboardProvider } from '../Dashboard/DashboardProvider'
import MaintainerRepoSelection from '../Dashboard/MaintainerRepoSelection'
import { SubRouteWithActive } from '../Dashboard/navigation'
import DashboardTopbar from '../Navigation/DashboardTopbar'
import { useRoute } from '../Navigation/useRoute'
import { BrandingMenu } from './Public/BrandingMenu'
import TopbarRight from './Public/TopbarRight'

const DashboardSidebar = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <></>
  }

  return (
    <aside
      className={twMerge(
        'dark:border-polar-700 flex h-full w-full flex-shrink-0 flex-col justify-between gap-y-4 overflow-y-auto border-r border-gray-200 p-6 md:w-[280px] md:overflow-y-visible',
      )}
    >
      <div className="flex h-full flex-col gap-y-6">
        <div className="hidden md:flex">
          <BrandingMenu />
        </div>

        <div className="flex w-full flex-grow flex-col gap-y-12 md:h-full md:justify-between md:overflow-y-auto">
          <div className="flex flex-col gap-y-12">
            <MaintainerNavigation />
          </div>
        </div>
      </div>
    </aside>
  )
}

const DashboardLayout = (
  props: PropsWithChildren<{
    breadcrumb?: React.ReactNode
    className?: string
  }>,
) => {
  const { organization } = useContext(MaintainerOrganizationContext)

  useEffect(() => {
    if (organization) setLastVisitedOrg(organization.slug)
  }, [organization])

  return (
    <DashboardProvider organization={organization}>
      <div className="relative flex h-full w-full flex-col bg-gray-100 md:flex-row dark:bg-transparent">
        <MobileNav />
        <div className="hidden md:flex">
          <DashboardSidebar />
        </div>
        <div
          className={twMerge(
            'relative flex h-full w-full flex-col',
            props.className,
          )}
        >
          <DashboardTopbar breadcrumb={props.breadcrumb} />
          {/* On large devices, scroll here. On small devices the _document_ is the only element that should scroll. */}
          <main className="relative flex min-h-0 w-full flex-grow flex-col">
            {props.children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  )
}

export default DashboardLayout

const MobileNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()
  const { organization } = useContext(MaintainerOrganizationContext)
  const { currentUser } = useAuth()

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  const header = (
    <div className="dark:bg-polar-900 sticky left-0 right-0 top-0 flex w-full flex-row items-center justify-between bg-gray-50 p-4">
      <a
        href="/"
        className="flex-shrink-0 items-center font-semibold text-black dark:text-white"
      >
        <LogoIcon className="h-10 w-10" />
      </a>

      <div className="flex flex-row items-center gap-x-6">
        {organization.profile_settings?.enabled ? (
          <Link href={organizationPageLink(organization)}>
            <Button>
              <div className="flex flex-row items-center gap-x-2">
                <span className="whitespace-nowrap text-xs">Storefront</span>
              </div>
            </Button>
          </Link>
        ) : null}
        <TopbarRight authenticatedUser={currentUser} />
        <div
          className="dark:text-polar-200 flex flex-row items-center justify-center text-gray-700"
          onClick={() => setMobileNavOpen((toggle) => !toggle)}
        >
          {mobileNavOpen ? <CloseOutlined /> : <ShortTextOutlined />}
        </div>
      </div>
    </div>
  )

  return (
    <div className="dark:bg-polar-900 relative z-20 flex w-screen flex-col items-center justify-between bg-gray-50 md:hidden">
      {mobileNavOpen ? (
        <div className="relative flex h-full w-full flex-col">
          {header}
          <div className="dark:bg-polar-900 flex h-full flex-col bg-gray-50 px-4">
            <DashboardSidebar />
          </div>
        </div>
      ) : (
        header
      )}
    </div>
  )
}

export const RepoPickerHeader = (props: {
  currentRepository?: Repository
  repositories: Repository[]
  children?: React.ReactNode
}) => {
  const onSubmit = () => {}

  return (
    <>
      <form
        className="dark:border-polar-700 flex flex-row items-center justify-between space-x-4 space-y-0 bg-transparent"
        onSubmit={onSubmit}
      >
        <MaintainerRepoSelection
          current={props.currentRepository}
          repositories={props.repositories}
        />
        {props.children}
      </form>
    </>
  )
}

const SubNav = (props: { items: SubRouteWithActive[] }) => {
  const current = props.items.find((i) => i.isActive)

  return (
    <Tabs className="md:-mx-4" value={current?.title}>
      <TabsList className="flex flex-row bg-transparent ring-0 dark:bg-transparent dark:ring-0">
        {props.items.map((item) => {
          return (
            <Link key={item.title} href={item.link}>
              <TabsTrigger
                className="flex flex-row items-center gap-x-2 px-4"
                value={item.title}
              >
                {item.icon && <div className="text-[17px]">{item.icon}</div>}
                <div>{item.title}</div>
              </TabsTrigger>
            </Link>
          )
        })}
      </TabsList>
    </Tabs>
  )
}

import React from 'react'

export const DashboardBody = ({
  children,
  className,
  wrapperClassName,
  title,
  contextView,
  contextViewClassName,
  header = true,
}: {
  children?: React.ReactNode
  wrapperClassName?: string
  className?: string
  title?: JSX.Element | string
  contextView?: React.ReactElement
  contextViewClassName?: string
  header?: JSX.Element | boolean
}) => {
  const currentRoute = useRoute()

  const hasCurrent = (currentRoute?.subs as SubRouteWithActive[])?.some(
    (i) => i.isActive,
  )

  return (
    <div
      className={twMerge(
        'dark:divide-polar-700 flex h-full w-full flex-row gap-x-3 divide-x divide-gray-200',
      )}
    >
      <div
        className={twMerge(
          'relative flex w-full flex-col items-center md:overflow-y-auto md:px-8',
        )}
      >
        <div
          className={twMerge('flex h-full w-full flex-col', wrapperClassName)}
        >
          {header && (
            <div
              className={twMerge(
                'flex w-full flex-col gap-y-4 py-8 md:flex-row md:items-center md:justify-between',
              )}
            >
              <h4 className="whitespace-nowrap text-2xl font-medium dark:text-white">
                {title ?? currentRoute?.title}
              </h4>

              {typeof header === 'boolean' &&
              currentRoute &&
              'subs' in currentRoute &&
              hasCurrent &&
              (currentRoute.subs?.length ?? 0) > 0 ? (
                <div className="flex flex-row items-center gap-4 gap-y-24">
                  <SubNav items={currentRoute.subs ?? []} />
                </div>
              ) : (
                header
              )}
            </div>
          )}
          <div className={twMerge('flex w-full flex-col pb-8', className)}>
            {children}
          </div>
        </div>
      </div>
      {contextView ? (
        <div
          className={twMerge(
            'w-full overflow-y-auto md:max-w-[320px] xl:max-w-[440px]',
            contextViewClassName,
          )}
        >
          {contextView}
        </div>
      ) : null}
    </div>
  )
}

export const DashboardPaddingX = (props: {
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={twMerge('px-4 sm:px-6 md:px-8', props.className)}>
      {props.children}
    </div>
  )
}
