# node-fb-search-gui
Search over Facebook with this simply graphical user interface
![Preview](preview.gif)


### Setup
```js
// config/auth.js
module.exports = {
    'facebookAuth' : {
        'appID'      : '', // your App ID
        'appSecret'  : '', // your App Secret
        'callbackURL'   : 'https://localhost:80/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};
```

```js
// config/database.js
module.exports = {
    "mongourl":"mongodb://user:password@host/database"
};
```

```js
// config/ssl.js
module.exports = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
    requestCert: true,
    rejectUnauthorized: false
};
```

```
// .env
# Default
# production / development
NODE_ENV=development

# Default port if not passed as argument
DEFAULT_PORT = 443

# Facebook Access Token
FB_ACCESS_TOKEN = YOUR_ACCESS_TOKEN_HERE

# Session Secret Password
SESSION_SECRET = BYYm65nABSDB4
```

### Assets:
[Space](https://elements.envato.com/space-responsive-admin-dashboard-template-A9REUB) - purchase and unzip assets folder into public/assets

### License
```
LGPL-3.0
```
