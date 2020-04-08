Some packages to install (on Arch linux):

- xorg-xinit xorg-server
- lxde
- ttf-dejavu
- chromium
- networkmanager network-manager-applet nm-connection-editor
- arc-gtk-theme
- acpilight (for Dell laptop; includes `xbacklight`)

For theme:

- Menu, Preferences, Customize Look and Feel: under Widget choose Arc-Darker, and under Window Border choose Arc-Darker
- right click panel, "Panel Settings", Appearance tab, Solid color
- on the panel, right click to the right of windows, choose "Task Bar (Window List) Settings", check "Flat buttons"

Some binding settings to add to `~/.config/openbox/lxde-rc.xml`
in the `<keyboard>` section:

    <keybind key='W-Return'>
        <action name='Execute'>
            <command>lxterminal</command>
        </action>
    </keybind>
    <keybind key='W-q'>
        <action name='Execute'>
            <command>lxde-logout</command>
        </action>
    </keybind>
    <keybind key="W-Up">
        <action name="Maximize"/>
    </keybind>
    <keybind key="W-Down">
        <action name="Unmaximize"/>
    </keybind>
    <keybind key="W-Left">
        <action name="UnmaximizeFull"/>
        <action name="MoveResizeTo">
            <x>0</x>
            <y>0</y>
            <height>100%</height>
            <width>50%</width>
        </action>
    </keybind>
    <keybind key="W-Right">
        <action name="UnmaximizeFull"/>
        <action name="MoveResizeTo">
            <x>-0</x>
            <y>0</y>
            <height>100%</height>
            <width>50%</width>
        </action>
    </keybind>

Reload settings with `openbox --reconfigure`.

To adjust brightness settings with `xbacklight` for example:

    <keybind key='XF86MonBrightnessUp'>
        <action name='Execute'>
            <command>sudo xbacklight -inc 10</command>
        </action>
    </keybind>
    <keybind key='XF86MonBrightnessDown'>
        <action name='Execute'>
            <command>sudo xbacklight -dec 10</command>
        </action>
    </keybind>

For the clock strftime format I like

    %F %R (%I:%M %p)
