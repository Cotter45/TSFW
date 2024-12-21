import { Heading, Text } from "@components/ui/Text";
import { GlobalToastContainer } from "@components/ui/Toast";

export default function App() {
  return (
    <div class="w-full h-[100dvh] flex flex-col items-center justify-center gap-2 bg-base-100">
      <img
        src="/icon.png"
        alt="TSFW"
        class="mb-4 h-32 aspect-square bg-transparent filter drop-shadow-[0_0_5px_rgba(37,122,87,1)]"
      />

      <Heading>TSFW</Heading>
      <Text>TypeScript, TailwindCSS, JSX.</Text>

      <a
        href="https://tsfw.cotter.tech"
        rel="noopener noreferrer"
        target="_blank"
        class="mt-10 text-lg text-primary hover:underline"
      >
        Learn More about TSFW
      </a>

      <GlobalToastContainer duration={2500} />
    </div>
  );
}
