//#region src/types/utils.d.ts
/**
 * Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.
 * https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts
 */
type Simplify<T> = { [K in keyof T]: T[K] } & {};
type SnakeToCamel<T> = T extends `${infer A}_${infer B}` ? `${Uncapitalize<A>}${Capitalize<SnakeToCamel<B>>}` : T extends object ? { [K in keyof T as SnakeToCamel<K>]: T[K] } : T;
type DeepSnakeToCamel<T> = T extends `${infer A}_${infer B}` ? `${Uncapitalize<A>}${Capitalize<DeepSnakeToCamel<B>>}` : T extends object ? { [K in keyof T as DeepSnakeToCamel<K>]: DeepSnakeToCamel<T[K]> } : T;
type DeepCamelToSnake<T> = T extends `${infer C0}${infer R}` ? `${C0 extends Uppercase<C0> ? '_' : ''}${Lowercase<C0>}${DeepCamelToSnake<R>}` : T extends object ? { [K in keyof T as DeepCamelToSnake<Extract<K, string>>]: DeepCamelToSnake<T[K]> } : T;
type CamelToSnake<T> = T extends `${infer C0}${infer R}` ? `${C0 extends Uppercase<C0> ? '_' : ''}${Lowercase<C0>}${CamelToSnake<R>}` : T extends object ? { [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K] } : T;
/**
 * @internal
 */
type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };
type DeepRequired<T> = Required<{ [P in keyof T]: T[P] extends object | undefined ? DeepRequired<Required<T[P]>> : T[P] }>;
type Nullable<T, K extends keyof T> = { [P in keyof T]: P extends K ? T[P] | null : T[P] };
/**
 * Internal type used by RecordToPath
 */
type PathImpl<T, Key extends keyof T> = Key extends string ? T[Key] extends Record<string, any> ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}` | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}` : never : never;
/**
 * Internal type used by RecordToPath
 */
type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;
/**
 * Used to construct a type union containing all the keys (even if nested) of an object defined as const
 * const obj =  { a: { b: '' }, c: '' }  as const;
 * type Paths = RecordToPath<typeof obj>
 * Paths contains: 'a' | 'a.b' | 'c'
 */
type RecordToPath<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;
/**
 * Used to read the value of a string path inside an object defined as const
 * const obj =  { a: { b: 'hello' }}  as const;
 * type Value = PathValue<typeof obj, 'a.b'>
 * Value is now a union set containing a single type: 'hello'
 */
type PathValue<T, P extends RecordToPath<T>> = P extends `${infer Key}.${infer Rest}` ? Key extends keyof T ? Rest extends RecordToPath<T[Key]> ? PathValue<T[Key], Rest> : never : never : P extends keyof T ? T[P] : never;
type IsSerializable<T> = T extends Function ? false : true;
/**
 * Excludes any non-serializable prop from an object
 *
 * @hidden
 */
type Serializable<T> = { [K in keyof T as IsSerializable<T[K]> extends true ? K : never]: T[K] };
/**
 * Enables autocompletion for a union type, while keeping the ability to use any string
 * or type of `T`
 *
 * @internal
 */
type Autocomplete<U extends T, T = string> = U | (T & Record<never, never>);
/**
 * Omit without union flattening
 */
type Without<T, W> = { [P in keyof T as Exclude<P, W>]: T[P] };
/**
 * Overrides the type of existing properties
 * const obj =  { a: string, b: number }  as const;
 * type Value = Override<typeof obj, { b: string }>
 * Value contains: { a:string, b: string }
 */
type Override<T, U> = Omit<T, keyof U> & U;
/**
 * Utility type that removes function properties from a type.
 */
type RemoveFunctions<T extends object> = { [K in keyof T as T[K] extends ((...args: any[]) => any) ? never : K]: T[K] };
/**
 * Utility type that makes all properties `null`.
 */
type ForceNull<T> = { [K in keyof T]: null };
//#endregion
export { Autocomplete, CamelToSnake, DeepCamelToSnake, DeepPartial, DeepRequired, DeepSnakeToCamel, ForceNull, Nullable, Override, PathValue, RecordToPath, RemoveFunctions, Serializable, Simplify, SnakeToCamel, Without };