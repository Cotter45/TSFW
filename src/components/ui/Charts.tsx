export function drawLine(
	ctx: CanvasRenderingContext2D,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	color = "#000",
	width = 1,
): void {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.stroke();
}

export function drawRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	color = "#000",
): void {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
}

export function drawText(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	color = "#000",
	font = "12px Arial",
	align: CanvasTextAlign = "center",
): void {
	ctx.fillStyle = color;
	ctx.font = font;
	ctx.textAlign = align;
	ctx.fillText(text, x, y);
}

export type ChartType =
	| "bar"
	| "line"
	| "pie"
	| "scatter"
	| "area"
	| "bubble"
	| "radar";

export interface BarSeries {
	type: "bar";
	data: number[];
	color?: string;
}

export interface LineSeries {
	type: "line";
	data: number[];
	color?: string;
}

export interface PieSeries {
	type: "pie";
	data: number[];
	colors: string[];
}

export interface ScatterSeries {
	type: "scatter";
	data: { x: number; y: number }[];
	color?: string;
}

export interface AreaSeries {
	type: "area";
	data: number[];
	lineColor?: string;
	fillColor?: string;
}

export interface RadarSeries {
	type: "radar";
	data: number[];
	labels: string[];
	color?: string;
}

export type ChartSeries =
	| BarSeries
	| LineSeries
	| PieSeries
	| ScatterSeries
	| AreaSeries
	| RadarSeries;

export interface ChartConfig {
	canvasId: string;
	padding?: number;
	responsive?: boolean;
	animationDuration?: number;
}

export class TSFWChart {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private padding: number;
	private textColor: string;
	private xLabels: string[] = [];
	private yLabels: number[] = [];
	private series: ChartSeries[] = [];

	constructor({
		canvasId,
		padding = 40,
	}: {
		canvasId: string;
		padding?: number;
	}) {
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

		if (!canvas) {
			throw new Error(`Canvas with ID "${canvasId}" not found.`);
		}

		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d")!;
		this.padding = padding;

		this.resizeCanvas();
		this.textColor =
			document.documentElement.getAttribute("data-theme") === "tsfwdark"
				? "#d4d4d8"
				: "#3f3f46";

		this.observeThemeChanges();
		this.observeResize();
	}

	private resizeCanvas(): void {
		const container = this.canvas.parentElement;
		if (!container) return;

		this.canvas.width = container.clientWidth;
		this.canvas.height = container.clientHeight;
	}

	private observeResize(): void {
		window.addEventListener("resize", () => {
			this.resizeCanvas();
			this.redraw();
		});
	}

