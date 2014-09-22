# Node-Imgur

`node-imgur` is a node module used for monitoring directories on one's computer and then uploading various file types to the Imgur service. After the upload is complete, the link for the uploaded resource is placed on your clipboard for you to share.

## Requirements

`node-imgur` relies on the following workflow if you plan on using its video conversion feature:

- [gifify](https://github.com/jclem/gifify)

## Files Currently Supported

- [x] `png`
- [x] `gif`
- [x] `mov`
- [x] `jpg`

## Features To Implement

- [ ] Supporting the various forms of clipboards instead of just `pbcopy`
- [ ] Adding more file types to support
- [ ] Adding configuration settings
    - [x] Directory to monitor
    - [ ] File types you want monitored
    - [ ] Delete file after upload flag
- [ ] Add support for logging in with user account
- [ ] Test Suite