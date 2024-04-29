import NavBar from "@/components/NavBar";
import NavBarHook from "@/components/NavBarHook";

export default function Authenticated({ user, header, children, auth }) {
// console.log(user);
    return (
        <div className="bg-gray-100 ">
            {/* <NavBarHook></NavBarHook> */}
         <NavBar user={user}></NavBar>
            <main style={{ marginTop: '150px' }}>{children}</main>
        </div>
    );
}
