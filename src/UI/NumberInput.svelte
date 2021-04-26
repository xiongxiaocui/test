<script>
	let inputRef
	let value
	let active = false
	export let onChange
	export let min = 0
	export let max = 100
	function setActiveStatus() {
		active = true
	}
	function removeActiveStatus() {
		active = false
	}

	function enforceMinMax(el){
		const curElem =  el.target
		const curValue = curElem.value
		const min = curElem.min
		const max = curElem.max
		if(curValue != ""){
			if(parseInt(curValue) < parseInt()){
				curElem.value = min
			}
			if(parseInt(curValue) > parseInt(max)){
				curElem.value = max;
			}
		}
}
	$:onChange(value)
</script>
<div class='inputWrapper' class:active={active}>
	<input
		type="number"
		bind:value
		{min}
		{max}
		bind:this={inputRef}
		on:focus = {setActiveStatus}
		on:blur={removeActiveStatus}
		on:keyup={enforceMinMax.bind(this)}
	/>
</div>

<style>
input {
	width: 100%;
}
.inputWrapper{
	background: #f2f4f6;
	position: relative;
  width: 100%;
  min-height: 32px;
  border-radius: 4px;
}
:global(.inputWrapper.active) {
	background: #fff;
  box-shadow: 0 0 0 1px #7b67ee;
}
</style>