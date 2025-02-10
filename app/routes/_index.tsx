import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Scholarly" },
    { name: "Student portfolio management services", content: "Welcome to Scholarly" },
  ];
};

export default function Index() {
  return (
    <div>

    </div>
  );
}