	private observeThemeChanges(): void {
		const observer = new MutationObserver(() => {
			this.textColor =
				document.documentElement.getAttribute("data-theme") === "tsfwdark"
					? "#d4d4d8"
					: "#3f3f46";
			this.redraw();
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
	}

	setLabels(xLabels: string[], yLabels: number[]): void {
		this.xLabels = xLabels;
		this.yLabels = yLabels;
	}

	setSeries(series: ChartSeries[]): void {
		this.series = series;
	}

	clear(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawAxes(): void {
		const { ctx, canvas, padding } = this;

		// X-axis
		drawLine(
			ctx,
			padding,
			canvas.height - padding,
			canvas.width - padding,
			canvas.height - padding,
			this.textColor,
		);

		// Y-axis
		drawLine(
			ctx,
			padding,
			padding,
			padding,
			canvas.height - padding,
			this.textColor,
		);
	}

	drawLabels(): void {
		const { ctx, canvas, padding } = this;

		const maxLabelWidth = 50; // Approximate max width for an X-axis label
		const maxLabelHeight = 20; // Approximate max height for a Y-axis label

		// Determine the interval for X-axis labels
		const xInterval = Math.ceil(
			(this.xLabels.length * maxLabelWidth) / (canvas.width - 2 * padding),
		);

		// Determine the interval for Y-axis labels
		const yInterval = Math.ceil(
			(this.yLabels.length * maxLabelHeight) / (canvas.height - 2 * padding),
		);

		// X-axis labels
		this.xLabels.forEach((label, i) => {
			if (i % xInterval === 0) {
				const xPos =
					padding +
					(i + 0.5) * ((canvas.width - 2 * padding) / this.xLabels.length);
				drawText(
					ctx,
					label,
					xPos,
					canvas.height - padding + 20,
					this.textColor,
				);
			}
		});

		// Y-axis labels
		this.yLabels.forEach((label, i) => {
			if (i % yInterval === 0) {
				const yPos =
					canvas.height -
					padding -
					i * ((canvas.height - 2 * padding) / (this.yLabels.length - 1));
				drawText(
					ctx,
					label.toString(),
					padding - 10,
					yPos + 5,
					this.textColor,
					"12px Arial",
					"right",
				);
			}
		});
	}

	drawSeries(): void {
		for (const serie of this.series) {
			switch (serie.type) {
				case "bar":
					this.drawBars(serie.data, serie.color || this.textColor);
					break;
				case "line":
					this.drawLine(serie.data, serie.color || this.textColor);
					break;
				case "pie":
					this.drawPie(serie.data, serie.colors);
					break;
				case "scatter":
					this.drawScatter(serie.data, serie.color || this.textColor);
					break;
				case "area":
					this.drawArea(
						serie.data,
						serie.lineColor || this.textColor,
						serie.fillColor || "rgba(37, 99, 235, 0.5)",
					);
					break;
				case "radar":
					this.drawRadar(
						serie.data,
						serie.labels,
						serie.color || this.textColor,
					);
					break;
			}
		}
	}

	private drawBars(data: number[], barColor: string): void {
		const { ctx, canvas, padding } = this;

		const maxY = Math.max(...this.yLabels); // Use yLabels range
		const minY = Math.min(...this.yLabels);
		const rangeY = maxY - minY;

		const barWidth = (canvas.width - 2 * padding) / data.length;

		data.forEach((value, i) => {
			const barHeight =
				((value - minY) / rangeY) * (canvas.height - 2 * padding);
			const x = padding + i * barWidth + 5;
			const y = canvas.height - padding - barHeight;

			drawRect(ctx, x, y, barWidth - 10, barHeight, barColor);
		});
	}

	private drawLine(data: number[], lineColor: string): void {
		const { ctx, canvas, padding } = this;

		const maxY = Math.max(...this.yLabels); // Use yLabels range
		const minY = Math.min(...this.yLabels);
		const rangeY = maxY - minY;

		const stepX = (canvas.width - 2 * padding) / (data.length - 1);

		ctx.beginPath();
		data.forEach((value, i) => {
			const x = padding + i * stepX;
			const y =
				canvas.height -
				padding -
				((value - minY) / rangeY) * (canvas.height - 2 * padding);
			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = 2;
		ctx.stroke();
	}

	private drawPie(data: number[], colors: string[]): void {
		const { ctx, canvas, padding } = this;
		this.clear();
		const radius = Math.min(canvas.width, canvas.height) / 2 - padding;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const total = data.reduce((sum, value) => sum + value, 0);

		let startAngle = 0;

		data.forEach((value, i) => {
			const sliceAngle = (value / total) * 2 * Math.PI;
			const endAngle = startAngle + sliceAngle;

			// Draw slice
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fillStyle = colors[i];
			ctx.fill();

			// Add labels
			const labelAngle = startAngle + sliceAngle / 2;
			const labelX = centerX + (radius / 1.5) * Math.cos(labelAngle);
			const labelY = centerY + (radius / 1.5) * Math.sin(labelAngle);
			drawText(ctx, value.toString(), labelX, labelY, this.textColor);

			startAngle = endAngle;
		});
	}

	private drawScatter(
		points: { x: number; y: number }[],
		pointColor = "#14b8a6",
	): void {
		const { ctx, canvas, padding, xLabels, yLabels } = this;

		const yMin = Math.min(...yLabels);
		const yMax = Math.max(...yLabels);
		const yRange = yMax - yMin;

		const xStep = (canvas.width - 2 * padding) / xLabels.length;

		for (const { x, y } of points) {
			// Adjust `x` to align with category centers
			const scaledX = padding + (x + 0.5) * xStep;

			// Scale `y` relative to `yLabels`
			const scaledY =
				canvas.height -
				padding -
				((y - yMin) / yRange) * (canvas.height - 2 * padding);

			ctx.beginPath();
			ctx.arc(scaledX, scaledY, 5, 0, 2 * Math.PI);
			ctx.fillStyle = pointColor;
			ctx.fill();
		}
	}

	private drawArea(
		data: number[],
		lineColor = "#2563eb",
		fillColor = "rgba(37, 99, 235, 0.5)",
	): void {
		const { ctx, canvas, padding, yLabels } = this;

		const yMin = Math.min(...yLabels); // Use yLabels for range
		const yMax = Math.max(...yLabels);
		const yRange = yMax - yMin;

		const stepX = (canvas.width - 2 * padding) / (data.length - 1);

		// Draw the filled area
		ctx.beginPath();
		data.forEach((value, i) => {
			const x = padding + i * stepX; // Align x with step
			const y =
				canvas.height -
				padding -
				((value - yMin) / yRange) * (canvas.height - 2 * padding); // Scale y value

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});

		// Close the area path to the x-axis
		ctx.lineTo(padding + (data.length - 1) * stepX, canvas.height - padding); // Last x to baseline
		ctx.lineTo(padding, canvas.height - padding); // First x to baseline
		ctx.closePath();

		ctx.fillStyle = fillColor;
		ctx.fill();

		// Draw the line over the filled area
		ctx.beginPath();
		data.forEach((value, i) => {
			const x = padding + i * stepX;
			const y =
				canvas.height -
				padding -
				((value - yMin) / yRange) * (canvas.height - 2 * padding);

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});

		ctx.strokeStyle = lineColor;
		ctx.lineWidth = 2;
		ctx.stroke();
	}

	private drawRadar(data: number[], labels: string[], color = "#14b8a6"): void {
		const { ctx, canvas } = this;
		this.clear();
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(canvas.width, canvas.height) / 2 - 50;

		const angleStep = (2 * Math.PI) / data.length;
		const maxValue = Math.max(...data);

		ctx.beginPath();
		data.forEach((value, i) => {
			const angle = i * angleStep;
			const x = centerX + (value / maxValue) * radius * Math.cos(angle);
			const y = centerY + (value / maxValue) * radius * Math.sin(angle);

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		});
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();

		// Draw axes and labels
		labels.forEach((label, i) => {
			const angle = i * angleStep;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			drawText(ctx, label, x, y, this.textColor, "12px Arial", "center");
		});
	}

	redraw(): void {
		this.clear();
		this.drawAxes();
		this.drawLabels();
		this.drawSeries();
	}
}

export function Chart({
	id,
	xLabels,
	yLabels,
	series,
}: {
	id: string;
	xLabels: string[];
	yLabels: number[];
	series: ChartSeries[];
}): JSX.Element {
	setTimeout(() => {
		const chart = new TSFWChart({
			canvasId: id,
			padding: 40,
		});

		chart.setLabels(xLabels, yLabels);
		chart.setSeries(series);
		chart.redraw();
	}, 0);

	return (
		<div className="chart-container w-full h-full">
			<canvas id={id} />
		</div>
	);
}

// import { Chart } from "@components/ui/Charts";

// export function Chartz() {
//   return (
//     <div class="h-[400px]">
//       <Chart
//         id="myChart"
//         xLabels={["Jan", "Feb", "Mar", "Apr", "May"]}
//         yLabels={[0, 20, 40, 60, 80, 100]}
//         series={[
//           { type: "bar", data: [20, 40, 60, 80, 100], color: "#257a57" },
//           { type: "line", data: [15, 35, 55, 75, 95], color: "#257a57" },
//           {
//             type: "scatter",
//             data: [
//               { x: 0, y: 30 },
//               { x: 2, y: 90 },
//             ],
//             color: "#257a57",
//           },
//           {
//             type: "area",
//             data: [60, 70, 50, 70, 90],
//             lineColor: "#257a57",
//             fillColor: "rgba(20, 184, 166, 0.2)",
//           },
//         ]}
//       />
//     </div>
//   );
// }
