const term = new Terminal({
    cursorBlink: true,
    convertEol: true,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, 'Courier New', monospace",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.2,
    theme: {
        background: "#1a1b26",
        foreground: "#a9b1d6",
        cursor: "#c0caf5",
        cursorAccent: "#1a1b26",
        selectionBackground: "#33467c",
        black: "#32344a",
        red: "#f7768e",
        green: "#9ece6a",
        yellow: "#e0af68",
        blue: "#7aa2f7",
        magenta: "#ad8ee6",
        cyan: "#449dab",
        white: "#787c99",
        brightBlack: "#444b6a",
        brightRed: "#ff7a93",
        brightGreen: "#b9f27c",
        brightYellow: "#ff9e64",
        brightBlue: "#7da6ff",
        brightMagenta: "#bb9af7",
        brightCyan: "#0db9d7",
        brightWhite: "#acb0d0",
    },
});
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal"));
fitAddon.fit();

window.addEventListener("resize", () => fitAddon.fit());

const emulator = new window.V86({
    wasm_path: "/libs/v86/v86.wasm",
    acpi: false,
    log_level: 0,
    memory_size: 128 * 1024 * 1024,
    vga_memory_size: 8 * 1024 * 1024,
    boot_order: 0x213,
    fastboot: true,
    uart1: true,
    uart2: false,
    uart3: false,
    preserve_mac_from_state_image: true,
    network_adapter: null,
    network_relay_url: null,
    disable_keyboard: true,
    disable_mouse: true,
    screen_dummy: true,
    disable_speaker: true,
    bzimage_initrd_from_filesystem: true,
    virtio_console: false,
    bios: {
        url: "/libs/v86/bios/seabios.bin",
    },
    vga_bios: {
        url: "/libs/v86/bios/vgabios.bin",
    },
    filesystem: {
        baseurl: "/libs/v86/images/alpine-rootfs-flat/",
        basefs: "/libs/v86/images/alpine-fs.json",
    },
    cmdline: "rw root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose modules=virtio_pci tsc=reliable console=ttyS0 quiet",
    autostart: true,
});

emulator.add_listener("serial0-output-byte", (byte) => {
    term.write(String.fromCharCode(byte));
});

term.onData((data) => {
    emulator.serial0_send(data);
});
