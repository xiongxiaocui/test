<script>
	import {money} from './../../../format-number.js'
	export let initialValue='0.00'
	export let onChange
	let amountFormatted = initialValue;
	let currencyInput;

	$:onChange(amountFormatted)

	const handleChange = () => {
		console.log('currentInput: ' + currencyInput.value);


    let cleanedInput = currencyInput.value
      .replace(/\D*/gm, '') // remove non digits
      .replace(/^0+/gm, ''); // remove leading zeros

    if (cleanedInput.length === 0 ) {
      amountFormatted = '0.00'; // ERROR this never works
    } else {
      amountFormatted = money(cleanedInput).toString();
    }
  };
</script>

<input
		type="tel"
		value={amountFormatted}
    bind:this={currencyInput}
    on:input={handleChange}
  />