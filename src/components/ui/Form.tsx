import { clsx } from "@core/clsx";

type FormFieldProps = JSX.IntrinsicElements["fieldset"] & {};

export function FormField({
	children,
	class: className,
	...props
}: FormFieldProps) {
	const formFieldClasses = clsx(
		"form-control cursor-pointer w-full",
		className,
	);

	return (
		<fieldset class={formFieldClasses} {...props}>
			{children}
		</fieldset>
	);
}

type LabelProps = JSX.IntrinsicElements["label"] & {
	required?: boolean;
};

export function Label({ children, ...props }: LabelProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
		<label class="label-text cursor-pointer mb-1" {...props}>
			{children}
			{props.required ? null : (
				<span class="text-zinc-500 dark:text-zinc-400 ml-2 text-xs">
					(Optional)
				</span>
			)}
		</label>
	);
}

type FormFieldLabelProps = JSX.IntrinsicElements["label"] & {
	htmlFor: string;
	required?: boolean;
};

export function FormFieldLabel({ children, ...props }: FormFieldLabelProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
		<label class="label-text cursor-pointer mb-1" {...props}>
			{children}
			{props.required ? null : (
				<span class="text-zinc-500 dark:text-zinc-400 ml-2 text-xs">
					(Optional)
				</span>
			)}
		</label>
	);
}

type FormFieldDescriptionProps = JSX.IntrinsicElements["p"];

export function FormFieldDescription({
	children,
	...props
}: FormFieldDescriptionProps) {
	return (
		<p
			class="form-hint cursor-pointer text-sm mb-1 -mt-1 text-zinc-600 dark:text-zinc-400"
			{...props}
		>
			{children}
		</p>
	);
}

type FormFieldErrorProps = JSX.IntrinsicElements["p"];

export function FormFieldError({
	children,
	class: className,
	...props
}: FormFieldErrorProps) {
	const formErrorClasses = clsx(
		"text-red-600 dark:text-red-500 mt-1 text-sm cursor-pointer",
		className,
	);
	return (
		<p class={formErrorClasses} {...props}>
			{children}
		</p>
	);
}

type FormProps = JSX.IntrinsicElements["form"];

export function Form({ children, ...props }: FormProps) {
	return <form {...props}>{children}</form>;
}

type InputProps = JSX.IntrinsicElements["input"] & {
	id: string;
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function Input({
	label,
	description,
	error,
	class: className,
	...props
}: InputProps) {
	const formInputClasses = clsx(
		"input input-bordered cursor-pointer",
		className,
	);

	if (props.type === "file") {
		return (
			<FormField>
				<FormFieldLabel htmlFor={props.id} required={props.required}>
					{label}
				</FormFieldLabel>
				{description ? (
					<FormFieldDescription>{description}</FormFieldDescription>
				) : null}

				<div class="file min-w-full">
					<input class="file-input cursor-pointer w-full" {...props} />
				</div>
				{error ? <FormFieldError>{error}</FormFieldError> : null}
			</FormField>
		);
	}

	return (
		<FormField>
			<FormFieldLabel htmlFor={props.id} required={props.required}>
				{label}
			</FormFieldLabel>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			<input class={formInputClasses} aria-invalid={!!error} {...props} />
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type SelectProps = JSX.IntrinsicElements["select"] & {
	id: string;
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function Select({
	label,
	description,
	error,
	class: className,
	children,
	...props
}: SelectProps) {
	const formSelectClasses = clsx(
		"select select-bordered cursor-pointer",
		className,
	);

	return (
		<FormField>
			<FormFieldLabel htmlFor={props.id} required={props.required}>
				{label}
			</FormFieldLabel>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			<select class={formSelectClasses} aria-invalid={!!error} {...props}>
				{children}
			</select>
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type TextAreaProps = JSX.IntrinsicElements["textarea"] & {
	id: string;
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function TextArea({
	label,
	description,
	error,
	class: className,
	...props
}: TextAreaProps) {
	const formTextAreaClasses = clsx(
		"textarea textarea-bordered cursor-pointer",
		className,
	);

	return (
		<FormField>
			<FormFieldLabel htmlFor={props.id} required={props.required}>
				{label}
			</FormFieldLabel>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			<textarea class={formTextAreaClasses} aria-invalid={!!error} {...props} />
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type CheckboxProps = JSX.IntrinsicElements["input"] & {
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function Checkbox({
	label,
	description,
	error,
	class: className,
	...props
}: CheckboxProps) {
	const formCheckboxClasses = clsx(
		"checkbox checkbox-primary md:checkbox-sm cursor-pointer",
		className,
	);

	return (
		<FormField>
			<label class="cursor-pointer flex items-center">
				<input
					type="checkbox"
					class={formCheckboxClasses}
					autoComplete="off"
					{...props}
				/>
				<span class="ml-2">{label}</span>
			</label>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type RadioProps = JSX.IntrinsicElements["input"] & {
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function Radio({
	label,
	description,
	error,
	class: className,
	...props
}: RadioProps) {
	const formRadioClasses = clsx(
		"radio radio-primary md:radio-sm cursor-pointer",
		className,
	);

	return (
		<FormField>
			<label class="cursor-pointer flex items-center">
				<input
					type="radio"
					class={formRadioClasses}
					autoComplete="off"
					{...props}
				/>
				<span class="ml-2">{label}</span>
			</label>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type RangeProps = JSX.IntrinsicElements["input"] & {
	id: string;
	name: string;
	label: string;
	min: number;
	max: number;
	step?: number;
	description?: string;
	error?: string;
};

export function Range({
	label,
	description,
	error,
	class: className,
	...props
}: RangeProps) {
	const formRangeClasses = clsx(
		"range range-primary md:range-sm cursor-pointer",
		className,
	);

	const onInput = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const outPut = document.getElementById(`output-${props.name}`);
		if (outPut) {
			outPut.innerHTML = target.value;
		}
	};

	return (
		<FormField>
			<div className="flex items-center justify-between">
				<FormFieldLabel htmlFor={props.id} required={props.required}>
					{label}
				</FormFieldLabel>

				<output id={`output-${props.name}`} class="text-xs mt-1">
					{props.value}
				</output>
			</div>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			<input
				type="range"
				onInput={onInput}
				class={formRangeClasses}
				aria-invalid={!!error}
				{...props}
			/>
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}

type ToggleProps = JSX.IntrinsicElements["input"] & {
	id: string;
	name: string;
	label: string;
	description?: string;
	error?: string;
};

export function Toggle({
	label,
	description,
	error,
	class: className,
	...props
}: ToggleProps) {
	const formToggleClasses = clsx(
		"toggle toggle-primary md:toggle-sm cursor-pointer",
		className,
	);

	return (
		<FormField>
			<label class="cursor-pointer flex items-center">
				<input
					type="checkbox"
					class={formToggleClasses}
					autoComplete="off"
					{...props}
				/>
				<span class="ml-2">{label}</span>
			</label>
			{description ? (
				<FormFieldDescription>{description}</FormFieldDescription>
			) : null}
			{error ? <FormFieldError>{error}</FormFieldError> : null}
		</FormField>
	);
}
