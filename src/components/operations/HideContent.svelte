<script lang="ts">
  import { tick } from "svelte";
  import PopOver from './../../UI/PopOver.svelte'
  import Button from './../../UI/Button.svelte'
  // const dispatch = createEventDispatcher();
  let btnRef: HTMLButtonElement
  let showPopOver: Boolean
  let hidePopOverId

  export let headings

  function togglehidePopOver() {
    if (showPopOver) {
      showPopOver = false
    } else {
      showPopOver = true
      hidePopOverId = btnRef && btnRef.id
    }
  }

  const toggleState = (i, header, cur) => {
    // console.log(header)
    if (header.show) {
      headings[i].show = false
    } else {
      headings[i].show = true
    }
  }

</script>
<button
    type="button"
		class="btn"
    id="hideOperation"
    bind:this={btnRef}
		on:click='{togglehidePopOver}'
		><span
      class="btn-icon"><svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#636363"
        class=""><path
          d="M8 3C3.5 3 1 8 1 8s2.5 5 7 5 7-5 7-5-2.5-5-7-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
        <circle
          cx="8"
          cy="8"
          r="2" /></svg></span><span>隐藏列</span></button>
          {#if showPopOver}
              <PopOver popId={hidePopOverId} width={"220px"}>
                  <ul class='content-wrapper' slot="content">
                    {#each headings as header, i (i)}
                    <li class="field-item">
                      <div class='field-icon'>
                        <svg width="10" height="10" viewBox="0 0 10 10" class="sc-fubCfw sc-pFZIQ irPtrP ioYbGD" size="10" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M3 2C3.55228 2 4 1.55228 4 1C4 0.447715 3.55228 0 3 0C2.44772 0 2 0.447715 2 1C2 1.55228 2.44772 2 3 2Z" fill="#C9C9C9" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M3 6C3.55228 6 4 5.55228 4 5C4 4.44772 3.55228 4 3 4C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6Z" fill="#C9C9C9" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M3 10C3.55228 10 4 9.55228 4 9C4 8.44772 3.55228 8 3 8C2.44772 8 2 8.44772 2 9C2 9.55228 2.44772 10 3 10Z" fill="#C9C9C9" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M7 2C7.55228 2 8 1.55228 8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1C6 1.55228 6.44772 2 7 2Z" fill="#C9C9C9" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M7 6C7.55228 6 8 5.55228 8 5C8 4.44772 7.55228 4 7 4C6.44772 4 6 4.44772 6 5C6 5.55228 6.44772 6 7 6Z" fill="#C9C9C9" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M7 10C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10Z" fill="#C9C9C9" fill-rule="evenodd"></path></svg>
                      </div>
                      <div class='field-name'>
                        {header && header.title}
                      </div>
                      <Button on:click="{toggleState.bind(this, i, header)}" buttonRole="switch" size="small" state={header.show ? "checked": "unchecked"}></Button>
                    </li>
                    {/each}
                  </ul>
              </PopOver>
          {/if}

  <style>
    ul {
      padding:0;
    }
    .field-item {
      display: flex;
      height: 35px;
      align-items: center;
      cursor: pointer;
      /* justify-content: space-between; */
      padding: 0 4px;
      flex: 1 1;
      margin-left: 4px;
    }
    .field-icon {
      margin-right: 4px;
    }
    .field-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 10px;
    }
  </style>