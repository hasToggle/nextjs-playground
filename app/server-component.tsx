export default async function ServerComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  /* HINT:
    You'd think, Next.js would run this function on every request, but it doesn't.
    It runs it once, when the project is built, and then caches the result.
    If you want dynamic behavior, you'd need to export a constant with the value 'dynamic'.
  */
  const data: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Server data");
    }, 3000);
  });

  return (
    <>
      <h2>Server Component</h2>
      <p>Your data: {data}</p>
      <p>Your children:</p>
      <div>{children}</div>
    </>
  );
}
