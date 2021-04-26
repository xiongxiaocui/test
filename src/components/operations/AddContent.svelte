<script>
  import { getContext } from 'svelte';
	import Dialog from './../modal/Dialog.svelte';
	import { createEventDispatcher } from "svelte";

	const { open } = getContext('simple-modal');
	const dispatch = createEventDispatcher();
	let name;
	let status = 0;

	$:console.log(name)
	$:console.log(status)
	export let headings

	const onCancel = () => {
		name = '';
		status = -1;
	}

	const onOkay = (text) => {
		name = text;
		status = 1;
	}

  const showDialog = () => {
		console.log(headings)
		open(
			Dialog,
			{
				title: "未命名记录",
				hasForm: true,
				options: headings,
				onCancel,
				onOkay
			},
			{
				closeButton: true,
				closeOnEsc: true,
				closeOnOuterClick: true,
			}
		);
	};

	const addRow = () => {
		dispatch('addRow')
		showDialog()
	}
</script>

<button
  type="button"
  on:click={addRow}
  class="btn"><span
    class="btn-icon"><svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#636363"
      class=""><path
        d="M7.5 2C3.9 2 1 4.9 1 8.5S3.9 15 7.5 15 14 12.1 14 8.5 11.1 2 7.5 2zm3 7H8v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9H4.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5H7V5.5c0-.3.2-.5.5-.5s.5.2.5.5V8h2.5c.3 0 .5.2.5.5s-.2.5-.5.5z" /></svg></span><span>插入行</span></button>
