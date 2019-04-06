Some binding settings to add to `~/.config/openbox/lxde-rc.xml`:

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

On my laptop with nvidia graphics card, xbacklight doesn't work so make a
script `~/.brightness.sh` and make it executable.

    f=/sys/class/backlight/nv_backlight/brightness
    c=$(cat $f)
    if [ "$1" == '+' ]; then
        n=$((c + 10))
    elif [ "$1" == '-' ]; then
        n=$((c - 10))
    else
        n=$c
    fi
    echo $n | sudo tee $f

Then also add these keybindings to `~/.config/openbox/lxde-rc.xml`:

    <keybind key='XF86MonBrightnessUp'>
        <action name='Execute'>
            <command>~/.brightness.sh +</command>
        </action>
    </keybind>
    <keybind key='XF86MonBrightnessDown'>
        <action name='Execute'>
            <command>~/.brightness.sh -</command>
        </action>
    </keybind>

For the clock strftime format I like

    %F %R (%I:%M %p)
