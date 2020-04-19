# selector-to-hash
The selector-to-hash is easy to hash HTML and CSS selectors.

# Usage
### Node.js and Browser
```javascript
import { selectorToHash } from 'selector-to-hash'

const html =
`
<div class="test">selectorToHash</div>
`

const css =
`
.test {
  color: blue;
}
`

selectorToHash(html, css)
/* 
{
  html:
  `
  <div class="h-aaaa1111">selectorToHash</div>
  `,
  css:
  `
  .h-aaaa1111 {
    color: blue;
  }
  `
}
*/ 
```