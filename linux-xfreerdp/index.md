# linux-xfreerdp


# xfreerdp
## 使用举例
- 远程192.168.2.3这台机器并挂载/home/admin/share目录
```bash
xfreerdp +clipboard /w:1920 /h:1050 /u:Administrator /p:admin1234567890 /v:192.168.2.3:3389 /drive:share,/home/admin/share
```

## 使用帮助
- xfreerdp --help
```bash
[zp@zp-pc dev]$ xfreerdp --help

FreeRDP - A Free Remote Desktop Protocol Implementation
See www.freerdp.com for more information

Usage: xfreerdp [file] [options] [/v:<server>[:port]]

Syntax:
/flag (enables flag)
    /option:<value> (specifies option with value)
    +toggle -toggle (enables or disables toggle, where '/' is a synonym of '+')

    /a:<addin>[,<options>]            Addin
    /action-script:<file-name>        Action script
    /admin                            Admin (or console) session
    +aero                             Enable desktop composition
    /app:<path> or ||<alias>          Remote application program
    /app-cmd:<parameters>             Remote application command-line parameters
    /app-file:<file-name>             File to open with remote application
    /app-guid:<app-guid>              Remote application GUID
    /app-icon:<icon-path>             Remote application icon for user interface
    /app-name:<app-name>              Remote application name for user interface
    /app-workdir:<workspace path>     Remote application workspace path
    /assistance:<password>            Remote assistance password
    /auto-request-control             Automatically request remote assistance
    input control
    +async-channels                   Enable Asynchronous channels
(experimental)
    +async-input                      Enable Asynchronous input
    +async-update                     Enable Asynchronous update
    /audio-mode:<mode>                Audio output mode
    +auth-only                        Enable Authenticate only
-authentication                   Disable Authentication (experimental)
    +auto-reconnect                   Enable Automatic reconnection
    /auto-reconnect-max-retries:<retries>
    Automatic reconnection maximum retries, 0
    for unlimited [0,1000]
    +bitmap-cache                     Enable bitmap cache
    /bpp:<depth>                      Session bpp (color depth)
    /buildconfig                      Print the build configuration
    /cert:[deny,ignore,name:<name>,tofu,fingerprint:<hash>:<hash as hex>
    [,fingerprint:<hash>:<another hash>]]
    Certificate accept options. Use with care!
    * deny         ... Automatically abort
    connection if the certificate does not
    match, no user interaction.           *
    ignore       ... Ignore the certificate
    checks altogether (overrules all other
            options)                           * name 
    ... Use the alternate <name>
    instead of the certificate subject to
    match locally stored certificates * tofu  
    ... Accept certificate
    unconditionally on first connect and deny
    on subsequent connections if the
    certificate does not match * fingerprints
    ... A list of certificate hashes that are
    accepted unconditionally for a connection
    /cert-deny                        [deprecated, use /cert:deny] Automatically
    abort connection for any certificate that
    can not be validated.
    /cert-ignore                      [deprecated, use /cert:ignore] Ignore
    certificate
    /cert-name:<name>                 [deprecated, use /cert:name:<name>]
    Certificate name
    /cert-tofu                        [deprecated, use /cert:tofu] Automatically
    accept certificate on first connect
    /client-build-number:<number>     Client Build Number sent to server
    (influences smartcard behaviour, see
     [MS-RDPESC])
    /client-hostname:<name>           Client Hostname to send to server
    -clipboard[:[use-selection:<atom>]]
    Disable Redirect clipboard.                       
    * use-selection:<atom>  ... (X11) Specify
    which X selection to access. Default is
    CLIPBOARD. PRIMARY is the X-style
    middle-click selection.
    /codec-cache:[rfx|nsc|jpeg]       Bitmap codec cache
    -compression                      Disable compression
    /compression-level:<level>        Compression level (0,1,2)
    +credentials-delegation           Enable credentials delegation
    /d:<domain>                       Domain
    -decorations                      Disable Window decorations
    /disp                             Display control
    /drive:<name>,<path>              Redirect directory <path> as named share
    <name>. Hotplug support is enabled with
    /drive:hotplug,*. This argument provides
    the same function as "Drives that I plug
    in later" option in MSTSC.
    +drives                           Enable Redirect all mount points as shares
    /dvc:<channel>[,<options>]        Dynamic virtual channel
    /dynamic-resolution               Send resolution updates when the window is
    resized
    /echo                             Echo channel
-encryption                       Disable Encryption (experimental)
    /encryption-methods:[40,][56,][128,][FIPS]
    RDP standard security encryption methods
    /f                                Fullscreen mode (<Ctrl>+<Alt>+<Enter>
            toggles fullscreen)
    -fast-path                        Disable fast-path input/output
    +fipsmode                         Enable FIPS mode
    /floatbar[:sticky:[on|off],default:[visible|hidden],show:
    [always|fullscreen||window]]
    floatbar is disabled by default (when
            enabled defaults to sticky in fullscreen
            mode)
-fonts                            Disable smooth fonts (ClearType)
    /frame-ack:<number>               Number of frame acknowledgement
    /from-stdin[:force]               Read credentials from stdin. With <force>
    the prompt is done before connection,
    otherwise on server request.
    /g:<gateway>[:<port>]             Gateway Hostname
    /gateway-usage-method:[direct|detect]
    Gateway usage method
    /gd:<domain>                      Gateway domain
    /gdi:sw|hw                        GDI rendering
    /geometry                         Geometry tracking channel
    +gestures                         Enable Consume multitouch input locally
    /gfx[:[[RFX|AVC420|AVC444],mask:<value>]]
    RDP8 graphics pipeline
    /gfx-h264[:[[AVC420|AVC444],mask:<value>] 
    [DEPRECATED] use /gfx:avc420 instead]
    RDP8.1 graphics pipeline using H264 codec
    +gfx-progressive                  Enable RDP8 graphics pipeline using progressive
    codec
    +gfx-small-cache                  Enable RDP8 graphics pipeline using small cache
    mode
    +gfx-thin-client                  Enable RDP8 graphics pipeline using thin client
    mode
+glyph-cache                      Enable Glyph cache (experimental)
    /gp:<password>                    Gateway password
    -grab-keyboard                    Disable Grab keyboard
    /gt:[rpc|http[,no-websockets]|auto[,no-websockets]]
    Gateway transport type
    /gu:[[<domain>\]<user>|<user>[@<domain>]]
    Gateway username
    /gat:<access token>               Gateway Access Token
    /h:<height>                       Height
    -heartbeat                        Disable Support heartbeat PDUs
    /help                             Print help
    +home-drive                       Enable Redirect user home as share
    /ipv6                             Prefer IPv6 AAA record over IPv4 A record
    /jpeg                             JPEG codec support
    /jpeg-quality:<percentage>        JPEG quality
    /kbd:0x<id> or <name>             Keyboard layout
    /kbd-lang:0x<id>                  Keyboard active language identifier
    /kbd-fn-key:<value>               Function key value
    /kbd-list                         List keyboard layouts
    /kbd-lang-list                    List keyboard languages
    /kbd-remap:List of <key>=<value>,... pairs to remap scancodes
    Keyboard scancode remapping
    /kbd-subtype:<id>                 Keyboard subtype
    /kbd-type:<id>                    Keyboard type
    /load-balance-info:<info-string>  Load balance info
    /log-filters:<tag>:<level>[,<tag>:<level>[,...]]
    Set logger filters, see wLog(7) for
    details
    /log-level:[OFF|FATAL|ERROR|WARN|INFO|DEBUG|TRACE]
    Set the default log level, see wLog(7) for
    details
    /max-fast-path-size:<size>        Specify maximum fast-path update size
    /max-loop-time:<time>             Specify maximum time in milliseconds spend
    treating packets
    +menu-anims                       Enable menu animations
    /microphone[:[sys:<sys>,][dev:<dev>,][format:<format>,][rate:<rate>,]
    [channel:<channel>]] Audio input (microphone)
    /monitor-list                     List detected monitors
    /monitors:<id>[,<id>[,...]]       Select monitors to use
    -mouse-motion                     Disable Send mouse motion
    /multimon[:force]                 Use multiple monitors
    +multitouch                       Enable Redirect multitouch input
    +multitransport                   Enable Support multitransport protocol
    -nego                             Disable protocol security negotiation
    /network:[modem|broadband|broadband-low|broadband-high|wan|lan|auto]
    Network connection type
    /nsc                              NSCodec support
    +offscreen-cache                  Enable offscreen bitmap cache
    /orientation:[0|90|180|270]       Orientation of display in degrees
    +old-license                      Enable Use the old license workflow (no CAL and
            hwId set to 0)
    /p:<password>                     Password
    /parallel[:<name>[,<path>]]       Redirect parallel device
    /parent-window:<window-id>        Parent window id
    +password-is-pin                  Enable Use smart card authentication with
    password as smart card PIN
    /pcb:<blob>                       Preconnection Blob
    /pcid:<id>                        Preconnection Id
    /pheight:<height>                 Physical height of display (in
            millimeters)
    /play-rfx:<pcap-file>             Replay rfx pcap file
    /port:<number>                    Server port
    -suppress-output                  Disable suppress output when minimized
    +print-reconnect-cookie           Enable Print base64 reconnect cookie after
    connecting
    /printer[:<name>[,<driver>]]      Redirect printer device
    /proxy:[<proto>://][<user>:<password>@]<host>:<port>
    Proxy settings: override env. var (see
            also environment variable below). Protocol
    "socks5" should be given explicitly where
    "http" is default.
    /pth:<password-hash>              Pass the hash (restricted admin mode)
    /pwidth:<width>                   Physical width of display (in millimeters)
    /rdp2tcp:<executable path[:arg...]>
    TCP redirection
    /reconnect-cookie:<base64-cookie> Pass base64 reconnect cookie to the
    connection
    /redirect-prefer:<FQDN|IP|NETBIOS>,[...]
    Override the preferred redirection order
    /relax-order-checks               Do not check if a RDP order was announced
    during capability exchange, only use when
    connecting to a buggy server
    /restricted-admin                 Restricted admin mode
    /rfx                              RemoteFX
    /rfx-mode:[image|video]           RemoteFX mode
    /scale:[100|140|180]              Scaling factor of the display
    /scale-desktop:<percentage>       Scaling factor for desktop applications
(value between 100 and 500)
    /scale-device:100|140|180         Scaling factor for app store applications
    /sec:[rdp|tls|nla|ext]            Force specific protocol security
    +sec-ext                          Enable NLA extended protocol security
    -sec-nla                          Disable NLA protocol security
    -sec-rdp                          Disable RDP protocol security
    -sec-tls                          Disable TLS protocol security
    /serial[:<name>[,<path>[,<driver>[,permissive]]]]
    Redirect serial device
    /shell:<shell>                    Alternate shell
    /shell-dir:<dir>                  Shell working directory
    /size:<width>x<height> or <percent>%[wh]
    Screen size
    /smart-sizing[:<width>x<height>]  Scale remote desktop to window size
    /smartcard[:<str>[,<str>...]]     Redirect the smartcard devices containing
    any of the <str> in their names.
    /smartcard-logon                  Activates Smartcard Logon authentication.
(EXPERIMENTAL: NLA not supported)
    /sound[:[sys:<sys>,][dev:<dev>,][format:<format>,][rate:<rate>,]
    [channel:<channel>,][latency:<latency>,][quality:<quality>]]
Audio output (sound)
    /span                             Span screen over multiple monitors
    /spn-class:<service-class>        SPN authentication service class
                /ssh-agent                        SSH Agent forwarding channel
                /t:<title>                        Window title
                -themes                           Disable themes
                /timeout:<time in ms>             Advanced setting for high latency links:
                Adjust connection timeout, use if you
                encounter timeout failures with your
                connection
                /tls-ciphers:[netmon|ma|ciphers]  Allowed TLS ciphers
                /tls-seclevel:<level>             TLS security level - defaults to 1
                -toggle-fullscreen                Disable Alt+Ctrl+Enter to toggle
                fullscreen
                /tune:<setting:value>,<setting:value>
                [experimental] directly manipulate freerdp
                settings, use with extreme caution!
                /tune-list                        Print options allowed for /tune
                /u:[[<domain>\]<user>|<user>[@<domain>]]
                Username
                +unmap-buttons                    Enable Let server see real physical pointer
                button
                /usb:[dbg,][id:<vid>:<pid>#...,][addr:<bus>:<addr>#...,][auto]
                Redirect USB device
                /v:<server>[:port]                Server hostname
                /vc:<channel>[,<options>]         Static virtual channel
                /version                          Print version
                /video                            Video optimized remoting channel
                /vmconnect[:<vmid>]               Hyper-V console (use port 2179, disable
                        negotiation)
                /w:<width>                        Width
                    -wallpaper                        Disable wallpaper
                    +window-drag                      Enable full window drag
                    /window-position:<xpos>x<ypos>    window position
                    /wm-class:<class-name>            Set the WM_CLASS hint for the window
                                     instance
                                     /workarea                         Use available work area

            Examples:
                xfreerdp connection.rdp /p:Pwd123! /f
                xfreerdp /u:CONTOSO\JohnDoe /p:Pwd123! /v:rdp.contoso.com
                xfreerdp /u:JohnDoe /p:Pwd123! /w:1366 /h:768 /v:192.168.1.100:4489
                xfreerdp /u:JohnDoe /p:Pwd123! /vmconnect:C824F53E-95D2-46C6-9A18-23A5BB403532 /v:192.168.1.100

                Clipboard Redirection: +clipboard

                Drive Redirection: /drive:home,/home/user
                Smartcard Redirection: /smartcard:<device>
                Serial Port Redirection: /serial:<name>,<device>,[SerCx2|SerCx|Serial],[permissive]
                Serial Port Redirection: /serial:COM1,/dev/ttyS0
                Parallel Port Redirection: /parallel:<name>,<device>
                Printer Redirection: /printer:<device>,<driver>
                TCP redirection: /rdp2tcp:/usr/bin/rdp2tcp

                Audio Output Redirection: /sound:sys:oss,dev:1,format:1
                Audio Output Redirection: /sound:sys:alsa
                Audio Input Redirection: /microphone:sys:oss,dev:1,format:1
                Audio Input Redirection: /microphone:sys:alsa

                Multimedia Redirection: /video
                USB Device Redirection: /usb:id:054c:0268#4669:6e6b,addr:04:0c

                For Gateways, the https_proxy environment variable is respected:
                export https_proxy=http://proxy.contoso.com:3128/
                xfreerdp /g:rdp.contoso.com ...

                More documentation is coming, in the meantime consult source files
```



---

> 作者: cfanzp  
> URL: http://111.230.8.71:8889/linux-xfreerdp/  

