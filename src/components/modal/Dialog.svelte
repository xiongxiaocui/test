<script>
  import TextInput from './../../UI/TextInput.svelte';
  import NumberInput from './../../UI/NumberInput.svelte';
  import MultiSelect from '../../UI/MultiSelect.svelte';
  import {getContext} from 'svelte';
  export let title;
  export let hasForm = false;
  export let options;
  export let onCancel = () => {};
  export let onOkay = () => {};
  const { close } = getContext('simple-modal');

  function _onCancel() {
    onCancel();
    close();
  }

  function _onOkay() {
    onOkay();
    close();
  }

  // input change
  const handleChange = value => {
    console.log(value)
  };
</script>

<button class="close" on:click={_onCancel}> Close </button>
<div class="title">
  <h2>{title}</h2>
</div>
{#if hasForm}
  {#each options as option, i (i)}
    <div class="field-wrapper">
      <div class="field-title">{option.title || ''}</div>
      <div class="field-cell">
        {#if option.type === 'text'}
          <!-- 文字类型组件 -->
          <TextInput onChange={handleChange} />
        {:else if option.type === 'number'}
          <!-- 数字类型组件 -->
          <NumberInput onChange={handleChange} />
        {:else if option.type === 'select'}
          <MultiSelect>
            {#each option.getOptions() as listItem, i (i)}
              <option>{listItem}</option>
            {/each}
          </MultiSelect>
          <!-- <div>---</div> -->
        {/if}
      </div>
    </div>
  {/each}
{/if}

<div class="buttons">
  <button on:click={_onCancel}> Cancel </button>
  <button on:click={_onOkay}> Okay </button>
</div>

<style>
  h2 {
    max-height: 80px;
    max-width: 396px;
    font-size: 16px;
    color: #262626;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 4px 0 0;
    position: relative;
    box-sizing: content-box;
    margin-bottom: 0;
    font-weight: 700;
    line-height: 28px;
  }
  .title {
    border-bottom: 1px solid #e9e9f5;
    display: flex;
    padding-bottom: 5px;
    margin-bottom: 10px;
    align-items: flex-start;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .close {
    position: absolute;
    top: -2rem;
    right: 0;
    background: black;
  }
  .field-wrapper {
    margin-bottom: 30px;
  }
  .field-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-bottom: 4px;
    color: #636363;
    position: relative;
    cursor: default;
  }
</style>
