module.exports = {
    'facebookAuth' : {
        'appID'      : '', // your App ID
        'appSecret'  : '', // your App Secret
        'callbackURL'   : 'https://localhost:80/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};
