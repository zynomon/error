---
layout: default
splash: false
title: "Download error.os"
description: "This page rediscovers topics about downloading error.os"
icon: doc/downloader.svg
---

<script>
const ISO_API = {
  renderCard(iso) {
    return `
      <div class="card download-item" data-branch="${iso.branch}" style="cursor: pointer; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div class="iso-icon" data-branch="${iso.branch}" style="flex-shrink: 0;">
            <img src="https://zynomon.github.io/error/icons/${iso.branch}.jpg" alt="${iso.title}" class="download-thumbnail">
          </div>
          <div style="flex: 1;">
            <h3 style="margin: 0 0 0.25rem 0; font-size: 1.25rem;">${iso.title}</h3>
            <p style="margin: 0; color: var(--txt-2); font-size: 0.85rem;">${iso.description}</p>
          </div>
          <div class="iso-download-links" style="flex-shrink: 0;">
            ${iso.downloadLinks.map(link => `
              <a href="${link.url}" target="_blank" class="btn" style="display: inline-block; margin-left: 0.5rem;">
                <img src="${link.shieldImg}" class="badge-link">
              </a>
            `).join('')}
          </div>
        </div>
        <div class="iso-wget" style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--line-dim);">
          <pre><code>${iso.wcmd}</code></pre>
        </div>
      </div>
    `;
  },

  renderModal(iso) {
    return `
      <div class="modal-overlay" id="iso-modal">
        <div class="modal-content">
          <button class="modal-close" style="user-select: none;">&times;</button>
          <div class="modal-body">
            <div class="modal-header">
              <img src="https://zynomon.github.io/error/icons/${iso.branch}.jpg" alt="${iso.title}" class="modal-image">
              <h2>${iso.title}</h2>
            </div>
            <div class="modal-details">
              ${iso.fullDescription}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initModal() {
    const modal = document.getElementById('iso-modal');
    if (!modal) return;
    
    setTimeout(() => modal.classList.add('show'), 10);
    
    modal.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) this.closeModal(modal); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.getElementById('iso-modal');
        if (openModal) this.closeModal(openModal);
      }
    });
  },
  
  closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  },

  attachHandlers(isoData) {
    document.querySelectorAll('.download-item').forEach(card => {
      const branch = card.dataset.branch;
      const iso = isoData.find(i => i.branch === branch);
      card.addEventListener('click', (e) => {
        if (e.target.closest('.iso-download-links') || e.target.closest('.iso-wget')) return;
        if (iso) {
          const existingModal = document.getElementById('iso-modal');
          if (existingModal) this.closeModal(existingModal);
          document.body.insertAdjacentHTML('beforeend', this.renderModal(iso));
          this.initModal();
        }
      });
    });
  },

  render(isoData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = isoData.map(iso => this.renderCard(iso)).join('');
    this.attachHandlers(isoData);
  }
};
</script>

<style>
.iso-icon {
  cursor: pointer;
}

.download-thumbnail {
  width: 48px !important;
  height: 48px !important;
  object-fit: cover !important;
  border-radius: 8px !important;
  margin: 0 !important;
  display: block !important;
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
  border: none !important;
  box-shadow: none !important;
  transform: none !important;
}

.download-thumbnail:hover {
  transform: scale(1.05) !important;
  box-shadow: none !important;
}

.download-thumbnail:active {
  transform: scale(1.05) !important;
}

.iso-download-links .btn {
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  line-height: 1 !important;
}

.badge-link {    
    height: 28px !important;
 width: auto !important;
vertical-align: middle !important;
margin: 0 !important;
display: inline-block !important;
transform: none !important; 
cursor: alias !important;
border-radius: initial;
}

.badge-link:hover {
  transform: none !important;
  box-shadow: none !important;
}

.modal-image {
  width: 100px !important;
  height: 100px !important;
  object-fit: cover !important;
  border-radius: 16px !important;
  margin: 0 auto 1rem auto !important;
  border: 1px solid var(--line) !important;
  display: block !important;
  box-shadow: none !important;
  transform: none !important;
}

.modal-image:hover {
  transform: none !important;
  box-shadow: none !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 24px;
  max-width: 600px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-out);
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

.modal-overlay.show .modal-content {
  transform: scale(1);
}

.modal-close {
  position: sticky;
  top: 10px;
  float: right;
  background: var(--grey-2);
  border: 1px solid var(--line);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: var(--txt);
  font-size: 1.5rem;
  margin: 0.75rem;
  z-index: 10;
}

.modal-close:hover {
  background: var(--grey-3);
}

.modal-body {
  padding: 0 1.5rem 1.5rem 1.5rem;
  clear: both;
}

.modal-header {
  text-align: center;
  margin-bottom: 1rem;
}

.modal-details h1 {
  color: var(--accent-2);
  margin: 0 0 0.5rem 0;
}

.modal-details h2 {
  color: var(--accent-2);
  margin: 1rem 0 0.5rem 0;
}

.modal-details hr {
  border: none;
  border-top: 1px solid var(--line-dim);
  margin: 1rem 0;
}

.modal-details details {
  margin: 0.5rem 0;
}

.modal-details summary {
  cursor: pointer;
  color: var(--txt);
}

.modal-details summary b {
  color: var(--accent-2);
}

.modal-details details p {
  margin: 0.5rem 0 0.5rem 1.5rem;
  color: var(--txt-2);
  font-size: 0.9rem;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: var(--grey-1);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: var(--grey-3);
  border-radius: 10px;
}
</style>

<script>
const ISO_DOWNLOADS = [
  {
    branch: "void",
    title: "Void v3",
    description: "Void release. March 2026. Bootable but has issues.",
    downloadLinks: [
      {
        url: "https://archive.org/download/error.os-neospace-2026/NS_26%20VOID%20%28%20boots%20but%20has%20issues%20%29/NS26_VOID_3.0.iso%20",
        shieldImg: "https://img.shields.io/badge/ISO-1e3a5f?style=for-the-badge&logo=sonarr&logoColor=white"
      },
      {
        url: "https://archive.org/details/error.os-neospace-2026",
        shieldImg: "https://img.shields.io/badge/Ia-1e3a5f?style=for-the-badge&logo=internetarchive&logoColor=white"
      },
      {
        url: "https://archive.org/download/error.os-neospace-2026/NS_26%20VOID%20%28%20boots%20but%20has%20issues%20%29/md5.txt",
        shieldImg: "https://img.shields.io/badge/MD5-1e3a5f?style=for-the-badge&logo=apachemaven&logoColor=white"
      }
    ],
    wcmd: `wget "https://archive.org/download/error.os-neospace-2026/NS_26%20VOID%20%28%20boots%20but%20has%20issues%20%29/NS26_VOID_3.0.iso%20"`,
    fullDescription: `
      <h1>Void v3</h1>
      <hr>
      <p>In other words this is <b>NS26β1</b>.</p>
      <p>It contains advanced fixes and customizations along with the faults and fixes from Neospace 2025.</p>
      <p>This version includes:</p>
      <p><b>Vex Cytoplasm</b> which is the text editor at version 4.1 with an added plugin architecture.</p>
      <p><b>Onu</b> at version 0.6 with many fixes applied.</p>
      <p><b>err_</b> at version 3.0 which now also includes a wine optimizer.</p>
      <p><b>error.doc</b> at version 4.0 which is now offline based with man page support and additional changes.</p>
      <p><b>error.base</b> received minimal changes.</p>
      <p><b>Calamares settings error</b> received some fixes tied to installing error.os but there are still issues tied to apt run live which is why this remains in the void section.</p>
      <p>It was released on <b>March 26, 2026</b>.</p>
      <hr>
      <h2>System Requirements</h2>
      <details>
        <summary><b>CPU:</b> 2 cores 64-bit processor</summary>
        <p>Any modern 64-bit processor from AMD or Intel. Virtualization support recommended if using in a virtual machine.</p>
      </details>
      <details>
        <summary><b>RAM:</b> 1.5 GB minimum</summary>
        <p>At least 1.5 GB of system memory is required to boot and run the desktop environment.</p>
      </details>
      <details>
        <summary><b>Storage:</b> 10 GB recommended</summary>
        <p>At least 10 GB of available disk space is recommended for installation and basic usage.</p>
      </details>
      <details>
        <summary><b>Graphics:</b> Anything</summary>
        <p>Any graphics card or integrated graphics that can display a desktop environment.</p>
      </details>
      <details>
        <summary><b>Motherboard:</b> Anything with modern support</summary>
        <p>Any motherboard with standard UEFI or legacy BIOS support.</p>
      </details>
    `
  },
  {
    branch: "neospace",
    title: "Neospace 2025",
    description: "First stable Neospace release. December 2025. GPG signed.",
    downloadLinks: [
      {
        url: "https://archive.org/download/error.os_Neospace_2025/error.os_Neospace_2025.iso",
        shieldImg: "https://img.shields.io/badge/ISO-1a365d?style=for-the-badge&logo=sonarr&logoColor=white"
      },
      {
        url: "https://archive.org/details/error.os_Neospace_2025",
        shieldImg: "https://img.shields.io/badge/Ia-1a365d?style=for-the-badge&logo=internetarchive&logoColor=white"
      },
      {
        url: "https://archive.org/download/error.os_Neospace_2025/iso_verification.gpg",
        shieldImg: "https://img.shields.io/badge/GPG-1a365d?style=for-the-badge&logo=apachemaven&logoColor=white"
      },
      {
        url: "https://archive.org/download/error.os_Neospace_2025/iso_verification.sha512.txt",
        shieldImg: "https://img.shields.io/badge/SHA512-1a365d?style=for-the-badge&logo=apachemaven&logoColor=white"
      },
      {
        url: "https://archive.org/download/error.os_Neospace_2025/sha256sum.txt",
        shieldImg: "https://img.shields.io/badge/SHA256-1a365d?style=for-the-badge&logo=apachemaven&logoColor=white"
      },
      {
        url: "https://archive.org/download/error.os_Neospace_2025/md5sum.txt",
        shieldImg: "https://img.shields.io/badge/MD5-1a365d?style=for-the-badge&logo=apachemaven&logoColor=white"
      }
    ],
    wcmd: `wget https://archive.org/download/error.os_Neospace_2025/error.os_Neospace_2025.iso`,
    fullDescription: `
      <h1>Neospace 2025</h1>
      <hr>
      <p>It was released on the last day of the year 2025.</p>
      <p>This version contained several applications built by the error.os team:</p>
      <p><b>Vex Emerald</b> which is the text editor at version 2.5.</p>
      <p><b>Onu</b> which is the web browser at version 0.4.</p>
      <p><b>Calamares settings error</b> which is self explanatory.</p>
      <p><b>err_</b> at version 3.0.6 which serves as a system dashboard.</p>
      <p><b>error.base</b> which is the base package containing all the customizations for error.os.</p>
      <p><b>error.doc</b> which is a documentation application containing an online documentation viewer.</p>
      <hr>
      <h2>System Requirements</h2>
      <details>
        <summary><b>CPU:</b> 2 cores 64-bit processor</summary>
        <p>Any modern 64-bit processor from AMD or Intel. Virtualization support recommended if using in a virtual machine.</p>
      </details>
      <details>
        <summary><b>RAM:</b> 1.5 GB minimum</summary>
        <p>At least 1.5 GB of system memory is required to boot and run the desktop environment.</p>
      </details>
      <details>
        <summary><b>Storage:</b> 5 GB minimum</summary>
        <p>A minimum of 5 GB of available disk space is required for installation.</p>
      </details>
      <details>
        <summary><b>Graphics:</b> Anything</summary>
        <p>Any graphics card or integrated graphics that can display a desktop environment.</p>
      </details>
      <details>
        <summary><b>Motherboard:</b> Anything with modern support</summary>
        <p>Any motherboard with standard UEFI or legacy BIOS support.</p>
      </details>
    `
  },
  {
    branch: "void",
    title: "Void v2",
    description: "November 2025. NS25β2.",
    downloadLinks: [
      {
        url: "https://archive.org/download/error.os-void-0.2/error.os%20Void%200.2.iso",
        shieldImg: "https://img.shields.io/badge/ISO-1e3a5f?style=for-the-badge&logo=sonarr&logoColor=white"
      },
      {
        url: "https://archive.org/details/error.os-void-0.2",
        shieldImg: "https://img.shields.io/badge/Ia-1e3a5f?style=for-the-badge&logo=internetarchive&logoColor=white"
      }
    ],
    wcmd: `wget "https://archive.org/download/error.os-void-0.2/error.os%20Void%200.2.iso"`,
    fullDescription: `
      <h1>Void v2</h1>
      <hr>
      <p>This version was made after one month of Void v1.</p>
      <p>This version used <b>debian live build</b> for building the application.</p>
      <p>It also contained the base line for future versions including:</p>
      <p><b>Error.os's debian repository</b></p>
      <p><b>Onu web browser</b> version 0.2</p>
      <p><b>Vex text editor</b> version 1</p>
      <p><b>err_</b> version 0.0.3 which serves as a system dashboard with application installer, remover, driver updater, and system information viewer.</p>
      <p><b>Calamares settings error</b> which is self explanatory.</p>
      <p><b>error.base</b> which is the base package containing customizations.</p>
      <hr>
      <h2>System Requirements</h2>
      <details>
        <summary><b>CPU:</b> 2 cores 64-bit processor</summary>
        <p>Any modern 64-bit processor from AMD or Intel. Virtualization support recommended if using in a virtual machine.</p>
      </details>
      <details>
        <summary><b>RAM:</b> 1.5 GB minimum</summary>
        <p>At least 1.5 GB of system memory is required to boot and run the desktop environment.</p>
      </details>
      <details>
        <summary><b>Storage:</b> 10 GB recommended</summary>
        <p>At least 10 GB of available disk space is recommended for installation and basic usage.</p>
      </details>
      <details>
        <summary><b>Graphics:</b> Anything</summary>
        <p>Any graphics card or integrated graphics that can display a desktop environment.</p>
      </details>
      <details>
        <summary><b>Motherboard:</b> Anything with modern support</summary>
        <p>Any motherboard with standard UEFI or legacy BIOS support.</p>
      </details>
    `
  },
  {
    branch: "void",
    title: "Void v1",
    description: "First Void release. September 2025. NS25β1.",
    downloadLinks: [
      {
        url: "https://archive.org/download/error.os-Neospace-64bit/error.os-Neospace-64bit.iso",
        shieldImg: "https://img.shields.io/badge/ISO-1e3a5f?style=for-the-badge&logo=sonarr&logoColor=white"
      },
      {
        url: "https://archive.org/details/error.os-Neospace-64bit",
        shieldImg: "https://img.shields.io/badge/Ia-1e3a5f?style=for-the-badge&logo=internetarchive&logoColor=white"
      }
    ],
    wcmd: `wget https://archive.org/download/error.os-Neospace-64bit/error.os-Neospace-64bit.iso`,
    fullDescription: `
      <h1>Void v1</h1>
      <hr>
      <p><b>Void v1</b> is the first release of error.os.</p>
      <p>It was made to be Neospace 2025 but back then there was no <b>error.base</b> which is the error.os customization packed into one debian package. There was also no debian repository for error.os applications.</p>
      <p>It just served bugs and the application named <b><a href="https://github.com/zynomon/err_">err_</a></b> which is a system dashboard with an application installer, application remover, driver updater, and system information viewer.</p>
      <hr>
      <h2>System Requirements</h2>
      <details>
        <summary><b>CPU:</b> Any 64-bit 2-core processor</summary>
        <p>Any 64-bit processor with at least 2 cores. ARM architecture is excluded from this release.</p>
      </details>
      <details>
        <summary><b>RAM:</b> 2 GB recommended</summary>
        <p>Uses under 1.5 GB at idle. 2 GB is recommended for smooth operation.</p>
      </details>
      <details>
        <summary><b>Storage:</b> 10 GB minimum</summary>
        <p>At least 10 GB of available disk space is required for installation.</p>
      </details>
      <details>
        <summary><b>Graphics:</b> Anything</summary>
        <p>Any graphics card or integrated graphics that can display a desktop environment.</p>
      </details>
      <details>
        <summary><b>Motherboard:</b> Anything with modern support</summary>
        <p>Any motherboard with standard UEFI or legacy BIOS support.</p>
      </details>
    `
  }
];
document.addEventListener('DOMContentLoaded', () => {
  ISO_API.render(ISO_DOWNLOADS, 'iso');
});
</script>

