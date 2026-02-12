# Webpack Dev Server Guide

## Expected Behavior

**`npm start` is SUPPOSED to run continuously!** ✅

This is **normal and expected** behavior. The webpack dev server:
- Starts and keeps running
- Watches for file changes
- Serves your app on http://localhost:3000
- Does NOT exit on its own
- You stop it with Ctrl+C

---

## What Success Looks Like

When `npm start` is working correctly, you should see:

```
> ericriveraisme-portfolio@1.0.0 start
> webpack serve --mode development --open

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:3000/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.x.x:3000/
<i> [webpack-dev-server] Content not from webpack is served from 'C:\Users\gameo\ericriveraisme.github.io'
webpack compiled successfully
```

Then:
- ✅ Browser should auto-open to http://localhost:3000
- ✅ Terminal stays running (this is correct!)
- ✅ You can edit files and see changes automatically
- ✅ Press Ctrl+C when you want to stop

---

## If You See Errors

### Error: Cannot find module or compilation errors
**Check:**
- Are all dependencies installed? (`npm install`)
- Are there syntax errors in `FF6PortfolioApp.jsx` or `index.jsx`?

### Error: Port 3000 already in use
**Fix:**
```bash
# Option 1: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Change port in webpack.config.js
port: 3001,  // instead of 3000
```

### Error: EADDRINUSE or port conflicts
**Fix:** Change the port in `webpack.config.js`

---

## Webpack Dev Server v5 Compatibility

We upgraded from v4 to v5.2.3. The config should work, but if you see issues:

### Potential Issues:
1. **Static file serving** - v5 uses different syntax
2. **Hot module replacement** - should work the same
3. **History API fallback** - should work the same

### If Dev Server Doesn't Start:
Check the terminal output for specific error messages and share them.

---

## Quick Test

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Expected:** 
   - Terminal shows "webpack compiled successfully"
   - Browser opens automatically
   - Terminal stays running (don't close it!)

3. **Verify:**
   - Visit http://localhost:3000
   - You should see the FF6 portfolio
   - Canvas animation should be running

4. **Stop:**
   - Press Ctrl+C in the terminal
   - Server stops, terminal returns to prompt

---

## Troubleshooting

### Server starts but browser doesn't open
- Manually visit: http://localhost:3000
- Check if `open: true` is in webpack.config.js (it is)

### Changes don't hot reload
- Check browser console for errors
- Hard refresh: Ctrl+Shift+R or Ctrl+F5

### Build succeeds but page is blank
- Check browser console for JavaScript errors
- Verify `dist/bundle.js` is being served
- Check that `index.html` references `./dist/bundle.js`

---

*Last Updated: January 2025*

