<script lang="ts">
	import TextInput from './../../UI/TextInput.svelte';
	const getValueHandler = val  => {
		// console.log(val)
	}
</script>
<div class='field-operationBox' tabindex='-1'>
	<div class='scroll-wrapper'>
		<section class='section'>
				<div class="section-title">表格列名</div>
				<div>
					<TextInput onChange={getValueHandler} />
				</div>
		</section>
		<section class="section" >
			<div class="section-title">维格列类型</div>
			<div class="section-infos" >
				<svg viewBox="0 0 16 16" width="16" height="16" fill="#8C8C8C">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 12.9v-.1L9.1 2.7v-.1L9 2.5l-.3-.3C8.5 2.1 8.3 2 8 2s-.5.1-.7.2l-.3.3v.2L3.6 12.8v.2c-.1.3 0 .5.1.7.1.2.4.3.7.3.3 0 .6-.1.8-.2l.3-.3.1-.1.1-.2.7-2c0-.1.1-.1.2-.1h2.9c.1 0 .2.1.2.1l.7 2.1.1.2.1.1c.1.1.1.2.2.3.2.2.4.2.8.2.3 0 .6-.1.8-.3.2-.2.2-.4.2-.6l-.1-.3zM9 9H7c-.1 0-.2-.1-.2-.2l1-3.3c.1-.2.3-.2.4 0l1 3.3c0 .1-.1.2-.2.2z"></path>
				</svg>
				<div class="styles_text__225ki">单行文本</div>
				<div class='optionList'>
					<svg viewBox="0 0 10 10" width="10" height="10" fill="#8C8C8C">
						<path d="M9.8 4.5L5.5.2c-.3-.3-.8-.3-1.1 0s-.2.8.1 1.1L8.2 5 4.5 8.7c-.3.3-.3.8 0 1.1.1.1.3.2.5.2s.4-.1.5-.2l4.2-4.2c.4-.4.4-.8.1-1.1z"></path>
					</svg>
				</div>
			</div>
		</section>
	</div>
</div>