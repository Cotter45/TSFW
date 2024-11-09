import { Heading, SubHeading, Text } from "@components/ui/Text";
import { Badge } from "@components/ui/Badge";

export default function RouterPage() {
  return (
    <div className="flex flex-col gap-8 mx-auto px-4 py-8">
      <section class="space-y-4">
        <Heading>Router Documentation</Heading>
        <Text>
          This router enables client-side navigation, type-safe route
          compilation, caching, and data preloading. It uses custom event-based
          handling to render nested routes and manage application state.
        </Text>
      </section>

      <section>
        <SubHeading>Router Overview</SubHeading>
        <ul class="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
          <li>
            <Text>
              <strong>Type-safe</strong> routes that are compiled on every
              server start.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Event-based</strong> navigation that listens to URL
              changes.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Nested routes</strong> that allow for heirarchical view
              composition.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Data caching</strong> with configurable TTL, supporting
              in-memory, session, local and indexedDB storage.
            </Text>
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <SubHeading>Defining Routes</SubHeading>
        <Text>
          Routes are defined using <Badge>registerRoute</Badge>, specifying the
          path, component, optional loader, and caching options. Routes can
          include nested children for complex UIs.
        </Text>

        <Text>
          Route components can be synchronous or asynchronous, and can also be
          lazy loaded using dynamic imports.
        </Text>

        <pre class="language-javascript !rounded-md">
          <code>{`registerRoute({
  path: "/",
  component: HomeComponent,
  children: [
    {
      path: "/about",
      // sync component
      component: AboutComponent,
    },
    {
      path: "/products",
      // sync component
      component: ProductsComponent,
      children: [
        {
          path: "/:id",
          // async component
          component: ProductDetailComponent,
          // async loader function
          loader: fetchData,
          // async fallback component
          fallback: FetchLoading,
          // cache loader type
          cacheLoader: "memory",
          // cache time-to-live
          ttl: 5000, // 1 second
        },
      ],
    },
  ],
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <SubHeading>Type-Safe Routes</SubHeading>
        <Text>
          All routes are defined in a type-safe manner, ensuring accuracy in
          navigation and URL handling. The router compiles these routes at
          server start, ensuring no invalid paths are registered.
        </Text>
      </section>

      <section class="space-y-4">
        <SubHeading>Navigation and URL Parameters</SubHeading>
        <Text>
          To navigate between routes, use the <Badge>navigateTo</Badge> function
          with a path and optional parameters and query string:
        </Text>

        <pre class="language-javascript !rounded-md">
          <code>{`navigateTo("/products/:id", { id: "123" });`}</code>
        </pre>

        <Text>
          Parameters <Badge>(:id)</Badge> in paths are matched and extracted
          automatically. Query strings can be passed as key-value pairs and
          accessed via <Badge>params</Badge> or <Badge>searchParams</Badge>{" "}
          which are injected into the page and loader components.
        </Text>
      </section>

      <section class="space-y-4">
        <SubHeading>Nested Routing</SubHeading>
        <Text>
          The router supports nested routing, where child routes are registered
          within parent routes. This hierarchy enables complex UI compositions
          where child components inherit and extend parent contexts via
          data-outlet props.
        </Text>

        <pre class="language-javascript !rounded-md">
          <code>{`registerRoute({
  path: "/products",
  component: ProductsComponent,
  children: [
    {
      path: "/:id",
      component: ProductDetailComponent,
      loader: async ({ params }) => fetchProductById(params.id),
      fallback: ProductFallbackComponent,
    },
  ],
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <SubHeading>Caching and Preloading</SubHeading>
        <Text>Data caching is handled with various storage options:</Text>

        <ul class="marker:!text-emerald-600 list-outside list-disc p-4 pt-0 ml-6">
          <li>
            <Text>
              <strong>Memory</strong> (default)
            </Text>
          </li>
          <li>
            <Text>
              <strong>Local</strong> and <strong>Session</strong> storage
            </Text>
          </li>
          <li>
            <Text>
              <strong>IndexedDB</strong> storage
            </Text>
          </li>
        </ul>

        <Text>
          Each route’s loader can specify <Badge>cacheLoader</Badge> and{" "}
          <Badge>ttl</Badge> (Time-to-Live) for fine-grained control over data
          freshness.
        </Text>

        <pre class="language-javascript !rounded-md">
          <code>{`registerRoute({
  path: "/products",
  component: ProductsComponent,
  loader: fetchProducts,
  cacheLoader: "local",
  ttl: 120000, // Cache for 2 minutes
});`}</code>
        </pre>
      </section>

      <section class="space-y-4">
        <SubHeading>Full Example</SubHeading>
        <pre class="language-javascript !rounded-md">
          <code>{`registerRoute({
  path: "/",
  component: HomePage,
  children: [
    {
      path: "/about",
      component: AboutPage,
    },
    {
      path: "/products",
      component: ProductsPage,
      loader: fetchProducts,
      cacheLoader: "memory",
      ttl: 60000, // Cache for 1 minute
      children: [
        {
          path: "/:id",
          component: ProductDetailPage,
          loader: async ({ params }) => fetchProductById(params.id),
          fallback: ProductLoading,
        },
      ],
    },
    {
      path: "/settings",
      component: SettingsPage,
      children: [
        {
          path: "/profile",
          component: ProfilePage,
        },
      ],
    },
  ],
});
`}</code>
        </pre>

        <Text>
          In this example, nested routes are defined with loaders and caching
          enabled. The <Badge>/products/:id</Badge> route will load data based
          on the <Badge>id</Badge> parameter and fall back to a loading
          component during data fetch.
        </Text>

        <Text>
          This setup allows for a modular, flexible, and performant routing
          system that’s entirely client-side.
        </Text>
      </section>
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
