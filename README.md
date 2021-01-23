![logo.png](https://user-images.githubusercontent.com/8923331/105569588-0670f900-5d86-11eb-9833-646e42260321.png)
INGRED UI is a design system developed to make it easy and quick for anyone to build a user interface.
It is based on React and has a well thought out structure that works well with Type script.

>

[![NPM](https://img.shields.io/npm/v/ingred-ui.svg)](https://www.npmjs.com/package/ingred-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

For npm users:

```bash
npm install --save ingred-ui styled-components
```

For Yarn users:

```bash
yarn add ingred-ui styled-components
```

## Usage

```tsx
import * as React from "react";

import { ThemeProvider, createTheme, Button } from "ingred-ui";

class Example extends React.Component {
  render() {
    const theme = createTheme();
    return (
      <ThemeProvider theme={theme}>
        <Button>Sample</Button>
      </ThemeProvider>
    );
  }
}
```

If you use `<DatePicker />` or `<DateRangePicker />` , add

```tsx
import "react-dates/lib/css/_datepicker.css";
```

## License

MIT © [voyagegroup](https://github.com/voyagegroup)
