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

export function FormFieldLabel({
	children,
	htmlFor,
	required,
	...props
}: FormFieldLabelProps) {
	return (
		<label htmlFor={htmlFor} class="label-text cursor-pointer mb-2" {...props}>
			{children}
			{required ? null : (
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
			class="form-hint cursor-pointer text-sm mb-2 -mt-1 text-zinc-600 dark:text-zinc-400"
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
	type = "text",
	...props
}: InputProps) {
	// Classes for regular inputs and file inputs
	const formInputClasses = clsx(
		"input input-bordered w-full cursor-pointer",
		error && "input-error",
		className,
	);
	const fileInputClasses = clsx(
		"file-input w-full cursor-pointer",
		error && "file-input-error",
		className,
	);

	return (
		<FormField>
			<FormFieldLabel htmlFor={props.id} required={props.required}>
				{label}
			</FormFieldLabel>

			{/* Optional description */}
			{description && (
				<FormFieldDescription>{description}</FormFieldDescription>
			)}

			{/* Conditional rendering for file input */}
			{type === "file" ? (
				<div class="file">
					<input
						type="file"
						class={fileInputClasses}
						aria-invalid={!!error}
						{...props}
					/>
				</div>
			) : (
				<input
					type={type}
					class={formInputClasses}
					aria-invalid={!!error}
					{...props}
				/>
			)}

			{/* Optional error message */}
			{error && <FormFieldError>{error}</FormFieldError>}
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
	id,
	class: className,
	children,
	...props
}: SelectProps) {
	const formSelectClasses = clsx(
		"select select-bordered cursor-pointer",
		className,
	);

	const descriptionId = description ? `${id}-desc` : undefined;
	const errorId = error ? `${id}-error` : undefined;

	return (
		<FormField>
			<FormFieldLabel htmlFor={id} required={props.required}>
				{label}
			</FormFieldLabel>
			{description && (
				<FormFieldDescription id={descriptionId}>
					{description}
				</FormFieldDescription>
			)}
			<select
				id={id}
				aria-describedby={`${descriptionId || ""} ${errorId || ""}`.trim()}
				aria-invalid={!!error}
				class={formSelectClasses}
				{...props}
			>
				{children}
			</select>
			{error && <FormFieldError id={errorId}>{error}</FormFieldError>}
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
					aria-checked={props.checked}
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
	id,
	class: className,
	...props
}: RangeProps) {
	const formRangeClasses = clsx(
		"range range-primary md:range-sm cursor-pointer",
		className,
	);

	const onInput = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const output = document.getElementById(`output-${id}`);
		if (output) output.textContent = target.value;
	};

	return (
		<FormField>
			<div className="flex items-center justify-between">
				<FormFieldLabel htmlFor={id} required={props.required}>
					{label}
				</FormFieldLabel>
				<output id={`output-${id}`} class="text-xs mt-1">
					{props.value}
				</output>
			</div>
			{description && (
				<FormFieldDescription>{description}</FormFieldDescription>
			)}
			<input
				type="range"
				id={id}
				aria-labelledby={id}
				onInput={onInput}
				class={formRangeClasses}
				{...props}
			/>
			{error && <FormFieldError>{error}</FormFieldError>}
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
					aria-checked={props.checked}
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
