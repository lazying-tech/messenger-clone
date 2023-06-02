import getCurrentUser from "@/app/actions/getCurrentUser";
import ActiveStatus from "../ActiveStatus";

import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";

const SideBar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser!} />
      <ActiveStatus />
      {/* ! behind mark that can be null */}
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
