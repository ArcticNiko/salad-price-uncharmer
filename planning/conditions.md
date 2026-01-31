# Rounding conditions
A price must meet one of these conditions to be rounded up. The userscript checks condition #1 first, and will move on to the next condition if the first one isn't matched.

## Condition 1: It's $10.05 or less off the nearest hundred
In this case, the price will be rounded up to the nearest hundred.

Examples:
* $1090.00 -> $1,100.00

## Condition 2: It's $1.05 or less off the nearest ten and is over $10
In this case, the price will be rounded up to the nearest ten.

Examples:
* $1099.00 -> $1,100.00
* $229.00 -> $230.00

## Condition 3: It's $0.10 or less off the nearest one and is over $1
In this case, the price will be rounded up to the nearest one.

Examples:
* $23.90 -> $24.00

## Condition 4: The cents place is .95 or higher
In this case, the price will be rounded up to the nearest one.

Examples:
* $5.99 -> $6.00
* $23.95 -> $24.00
* $0.94 -> $1.00