# Node.js fir.im upload plugin

Node.js plugin for upload apk/ipa to fir.im.

## Usage

1.Update fir.im token in js file

```
/**
 * fir.im api token
 */
const apiToken = 'your api token';
```

2.Upload package to fir.im

```
node uploadFirimHost.js [packagePath] [iconPath] [android/ios] [bundleId] [appName] [version] [buildVersion] [changelog]
```
