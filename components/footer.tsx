export function Footer() {
  return (
    <footer className="absolute bottom-0 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://x.com/hasToggle"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            hasToggle
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/hasToggle"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
