import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SessionProvider from '@/components/admin/SessionProvider';

export const metadata: Metadata = {
  title: 'Admin Panel — Ajay Rana Portfolio',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="admin-main flex-1">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
