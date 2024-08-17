import Sidebar from "@/components/Sidebar";

/// Create a layput for all layouts
// The sidebar and the actual page content

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
