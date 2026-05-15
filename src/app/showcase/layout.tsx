import { ShowcaseFrame } from "@/components/showcase/ShowcaseFrame";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      <ShowcaseFrame />
      {/* 48px padding top to offset the fixed ShowcaseFrame which is about 48px tall */}
      <div className="pt-12">
        {children}
      </div>
    </div>
  );
}
