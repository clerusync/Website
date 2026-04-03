    const toggle = document.getElementById("billingToggle")
    const billingToggle = document.getElementById("billingToggle");
    const currencySelect = document.getElementById("currencySelect");
    
    toggle.addEventListener("change", function(){
      
      if(this.checked){
        document.getElementById("price-pro").innerHTML = "£42 <span class='small'>per year</span>" 
        document.getElementById("price-dev").innerHTML = "£16.80 <span class='small'>per year</span>"
        
        document.getElementById("billing-pro").innerText = "Billed yearly" 
        document.getElementById("billing-dev").innerText = "Billed yearly"
      }
      
      else{
        document.getElementById("price-pro").innerHTML = "£5 <span class='small'>per month</span>" 
        document.getElementById("price-dev").innerHTML = "£2 <span class='small'>per month</span>"
        
        document.getElementById("billing-pro").innerText = "Billed monthly" 
        document.getElementById("billing-dev").innerText = "Billed monthly"
      }
    }) 

      // Base prices in GBP
      const prices = {
        pro: { monthly: 5, yearly: 42 },
        dev: { monthly: 2, yearly: 16.80 }
      };
      
      // Store live rates
      let rates = { GBP: 1 };
      
      // Fetch live exchange rates (base GBP)
      async function getRates() {
        try {
          const res = await fetch("https://open.er-api.com/v6/latest/GBP");
          const data = await res.json();
          rates = data.rates;
          updatePrices();
        } catch (err) {
          console.error("Error fetching rates:", err);
        }
      }
      
      // Format currency cleanly (Currency sign then number)
      function formatCurrency(value, currencyCode) {
        return new Intl.NumberFormat("en", {
          style: "currency",
          currency: currencyCode,
          currencyDisplay: "narrowSymbol",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      }
      
      function updatePrices() {
        const isYearly = billingToggle.checked;
        const currency = currencySelect.value;
      
        const period = isYearly ? "yearly" : "monthly";
        const rate = rates[currency] || 1;
      
        const proPrice = formatCurrency(prices.pro[period] * rate, currency);
        const devPrice = formatCurrency(prices.dev[period] * rate, currency);
      
        document.getElementById("price-pro").innerHTML =
          `${proPrice} <span class='small'>per ${period === "yearly" ? "year" : "month"}</span>`;
      
        document.getElementById("price-dev").innerHTML =
          `${devPrice} <span class='small'>per ${period === "yearly" ? "year" : "month"}</span>`;
      
        document.getElementById("billing-pro").innerText =
          isYearly ? "Billed yearly" : "Billed monthly";
      
        document.getElementById("billing-dev").innerText =
          isYearly ? "Billed yearly" : "Billed monthly";
      }
      
      // Event listeners
      billingToggle.addEventListener("change", updatePrices);
      currencySelect.addEventListener("change", updatePrices);
      
      // Initial load
      getRates(); 