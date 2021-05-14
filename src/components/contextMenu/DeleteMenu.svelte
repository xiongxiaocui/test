<script>
	import Menu from './Menu.svelte';
	import MenuOption from './MenuOption.svelte';
	import DeleteIcon from './../icon/Delete.svelte'
	import {createEventDispatcher} from 'svelte'
	export let totalCount
	
	const dispatcher = createEventDispatcher()
	let pos = { x: 0, y: 0 };
	let showMenu = false;

	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}

		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}

	function closeMenu() {
		showMenu = false;
	}

	function onClickOption() {
		dispatcher('deleteAll')
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption on:click={onClickOption}>
			<DeleteIcon /><span>删除这{totalCount}行</span>
		</MenuOption>
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />