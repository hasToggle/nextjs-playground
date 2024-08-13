import Link from "next/link";
import { PowerIcon, CircleDashed, DatabaseIcon } from "lucide-react";

const features = [
  {
    name: "React State",
    description:
      "State is at the heart of every Client Component. To see how state is managed in React, explore the demo and click on the counter to visually see how a component's code is run again.",
    href: "/react-basics/react-state",
    icon: PowerIcon,
  },
  {
    name: "Component Lifecycle",
    description:
      "Every component has a lifecycle that can be tapped into. Using a music track as an example, you can see how a component is mounted, updated, and unmounted.",
    href: "/react-basics/component-lifecycle",
    icon: CircleDashed,
  },
  {
    name: "Data Fetching",
    description:
      "Fetching data in Next is a spectrum that spans from static to dynamic, and from server-side to client-side rendering. There's even a middle ground called ISR.",
    href: "/react-server-components/data-fetching",
    icon: DatabaseIcon,
  },
];

export default function Page() {
  return (
    <div className="col-span-3 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-stone-600">
            Next.js Playground
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore the possibilities of Next v15
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            React Server Components are a new primitive that enables developers
            to build applications that are faster by default.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-sky-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-sky-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
