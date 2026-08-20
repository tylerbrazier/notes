// https://www.freedesktop.org/software/systemd/man/latest/sd-daemon.html
export const LogLevel = {
	EMERG: 0,
	ALERT: 1,
	CRIT: 2,
	ERR: 3,
	WARNING: 4,
	NOTICE: 5,
	INFO: 6,
	DEBUG: 7,
} as const; // tells TS:
// 1. not to widen the values; e.g. EMERG is not a number but 0 specifically
// 2. make the object readonly; LogLevel.INFO = 7 won't compile
//
// combine that with this:
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
// `keyof typeof LogLevel` means "the keys of that type" equivalent to the union
//   'EMERG' | 'ALERT' | 'CRIT' | ...
// `(typeof LogLevel)[keyof typeof LogLevel]` is an "indexed access type"
//   T[K] looks up the type of property K on type T, equivalent to the union
//   typeof LogLevel['EMERG'] | typeof LogLevel['ALERT'] | ...
//   which is also equivalent to
//   0 | 1 | 2 | ...
//   so `type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]`
//   is equivalent to `type LogLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7`
//
// so you can do things like this:
const MIN_LEVEL = LogLevel.WARNING;
function log(lvl: LogLevel, msg: string) {
	if (lvl <= MIN_LEVEL) console.log(msg);
}
log(LogLevel.CRIT, "this will print");
log(LogLevel.DEBUG, "this not will print");
