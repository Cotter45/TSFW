import { createState, type TSFWState } from "@core/state";
import { clsx } from "@core/clsx";

export interface CarouselState {
	currentSlide: number;
}

const initialState: CarouselState = {
	currentSlide: 0,
};

let carouselState: TSFWState<CarouselState>;

interface CarouselProps {
	id: string;
	class?: string;
	images: {
		id: string;
		src: string;
		alt: string;
	}[];
}

export function Carousel({ id, images, class: className }: CarouselProps) {
	carouselState = createState<CarouselState>(id, initialState);

	carouselState.subscribe((state) => {
		const activeSlide = document.getElementById(images[state.currentSlide].id);
		if (activeSlide) {
			activeSlide.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	});
	return (
		<div className="w-full flex flex-col gap-2">
			<div className="carousel w-full">
				{images.map(({ id, src, alt }) => (
					<CarouselItem id={id} src={src} alt={alt} className={className} />
				))}
			</div>

			<CarouselThumbnails
				thumbnails={images.map(({ id, src, alt }) => ({
					id,
					src: src,
					alt: alt,
				}))}
			/>
		</div>
	);
}

interface CarouselItemProps {
	id: string;
	className?: string;
	src: string;
	alt: string;
}

export function CarouselItem({ id, src, alt, className }: CarouselItemProps) {
	return (
		<div id={id} className={clsx("carousel-item w-full", className)}>
			<img src={src} alt={alt} className="w-full" />
		</div>
	);
}

interface Thumbnail {
	id: string;
	src: string;
	alt: string;
}

interface CarouselThumbnailsProps {
	thumbnails: Thumbnail[];
}

export function CarouselThumbnails({ thumbnails }: CarouselThumbnailsProps) {
	return (
		<div
			className={clsx(
				"flex min-h-fit w-full py-4 -space-x-3",
				thumbnails.length > 4 ? "overflow-x-auto" : "justify-center",
			)}
		>
			{thumbnails.map(({ id, src, alt }, index) => (
				<a
					key={id}
					href={`#${id}`}
					className="btn btn-sm"
					onClick={(e: Event) => {
						e.preventDefault();
						carouselState.setState({ currentSlide: index });
					}}
				>
					<img
						src={src}
						alt={alt}
						className="h-full aspect-square object-cover rounded"
					/>
				</a>
			))}
		</div>
	);
}

// const images = [
//   {
//     id: "item1",
//     src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
//     alt: "Image 1",
//   },
//   {
//     id: "item2",
//     src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
//     alt: "Image 2",
//   },
//   {
//     id: "item3",
//     src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
//     alt: "Image 3",
//   },
//   {
//     id: "item4",
//     src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
//     alt: "Image 4",
//   },
// ];
// <Carousel id="welcome-carousel" images={images} class="h-[300px]" />;
