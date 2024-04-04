import NavBar from "@/components/NavBar";

export default function Authenticated({ user, header, children }) {

    return (
        <div className="bg-gray-100 ">
         <NavBar></NavBar>
            <main style={{ marginTop: '150px' }}>{children}</main>
        </div>
    );
}
