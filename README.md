# selector-to-hash
HTML and CSS class selector to hash

# Usage
### Node.js and Browser
```javascript
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