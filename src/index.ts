import priceSelectors from "./price-selectors.json" with {type: "json"}
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
         const priceObject = parsePrice(priceElem.innerText) 
         
         // start rounding price up
         if (priceObject.cents >= 95) { // condition 4: cents are .95+
            priceObject.dollars++
            priceObject.cents = 0
         } else { // no condition matched
            price.classList.add("price-processed")
            return
         }

         // update price text
         priceElem.innerText = `$${priceObject.dollars}.${String(priceObject.cents).padStart(2, '0')}` // always make cents 2-digit
         price.classList.add("price-processed")
      })
   })
})

// start watching for new prices
priceWatcher.observe(document.body, {childList: true, characterData: false, subtree: true})

/**
 * Parse a price string into a price object.
 * @param price The price string.
 * @returns The price object.
 */
function parsePrice(price: string): {dollars: number, cents: number} {
   if (!PRICE_REGEX.test(price)) throw new TypeError("Invalid price") // validate price

   const brokenPrice = price.slice(1).split('.').map(Number) // convert to array. 0: dollars, 1: cents

   return {dollars: brokenPrice[0]!, cents: brokenPrice[1]!}
}

console.log("Salad Price Uncharmer v0.2.6-1 has started!")