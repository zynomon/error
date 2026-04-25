#!/bin/bash

export PATH="$PATH:/usr/local/sbin:/usr/sbin:/sbin"
export DEBIAN_FRONTEND=noninteractive
SOURCE_DIR="$(pwd)"
WORK_DIR="$SOURCE_DIR/Workspace"
LOG_FILE="$SOURCE_DIR/build.log"

if [[ -t 1 ]] && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    CYAN='\033[0;36m'
    BOLD='\033[1m'
    NC='\033[0m'
    CLEAR_LINE='\033[K'
else
    RED='' GREEN='' YELLOW='' BLUE='' CYAN='' BOLD='' NC='' CLEAR_LINE=''
fi

log_start() {
    echo "Build started: $(date)" | tee -a "$LOG_FILE"
}

log_end() {
    echo "Build ended: $(date)" | tee -a "$LOG_FILE"
}

log_info() {
    echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_command() {
    echo "[$(date '+%H:%M:%S')] $ $1" | tee -a "$LOG_FILE"
}

check_dependencies() {
    local MISSING_COUNT=0

    echo -e "${BLUE}[*] Validating Environment & Structure...${NC}"

    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}Error: Please run as root (sudo)${NC}"
        exit 1
    fi

    local tools=("lb" "git" "sha256sum" "xdg-open")
    for tool in "${tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            echo -e "${YELLOW}[!] Tool Missing:${NC} $tool,Make sure to check our docs or edit the  .sh  file for fixing the issue"
            ((MISSING_COUNT++))
        fi
    done

    local req_dirs=(
        "bootloaders/grub-pc/live-theme"
        "bootloaders/isolinux"
    )
    for dir in "${req_dirs[@]}"; do
        if [ ! -d "$SOURCE_DIR/$dir" ]; then
            echo -e "${RED}[X] Directory Missing:${NC} $dir"
            ((MISSING_COUNT++))
        fi
    done

    local req_files=(
        "errapp.list"
        "error.gpg"
        "error.list"
        "Live.hook"
        "bootloaders/grub-pc/grub.cfg"
        "bootloaders/grub-pc/splash.png"
        "bootloaders/grub-pc/live-theme/theme.txt"
        "bootloaders/isolinux/isolinux.cfg"
        "bootloaders/isolinux/live.cfg.in"
        "bootloaders/isolinux/menu.cfg"
    )
    for file in "${req_files[@]}"; do
        if [ ! -f "$SOURCE_DIR/$file" ]; then
            echo -e "${RED}[X] File Missing:${NC} $file"
            ((MISSING_COUNT++))
        fi
    done

    if [ "$MISSING_COUNT" -gt 0 ]; then
        echo -e "\n${RED}${BOLD}Validation Failed: $MISSING_COUNT items missing.${NC}"
        echo -e "${YELLOW}Please ensure all config files are in: $SOURCE_DIR${NC}
        Current .sh command only checks for the original config files
        copies and moves them if you changed the file names make sure to change file name in the shell script too ,
                       Try editing \".sh\" by using \"vi .sh\" or open the file in your text editor"
        exit 1
    else
        echo -e "${GREEN}${BOLD}Success: Environment and File Structure Validated.${NC}\n"
    fi
}