<h1>Downloading basics</h1>

<p>error.os has been out there since 2025. While the main goal is to reach a cool desktop environment with better usability, it is partially implemented.</p>

<div id="iso"></div>

<hr>

<div align="left">
  <img src="https://github.com/zynomon/error/raw/web-side/icons/void.jpg" width="250" height="250" align="left" style="margin-right: 20px; border-radius: 12px;">
  <h1>Void</h1>
  <p>Void is a branch of error.os that could be called testing but that is not exactly accurate. These are ISOs that boot but may have some issues. We ship them regardless so users can preview upcoming features before they reach the stable Neospace branch.</p>
  <p>Void releases are not rolling releases. You cannot update or upgrade a Void installation to a newer version through official support. They are intended for preview purposes only.</p>
  <p>Learn more about the Void branch by <a href="https://zynomon.github.io/error.doc/docs/000/VOID.html" target="_blank">clicking here</a>.</p>
</div>

<br clear="all">

<div align="right">
  <img src="https://github.com/zynomon/error/raw/web-side/icons/neospace.jpg" width="250" height="250" align="right" style="margin-left: 20px; border-radius: 12px;" >
  <h1>Neospace</h1>
  <p>Neospace is the main branch of error.os for x64-bit standard computers and laptops. These releases are considered stable and are the recommended way to experience error.os.</p> 
  <p>The name Neospace could mean New Space or New Area or Dimension, though the naming of this branch was not that deep. If we abbreviate <b>Neo</b>space <b>2</b>02<b>5</b>, Neo becomes <b>N</b>, Space becomes <b>S</b>, and 2025 becomes <b>25</b>. This makes <b>NS25</b>, which is the first release of Neospace. We are currently working on Neospace 2026 which is abbreviated as <b>NS26</b>.</p>

