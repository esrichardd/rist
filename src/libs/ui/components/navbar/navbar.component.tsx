import { useNavigate } from "react-router-dom";
import { MegaMenu } from "primereact/megamenu";
import options from "./options.json";
import { logout } from "../../../auth/utils";
import { OptionsNavbarProps } from "./types";


export const NavbarComponent = () => {
    const navigate = useNavigate();
    const items = options.menuOptions;
    const end = <img src="/logo.svg" alt="avatar" width="40" className="p-mr-2 p-rounded-circle" />;
    const generateOptions = (options: OptionsNavbarProps[]) => {
        return options.map((option) => {
            return {
                label: option.name,
                icon: `pi pi-fw pi-video ${option.icon}`,
                command: () => {
                    if (option.path === '/logout') {
                        logout().then(() => navigate('/login'));
                        return;
                    }

                    navigate(option.path);
                    if (window.innerWidth > 960) return;
                    const megamenuButton = document.querySelector('a.p-megamenu-button') as HTMLElement;
                    megamenuButton.click();
                }
            }
        })
    };

    return (<MegaMenu model={generateOptions(items)} breakpoint="960px" end={end} />)
};