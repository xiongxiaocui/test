<script>
export let width = ""
export let height = "auto"

let popoverRef
let btnRef

</script>
<span bind:this={btnRef}>
  <slot name="button"></slot>
</span>
<div id='wrapper'  style="width:{width};height: {height}" role='tooltip' bind:this={popoverRef} class="popoverWrapper">
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