</div>

<br clear="all">

<hr>

<h2>
  <img src="https://zynomon.github.io/error/icons/doc/sums.svg" style="float: left;">
  Verifying your download
</h2>

<p>Some releases include checksum files that allow you to verify the integrity of your downloaded ISO. This ensures the file was not corrupted during download and is exactly what we published. Releases that do not have checksum files available will be noted as such.</p>

<h3>What are checksums?</h3>

<p>A checksum is a unique string of characters calculated from a file. If the file changes even slightly, the checksum will be completely different. Comparing your downloaded file's checksum with the one we published confirms your download is authentic and intact.</p>

<h3>How to verify on Linux</h3>

<p>If checksum files are available for your release, open a terminal in the folder containing your downloaded ISO and checksum files. Then run one of the following commands depending on which checksum type is provided:</p>

<p><b>MD5 verification:</b></p>
<pre><code>md5sum -c md5*.txt</code></pre>

<p><b>SHA256 verification:</b></p>
<pre><code>sha256sum -c sha256*.txt</code></pre>

<p><b>SHA512 verification:</b></p>
<pre><code>sha512sum -c *.sha512.txt</code></pre>

<p><b>GPG verification:</b></p>
<pre><code>gpg --verify *.gpg *.iso</code></pre>

<p>If the verification passes, you will see an <b>OK</b> message. If it fails, the file may be corrupted and you should download it again.</p>

