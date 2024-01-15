import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

function DatabaseIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <rect width="24" height="24" fill="url(#pattern0)" />
            <defs>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use
                        xlinkHref="#image0_169_47110"
                        transform="scale(0.02)"
                    />
                </pattern>
                <image
                    id="image0_169_47110"
                    width="50"
                    height="50"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC30lEQVRoge3avW8cRRjH8c8hK2BBzo55kRIpbrCMeCmgwy9F2ki0ARRKEMEyfwK0QAfpSAR9Ah0ggeQEJBJESYsspw1JMBKOI7CR7KWYWXz27Z1nz3svQvuVVifvPjvz231u5veM5xqOzrN4ETN4On4+hUfwGI7HuE08wBbu4lY81vALfq1ASykexxK+xB1kFR138AXeiX2UolEi9izewis41nL+Hn7GqvB213Abf+O+kAVCdpoYxykhczOYxZyQxZx/8A0+w7dlHqgbc7hp783tYEV4c89V1EcjtrWEa7GPvL+bUUPPjOMydmOD63gPp4/SaCKn8X7sM4saLmKsbENNe1nYwgeYqExmOpP4ENtRy3dRWxIN4fuZCbPLQh8ElmVR0JLha4lj+/V4w6YwEEeFWUFThldTbvghBi/1UVSvLAvarqcEb8TgyX4q6pETgrY/D154qCA4eTANgXxstE08RQ+S80Z/tByJ82WCcyMa5cGepdzQWv/8jjN9k5bOvPa67lDywGvxc1swpWEM/kl8ZM8QV/TwIGP4pOXvdaFsmK5ebxvT9pcoGT6Omko/SM4Cfmo5vyPM48t4XrkKuhMNvBDb/F570TjfRd9/DRwk63DtLN4UyviHW86vKy7j/xI8qbWMn8CjOKm9jH+ipc1toUz6XHsZ30lf4YN0S90ULuAqfrN/AB7luI0reDv2UUpfmYx04hm8JCxz86Xuk8IyoClkgpCZ+8KC6572pe5qYn+lMzKKJcqUDhmpnX0I1M5eO3sF1M7uQGDRtdrZE4/a2bsF1s7eZ2pnr529ImpnVxBYO7va2atx9g3BkU8o+K93AYN09in8ETUeOvnk+yPLCQ0PmncFbUn7I68ZfUM8l3JDQ9iny4R9u8W+SUundQ/xKyVmyiZuGD1D/FEPG1HjuGT/PvuwDHEXnwq/b+mZol8+DNIQb+DllAZSGRVDrIxhG2IhVXwtBr3U/X/zLy5J8M5YNvzbAAAAAElFTkSuQmCC"
                />
            </defs>
        </SvgIcon>
    );
}

export default DatabaseIcon;
