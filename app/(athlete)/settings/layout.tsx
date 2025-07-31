import { SettingsSidebar } from "./components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex p-6">
      {/* Left Sidebar */}
      <div className="flex-shrink-0 bg-white border border-gray-100 ml-10 rounded-lg shadow-xl self-start w-fit h-fit">
        <SettingsSidebar />
      </div>
      
      {/* Right Content Area */}
      <div className="flex-1 bg-gray-50">
        <div className="px-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
    
  );
}