<h3>How to verify on Windows</h3>

<p>If checksum files are available, you can use the built-in <b>CertUtil</b> tool in Command Prompt after navigating to the download folder:</p>

<p><b>MD5 verification:</b></p>
<pre><code>CertUtil -hashfile *.iso MD5</code></pre>

<p><b>SHA256 verification:</b></p>
<pre><code>CertUtil -hashfile *.iso SHA256</code></pre>

<p><b>SHA512 verification:</b></p>
<pre><code>CertUtil -hashfile *.iso SHA512</code></pre>

<p>Compare the output with the checksum value provided in the respective text file. If they match, your download is verified.</p>

<h3>How to verify on macOS/Linux/BSD/Posixy systems?</h3>

<p>Open Terminal in the download folder and use the following commands:</p>

<p><b>MD5 verification:</b></p>
<pre><code>md5 *.iso</code></pre>

<p><b>SHA256 verification:</b></p>
<pre><code>shasum -a 256 *.iso</code></pre>

<p><b>SHA512 verification:</b></p>
<pre><code>shasum -a 512 *.iso</code></pre>
<sub>note that using '*' on a folder filled with tons of files can bring issues., soon we will follow up a consistent pattern for it</sub>
<p>Compare the output with the published checksum value found in the accompanying text file.</p>

<hr>

<h2>Need help?</h2>

<p>If you encounter any issues with downloading or verification, you can:</p>

<ul>
  <li>Check the <a href="https://zynomon.github.io/error.doc/docs/001">full documentation</a> for automated verification scripts</li>
  <li>Visit our <a href="https://github.com/zynomon/error">GitHub repository</a> to report issues</li>
</ul>

<p>Remember that OLDER Void OR Neospace releases are preview builds and are expected to have issues. For the most stable experience, use the latest releases.</p>
