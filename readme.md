# getcdn
Save the cdn file completely locally.


## why do you need it
Because the cdn may be unstable, or it needs to be deployed in an intranet environment. At this time we need to download the cdn file to the local.


Suppose you use such a cdn file:

``` html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.css">
```

Then you downloaded it directly through the browser and saved it as bootstrap.css , and then referenced the file you just downloaded in the project, which seems to be fine, but there are actually many hidden dangers:

- When bootstrap.css runs a certain function, it needs to depend on ./bootstrap.font, because you didn't know it before, so you didn't download it, which caused an error (the related dependencies were not downloaded).
- During use, you find a problem and need to consult the bootstrap documentation, but you don't know what version to check (some libraries do not mark their own version number in the file).
- When you need to switch back to the third-party CDN again, you will find how happy it is if you only need to change one origin (full mirror URL).
- the url you want to trace to its github, its other versions, and more information about it...


## how to use

Command Line:
``` sh
# install
npm i -g getcdn

# help
getcdn .help

# download the latest version
getcdn userkey

# Specify the storage directory
getcdn .dir=mycdn userkey

# Download the specified version
getcdn userkey@1.0.3

# Specify namespace and version
getcdn @wll8/express-ws@1.0.3
```

## License
[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, xw