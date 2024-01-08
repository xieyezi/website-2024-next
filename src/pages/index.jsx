import React from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  MailIcon,
  TwitterIcon,
  GitHubIcon,
  BiliBiliIcon,
  SparkleIcon,
  NeteaseMusicIcon,
  PencilSwooshIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/recent/1.jpg'
import image2 from '@/images/recent/2.jpg'
import image3 from '@/images/recent/3.jpg'
import image4 from '@/images/recent/4.jpg'
import image5 from '@/images/recent/5.jpg'
import image6 from '@/images/recent/6.jpg'

import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import siteMeta, { resume } from '@/data/siteMeta'
import { NextSeo } from 'next-seo'

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-5 w-5 text-zinc-400 transition group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-lime-400 dark:focus:ring-lime-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Resume() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="https://linkedin.com/in/brianketelsen"
        variant="secondary"
        className="group mt-6 w-full"
      >
        More on LinkedIn
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  const images = [image6, image4, image5, image1, image2, image3]
  const alts = [
    '我弹着吉他向我的女友求婚',
    '我的猫端非要往装不下它的纸箱子里面钻',
    '我的猫端坐在椅子下面',
    '摄于照母山',
    '摄于大竹林',
    '家里新买的鸭脚木',
  ]
  const [width, setWidth] = React.useState(0)
  const [isCompact, setIsCompact] = React.useState(false)
  const expandedWidth = React.useMemo(() => width * 1.38, [width])

  React.useEffect(() => {
    const handleResize = () => {
      // 640px is the breakpoint for md
      if (window.innerWidth < 640) {
        setIsCompact(true)
        return setWidth(window.innerWidth / 2 - 64)
      }

      setWidth(window.innerWidth / images.length - 4 * images.length)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      className="mt-16 sm:mt-20"
      initial={{ opacity: 0, scale: 0.925, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.5,
        type: 'spring',
      }}
    >
      <div className="-my-4 flex w-full snap-x snap-proximity scroll-pl-4 justify-start gap-4 overflow-x-auto px-4 py-4 sm:gap-6 md:justify-center md:overflow-x-hidden md:px-0">
        {images.map((image, idx) => (
          <motion.div
            key={image.src}
            className="relative h-40 flex-none shrink-0 snap-start overflow-hidden rounded-xl bg-zinc-100 ring-2 ring-lime-800/20 dark:bg-zinc-800 dark:ring-lime-300/10 md:h-72 md:rounded-3xl"
            animate={{
              width,
              opacity: isCompact ? 1 : 0.85,
              filter: isCompact ? 'grayscale(0)' : 'grayscale(0.5)',
              rotate: idx % 2 === 0 ? 2 : -1,
            }}
            whileHover={
              isCompact
                ? {}
                : {
                    width: expandedWidth,
                    opacity: 1,
                    filter: 'grayscale(0)',
                  }
            }
            layout
          >
            <Image
              src={image}
              alt={alts[idx] ?? ''}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              priority
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Developer() {
  return (
    <span className="group">
      <span className="font-mono">&lt;</span>前端
      <span className="font-mono">/&gt;</span>
      <span className="group-hover:animate-typing invisible inline-flex text-zinc-300 before:content-['|'] group-hover:visible dark:text-zinc-500" />
    </span>
  )
}

function Designer() {
  return (
    <span className="group relative rounded-2xl bg-black/5 p-1 dark:bg-white/5">
      <span className="pointer-events-none absolute inset-0 border border-lime-700/90 opacity-70 group-hover:border-dashed group-hover:opacity-100 dark:border-lime-400/90">
        <span className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
        <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
        <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
      </span>
      工程师
    </span>
  )
}

function OCD() {
  return (
    <span className="group">
      <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
      <span>细节控</span>
    </span>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <NextSeo
        title="xieyezi"
        description={siteMeta.description}
        canonical="http://xieyezi.com"
        openGraph={{
          url: 'http://xieyezi.com',
          images: [
            {
              url: 'https://avatars.githubusercontent.com/u/16821989?v=4',
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
          siteName: 'xieyezi',
        }}
      />
      <Container className="mt-9">
        <div className="max-w-4xl text-lg">
          <motion.h1
            className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 100,
              duration: 0.3,
            }}
          >
            <Developer />，<Designer />，
            <br />
            <OCD />
          </motion.h1>
          <motion.p
            className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 85,
              duration: 0.3,
              delay: 0.1,
            }}
          >
            <Balancer>我是 xieyezi，热爱生活，喜爱前端。</Balancer>
          </motion.p>
          <motion.p
            className="mt-2 text-base text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 85,
              duration: 0.3,
              delay: 0.1,
            }}
          >
            <Balancer>
              掌握但不限于
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                Javascript
              </a>
              , <a href="https://www.typescriptlang.org/">Typescript</a>,{' '}
              <a href="https://vuejs.org/">Vue</a>,{' '}
              <a href="https://react.dev/">React</a>,{' '}
              <a href="https://nodejs.org/en/learn/getting-started/introduction-to-nodejs">
                Node.js
              </a>{' '}
              等技术栈, 参与了 <a href="https://vuejs.org/">Vue.js</a>,{' '}
              <a href="https://github.com/youzan/vant">Vant</a>,{' '}
              <a href="https://semi.design/zh-CN">Semi Design</a>{' '}
              等许多开源项目。
            </Balancer>
          </motion.p>
          <motion.p
            className="mt-2 text-base text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 85,
              duration: 0.3,
              delay: 0.1,
            }}
          >
            <Balancer>
              除了编程之外，我还喜欢音乐、游泳、羽毛球。如果你恰好也在我现在居住的城市（目前在重庆），也许我们可以一起出去玩或者一起编程。欢迎通过以下方式和我交流：
            </Balancer>
          </motion.p>
          <motion.div
            className="mt-6 flex gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              damping: 50,
              stiffness: 90,
              duration: 0.35,
              delay: 0.25,
            }}
          >
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={siteMeta.author.twitter}
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href={siteMeta.author.bilibili}
              aria-label="Follow on BiliBili"
              icon={BiliBiliIcon}
            />
            <SocialLink
              href={siteMeta.author.neteaseMusic}
              aria-label="Follow on Netease Music"
              icon={NeteaseMusicIcon}
            />
            <SocialLink
              href={siteMeta.author.email}
              aria-label="Email to me"
              icon={MailIcon}
              rel="me"
            />
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://camo.githubusercontent.com/03423fff5b194acc17176dcb1b39d4678d5ce31f7d61ad8c3b9529efdfe0de62/68747470733a2f2f6170692e76697369746f722e706c616e747265652e6d652f76697369746f722d62616467652f70763f6c6162656c3d76697369746f72266e616d6573706163653d78696579657a69363636266b65793d696e6465782e68746d6c26636f6c6f723d626c7565"
            >
              <img
                className="w-full"
                src="https://camo.githubusercontent.com/03423fff5b194acc17176dcb1b39d4678d5ce31f7d61ad8c3b9529efdfe0de62/68747470733a2f2f6170692e76697369746f722e706c616e747265652e6d652f76697369746f722d62616467652f70763f6c6162656c3d76697369746f72266e616d6573706163653d78696579657a69363636266b65793d696e6465782e68746d6c26636f6c6f723d626c7565"
                alt="visitors"
                data-canonical-src="https://api.visitor.plantree.me/visitor-badge/pv?label=visitor&amp;namespace=xieyezi666&amp;key=index.html&amp;color=blue"
              />
            </a>
          </motion.div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">近期文章</span>
            </h2>
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
