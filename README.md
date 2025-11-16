
<img src="https://github.com/zynomon/error/blob/web-side/icons/logo.svg" alt="error-text" style="width:1000px;">


<p align="center">
  <a href="https://zynomon.github.io/error">
    <img src="https://img.shields.io/badge/Visit%20Website-blue?style=plastic&logo=google-chrome&logoColor=white">
  </a>
  <img src="https://img.shields.io/badge/Status-Beta-yellow?style=plastic&logo=progress">
  <img src="https://img.shields.io/badge/License-Apache%202.0-green?style=plastic&logo=open-source-initiative&logoColor=white">
  <img src="https://img.shields.io/badge/Platform-Linux-orange?style=plastic&logo=linux&logoColor=white">
  <img src="https://hits.sh/zynomon.github.io/error.svg?style=plastic&label=visits&logo=counter-culture&logoColor=white">
  <a href="https://github.com/zynomon/error">
    <img src="https://img.shields.io/github/stars/zynomon/error?style=plastic&logo=github">
  </a>
  <a href="https://github.com/zynomon/error/fork">
    <img src="https://img.shields.io/github/forks/zynomon/error?style=plastic&logo=github">
  </a>
  <a href="https://discord.gg/Jn7FBwu99F">
    <img src="https://img.shields.io/badge/Join%20Discord-5865F2?style=plastic&logo=discord&logoColor=white">
  </a>
</p>

---
# this is the homepage for error.os and it's debian/apt repo
Adding the repo to your existing system to enjoy updates and error.os apps natively.
- type this on terminal
  
``` 
curl -fsSL https://zynomon.github.io/error/error.gpg | sudo tee /usr/share/keyrings/error.gpg && echo "deb [signed-by=/usr/share/keyrings/error.gpg] https://zynomon.github.io/error stable main" | sudo tee /etc/apt/sources.list.d/erroros.list && sudo apt update
 ```
won't work for now because there is a major bug to fix
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
# 𝚎𝚛𝚛𝚘𝚛.𝚘𝚜 
born from failure, built for control. 

