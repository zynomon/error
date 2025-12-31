
<p align="center">
  <img src="https://github.com/zynomon/error/blob/web-side/icons/logo.svg" alt="error.os Logo" width="800">
</p>

<p align="center">
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
</p>

## Quick Start

```bash
git clone https://github.com/zynomon/error.git
cd error
sudo ./.sh
```

## File Structure

```
error/
├── .sh
├── errapp.list
├── error.list
├── error.gpg
├── Live.hook
├── bootloaders/
│   ├── grub-pc/
│   │   ├── grub.cfg
│   │   ├── splash.png
│   │   └── live-theme/
│   └── isolinux/
│       ├── isolinux.cfg
│       ├── live.cfg.in
│       └── menu.cfg
└── usr/share/fonts/opentype/error.os/
    ├── NimbusMonoPS-Bold.otf
    └── NimbusMonoPS-Regular.otf
```

![File Structure](https://github.com/user-attachments/assets/1c7d5c20-ad07-4b0f-8d0e-debe0edb1bf4)

## Features

- Interactive menu system
- Auto dependency check and installation
- File validation before building
- Safe config recovery with backup
- ISO checksum verification
- Automatic config backups

## Builder Menu

```
> Start Building the ISO
  Verify ISO (Checksums)
  Recover Configs (Git Clone)
  Open Config Folder
  Exit
```

## Manual Build

```bash
mkdir -p ~/build-area
cd ~/build-area

sudo apt-get install live-build live-tools \
  debootstrap squashfs-tools xorriso isolinux \
  ca-certificates gnupg dirmngr

git clone https://github.com/zynomon/error.git
cd error
sudo ./.sh
```

## Screenshots

![Build Interface](https://github.com/user-attachments/assets/722005a2-0425-4e2b-bfb8-06df7175e534)

![Live-Build Structure](https://github.com/user-attachments/assets/0c70dff4-ad49-4b96-ae9d-0c932c626a67)

![ISO Generation](https://github.com/user-attachments/assets/7d19e7ad-2c88-4bd8-924c-54fe4d65212d)

## Recovering Configurations

```bash
# Select "Recover Configs (Git Clone)" from menu
# Creates config_backup_YYYYMMDD_HHMMSS.7z before cloning
```

## Troubleshooting

**"Tool Missing: lb"**
```bash
sudo apt install live-build
```

**"Permission denied"**
```bash
sudo ./.sh
```

**"Build failed"**
- Check build.log
- Verify 10GB+ free space
- Check internet connection

**"Missing config files"**
Use "Recover Configs" menu option

## Customization

Edit these files:
- `errapp.list` - Application packages
- `bootloaders/grub-pc/grub.cfg` - Bootloader settings
- `bootloaders/grub-pc/live-theme/theme.txt` - GRUB theme
- `bootloaders/grub-pc/splash.png` - Boot splash

## Contributing

1. Check existing issues
2. Fork repository
3. Create feature branch
4. Submit pull request

## License

Apache 2.0 - See LICENSE file.

---

The `.sh` script validates and guides through common issues.
