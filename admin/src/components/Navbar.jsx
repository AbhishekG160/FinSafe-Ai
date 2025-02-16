import React from "react";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomLinkComponent = ({ link, setNavbarOpen }) => {
  const pathname = usePathname();
  const activeClasses = "bg-[#A39FBC]";
  const nonActiveClasses = "text-[#E5E5E5]";

  return (
    <Link href={link.path} onClick={() => setNavbarOpen(false)}>
      <div
        className={`flex gap-4 px-4 py-2 rounded-lg text-sm ${
          pathname.split("/")[1] == link.path.split("/")[1]
            ? activeClasses
            : nonActiveClasses
        }`}
      >
        {link.title}
      </div>
    </Link>
  );
};

export default function Navbar({ navbarOpen, setNavbarOpen }) {
  const links = [
    { title: "Dashboard", path: "/" },
    { title: "Transaction fraud", path: "/viewer" },
    { title: "Access and Auth fraud", path: "/viewer_copy" },
    { title: "Log Analysis", path: "/analysis" },
    { title: "Export Logs", path: "/export" },
    { title: "Blocked IPs", path: "/blocked_ips" },
    { title: "Revoked Access", path: "/revoked_access" },
  ];
  return (
    <nav
      className={`${
        navbarOpen ? "translate-x-0 block absolute" : "-translate-x-full hidden"
      } lg:block lg:translate-x-0 rounded-r-xl h-screen min-w-[250px] w-[250px] px-6 lg:py-8 shadow-blue-200 shadow-sm bg-[#020817]`}
    >
      <div className="lg:hidden h-[50px] w-full flex items-center">
        <XIcon onClick={() => setNavbarOpen(false)} />
      </div>
      <div className="flex flex-col w-full h-full text-2xl">
        <div className="h-fit flex w-full items-center justify-evenly">
        <img src="/logo.svg" class="w-12 h-13" />
 <span>FinSafe-AI </span>
        </div>
        <div className="flex flex-col gap-4 h-full justify-center">
          {links.map((link) => (
            <CustomLinkComponent
              key={link.path}
              link={link}
              setNavbarOpen={setNavbarOpen}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