clean_recursive() {
    echo -e "${YELLOW}[*] Performing deep clean...${NC}"
    
    if [ -d "$WORK_DIR/chroot" ]; then
        echo "I: Unmounting chroot filesystems..."
        umount -l "$WORK_DIR/chroot/dev/pts" 2>/dev/null
        umount -l "$WORK_DIR/chroot/dev" 2>/dev/null
        umount -l "$WORK_DIR/chroot/sys" 2>/dev/null
        umount -l "$WORK_DIR/chroot/proc" 2>/dev/null
        umount -l "$WORK_DIR/chroot/run" 2>/dev/null
    fi
    
    if [ -d "$WORK_DIR" ]; then
        echo "I: Cleaning workspace with lb clean --purge..."
        cd "$WORK_DIR"
        lb clean --purge 2>/dev/null
        cd "$SOURCE_DIR"
        echo "I: Removing workspace directory..."
        rm -rf "$WORK_DIR"
    fi
    
    echo "I: Removing ISO files..."
    rm -rf "$SOURCE_DIR"/*.iso 2>/dev/null
    
    echo "I: Removing build log..."
    rm -rf "$LOG_FILE" 2>/dev/null
    
    echo -e "${GREEN}✓ Deep clean completed${NC}"
}

clean_basic() {
    echo -e "${YELLOW}[*] Performing basic clean...${NC}"
    
    if [ -d "$WORK_DIR" ]; then
        cd "$WORK_DIR"
        lb clean --purge 2>/dev/null
        cd "$SOURCE_DIR"
        rm -rf "$WORK_DIR"
        echo -e "${GREEN}✓ Workspace cleaned${NC}"
    else
        echo -e "${YELLOW}No workspace found${NC}"
    fi
}

show_help() {
    cat << EOF
${CYAN}${BOLD}Error OS Build Script${NC}
${GREEN}Usage:${NC} sudo $0 [OPTIONS]

${YELLOW}Options:${NC}
  ${GREEN}-c, --clean${NC}           Basic clean - runs 'lb clean --purge' and removes Workspace
  ${GREEN}-cr, --clean-recursive${NC} Deep clean - unmounts chroot, removes Workspace, ISOs, and logs
  ${GREEN}-o, --option <num>${NC}    Execute option directly without menu:
                              0 = Build ISO
                              1 = Verify ISO
                              2 = Git Clone (Recover Configs)
                              3 = Open Config Folder
                              4 = View Build Log
  ${GREEN}-h, --help${NC}            Show this help message

${CYAN}Examples:${NC}
  sudo $0                  # Interactive menu
  sudo $0 -o 0             # Build ISO directly
  sudo $0 -c               # Clean workspace only
  sudo $0 -cr              # Deep clean everything

EOF
    exit 0
}

start_build() {
    log_start
    if [ -d "$WORK_DIR" ]; then
        echo "I: Cleaning old workspace..."
        cd "$WORK_DIR"
        lb clean --purge
        cd "$SOURCE_DIR"
        rm -rf "$WORK_DIR"
    fi

    mkdir -p "$WORK_DIR"
    cd "$WORK_DIR"

    echo "I: Initializing lb config..."
    lb config \
      --apt-recommends false \
      --apt-indices false \
      --architectures amd64 \
      --cache false \
      --apt-secure false \
      --apt-options "-y --allow-unauthenticated -o Acquire::https::Verify-Peer=false -o Acquire::Queue-Mode=access" \
      --linux-packages "linux-image linux-headers" \
      --bootappend-live "boot=live config splash plymouth.theme=err" \
      --bootappend-live-failsafe "boot=live config splash single nomodeset noresume" \
      --debootstrap-options "--include=apt-transport-https,ca-certificates,openssl" \
      --archive-areas "main contrib non-free non-free-firmware" \
      --backports true \
      --security true \
      --updates true \
      --source false \
      --binary-images iso-hybrid \
      --checksums sha256 \
      --mirror-bootstrap http://mirror.xeonbd.com/debian/ \
      --mirror-chroot http://mirror.xeonbd.com/debian/ \
      --mirror-binary http://mirror.xeonbd.com/debian/ \
      --debconf-frontend noninteractive \
      --debian-installer live \
      --debian-installer-distribution trixie \
      --debian-installer-gui true \
      --distribution trixie \
      --firmware-binary true \
      --firmware-chroot true \
      --initramfs live-boot \
      --iso-publisher "Zynomon aelius" \
      --memtest memtest86+ \
      --iso-application "Neospace" \
      --iso-preparer "Zynomon aelius" \
      --iso-volume "Neospace 26"

    mkdir -p config/archives
    echo "I: Moving package lists and repositories..."
    mkdir -p config/package-lists config/archives config/hooks/live
    mkdir -p config/includes.chroot/usr/
    cp "$SOURCE_DIR/errapp.list" config/package-lists/error.list.chroot
    cp "$SOURCE_DIR/error.list" config/archives/error.list.chroot
    cp "$SOURCE_DIR/error.list" config/archives/error.list.binary
    cp "$SOURCE_DIR/error.gpg" config/archives/error.key.chroot
    cp "$SOURCE_DIR/error.gpg" config/archives/error.key.binary
    cp -rf "$SOURCE_DIR/usr/"* config/includes.chroot/usr/ 2>/dev/null || true
    cp "$SOURCE_DIR/Live.hook" config/hooks/live/9999-error.hook.chroot
    chmod +x config/hooks/live/9999-error.hook.chroot
    echo "I: Injecting bootloader templates..."
    mkdir -p config/bootloaders/grub-pc
    cp "$SOURCE_DIR/bootloaders/grub-pc/grub.cfg" config/bootloaders/grub-pc/
    cp "$SOURCE_DIR/bootloaders/grub-pc/splash.png" config/bootloaders/grub-pc/
    cp -r "$SOURCE_DIR/bootloaders/grub-pc/live-theme" config/bootloaders/grub-pc/
    mkdir -p config/bootloaders/isolinux
    cp "$SOURCE_DIR/bootloaders/isolinux/"* config/bootloaders/isolinux/
    mkdir -p config/includes.binary/boot/grub/live-theme
    cp -r "$SOURCE_DIR/bootloaders/grub-pc/live-theme/"* config/includes.binary/boot/grub/live-theme/
    cp "$SOURCE_DIR/bootloaders/grub-pc/splash.png" config/includes.binary/boot/grub/

    echo "I: Starting lb build..."
    log_command "lb build"
    lb build 2>&1 | tee -a "$LOG_FILE"
    log_info "Checking for generated ISO..."

    if ls *.iso 1> /dev/null 2>&1; then
        count=1
        while [ -f "$SOURCE_DIR/error.os-NS26ƒ$(printf "%02d" $count).iso" ]; do
            ((count++))
        done

        NEW_NAME="error.os-NS26ƒ$(printf "%02d" $count).iso"
        mv *.iso "$SOURCE_DIR/$NEW_NAME"

        echo -e "\n${GREEN}${BOLD}  █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒    █▒▒▒   █▒▒▒ "
        echo ""
        echo "           the iso generation is complete"
        echo "           find it on"
        echo "              >>  $SOURCE_DIR/$NEW_NAME"
        echo ""
        echo -e "  █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒    █▒▒▒   █▒▒▒ ${NC}"
        log_info "ISO created: $NEW_NAME"
    else
        echo -e "${RED}${BOLD}ERROR: Looks like the Build failed.
                 If you haven't changed any files then report at

                        > https://github.com/zynomon/error/issues ${NC}
                        ( open a new issue )"
        log_info "Build failed - no ISO generated"
    fi
    log_end
    
    if [[ -z "$FROM_CLI" ]]; then
        read -p "Press Enter to return to menu..."
    fi
}

verify_iso() {
    echo -e "\n${CYAN}${BOLD}[?] VERIFYING ISO FILE...${NC}"
    ISO_FILE=$(ls "$SOURCE_DIR"/*.iso 2>/dev/null | head -n 1)
    if [ -n "$ISO_FILE" ]; then
        echo -e "${GREEN}Found: $(basename "$ISO_FILE")${NC}"
        sha256sum "$ISO_FILE"
    else
        echo -e "${RED}Error: No ISO found in $SOURCE_DIR${NC}"
    fi
    
    if [[ -z "$FROM_CLI" ]]; then
        read -n 1 -s -r -p "Press any key to return..."
    fi
}

open_folder() {
    echo -e "\n${BLUE}Opening directory: $SOURCE_DIR${NC}"
    if [ -n "$DISPLAY" ] && command -v xdg-open &> /dev/null; then
        xdg-open "$SOURCE_DIR" &>/dev/null
    else
        echo -e "${YELLOW}No GUI detected. Direct Path:${NC} $SOURCE_DIR"
    fi

    if [[ -z "$FROM_CLI" ]]; then
        read -n 1 -s -r -p "Press any key to return..."
    fi
}

options=(
    "Start Building the ISO"
    "Verify ISO (Checksums)"
    "Recover Configs (Git Clone)"
    "Open Config Folder"
    "View Build Log"
    "Exit"
)

selected=0

view_logs() {
    clear

    if [ ! -f "$LOG_FILE" ]; then
        echo -e "${YELLOW}No build.log found${NC}"
        echo ""
        read -n 1 -s -r -p "Press any key to return..."
        return
    fi

    local total_lines=$(wc -l < "$LOG_FILE")
    local start_line=1
    local lines_per_page=20

    if [ "$total_lines" -le $lines_per_page ]; then
        echo -e "${CYAN}${BOLD}Build Log (full) - $total_lines lines${NC}"
        echo "─────────────────────────────────────────────────────"
        cat "$LOG_FILE"
        echo ""
        echo -e "Press any key to return..."
        read -n 1 -s -r
        return
    fi

    while true; do
        clear

        local current_page=$(( (start_line - 1) / lines_per_page + 1 ))
        local total_pages=$(( (total_lines - 1) / lines_per_page + 1 ))

        echo -e "${CYAN}${BOLD}Build Log - Page $current_page/$total_pages${NC}"
        echo -e "Line $start_line-$((start_line + lines_per_page - 1)) of $total_lines"
        echo "─────────────────────────────────────────────────────"

        sed -n "${start_line},$((start_line + lines_per_page - 1))p" "$LOG_FILE"

        echo ""
        echo "─────────────────────────────────────────────────────"
        echo "Controls: up/k=up  down/j=down  q=quit  d=delete  g=top  G=end"
        echo "         Ctrl+R=remove log  /=search  n=next match"

        read -rsn1 key

        case "$key" in
            $'\x1b')
                read -rsn2 -t 0.1 key2
                case "$key2" in
                    '[A')
                        if [ $start_line -gt 1 ]; then
                            start_line=$((start_line - lines_per_page))
                            [ $start_line -lt 1 ] && start_line=1
                        fi
                        ;;
                    '[B')
                        if [ $((start_line + lines_per_page)) -le $total_lines ]; then
                            start_line=$((start_line + lines_per_page))
                        fi
                        ;;
                esac
                ;;
            'k')
                if [ $start_line -gt 1 ]; then
                    start_line=$((start_line - lines_per_page))
                    [ $start_line -lt 1 ] && start_line=1
                fi
                ;;
            'j')
                if [ $((start_line + lines_per_page)) -le $total_lines ]; then
                    start_line=$((start_line + lines_per_page))
                fi
                ;;
            'g')
                start_line=1
                ;;
            'G')
                start_line=$((total_lines - lines_per_page + 1))
                [ $start_line -lt 1 ] && start_line=1
                ;;
            'd')
                echo ""
                echo -e "${YELLOW}Delete current log file? (y/N): ${NC}"
                read -n1 confirm
                if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
                    rm "$LOG_FILE"
                    echo -e "${GREEN}Log file removed${NC}"
                    sleep 1
                    return
                fi
                ;;
            'q')
                return
                ;;
            '/')
                echo ""
                echo -e "${CYAN}Search pattern: ${NC}"
                read pattern
                if [ -n "$pattern" ]; then
                    grep -n "$pattern" "$LOG_FILE" | head -20
                    echo ""
                    read -n 1 -s -r -p "Press any key to continue..."
                fi
                ;;
            'n')
                echo ""
                echo -e "${CYAN}Next search (enter pattern): ${NC}"
                read pattern
                if [ -n "$pattern" ]; then
                    local match_line=$(grep -n "$pattern" "$LOG_FILE" | head -1 | cut -d: -f1)
                    if [ -n "$match_line" ]; then
                        start_line=$((match_line - 5))
                        [ $start_line -lt 1 ] && start_line=1
                    else
                        echo -e "${YELLOW}Pattern not found${NC}"
                        sleep 1
                    fi
                fi
                ;;
            $'\x12')
                echo ""
                echo -e "${RED}${BOLD}⚠  REMOVE LOG FILE CONFIRMATION ⚠${NC}"
                echo -e "${RED}This will permanently delete:${NC}"
                echo "  $LOG_FILE"
                echo -e "${RED}Size: $(du -h "$LOG_FILE" | cut -f1)${NC}"
                echo ""
                echo -e "${YELLOW}Type 'DELETE' to confirm: ${NC}"
                read confirmation
                if [ "$confirmation" == "DELETE" ]; then
                    rm "$LOG_FILE"
                    echo -e "${GREEN}✓ Log file removed${NC}"
                    sleep 1
                    return
                else
                    echo -e "${YELLOW}Cancelled${NC}"
                    sleep 1
                fi
                ;;
            ' ')
                if [ $((start_line + lines_per_page)) -le $total_lines ]; then
                    start_line=$((start_line + lines_per_page))
                fi
                ;;
            'b')
                if [ $start_line -gt 1 ]; then
                    start_line=$((start_line - lines_per_page))
                    [ $start_line -lt 1 ] && start_line=1
                fi
                ;;
        esac
    done
}

cursor_off() { printf "\033[?25l"; }
cursor_on()  { printf "\033[?25h"; }

draw_menu() {
    for i in "${!options[@]}"; do
        if [ "$i" -eq "$selected" ]; then
            printf "${GREEN}${BOLD}  > %-40s${NC}\n" "${options[$i]}"
        else
            printf "    %-40s  \n" "${options[$i]}"
        fi
    done
}

git_clone() {
    clear

    echo "This will:"
    echo "  1. Backup current config to timestamped .7z file"
    echo "  2. Delete all files"
    echo "  3. Clone fresh from GitHub"
    echo ""

    read -p "Are you sure? (y/n): " choice
    if [ "$choice" != "y" ]; then
        echo "Operation cancelled."
        return
    fi

    BACKUP_FILE="config_backup_$(date +%Y%m%d_%H%M%S).7z"
    echo "Creating backup: $BACKUP_FILE"

    if command -v 7z &>/dev/null; then
        7z a -x!Workspace -x!*.iso -x!*.log "$BACKUP_FILE" ./*
    elif command -v 7za &>/dev/null; then
        7za a -x!Workspace -x!*.iso -x!*.log "$BACKUP_FILE" ./*
    else
        echo "Warning: 7-zip not found. Creating tar backup instead..."
        BACKUP_FILE="config_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
        tar --exclude='Workspace' --exclude='*.iso' --exclude='*.log' -czf "$BACKUP_FILE" .
    fi

    TEMP_BACKUP="/tmp/$BACKUP_FILE"
    mv "$BACKUP_FILE" "$TEMP_BACKUP" 2>/dev/null || true

    echo "Cleaning directory..."
    rm -rf ./* ./.* 2>/dev/null || true

    echo "Cloning repository..."
    if git clone https://github.com/zynomon/error.git .; then
        mv "$TEMP_BACKUP" "./$BACKUP_FILE" 2>/dev/null || true
        echo -e "${GREEN}✓ Successfully cloned repository${NC}"
        echo "Backup saved as: $BACKUP_FILE"
    else
        echo -e "${RED}✗ Git clone failed!${NC}"
        echo "Restoring from backup..."
        if [ -f "$TEMP_BACKUP" ]; then
            if [[ "$TEMP_BACKUP" == *.7z ]]; then
                7z x "$TEMP_BACKUP" -o./ 2>/dev/null || 7za x "$TEMP_BACKUP" -o./ 2>/dev/null
            elif [[ "$TEMP_BACKUP" == *.tar.gz ]]; then
                tar -xzf "$TEMP_BACKUP" -C ./
            fi
            rm -f "$TEMP_BACKUP"
        fi
        echo "Original files restored"
    fi

    read -p "Press Enter to continue..."
}

main_menu() {
    clear
echo "

        ▄▄▄▄  ▄▄▄ ▄▄  ▄▄▄ ▄▄    ▄▄▄   ▄▄▄ ▄▄        ▄▄▄    ▄▄▄▄
      ▄█▄▄▄██  ██▀ ▀▀  ██▀ ▀▀ ▄█  ▀█▄  ██▀ ▀▀     ▄█  ▀█▄ ██▄ ▀
      ██       ██      ██     ██   ██  ██         ██   ██ ▄ ▀█▄▄
       ▀█▄▄▄▀ ▄██▄    ▄██▄     ▀█▄▄█▀ ▄██▄    ██   ▀█▄▄█▀ █▀▄▄█▀

  █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒   █▒▒▒    █▒▒▒   █▒▒▒

                ██▄ █ █ █ █   █▀▄   ▄▀▀ ▄▀▀ █▀▄ █ █▀▄ ▀█▀
                █▄█ ▀▄█ █ █▄▄ █▄▀   ▄██ ▀▄▄ █▀▄ █ █▀   █ ft. lb build

"

    cursor_off
    while true; do
        draw_menu

        read -rsn1 key
        if [[ $key == $'\x1b' ]]; then
            read -rsn2 key
            case $key in
                '[A') ((selected--)); [ $selected -lt 0 ] && selected=$((${#options[@]} - 1)) ;;
                '[B') ((selected++)); [ $selected -ge ${#options[@]} ] && selected=0 ;;
            esac
        elif [[ $key == "" ]]; then
            case $selected in
                0) cursor_on; start_build; break ;;
                1) cursor_on; verify_iso; break ;;
                2) cursor_on; git_clone; break ;;
                3) cursor_on; open_folder; break ;;
                4) cursor_on; view_logs; break ;;
                5) cursor_on; exit 0 ;;
            esac
        fi

        printf "\033[%dA" "${#options[@]}"
    done
    cursor_on
}

FROM_CLI=""
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--clean)
            check_dependencies
            clean_basic
            exit 0
            ;;
        -cr|--clean-recursive)
            check_dependencies
            clean_recursive
            exit 0
            ;;
        -o|--option)
            if [[ -z "$2" ]]; then
                echo -e "${RED}Error: -o/--option requires a number argument${NC}"
                show_help
            fi
            FROM_CLI="true"
            case $2 in
                0)
                    check_dependencies
                    start_build
                    ;;
                1)
                    verify_iso
                    ;;
                2)
                    git_clone
                    ;;
                3)
                    open_folder
                    ;;
                4)
                    view_logs
                    ;;
                *)
                    echo -e "${RED}Error: Invalid option number '$2'${NC}"
                    echo "Valid options: 0, 1, 2, 3, 4"
                    show_help
                    ;;
            esac
            exit 0
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo -e "${RED}Error: Unknown option '$1'${NC}"
            show_help
            ;;
    esac
    shift
done

check_dependencies
main_menu