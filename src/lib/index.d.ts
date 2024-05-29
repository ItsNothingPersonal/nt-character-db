/* eslint-disable @typescript-eslint/no-explicit-any */
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
type Cast<X, Y> = X extends Y ? X : Y;
type FromEntries<T> = T extends [infer Key, any][]
	? { [K in Cast<Key, string>]: Extract<T[number], [K, any]>[1] }
	: { [key in string]: any };

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>;

declare global {
	interface ObjectConstructor {
		fromEntries<T>(obj: T): FromEntriesWithReadOnly<T>;
	}
}
