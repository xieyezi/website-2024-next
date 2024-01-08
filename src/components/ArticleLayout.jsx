import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'
import { CalendarIcon, HourglassIcon } from '@/components/SocialIcons'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArticleLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }
  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={`https://brian.dev${router.pathname}`}
        openGraph={{
          url: `https://brian.dev${router.pathname}`,
          images: [
            {
              url: `https://og.brian.dev/api/og?title=${meta.title}&desc=${meta.description}`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
          siteName: 'brian.dev',
        }}
      />
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="返回博客页面"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <motion.h1
                  className="mt-4 w-full text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    delay: 0.2,
                  }}
                >
                  {meta.title}
                </motion.h1>
                <motion.p
                  className="my-5 w-full text-sm font-medium text-zinc-500"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                    delay: 0.23,
                  }}
                >
                  {meta.description}
                </motion.p>
                <motion.div
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.255,
                }}
              >
                <span className="inline-flex items-center space-x-1.5">
                  <HourglassIcon />
                  <span>大约需要24分钟阅读</span>
                </span>
              </motion.div>
              </header>
              <Prose className="mt-6">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}
