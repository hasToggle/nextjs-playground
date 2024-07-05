export default async function ServerComponentListItem({
  number,
  children,
}: {
  number: number;
  children?: React.ReactNode;
}) {
  const data: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Item #${number}`);
    }, Math.random() * 3000 * number);
  });

  return (
    <li>
      <p>
        #{number} {data}
      </p>
      <p>Your children:</p>
      <div>{children}</div>
    </li>
  );
}
