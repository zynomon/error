
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
.
├── bootloaders
│   ├── grub-pc   # MODERN UEFI 
│   │   ├── grub.cfg
│   │   ├── live-theme
│   │   │   └── theme.txt
│   │   └── splash.png
│   └── isolinux   # BIOS 
│       ├── isolinux.cfg
│       ├── live.cfg.in
│       ├── menu.cfg
│       └── splash.png
├── errapp.list     # APPS THAT IT WILL HAVE IN THE .ISO
├── error.gpg       # "ERROR.OS" DEBIAN REPOSITORY SIGNATURE
├── error.list      # REPOSITORY LIST
├── Live.hook       # SCRIPT TO RUN INSIDE THE LIVE SYSTEM BEFORE IT PACKS TO .ISO
└── README.md       # THIS IS WHAT YOU ARE CURRENTLY READING

```

## Features

- Interactive menu system
- Auto dependency check and installation
- File validation before building
- Safe config recovery with backup
- ISO checksum verification
- Automatic config backups


## Manual Build

```bash
mkdir -p ~/build-area
cd ~/build-area

sudo apt-get install live-build live-tools \
  debootstrap squashfs-tools xorriso isolinux \
  ca-certificates gnupg dirmngr
lb confg && lb build

```

## Preview
[Screencast_20260926_130204.webm](https://github.com/user-attachments/assets/256fe5c8-4fdd-4f93-8098-44adf4109871)

# Naming

<img align=center width="1400" height="700" alt="NSbeta" src="https://github.com/user-attachments/assets/e13eb000-3fd4-440a-af80-2844fd6c79fb" />
this is how it generates an iso file name.

## Recovering Configurations

```bash
# Select "Recover Configs (Git Clone)" from menu
# Creates config_backup_YYYYMMDD_HHMMSS.7z before cloning
```

## Troubleshooting

**"Tool Missing: lb"**
```bash
sudo apt install live-build git
```

**"Permission denied"**
```bash
sudo ./.sh
```

**"Build failed"**
- Check build.log
- Verify 10GB+ free space
- Check internet connection
- You Need a debian system at host (Other hosts arent even tested)

**"Missing config files"**
Use "Recover Configs" menu option

## Customization

Edit these files:
- `errapp.list` - Application packages
- `bootloaders/grub-pc/grub.cfg` - Bootloader settings
- `bootloaders/grub-pc/live-theme/theme.txt` - GRUB theme
- `bootloaders/grub-pc/splash.png` - Boot splash

# If you wonder how it looks,

 <img width="1280" height="800" alt="e" src="https://github.com/user-attachments/assets/0e58fc9f-0a90-427a-a1d8-71e18ff2b328" />
  <img width="1280" height="800" alt="76" src="https://github.com/user-attachments/assets/e1d019ce-888e-48fd-8cc2-23600463dae8" />
  <img src="https://github.com/user-attachments/assets/0b395737-ede0-4473-83a1-ce3d94ea6b80" alt="gif" />
  <img width="640" height="480" alt="image" src="https://github.com/user-attachments/assets/3938d369-bd56-42a1-a578-6996e49a93b9" />
  <img width="1280" height="800" alt="dtyt" src="https://github.com/user-attachments/assets/e0dcc805-0198-46b2-8ad2-e85172f3bdd9" />
  <img width="1280" height="800" alt="cal" src="https://github.com/user-attachments/assets/a5bf7928-cab1-4554-b6e8-f06c44ce1bf1" />
  <img src="https://github.com/user-attachments/assets/d809d312-d066-4c54-a659-1f0b1f816437" alt="image" />
  <img width="1280" height="775" alt="image" src="https://github.com/user-attachments/assets/c969cc44-a6c1-44ce-8a53-e24dfb69b514" />
  <img width="1280" height="800" alt="err" src="https://github.com/user-attachments/assets/75d0ce8f-4eb1-4c0d-9969-f98e22196f06" />
  <img width="1280" height="800" alt="7" src="https://github.com/user-attachments/assets/383608b6-c732-424a-a046-8c403497b7ba" />
<img width="1280" height="800" alt="6" src="https://github.com/user-attachments/assets/46c846e9-78e1-465b-87e7-042fc5788c21" />
<img width="1280" height="800" alt="5" src="https://github.com/user-attachments/assets/7f5f9c32-0e31-4f93-8ef8-cc0edffe7ad1" />
<img width="1280" height="800" alt="4" src="https://github.com/user-attachments/assets/2883b798-8dd0-41a9-83a9-2492e85be8f2" />
<img width="1280" height="800" alt="3" src="https://github.com/user-attachments/assets/0b64bcf5-b0e5-48b0-9f61-92aa90d4edf1" />
