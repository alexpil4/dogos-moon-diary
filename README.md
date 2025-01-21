# Dogo's moon diary

> "That a bad job interview without feedback is not a complete waste of time."

Vite SPA project for keeping record of moon observations. 

## Running the app

- Clone or download this repository locally

- Install dependencies

```bash
npm install
```

- Run in dev mode

```bash
npm run dev --open
```

to open the development build in the browser.

## Used library

- React 18
- MUI v6 component library: https://mui.com/material-ui/getting-started/
- React router v7: https://reactrouter.com/home#react-router-as-a-library
- MUI-X Datagrid: https://mui.com/x/react-data-grid/
- MUI-X Charts: https://mui.com/x/react-charts/
- Tanstack Query: https://tanstack.com/query/latest/docs/framework/react/overview
- Lodash: https://lodash.com/docs/4.17.15

## APIs

The APIs used by this simple application are mocked inside the browser
using [MSWJS](https://mswjs.io/). You shouldn't care too much about this detail
and just call the APIs as if they were running on a remote server.
You can use the fetch API of the browser or install another library.

A detailed docs on the API is available [here](src/mocks/README.md) if you need it.
