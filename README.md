<span style="font-family: 'Nimbus Mono', monospace; font-size: 1.1em;">error.os</span>

a set of operating systems based on unix kernel
home page of upcoming error.os 
# https://zynomon.github.io/error/
---
# this is the homepage for error.os and it's debian/apt repo
Adding the repo to your existing system to enjoy updates and error.os apps natively.
- type this on terminal
  
``` 
curl -fsSL https://zynomon.github.io/error/error.gpg | sudo tee /usr/share/keyrings/error.gpg && echo "deb [signed-by=/usr/share/keyrings/error.gpg] https://zynomon.github.io/error stable main" | sudo tee /etc/apt/sources.list.d/erroros.list && sudo apt update
 ```
```
├── conf
│   └── distributions
├── dists
│   └── stable
│       ├── InRelease
│       ├── main
│       │   ├── binary-all
│       │   │   ├── calamares-settings-error.deb
│       │   │   ├── error.base.deb
│       │   │   ├── Packages
│       │   │   ├── Packages.gz
│       │   │   └── Packages.xz
│       │   ├── binary-amd64
│       │   │   ├── err_.deb
│       │   │   ├── once.deb
│       │   │   ├── onu.deb
│       │   │   ├── Packages
│       │   │   ├── Packages.gz
│       │   │   ├── Packages.xz
│       │   │   └── vex.deb
│       │   └── i18n
│       │       ├── Translation-en
│       │       ├── Translation-en.gz
│       │       ├── Translation-en_US
│       │       ├── Translation-en_US.gz
│       │       ├── Translation-en_US.xz
│       │       └── Translation-en.xz
│       ├── Release
│       └── Release.gpg
├── error.gpg
├── index.html
└── README.md

