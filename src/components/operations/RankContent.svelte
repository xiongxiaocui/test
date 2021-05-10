<script lang="ts">
	import SingleSelect from './../../UI/SingleSelect.svelte';
	import Button from './../../UI/Button.svelte';
  import clickOutside from './../../clickOutside'
  import {
    createPopper
  } from '@popperjs/core/';
  import {
    tick,
    createEventDispatcher
  } from 'svelte'
  export let headings
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

  $: selectOptions = headings.map(item => {
    return {
      title: item.title
    }
  })

  const handleSelectedSort = (val) => {
    console.log(val)
  }

  const handleAddSelectedSort = val => {}


  $: (() => {
    if (active) {
      dispatch('changeHeight', active)
    }
  })()
</script>
<span class='btn-wrapper'>
  <button bind:this={btnRef} type="button" on:click="{toggleShow}">
    <span class="btn-icon">
      <svg viewBox="0 0 1024 1024" width="16" height="16" fill="#636363" class="">
        <path
          d="M426.5 153.4c-1.2-1.3-2.4-2.5-3.7-3.7-14.4-13.5-33.6-21.7-54.8-21.7-10.8 0-21 2.1-30.4 6-9.5 3.9-18.4 9.7-26.2 17.5L108 354.9c-31.2 31.2-31.2 81.9 0 113.1 31.2 31.2 81.9 31.2 113.1 0l66.9-66.9V816c0 44.2 35.8 80 80 80s80-35.8 80-80V208c0-11.2-2.3-21.8-6.4-31.5-3.6-8.3-8.6-16.2-15.1-23.1zM916 556c-31.2-31.2-81.9-31.2-113.1 0L736 622.9V208c0-44.2-35.8-80-80-80s-80 35.8-80 80v608c0 21.1 8.2 40.3 21.5 54.6 1.2 1.3 2.5 2.6 3.9 3.9 6.9 6.5 14.8 11.5 23.1 15.1 9.7 4.2 20.3 6.5 31.5 6.5s21.9-2.3 31.5-6.5c8.3-3.6 16.1-8.6 23.1-15.1.7-.7 1.5-1.4 2.2-2.1L916 669.1c31.2-31.2 31.2-81.9 0-113.1z" />
      </svg>
    </span>
    <span>排序</span>
  </button>
  {#if open}
    <div bind:this={popoverRef} class="viewSort">
      <div class="boxTop">
        <div class="tip">设置排序</div>
        <div class="keepSort">自动排序
          <Button  buttonRole="switch" size="small"></Button>
        </div>
      </div>
      <main>
        <div class="droppable">
          <div class="draggable" data-rbd-droppable-id="common-view-set" data-rbd-droppable-context-id="2">
            <div class="iconDrag">
              <svg width="10" height="10" viewBox="0 0 10 10" class="sc-hKwCoD sc-eCImvq fgBDdK iZagEg" size="10"
                fill="#C9C9C9" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                  d="M4 1C4 1.55228 3.55228 2 3 2C2.44772 2 2 1.55228 2 1C2 0.447715 2.44772 0 3 0C3.55228 0 4 0.447715 4 1ZM4 5C4 5.55228 3.55228 6 3 6C2.44772 6 2 5.55228 2 5C2 4.44772 2.44772 4 3 4C3.55228 4 4 4.44772 4 5ZM3 10C3.55228 10 4 9.55229 4 9C4 8.44771 3.55228 8 3 8C2.44772 8 2 8.44771 2 9C2 9.55229 2.44772 10 3 10ZM8 1C8 1.55228 7.55228 2 7 2C6.44772 2 6 1.55228 6 1C6 0.447715 6.44772 0 7 0C7.55228 0 8 0.447715 8 1ZM7 6C7.55228 6 8 5.55228 8 5C8 4.44772 7.55228 4 7 4C6.44772 4 6 4.44772 6 5C6 5.55228 6.44772 6 7 6ZM8 9C8 9.55229 7.55228 10 7 10C6.44772 10 6 9.55229 6 9C6 8.44771 6.44772 8 7 8C7.55228 8 8 8.44771 8 9Z"
                  fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="sortOptions">
              <div style="width: max-content;">
                <SingleSelect on:selected="{handleSelectedSort}" width={"180px"} showFirst options="{selectOptions}"></SingleSelect>
              </div>
            </div>
            <div class="rules">
              <div class="asc active">A
                <div class="iconArrow">
                  <svg viewBox="0 0 15 15" width="1em" height="1em" fill="#FFFFFF">
                    <path class="datasheet_icon_toward_right_gray_svg__st0"
                      d="M12.5 7.7c0-.1-.1-.1-.1-.1L7.8 4.5c-.3-.1-.6-.1-.7.2-.1 0-.1.1-.1.2V7H3c-.6 0-1 .4-1 1s.4 1 1 1h4v2.1c0 .3.2.5.5.5.1 0 .2 0 .3-.1l4.6-3.1c.2-.1.3-.4.1-.7z">
                    </path>
                  </svg>
                </div>Z
              </div>
              <div class="desc">Z
                <div class="iconArrow">
                  <svg viewBox="0 0 15 15" width="1em" height="1em" fill="#8C8C8C">
                    <path class="datasheet_icon_toward_right_gray_svg__st0"
                      d="M12.5 7.7c0-.1-.1-.1-.1-.1L7.8 4.5c-.3-.1-.6-.1-.7.2-.1 0-.1.1-.1.2V7H3c-.6 0-1 .4-1 1s.4 1 1 1h4v2.1c0 .3.2.5.5.5.1 0 .2 0 .3-.1l4.6-3.1c.2-.1.3-.4.1-.7z">
                    </path>
                  </svg>
                </div>A
              </div>
            </div>
            <button type="button" class='deleteButton'>
              <span class="btn-icon">
                <svg viewBox="0 0 16 16" width="15" height="15" fill="#C9C9C9" class="">
                  <path
                    d="M14 4h-3V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H2c-.6 0-1 .4-1 1s.4 1 1 1h1v6c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3V6h1c.6 0 1-.4 1-1s-.4-1-1-1zM7 3h2v1H7V3zm4 9c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6h6v6z">
                  </path>
                </svg>
              </span>
              <span></span>
            </button>
          </div>
      </main>
      <div class="selectField">
        <div class="sortOptions addOption">
          <div style="width: max-content;">
            <SingleSelect on:selected="{handleAddSelectedSort}" width={"180px"} options="{selectOptions}"></SingleSelect>
          </div>
        </div>
      </div>
    </div>
  {/if}
</span>

<style>
  .btn-wrapper{
    display:inline-block;
  }
  .viewSort{
    width: 470px;
    box-shadow: 1px 1px 14px #e5e5e5;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
    padding: 20px 0;
    border-radius: 4px;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .boxTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 20px;
}
  .tip{
    font-size: 13px;
    color: #8c8c8c;
  }
  .keepSort {
    display: flex;
    align-items: center;
    font-size: 13px;
}
  .viewSort>main {
    max-height: 500px;
    padding: 0 8px 0 20px;
    overflow: auto;
  }
  .draggable{
    display: flex;
    align-items: center;
    height: 40px;
  }
  .draggable:not(:last-child) {
    margin-bottom: 8px;
  }
  .iconDrag{
    margin-right: 18px;
  }
  .sortOptions {
    width: 180px;
    height: 100%;
    line-height: 35px;
    cursor: default;
  }
  [data-rbd-droppable-context-id="2"] {
    overflow-anchor: none;
  }
  .rules{
    width: 185px;
    height: 100%;
    background: #f2f4f6;
    padding: 5px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 4px;
  }
  .desc, .asc {
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 91px;
    height: 32px;
    line-height: 25px;
    box-sizing: border-box;
  }
  .active{
    color: #fff;
    background: #7b67ee;
  }
  .iconArrow{
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
  .selectField {
    margin-top: 8px;
    padding-left: 30px;
  }
  .addOption {
    margin-left: 18px;
  }
  .deleteButton {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    min-width: 22px;
    height: 22px;
    border: none;
    color: rgb(201, 201, 201);
  }
</style>