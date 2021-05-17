<script>
	import {percent} from './../../../format-number.js'
	export let initialValue='0.00'
	export let onChange
	let amountFormatted = initialValue;
	let currencyInput;

	$:onChange(amountFormatted)

	const handleChange = () => {
		console.log('currentInput: ' + currencyInput.value);


		let cleanedInput = currencyInput.value
		console.log('cleanedInput', cleanedInput)

    if (cleanedInput.length === 0 ) {
      amountFormatted = '0.00'; // ERROR this never works
    } else {
      amountFormatted = percent(cleanedInput).toString();
    }
  };
</script>

<input
		type="tel"
		value={amountFormatted}
    bind:this={currencyInput}
    on:input={handleChange}
  />