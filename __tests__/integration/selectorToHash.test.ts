import { generateHash } from '../../src/generateHash'
import { selectorToHash } from '../../src/selectorToHash'

import beautify from 'js-beautify'
jest.mock('../../src/generateHash')

const beautifyOptions = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  indent_size: 2,
  // eslint-disable-next-line @typescript-eslint/camelcase
  preserve_newlines: false,
}

const raw = String.raw
const html = (text: TemplateStringsArray): string =>
  beautify.html(raw(text), beautifyOptions)
const css = (text: TemplateStringsArray): string =>
  beautify.css(raw(text), beautifyOptions)

const generateHashMock = generateHash as jest.MockedFunction<
  typeof generateHash
>

const testExpectHash = (testData: string[][]): void => {
  for (const t of testData) {
    expect(selectorToHash(t[0], t[1])).toStrictEqual({
      html: t[2],
      css: t[3],
    })
  }
}

describe('selectorToHash integrations test', () => {
  afterEach(() => {
    generateHashMock.mockReset()
    generateHashMock
      .mockReturnValue('zzzz0000')
      .mockReturnValueOnce('aaaa1111')
      .mockReturnValueOnce('bbbb2222')
      .mockReturnValueOnce('cccc3333')
      .mockReturnValueOnce('dddd4444')
      .mockReturnValueOnce('eeee5555')
      .mockReturnValueOnce('ffff6666')
  })
  it('no html class, it is returned as is', () => {
    const testData = [
      ['html', 'css', 'html', 'css'],
      [``, ``, ``, ``],
      [
        html`<div>selectorToHash</div>`,
        css`
          .test {
            color: blue;
          }
        `,
        html`<div>selectorToHash</div>`,
        css`
          .test {
            color: blue;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class{}> html and css are one class, it is replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test">selectorToHash</div>`,
        css`
          .test {
            color: blue;
          }
        `,
        html`<div class="h-aaaa1111">selectorToHash</div>`,
        css`
          .h-aaaa1111 {
            color: blue;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class{} .class{}> html and css are two classes, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test">
          <p class="big-text">selectorToHash</p>
        </div>`,
        css`
          .test {
            color: blue;
          }

          .big-text {
            font-size: 40px;
          }
        `,
        html`<div class="h-aaaa1111">
          <p class="h-bbbb2222">selectorToHash</p>
        </div>`,
        css`
          .h-aaaa1111 {
            color: blue;
          }

          .h-bbbb2222 {
            font-size: 40px;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.same-text{} .same-text{}> html and css are duplication class, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test">
          <p class="big-text">selectorToHash</p>
          <p class="big-text">selectorToHash</p>
          <p class="big-text">selectorToHash</p>
          <p class="big-text">selectorToHash</p>
          <p class="big-text">selectorToHash</p>
        </div>`,
        css`
          .test {
            color: blue;
          }
          .big-text {
            font-size: 40px;
          }
          .big-text {
            line-height: 1.5;
          }
        `,
        html`<div class="h-aaaa1111">
          <p class="h-bbbb2222">selectorToHash</p>
          <p class="h-bbbb2222">selectorToHash</p>
          <p class="h-bbbb2222">selectorToHash</p>
          <p class="h-bbbb2222">selectorToHash</p>
          <p class="h-bbbb2222">selectorToHash</p>
        </div>`,
        css`
          .h-aaaa1111 {
            color: blue;
          }
          .h-bbbb2222 {
            font-size: 40px;
          }
          .h-bbbb2222 {
            line-height: 1.5;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.text {text-align: center;}> same css properties as the class name are present, they will not be replaced properties', () => {
    const testData = [
      [
        html`<div class="test">
          <p class="text-center">selectorToHash</p>
        </div>`,
        css`
          .test {
            width: 300px;
            background: #ccc;
          }
          .text-center {
            text-align: center;
          }
        `,
        html`<div class="h-aaaa1111">
          <p class="h-bbbb2222">selectorToHash</p>
        </div>`,
        css`
          .h-aaaa1111 {
            width: 300px;
            background: #ccc;
          }
          .h-bbbb2222 {
            text-align: center;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class{> no space before curly braces of css, it is replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test">selectorToHash</div>`,
        `.test{
  width: 300px;
  background: #ccc;
}
        `,
        html`<div class="h-aaaa1111">selectorToHash</div>`,
        `.h-aaaa1111{
  width: 300px;
  background: #ccc;
}
        `,
      ],
    ]
    testExpectHash(testData)
  })
  // it('html class supports single quotation, it is replaced by the hash and returned', () => {
  //   const testData = [
  //     [
  //       `<div class='test'>selectorToHash</div>`,
  //       css`
  //         .test {
  //           width: 300px;
  //           background: #ccc;
  //         }
  //       `,
  //       `<div class='h-aaaa1111'>selectorToHash</div>`,
  //       css`
  //         .h-aaaa1111 {
  //           width: 300px;
  //           background: #ccc;
  //         }
  //       `,
  //     ],
  //   ]
  //   testExpectHash(testData)
  // })
  it('<.class:hover> pseudo class support, it is replaced by the hash and returned', () => {
    const testData = [
      [
        html`<a href="#" class="button">BUTTON</a>`,
        css`
          .button {
            position: relative;
            padding: 0.5em 1.6em;
            font-size: 0.8em;
            color: #00b5ad;
            text-decoration: none;
            user-select: none;
            border-top: 1px #00b5ad solid;
            border-bottom: 1px #00b5ad solid;
            transition: 0.3s;
          }

          .button:hover {
            opacity: 0.5;
          }
        `,
        html`<a href="#" class="h-aaaa1111">BUTTON</a>`,
        css`
          .h-aaaa1111 {
            position: relative;
            padding: 0.5em 1.6em;
            font-size: 0.8em;
            color: #00b5ad;
            text-decoration: none;
            user-select: none;
            border-top: 1px #00b5ad solid;
            border-bottom: 1px #00b5ad solid;
            transition: 0.3s;
          }

          .h-aaaa1111:hover {
            opacity: 0.5;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class::before> <.class::after> pseudo element support, it is replaced by the hash and returned', () => {
    const testData = [
      [
        html`<a href="#" class="button">BUTTON</a>`,
        css`
          .button {
            position: relative;
            padding: 0.5em 1.6em;
            font-size: 0.8em;
            color: #00b5ad;
            text-decoration: none;
            user-select: none;
            border-top: 1px #00b5ad solid;
            border-bottom: 1px #00b5ad solid;
            transition: 0.3s;
          }

          .button::after,
          .button::before {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            content: '';
            background: #00b5ad;
          }

          .button::after {
            top: 2px;
          }

          .button::before {
            bottom: 2px;
          }
        `,
        html`<a href="#" class="h-aaaa1111">BUTTON</a>`,
        css`
          .h-aaaa1111 {
            position: relative;
            padding: 0.5em 1.6em;
            font-size: 0.8em;
            color: #00b5ad;
            text-decoration: none;
            user-select: none;
            border-top: 1px #00b5ad solid;
            border-bottom: 1px #00b5ad solid;
            transition: 0.3s;
          }

          .h-aaaa1111::after,
          .h-aaaa1111::before {
            position: absolute;
            left: 0;
            width: 100%;
            height: 1px;
            content: '';
            background: #00b5ad;
          }

          .h-aaaa1111::after {
            top: 2px;
          }

          .h-aaaa1111::before {
            bottom: 2px;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class,.class> selector list is supported, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test"><p class="test2">selectorToHash</p></div>`,
        css`
          .test,
          .test2 {
            color: blue;
          }
        `,
        html`<div class="h-aaaa1111">
          <p class="h-bbbb2222">selectorToHash</p>
        </div>`,
        css`
          .h-aaaa1111,
          .h-bbbb2222 {
            color: blue;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class + .class> adjacent sibling combinator is supported, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="foo">foo</div>
          <div class="bar">bar</div>
          <div class="bar">bar</div>`,
        css`
          .foo + .bar {
            color: red;
          }
        `,
        html`<div class="h-aaaa1111">foo</div>
          <div class="h-bbbb2222">bar</div>
          <div class="h-bbbb2222">bar</div>`,
        css`
          .h-aaaa1111 + .h-bbbb2222 {
            color: red;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class .class> descendant combinator is supported, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html` <div class="test">
          <div>
            <p class="text2">selectorToHash</p>
            <p>selectorToHash</p>
          </div>
        </div>`,
        css`
          .test .text2 {
            color: blue;
            background: #ccc;
          }
        `,
        html` <div class="h-aaaa1111">
          <div>
            <p class="h-bbbb2222">selectorToHash</p>
            <p>selectorToHash</p>
          </div>
        </div>`,
        css`
          .h-aaaa1111 .h-bbbb2222 {
            color: blue;
            background: #ccc;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class ~ .class> general sibling combinator is supported, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<span class="text">This is not red.</span>
          <p class="text2">This is red</p>`,
        css`
          .text ~ .text2 {
            color: red;
          }
        `,
        html`<span class="h-aaaa1111">This is not red.</span>
          <p class="h-bbbb2222">This is red</p>`,
        css`
          .h-aaaa1111 ~ .h-bbbb2222 {
            color: red;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
  it('<.class > .class> child combinator is supported, they are replaced by the hash and returned', () => {
    const testData = [
      [
        html`<div class="test">
          <p>selectorToHash</p>
          <p class="text2">selectorToHash</p>
        </div>`,
        css`
          .test .text2 {
            color: blue;
            background: #ccc;
          }
        `,
        html`<div class="h-aaaa1111">
          <p>selectorToHash</p>
          <p class="h-bbbb2222">selectorToHash</p>
        </div>`,
        css`
          .h-aaaa1111 .h-bbbb2222 {
            color: blue;
            background: #ccc;
          }
        `,
      ],
    ]
    testExpectHash(testData)
  })
})
