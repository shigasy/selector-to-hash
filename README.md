# selector-to-hash
The selector-to-hash is easy to hash HTML and CSS selectors.

## Description
This converts the class to hash and allows for a scoped CSS with no duplicates.

Currently, only the class selector is supported.


| before | 
| ------------- | 
```html
<div class="test">
  <p class="text-center">selectorToHash</p>
</div>
```
```css
.test {
  width: 300px;
  background: #ccc;
}
.text-center {
  text-align: center;
}
```
| after | 
| ------------- | 
```html
<div class="h-aaaa1111">
  <p class="h-bbbb2222">selectorToHash</p>
</div>
```
```css
.h-aaaa1111 {
  width: 300px;
  background: #ccc;
}
.h-bbbb2222 {
  text-align: center;
}
```

## Usage
### Install

```shell
$ yarn add selector-to-hash # or npm install selector-to-hash
```

### ES2015 modules (Node.js and Browser)

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

### commonJS (Node.js and Browser)

```javascript
const selectorToHash = require("selector-to-hash").selectorToHash;

selectorToHash(html, css)
/*
{
  html: '',
  css:  '',
}
*/
```



## Example
[open test code](https://github.com/shigasy/selector-to-hash/blob/master/__tests__/integration/selectorToHash.test.ts)