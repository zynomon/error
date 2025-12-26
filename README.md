
<img src="https://github.com/zynomon/error/blob/web-side/icons/logo.svg" alt="error-text" style="width:1000px;">


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

---


Making of error.os , - it was a long boring session of building a distro seeing ***errors*** fixing them seeing another , fixing them . by default it wasn't so flexible 

i mean the debian live build command wasn't so much helpful at all , 

<img width="1345" height="697" alt="image" src="https://github.com/user-attachments/assets/7d19e7ad-2c88-4bd8-924c-54fe4d65212d" />
By the way you can live without the struggle or make your own distro like mine  you will see some  .7z files here those are the config directory just drag and drop then use some live build command to make your own error.os Fork 🍽. 
# Tutorial on making error.os
<img width="693" height="500" alt="image" src="https://github.com/user-attachments/assets/722005a2-0425-4e2b-bfb8-06df7175e534" />
the lb build structure ( Will automatically be created nothing to do here )
<img width="523" height="262" alt="image" src="https://github.com/user-attachments/assets/0c70dff4-ad49-4b96-ae9d-0c932c626a67" 
The main thing is the config directory everything else is automated which is why we need config examples and its 
what usually people doesnt share or "Make your own" without any clue 

.
--

```
# create e directory

mkdir -p ~/e
cd e

# install the knife of the chief

sudo apt-get update
sudo apt-get install live-build live-tools \
  debootstrap squashfs-tools xorriso isolinux \
  ca-certificates gnupg dirmngr \
  ffmpeg sound-theme-freedesktop # usually already installed but to make sure assumption doesn't gets over vibes.

# enable our repo
curl -fsSL https://zynomon.github.io/error/error.gpg | sudo tee /usr/share/keyrings/error.gpg && echo "deb [signed-by=/usr/share/keyrings/error.gpg] https://zynomon.github.io/error stable main" | sudo tee /etc/apt/sources.list.d/erroros.list && sudo apt update

# now lets begin
# exact config built for error.os yes exact

sudo lb config \
  --distribution trixie \
  --mirror-bootstrap http://mirror.xeonbd.com/debian \        # bangladeshi fast mirror jump from 1 kbps to 59 mbps
  --mirror-chroot http://mirror.xeonbd.com/debian \
  --mirror-chroot-security http://security.debian.org/debian-security \
  --mirror-binary http://mirror.xeonbd.com/debian \
  --mirror-binary-security http://security.debian.org/debian-security \
  --debootstrap-options "--include=ca-certificates,gnupg,dirmngr --keyring=/usr/share/keyrings/debian-archive-keyring.gpg" \
  --bootloader grub-efi \
  --bootappend-live "boot=live components quiet splash plymouth.theme=err" \
  --memtest memtest86+ \
  --firmware-binary true \
  --firmware-chroot true \
  --initramfs live-boot \
  --linux-packages linux-image \
  --architectures amd64 \
  --binary-images iso-hybrid \
  --checksums sha256 \
  --win32-loader false \
  --source false \
  --iso-application "error.os Installer 2025" \
  --iso-publisher "Zynomon Aelius" \
  --iso-preparer "Zynomon Aelius" \
  --iso-volume "error.os Neospace" \
  --hdd-label "ERROR_OS" \
  --apt-recommends false \

# clone the config
cd ~
git clone https://github.com/zynomon/error
cd error
ls error
sudo rm -rf ~/e/config
sudo mv ~/error/config ~/e/config
ls error
rm -rf ~/error
cd ~/e
ls

sudo lb build && ffplay -nodisp -autoexit /usr/share/sounds/freedesktop/dialog-error.oga || ffplay -nodisp -autoexit /usr/share/sounds/freedesktop/bell.oga
# if build fails - error sound if passes bell sound no need to install them though they are there in every freedesktop linux devices good luck!

```
<img width="872" height="563" alt="image" src="https://github.com/user-attachments/assets/cf36342c-af76-421e-96f9-c9e543e876a1" />
