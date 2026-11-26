import AppNav from "@/components/app/AppNav";
import { getUser } from "@/lib/dal";

export const metadata = {
  title: "Members",
  robots: { index: false },
};

export default async function MemberLayout({ children }) {
  const user = await getUser();
  return (
    <div className="min-h-dvh lg:flex">
      <AppNav user={user} />
      <main className="min-w-0 flex-1 pb-28 lg:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:py-10 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
