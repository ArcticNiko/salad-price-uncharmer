import priceSelectors from "./price-selectors.json" with {type: "json"}
type PriceObject = {dollars: number, cents: number}
const PRICE_REGEX = /^\$\d+\.\d{2}$/

const priceWatcher = new MutationObserver(mutations => { // scan every new price
   mutations.forEach(function(mutation) {
      // get appropriate selectors for the current page
      const selectors: string[] = []

      for (const pathName of Object.keys(priceSelectors)) { // iterate thru & test every url path regex
         const pathRegex = new RegExp(pathName)

         if (pathRegex.test(location.pathname)) {
            // @ts-ignore gets mad about priceSelectors[location.pathname], but this loop is eliminating the chance for non-existent keys to be accessed
            selectors.push(...priceSelectors[pathName]) // add selectors for the matched path
         }
      }
      
      const prices = (<HTMLBodyElement>mutation.target).querySelectorAll(selectors.join(":not(.price-processed), ") + ":not(.price-processed)") // get every new price with the appropriate selectors

      prices.forEach(async price => { // process each price
         const priceElem = <HTMLElement>price

         if (priceElem.innerText === "$-") { // placeholder? process it once it's done loading
            loadingPriceWatcher.observe(priceElem, {childList: true, characterData: true, subtree: true})
            priceElem.classList.add("price-processed") // can't add this in the other observer, so might as well do it now since it will be processed eventually
            return
         } else if (priceElem.innerText === "Out of Stock" || priceElem.innerText.endsWith("Remaining") || priceElem.innerText.endsWith('%')) { // not a price
            return
         }

         // try parsing the price
         let originalPrice: PriceObject
         try {
            originalPrice = parsePrice(priceElem.innerText) 
         } catch (err) {
            console.warn(`Could not parse price "${priceElem.innerText}"`)
            console.warn(err)
            return
         }
         
         const processedPrice = roundPrice(originalPrice)
         if (processedPrice.condition === 0) {
            priceElem.classList.add("price-processed")
            return
         }

         // update price text
         priceElem.innerText = `$${processedPrice.price.dollars}.${String(processedPrice.price.cents).padStart(2, '0')}` // always make cents 2-digit
         priceElem.title = `Original price: $${originalPrice.dollars}.${String(originalPrice.cents).padStart(2, '0')}`
         priceElem.classList.add("price-processed")
      })
   })
})

// round prices that were previously loading
const loadingPriceWatcher = new MutationObserver(mutations => {
   mutations.forEach(function(mutation) {
      let priceObject = parsePrice('$' + mutation.target.textContent!)
      priceObject = roundPrice(priceObject).price

      mutation.target.textContent = `${priceObject.dollars}.${String(priceObject.cents).padStart(2, '0')}`
   })

   loadingPriceWatcher.disconnect()
})

// start watching for new prices
priceWatcher.observe(document.body, {childList: true, characterData: true, subtree: true})

/**
 * Parse a price string into a price object.
 * @param price The price string.
 * @returns The price object.
 */
function parsePrice(price: string): PriceObject {
   if (!PRICE_REGEX.test(price)) throw new TypeError("Invalid price " + price) // validate price

   const brokenPrice = price.slice(1).split('.').map(Number) // convert to array. 0: dollars, 1: cents

   return {dollars: brokenPrice[0]!, cents: brokenPrice[1]!}
}

/**
 * Round a price up based on multiple conditions.
 * @param price The price object to round.
 * @returns The rounding condition and rounded price.
 */
function roundPrice(price: PriceObject): {condition: 0 | 1 | 2 | 3 | 4, price: PriceObject} {
   const roundedPrice = price

   if (price.dollars >= 100 && price.dollars % 100 >= 90) { // condition 2: $10 off nearest hundred & $100+
      roundedPrice.dollars = Math.round(price.dollars / 100) * 100
      roundedPrice.cents = 0
      return {condition: 2, price: roundedPrice}
   } else if (price.dollars >= 10 && price.dollars % 10 === 9) { // condition 2: $1 off nearest ten & $10+
      roundedPrice.dollars = Math.round(price.dollars / 10) * 10
      roundedPrice.cents = 0
      return {condition: 2, price: roundedPrice}
   } else if (price.dollars >= 1 && price.cents >= 90) { // condition 3: $0.10 off nearest dollar & $1+
      roundedPrice.dollars++
      roundedPrice.cents = 0
      return {condition: 3, price: roundedPrice}
   } else if (price.cents >= 95) { // condition 4: cents are .95+
      roundedPrice.dollars++
      roundedPrice.cents = 0
      return {condition: 4, price: roundedPrice}
   } else { // no condition matched
      return {condition: 0, price: price}
   }
}

console.log("Salad Price Uncharmer v0.5.1-1 Beta has started!")