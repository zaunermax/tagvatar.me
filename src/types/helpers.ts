export type StringKeys<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type BooleanOrNullKeys<T> = {
	[K in keyof T]: T[K] extends boolean | null ? K : never;
}[keyof T];
