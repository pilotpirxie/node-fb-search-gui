module.exports = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
    requestCert: true,
    rejectUnauthorized: false
};
