import { HomeContentShell } from "@/components/home/content/components/HomeContentShell";
import { Header } from "../components/ui/header/Header";

export default function Atelier() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <HomeContentShell />
      </main>
    </>
  );
}
