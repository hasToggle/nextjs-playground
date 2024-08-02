import { NumberDispenserProvider } from "./number-dispenser-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NumberDispenserProvider>{children}</NumberDispenserProvider>
    </>
  );
}
