module.exports = (hash, accessToken) => {
    if (accessToken === null || hash === null || hash === '') {
        return false;
    }

    const crypto = require('crypto');

    const localHost = 'localhost:3000';
    const herokuHost = 'hand-me-ups.herokuapp.com';
    const localToken = crypto
        .createHmac('sha256', accessToken)
        .update(localHost)
        .digest('hex');

    const herokuToken = crypto
        .createHmac('sha256', accessToken)
        .update(herokuHost)
        .digest('hex');

    return hash === localToken || hash === herokuToken;
};
