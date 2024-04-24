import NavBar from "@/components/NavBar";
import NavBarHook from "@/components/NavBarHook";

export default function Authenticated({ user, header, children }) {

    return (
        <div className="bg-gray-100 ">
            {/* <NavBarHook></NavBarHook> */}
         <NavBar></NavBar>
            <main style={{ marginTop: '150px' }}>{children}</main>
        </div>
    );
}
