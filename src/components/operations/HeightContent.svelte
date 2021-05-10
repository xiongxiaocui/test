<script lang="ts">
  import clickOutside from './../../clickOutside'
  import { createPopper } from '@popperjs/core/';
  import { tick, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  let open = false
  let btnRef: HTMLButtonElement
  let popoverRef: HTMLDivElement
  let active = "default"
  const toggleShow = async () => {
    open = !open
    if (open) {
      await tick().then(() => {
        createPopper(btnRef, popoverRef, {
          placement: 'bottom'
        })
      })

    }
  }
  $:(() => {
    if (active) {
      dispatch('changeHeight', active)
    }
  })()
</script>
<span class='btn-wrapper' use:clickOutside={{ enabled: open, cb: () => open = false }}>
  <button bind:this={btnRef} type="button" on:click="{toggleShow}">
    <span
      class="btn-icon">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="#636363" class="">
        <path
          d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM14 2h-4c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1z">
        </path>
      </svg></span>
      <span>行高</span>
  </button>
  {#if open}
    <div bind:this={popoverRef} class="changeRowHeight">
      <div class="rowHeightItem" class:active={active === 'default'} on:click="{() => active = 'default'}">
        <div class="styleIcon">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="#8C8C8C">
            <path
              d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM10 5h4c.6 0 1-.4 1-1s-.4-1-1-1h-4c-.6 0-1 .4-1 1s.4 1 1 1zM14 7h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zM14 11h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1z">
            </path>
          </svg></div> 默认
      </div>
      <div class="rowHeightItem" class:active={active === 'medium'} on:click="{() => active = 'medium'}">
        <div class="styleIcon">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="#8C8C8C"><path d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM14 2h-4c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zM14 8h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zM14 12h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1z"></path></svg></div> 中等
      </div>
      <div class="rowHeightItem" class:active={active === 'high'} on:click="{() => active = 'high'}">
        <div class="styleIcon">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="#8C8C8C"><path d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM14 2h-4c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zM14 12h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1z"></path></svg></div> 高
      </div>
      <div class="rowHeightItem" class:active={active === 'highest'} on:click="{() => active = 'highest'}">
        <div class="styleIcon">
          <svg viewBox="0 0 16 16" width="1em" height="1em" fill="#8C8C8C"><path d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM14 2h-4c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1z"></path></svg></div>极高
      </div>
    </div>
  {/if}
</span>

<style>
  .btn-wrapper{
    display:inline-block;
  }
  .changeRowHeight{
    width: 220px;
    box-shadow: 1px 1px 14px #e5e5e5;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
    padding: 0 15px;
    border-radius: 4px;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rowHeightItem{
    display: flex;
    align-items: center;
    line-height: 35px;
    height: 35px;
    cursor: pointer;
  }
  .rowHeightItem:last-child {
    margin-bottom: 0;
  }
  .styleIcon {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
  .styleIcon svg {
    width: 16px;
    height: 16px;
  }
  .active {
    color: #7B67EE;
  }
  .active svg {
    fill: #7B67EE;
  }

</style>