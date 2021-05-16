<script>
	let inputRef
	let value
	let active = false
	export let onChange
	export let onBlur
	export let height = "auto"
	function setActiveStatus() {
		active = true
	}
	function removeActiveStatus() {
		active = false
		onChange(value)
	}
	
	$:onChange(value)
	$:onBlur(value)

		// $:console.log(value
</script>
<div class='inputWrapper' class:active={active} style="height: {height}">
	<input
		type="text"
		bind:value
		style="height: {height}"
		bind:this={inputRef}
		on:focus = {setActiveStatus}
		on:blur={removeActiveStatus} />
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