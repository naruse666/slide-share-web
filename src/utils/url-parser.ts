import type { BreadcrumbNavItem } from '@/components/common/breadcrumb-nav/types'

export const urlParser = (pathname: string): BreadcrumbNavItem[] => {
  const urlArray = pathname.split('/')

  // ナビゲーション項目を追加するためのヘルパー関数
  const createNavItem = (
    label: string,
    url: string,
    Icon?: React.ElementType,
  ): BreadcrumbNavItem => ({
    label,
    url,
  })

  // ダッシュボードとその子項目を追加
  const navItems: BreadcrumbNavItem[] = []

  // URLパスに基づいてナビゲーション項目を動的に追加
  const pathsMapping = {
    slides: () => {
      navItems.push(createNavItem('スライド一覧', '/slides'))
      if (urlArray[2]) {
        navItems.push(
          createNavItem('スライドグループ', `/slides/${urlArray[2]}`),
        )
        if (urlArray[3]) {
          navItems.push(
            createNavItem(
              'スライド詳細',
              `/slides/${urlArray[2]}/${urlArray[3]}`,
            ),
          )
        }
      }
    },
    speakers: () => {
      navItems.push(createNavItem('発表者', '/speakers'))
      if (urlArray[2]) {
        navItems.push(createNavItem('発表者詳細', `/speakers/${urlArray[2]}`))
      }
    },
    contacts: () => navItems.push(createNavItem('お問い合わせ', '/contacts')),
    settings: () => navItems.push(createNavItem('設定', '/settings')),
  }

  const pathAction = pathsMapping[urlArray[1] as keyof typeof pathsMapping]
  if (pathAction) pathAction()

  return navItems
}
