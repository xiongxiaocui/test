<script>
	import {createEventDispatcher} from 'svelte'
	export let buttonRole
	export let size= "middle"
	export let state = "unchecked"
	const dispatch = createEventDispatcher()
	const dispatchClick = () => {
		dispatch("click")
	}
</script>
<button on:click="{dispatchClick}" type="button" role="{buttonRole}" aria-checked="true" class="{buttonRole} {buttonRole}-{size} {buttonRole}-{state} {buttonRole}-{state}">
	<div class="{buttonRole}-handle"></div>
	<span class="{buttonRole}-inner"></span>
</button>
<style>
	.switch{
		margin: 0;
    padding: 0;
    color: #262626;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum","tnum";
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    min-width: 44px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    background-color: #c9c9c9;
    border: 0;
    border-radius: 100px;
    cursor: pointer;
    -webkit-transition: all .2s;
    transition: all .2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
	}
	.switch-small {
		min-width: 24px;
		line-height: 12px;
		height: 14px;
	}
	.switch-checked {
    background-color: #7b67ee;
	}
	.switch-handle {
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
	}

	.switch-handle, .switch-handle:before {
    position: absolute;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
	}
	.switch-handle:before {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgb(0 35 11 / 20%);
    content: "";
}
	.switch-checked .switch-handle {
    left: calc(100% - 18px);
	}
	.switch-small .switch-handle {
    width: 10px;
    height: 10px;
	}
	.switch-small.switch-checked .switch-handle {
    left: calc(100% - 12px);
	}
	.switch-small .switch-handle {
		width: 10px;
		height: 10px;
	}
	.switch-inner {
    display: block;
    margin: 0 6px 0 22px;
    color: #fff;
    font-size: 12px;
    -webkit-transition: margin .2s;
    transition: margin .2s;
	}
</style>