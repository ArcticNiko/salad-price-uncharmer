# 💵🧐 Salad Price Uncharmer
**Salad Price Uncharmer** is a userscript for [Salad](https://salad.com/store) that rounds .99 prices up to a round number (e.g. $2.99 -> $3.00), allowing you to make smarter purchasing decisions. This is because your brain reads prices from left to right, meaning that $2.99 will be perceived as $2 rather than $3 as it's the leftmost digit. For more information, check out the [charm pricing article](https://en.wikipedia.org/wiki/Psychological_pricing) on Wikipedia.

## 📋 Features
* **Rounds .99 prices up to a round number**
   * Also rounds .95-98 prices
   * Rounds .90-99 prices if the price is $1.90 or more (e.g. $2.90 -> $3.00)
   * Rounds prices that are $19+ and $1 off the nearest ten up (e.g. $19.00 -> $20.00)
   * Rounds prices that are $190+ and $10 off the nearest hundred up (e.g. $190.00 -> $200.00)
* Rounds prices so fast, it finishes before you even see them
* Works on a variety of pages where prices are seen
* Shows you the original price if you hover over the price

## 🧑‍💻 How do I compile this?
See [compiling.md](https://github.com/ArcticNiko/salad-price-uncharmer/blob/main/compiling.md) for instructions.