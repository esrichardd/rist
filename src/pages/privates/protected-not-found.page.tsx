import { NavbarComponent } from "../../libs/ui/components/navbar/navbar.component";
import { NotFoundPage } from "../public/not-found.page";

export const ProtectedNotFoundPage = () => {
    return (
        <>
            <NavbarComponent />
            <NotFoundPage url="/" />
        </>
    )
};