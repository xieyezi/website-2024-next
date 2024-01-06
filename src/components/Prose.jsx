import clsx from 'clsx'

export function Prose({ as: Component = 'div', className, ...props }) {
  return (
    <Component
      className={clsx(
        className,
        'prose-lg prose max-w-none pt-6 text-xl dark:prose-invert ',
        // headings
        // lead
        // links
        // link underline
        // pre
        // hr
        'dark:prose-hr:border-zinc-800'
      )}
      {...props}
    />
  )
}
