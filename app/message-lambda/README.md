## Directory initialization

Make sure TypeScript is installed globally:
```
npm i -g typescript
```

Initialize directory and typescript config. Both `package.json` and `tsconfig.json` have been modified.
```
npm init -y
tsc --init
```

Install node type defintions:
```
npm i -D @types/node
```

Install `ts-node` globally:
```
npm i -g ts-node
```

## Compilation:

```
tsc
```

- This will build the `index.js` file in the ./dist dir as defined in `tsconfig.json`.  
- Running `tsc src/index.ts` will ignore the config file.  