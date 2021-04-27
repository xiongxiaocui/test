<script>
import { createPopper } from '@popperjs/core/';
import { onMount } from 'svelte'
export let width = ""
export let height = "auto"

let popoverRef
let btnRef
const handlePopover = (e) => {
  const target = e.target
  const btnElemHtml = String(btnRef.innerHTML)
  // console.log(btnElemHtml)
  const popOverElemHtml = String(popoverRef.innerHTML)
  const targetHtml = String(target.innerHTML)
  console.log(btnElemHtml)
  console.log(targetHtml,'target')
  console.log(btnElemHtml.indexOf(targetHtml)>=0)
  // if(target)
}
onMount(() => {
	// const curElem = document.getElementById(popId)
  // const curElem = btnRef
		createPopper(btnRef, popoverRef, {
			placement: 'bottom'
		})
})
</script>
<svelte:body on:click={handlePopover}/>
<span bind:this={btnRef}>
  <slot name="button"></slot>
</span>
<div style="width:{width};height: {height}" role='tooltip' bind:this={popoverRef} class="popoverWrapper">
	<slot name="content"></slot>
</div>
<style>
	.popoverWrapper {
    position:absolute;
		background: #fff;
    /* width: 220px; */
    box-shadow: 0 1px 14px 0 #e5e5e5;
    border-radius: 4px;
    z-index: 10;
    max-height: 500px;
    font-size: 13px;
		padding: 0 16px;
    color: #262626;
    display: flex;
    /* flex-direction: column; */
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
	}
</style>