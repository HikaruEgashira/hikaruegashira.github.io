import './style.css'

new window.V86({
    wasm_path: "/libs/v86/v86.wasm",
    //Hell is this?
    acpi: false,
    //Log level, debugging?
    log_level: 0,
    //128MB of ram
    memory_size: 128 * 1024 * 1024,
    //8MB of video ram
    vga_memory_size: 8 * 1024 * 1024,
    //CD / Floppy / HD
    boot_order: 0x213,
    //Skips boot menu delay on boch BIOS apparently
    fastboot: true,
    //From my understanding, these control serial terminals
    uart1: false, //Terminal
    uart2: false, //Screen
    uart3: false, //Controller
    //Used for weird ass automatic kernel image loading
    cmdline: null,
    //Presumably saves the mac address in the state
    preserve_mac_from_state_image: true,
    //Instance of NetworkAdapter
    network_adapter: null,
    //URL to websocket proxy (wss://relay.widgetry.org/)
    network_relay_url: null,
    disable_keyboard: false,
    disable_mouse: false,
    //Canvas element
    screen_container: null,
    //Fake screen
    screen_dummy: false,
    //Textarea element
    serial_container: null,
    //Div element
    serial_container_xtermjs: null,
    disable_speaker: true,
    bzimage_initrd_from_filesystem: false,
    virtio_console: true,

    screen_container: document.getElementById("canvas"),
    bios: {
        url: "/libs/v86/bios/seabios.bin",
    },
    vga_bios: {
        url: "/libs/v86/bios/vgabios.bin",
    },
    bzimage: {
        url: "/libs/v86/images/buildroot-bzimage.bin",
    },
    autostart: true,
});
