<script>
	import Menu from './Menu.svelte';
	import MenuOption from './MenuOption.svelte';
	import {createEventDispatcher} from 'svelte'
	
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
			<div class="react-contexify">
				<MenuOption>
					<div class="react-contexify__item" role="presentation">
						<div class="react-contexify__item__content">
							<div class="contextmenuItem">
								<svg width="16" height="16" viewBox="0 0 16 16" class="sc-hKwCoD sc-eCImvq fgBDdK cXbbhc" size="16" fill="#8C8C8C" version="1.1"
									xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<path
										d="M7.29307 2.49285C7.48061 2.30532 7.73496 2.19996 8.00018 2.19996C8.2654 2.19996 8.51975 2.30532 8.70729 2.49285L12.4785 6.26409C12.869 6.65461 12.869 7.28778 12.4785 7.6783C12.088 8.06883 11.4548 8.06883 11.0643 7.6783L9.00018 5.61417V12.8C9.00018 13.3522 8.55246 13.8 8.00018 13.8C7.44789 13.8 7.00018 13.3522 7.00018 12.8V5.61417L4.93605 7.6783C4.54553 8.06883 3.91236 8.06883 3.52184 7.6783C3.13131 7.28778 3.13131 6.65461 3.52184 6.26409L7.29307 2.49285Z"
										fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
								</svg>
								<div class="name">向上方插入行</div>
								<!-- <div class="shortcutKey">⌘ ⇧ Enter</div> -->
							</div>
						</div>
					</div>
				</MenuOption>
					<MenuOption>
						<div class="react-contexify__item" role="presentation">
							<div class="react-contexify__item__content">
								<div class="contextmenuItem">
									<svg width="16" height="16" viewBox="0 0 16 16"
										class="sc-hKwCoD sc-eCImvq fgBDdK cXbbhc" size="16" fill="#8C8C8C" version="1.1"
										xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<path
											d="M7.00019 3.20005C7.00019 2.64777 7.44791 2.20005 8.00019 2.20005C8.55248 2.20005 9.00019 2.64777 9.00019 3.20005V10.3858L11.0643 8.32171C11.4548 7.93118 12.088 7.93118 12.4785 8.32171C12.8691 8.71223 12.8691 9.3454 12.4785 9.73592L8.7073 13.5072C8.51976 13.6947 8.26541 13.8001 8.00019 13.8001C7.73498 13.8001 7.48062 13.6947 7.29309 13.5072L3.52185 9.73592C3.13133 9.3454 3.13133 8.71223 3.52185 8.32171C3.91238 7.93118 4.54554 7.93118 4.93606 8.32171L7.00019 10.3858V3.20005Z"
											fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
									</svg>
									<div class="name">向下方插入行</div>
									<!-- <div class="shortcutKey">⇧ Enter</div> -->
								</div>
							</div>
						</div>
					</MenuOption>
					<MenuOption>
						<div class="react-contexify__item" role="presentation">
							<div class="react-contexify__item__content">
								<div class="contextmenuItem">
									<svg width="16" height="16" viewBox="0 0 16 16"
										class="sc-hKwCoD sc-eCImvq fgBDdK cXbbhc" size="16" fill="#8C8C8C" version="1.1"
										xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<path
											d="M3.00001 3.0667C3.00001 3.02988 3.02985 3.00003 3.06667 3.00003H9.9333C9.97012 3.00003 9.99996 3.02988 9.99996 3.0667V3.99999H6.06676C4.92537 3.99999 4.00009 4.92527 4.00009 6.06666V10H3.06664C3.02982 10 2.99997 9.97018 2.99997 9.93336L3.00001 3.0667ZM4.00009 12H3.06664C1.92524 12 0.999963 11.0747 0.999969 9.93335L1.00001 3.06669C1.00001 1.9253 1.92529 1.00003 3.06667 1.00003H9.9333C11.0747 1.00003 12 1.92531 12 3.0667V3.99999H12.9334C14.0748 3.99999 15.0001 4.92527 15.0001 6.06666V12.9333C15.0001 14.0747 14.0748 15 12.9334 15H6.06676C4.92537 15 4.00009 14.0747 4.00009 12.9333V12ZM10.9908 5.99999C10.9939 6.00002 10.9969 6.00003 11 6.00003C11.003 6.00003 11.006 6.00002 11.0091 5.99999H12.9334C12.9702 5.99999 13.0001 6.02984 13.0001 6.06666V12.9333C13.0001 12.9701 12.9702 13 12.9334 13H6.06676C6.02994 13 6.00009 12.9701 6.00009 12.9333V6.06666C6.00009 6.02984 6.02994 5.99999 6.06676 5.99999H10.9908Z"
											fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
									</svg>
									<div class="name__2VrKC">复制行</div>
									<div class="shortcutKey"></div>
								</div>
							</div>
						</div>
					</MenuOption>
					<MenuOption>
						<div class="react-contexify__item" role="presentation">
							<div class="react-contexify__item__content">
								<div class="contextmenuItem"><svg width="16" height="16" viewBox="0 0 16 16"
										class="sc-hKwCoD sc-eCImvq fgBDdK cXbbhc" size="16" fill="#8C8C8C" version="1.1"
										xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<path
											d="M13.7072 2.29294C13.8947 2.48048 14.0001 2.73483 14.0001 3.00005V6.20005C14.0001 6.75233 13.5524 7.20005 13.0001 7.20005C12.4478 7.20005 12.0001 6.75233 12.0001 6.20005V5.41411L9.99765 7.41655C9.60713 7.80708 8.97397 7.80708 8.58344 7.41655C8.19292 7.02603 8.19292 6.39286 8.58344 6.00234L10.5857 4.00005H9.80009C9.24781 4.00005 8.80009 3.55233 8.80009 3.00005C8.80009 2.44776 9.24781 2.00005 9.80009 2.00005H13.0001C13.2653 2.00005 13.5197 2.1054 13.7072 2.29294ZM4.00005 10.5857V9.8C4.00005 9.24771 3.55233 8.8 3.00005 8.8C2.44776 8.8 2.00005 9.24771 2.00005 9.8V13C2.00005 13.2652 2.1054 13.5196 2.29294 13.7071C2.48048 13.8946 2.73483 14 3.00005 14H6.20005C6.75233 14 7.20005 13.5523 7.20005 13C7.20005 12.4477 6.75233 12 6.20005 12H5.41419L7.37481 10.0394C7.76533 9.64885 7.76533 9.01569 7.37481 8.62516C6.98428 8.23464 6.35112 8.23464 5.96059 8.62516L4.00005 10.5857Z"
											fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
									</svg>
									<div class="name">展开行</div>
									<div class="shortcutKey">Space</div>
								</div>
							</div>
						</div>
					</MenuOption>
					<MenuOption>
						<div class="react-contexify__item" role="presentation">
							<div class="react-contexify__item__content">
								<div class="contextmenuItem">
									<svg width="16" height="16" viewBox="0 0 16 16"
										class="sc-hKwCoD sc-eCImvq fgBDdK cXbbhc" size="16" fill="#8C8C8C" version="1.1"
										xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<path
											d="M5 4C5 2.34315 6.34315 1 8 1C9.65685 1 11 2.34315 11 4H12H14C14.5523 4 15 4.44772 15 5C15 5.55228 14.5523 6 14 6H13V14C13 14.5523 12.5523 15 12 15H8H4C3.44772 15 3 14.5523 3 14V6H2C1.44772 6 1 5.55228 1 5C1 4.44772 1.44772 4 2 4H4H5ZM6 6H5V13H8H11V6H10H6ZM9 4H7C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4Z"
											fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
									</svg>
									<div class="name">删除行</div>
									<div class="shortcutKey"></div>
								</div>
							</div>
						</div>
					</MenuOption>
			</div>
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />

<style>
	.react-contexify__item__content {
    padding: 0;
    display: flex;
    text-align: left;
    white-space: nowrap;
    color: #333;
    position: relative;
}
.contextmenuItem {
		width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
		grid-gap: 5px;
}
</style>