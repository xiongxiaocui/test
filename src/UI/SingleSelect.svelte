<script>
	import PopOver from './PopOver.svelte'
	import {createEventDispatcher, tick} from 'svelte'
	import {debounce} from './../utils'
	export let width
	export let options
	export let showFirst
	let selected = false
	let showPopOver = false
	let searchref
	let selectedText
	const dispatch = createEventDispatcher()
	const dispatchDebounce = debounce(dispatch, 1000)

	$:firstSelectedTxt = showFirst && options && Array.isArray(options) && options.length > 0 && options[0].title || '请选择一个选项'
	const toggleShow = async () => {
		selected = !selected
		setTimeout(() => {
			if(selected) {
				searchref.focus()
			}
		}, 0)
		showPopOver = selected
	}

	const handleInput = (e) => {
		dispatchDebounce('search', {
			value: e.target.value
		})
	}

	const handleSelect = async (option) => {
		const selectedTitle = option && option.title
		selectedText = selectedTitle
		await tick().then(() => {
			dispatch("addParams")
			dispatch("selected", {...option, selected: selectedText})
			dispatchDebounce("search", {
				value: ''
			})
			selected = false
			showPopOver = false
		})
	}

</script>
	  <div class="selectTriggerContainer filterField" tabindex="-1" style='width: {width}' on:click="{toggleShow}">
	    <span class="content">
				<span class="selectedValue paddingPreFixIcon">
					<span class="optionLabel">{selectedText || firstSelectedTxt}</span>
				</span>
			</span>
	    <span class="suffixIcon">
	      <svg class:active={selected} viewbox="0 0 16 16" width="16" height="16" fill="#8C8C8C">
	      <path d="M8 11c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L8 8.6l3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3z"></path>
	      </svg></span>
		</div>
		{#if showPopOver}
			<PopOver>
				<div slot="content">
					<div class="optionList">
						<div class="searchField">
							<div class="lineSearchInput">
								<span class="prefixIcon">
								<svg viewbox="0 0 16 16" width="16" height="16" fill="#C9C9C9">
									<path d="M12.5 11.7l-1.2-1.2c.6-.8 1-1.8 1-2.8 0-2.6-2.1-4.7-4.7-4.7C5.1 3 3 5.1 3 7.7a4.695 4.695 0 006.8 4.2l1.3 1.3c.4.4 1 .4 1.4 0 .4-.5.4-1.1 0-1.5zM5 7.7C5 6.2 6.2 5 7.7 5s2.7 1.2 2.7 2.7-1.2 2.7-2.7 2.7S5 9.1 5 7.7z"></path>
								</svg></span>
								<input on:input={handleInput} bind:this={searchref} type="search" placeholder="搜索" />
								<span class="suffixIcon"></span>
							</div>
							</div>
							<div class="listBox">
								{#each options as option, i (i)}
									<div class:selectActive={ selectedText ? option.title=== selectedText: option.title === firstSelectedTxt } on:click="{handleSelect.bind(this, option)}" role="option" class="optionItem">
										<span class='text'>{option.title}</span>
									</div>
								{/each}
							</div>
					</div>
				</div>
			</PopOver>
		{/if}
<style>
.selectTriggerContainer {
	outline: none;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #f2f4f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 28px 8px 8px;
  height: 40px;
}
.content {
  flex: 1 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.active{
	animation:spin .1s linear forwards;
}

.optionList{
	box-sizing: border-box;
  padding: 4px 0;
  border-radius: 4px;
}
.searchField{
	padding: 8px 16px;
}
.lineSearchInput {
  background: #fff;
  border-bottom: 1px solid #e9e9f5;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
	height: 32px;
}
.prefixIcon {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}
.optionItem {
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
	padding: 0 8px;
}
.optionItem {
  width: 100%;
  position: relative;
  padding: 0 8px;
}
.text{
  width: 100%;
  display: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.selectActive{
	color: #7b67ee;;
}
.optionLabel{
	display: inline-block;
  font-size: 13px;
  color: #8c8c8c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@keyframes spin {
  from {
      transform: rotate(0deg);
  } to {
      transform: rotate(180deg);
  }
}

</style>