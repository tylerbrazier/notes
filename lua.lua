--- Types ---
-- https://www.lua.org/pil/2.html
-- nil, boolean, number, string, userdata, function, thread, and table

--- Operators ---
local s = 'str'
s = s .. ' con'..'cat' -- no shorthands like += or ++ (same for numbers)

if n == 1 then
	print('n is one')
elseif n ~= 0 then  -- instead of !=
	print('n does not equal zero')
else
	print('n is something else')
end

print(1 <= 2 and 1 >= 0) -- true
print(false and false or true) -- true

local ternary = true and false or 'default'

--- Tables ---
local t = {name="Moses", age=120, foreskin=nil}
print(t)     -- not pretty
vim.print(t) -- pretty

--- Functions ---
local function f(opts)
	opts = opts or {}
	local n = opts.n or 99
	local s = opts.s or 'str'
	print('n', n)
	print('s', s)
end

--- Regex ---
-- https://www.lua.org/pil/20.2.html
