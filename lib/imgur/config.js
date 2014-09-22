var clientID = 'eed6f972e23f67e';

exports.clientID = clientID;

exports.options = {
    url: 'https://api.imgur.com/3/image',
    method: "POST",
    headers: {
        Authorization: "Client-ID " + clientID,
        Accept: 'application/json'
    }
}