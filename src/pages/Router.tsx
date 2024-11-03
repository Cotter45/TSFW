import { Heading } from "@components/ui/Text";

export default function RouterPage() {
  return (
    <div>
      <Heading>Router</Heading>
    </div>
  );
}

// {
//   path: "/",
//   component: MemoryPage,
//   children: [
//     {
//       path: "/reacty",
//       component: async () => await import("@components/Reacty"),
//       children: [
//         {
//           path: "/data",
//           component: ReactyData,
//           loader: async () => {
//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             return { data: "Reacty Data" };
//           },
//           fallback: FetchLoading,
//           cacheLoader: "memory",
//           ttl: 5000, // 1 second
//         },
//       ],
//     },
//   ],
// },
// {
//   path: "/local",
//   component: async () => await import("@pages/Local"),
// },
// {
//   path: "/session",
//   component: async () => await import("@pages/Session"),
// },
// {
//   path: "/indexeddb",
//   component: async () => await import("@pages/IndexDB"),
// },
// {
//   path: "/components",
//   component: async () => await import("@pages/Components"),
// },
// {
//   path: "/fetch",
//   component: FetchPage,
//   loader: fetchData,
//   fallback: FetchLoading,
//   cacheLoader: "memory",
//   ttl: 5000, // 1 second
// },
