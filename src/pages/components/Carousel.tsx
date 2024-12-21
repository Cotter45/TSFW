import { Heading, SubHeading, Text } from "@components/ui/Text";
import { CodeBlock } from "@components/CodeBlock";
import { Carousel } from "@components/ui/Carousel";

export default function CarouselDocumentationPage() {
	return (
		<div class="fade_in flex flex-col gap-10 px-4 py-8 max-w-full">
			{/* Section: Introduction */}
			<section className="space-y-4">
				<Heading>Carousel Documentation</Heading>
				<Text>
					The `Carousel` component provides an image slider UI with smooth
					transitions, thumbnail navigation, and dynamic scrolling behavior. It
					is ideal for displaying galleries or promotional banners.
				</Text>
			</section>

			{/* Section: Features */}
			<section>
				<SubHeading>Features</SubHeading>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6 space-y-2">
					<li>
						<Text>
							<strong>Thumbnail Navigation</strong>: Clickable thumbnails for
							easy navigation between slides.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Smooth Scrolling</strong>: Automatically scrolls to the
							active slide with smooth animation.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Dynamic Layout</strong>: Adjusts layout based on the
							number of slides, with horizontal scrolling for thumbnails.
						</Text>
					</li>
					<li>
						<Text>
							<strong>Customizable Height</strong>: Use `class` prop to set the
							height of the carousel.
						</Text>
					</li>
				</ul>
			</section>

			{/* Section: Props */}
			<section className="space-y-4">
				<SubHeading>Props</SubHeading>
				<Text>The following are the props available for the `Carousel`:</Text>
				<ul className="marker:!text-emerald-600 list-outside list-disc p-4 ml-6">
					<li>
						<strong>id</strong>: Unique identifier for the carousel instance.
					</li>
					<li>
						<strong>images</strong>: An array of images containing:
						<ul className="ml-6 list-disc">
							<li>
								<strong>id</strong>: Unique ID for each image.
							</li>
							<li>
								<strong>src</strong>: Image source URL.
							</li>
							<li>
								<strong>alt</strong>: Alt text for accessibility.
							</li>
						</ul>
					</li>
					<li>
						<strong>class</strong>: Custom CSS class for height and styling.
					</li>
				</ul>
			</section>

			{/* Section: Examples */}
			<section className="space-y-8">
				<SubHeading>Examples</SubHeading>
				<Text>
					The following example showcases a basic `Carousel` with four images:
				</Text>

				{/* Example: Carousel */}
				<div className="space-y-2">
					<SubHeading>Basic Carousel</SubHeading>
					<Carousel
						id="example-carousel"
						class="h-[300px]"
						images={[
							{
								id: "slide1",
								src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
								alt: "Slide 1",
							},
							{
								id: "slide2",
								src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
								alt: "Slide 2",
							},
							{
								id: "slide3",
								src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
								alt: "Slide 3",
							},
							{
								id: "slide4",
								src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
								alt: "Slide 4",
							},
						]}
					/>
				</div>

				{/* Code Example */}
				<CodeBlock language="language-javascript">
					{`import { Carousel } from "@components/ui/Carousel";

export default function CarouselExamples() {
  const images = [
    { 
      id: "slide1",
      src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
      alt: "Slide 1"
    },
    {
      id: "slide2",
      src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
      alt: "Slide 2"
    },
    {
      id: "slide3",
      src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      alt: "Slide 3"
    },
    {
      id: "slide4",
      src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
      alt: "Slide 4"
    },
  ];

  return <Carousel id="example-carousel" class="h-[300px]" images={images} />;
}`}
				</CodeBlock>
			</section>
		</div>
	);
}
