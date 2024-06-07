import AdminSidebar from "../(notAdmin)/components/AdminSidebar";
export default function AdminLayout({ children }) {
  return (
    <div className=" grid grid-cols-5  w-full bg-slate-50 h-screen">
      <div className="col-span-1">
        <AdminSidebar />
      </div>
      <div className="col-span-4 overflow-auto">
        <div className="fixed h-16 top-0 bg-white flex w-full"></div>
        {children}
      </div>
    </div>
  );
}
