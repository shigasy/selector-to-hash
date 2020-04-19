import { HtmlCss } from './types'
import { generateHash } from './generateHash'

const replaceClassNameWithHash = (
  htmlCss: HtmlCss,
  className: string,
  hash: string
): HtmlCss => {
  return {
    html: htmlCss.html.replace(
      // new RegExp(`(?<=class=['"])${className}(?=['"])`, 'g'),
      new RegExp(`class="${className}(?=")`, 'g'),
      `class="${hash}`
    ),
    css: htmlCss.css.replace(
      new RegExp(`.${className}(?=[,:{+~>|."\\s])`, 'g'),
      `.${hash}`
    ),
  }
}

export function selectorToHash(html: string, css: string): HtmlCss {
  // this regular expression supports es2018 and can not be used because it can not transpile
  // html.match(/(?<=class=['"]).*?(?=['"])/g)
  const classNamesInHtml = Array.from(
    new Set(html.match(/(?:class=").*?(?=")/g)?.map((s) => s.slice(7)))
  )

  if (classNamesInHtml === undefined || !classNamesInHtml.length) {
    return { html, css }
  }

  return classNamesInHtml.reduce(
    (preHtmlCss, className) => {
      const hash = 'h-' + generateHash() // can't use a number at the beginning of a class name
      return replaceClassNameWithHash(preHtmlCss, className, hash)
    },
    { html, css }
  )
}
