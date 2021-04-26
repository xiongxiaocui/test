<script>
	import {createEventDispatcher} from 'svelte'
	import { onMount } from 'svelte';
	import {debounce} from '../utils'
	const dispatch = createEventDispatcher()

	export let id;
	export let searchNumber
	export let totalNumber

	function handleInput(e) {
		const dispatchDebounce = debounce(dispatch, 1000)
		dispatchDebounce('search', {
			value: e.target.value
		})
	}
	onMount(() => {
	})
</script>

<div class='searchLeft'>
  <input type="search" on:input={handleInput} {id} class="searchInput"  />
  <span class='searchNumber'>{searchNumber}/{totalNumber}</span>
</div>
<div class="searchRight">
	<div class="slashes"></div>
	<button type="button" class="btn btn-icon-only btn-x-small btn-circle btn-plus-icon">
		<span class="btn-icon">
			<svg viewBox="0 0 16 16" width="16" height="16" fill="#636363">
				<path d="M12 11c-.3 0-.5-.1-.7-.3L8 7.4l-3.3 3.3c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l4-4c.4-.4 1-.4 1.4 0l4 4c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3z"></path>
			</svg>
		</span>
		<span></span>
	</button>
	<button type="button" class="btn">
		<span class="btn-icon">
			<svg viewBox="0 0 16 16" width="16" height="16" fill="#636363">
				<path d="M8 11c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L8 8.6l3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3z"></path>
			</svg>
		</span>
		<span></span>
	</button>
</div>

<style>
	.searchLeft {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 193px;
  }
  .searchInput {
    max-width: 120px;
    height: 30px;
    background: #fff;
    box-shadow: 0 0 #e5e5e5;
    border: none;
    outline: none;
    caret-color: #7b67ee;
  }
  .searchRight {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    right: 16px;
    height: 100%;
    width: 128px;
  }
</style>