# Publishing Guide

## Before Publishing

1. **Update package.json**:
   - Change `name` to a unique package name (check availability on npmjs.com)
   - Update `author` with your name and email
   - Update repository URLs to your GitHub repo
   - Increment `version` for updates

2. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/gradual-blur-cli.git
   git push -u origin main
   ```

## Publishing to NPM

1. **Login to NPM**:
   ```bash
   npm login
   ```

2. **Test locally**:
   ```bash
   npm link
   gradual-blur --help
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

## After Publishing

Users can install with:
```bash
npm install -g gradual-blur-cli
```

## Updating

1. Update version in package.json
2. Commit changes
3. Run `npm publish` again

## Package Name Suggestions

If `gradual-blur-cli` is taken, try:
- `gradual-blur-generator`
- `css-gradual-blur`
- `blur-gradient-cli`
- `backdrop-blur-cli`